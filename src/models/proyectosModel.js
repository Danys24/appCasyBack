import {conexion} from '../config/db.js';

export function crearProyecto(tablas, tablar, nombre, descripcion,idUsuario){
    return new Promise( (resolve, reject) => {

        conexion.beginTransaction(error => {
            if (error) return reject(error);

            conexion.query(`INSERT INTO ${tablas}(nombre, descripcion) VALUES(?,?)`,[nombre, descripcion], (error1, result) => {
                if(error1){
                    return conexion.rollback(() => reject(error1));
                } 

                //Se guarda en una variable el id del registro insertado en la tabla
                //esto solo funciona cuando el id de la tabla fue credo con la propiedad AUTO_INCREMENT
                const idProyecto = result.insertId;

                conexion.query(`INSERT INTO ${tablar}(id_usuario, id_proyecto) VALUES (?, ?)`, [idUsuario, idProyecto], (error2, result2) => {
                    if (error2) {
                        return conexion.rollback(() => reject(error2));
                    }

                    conexion.commit(commitError => {
                        if (commitError) {
                        return conexion.rollback(() => reject(commitError));
                        }
                        resolve({ nombre: nombre, descripcion: descripcion, idUsuario: idUsuario, idProyecto: idProyecto });
                    });
                })
            })
        })
            
    })
}

export function todosProyectos(tabla){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function proyectosByIdProyecto(tabla, tablar, idUsuario, limit, offset){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT p.id, p.nombre, p.descripcion FROM ${tabla} as p
                        JOIN ${tablar} as r ON p.id = r.id_proyecto
                        WHERE id_usuario = ? ORDER BY p.id ASC LIMIT ? OFFSET ?                   
                        `
        conexion.query(querys,[idUsuario, limit, offset], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function proyectosByIdProyectoTotal(tabla, tablar, idUsuario){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT COUNT(*) AS total FROM ${tabla} as p
                        JOIN ${tablar} as r ON p.id = r.id_proyecto
                        WHERE id_usuario = ?                  
                        `
        conexion.query(querys,[idUsuario], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function actualizarProyecto(tabla,nombre,descripcion,idProyecto){
    return new Promise( (resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET nombre=?, descripcion=? WHERE id=?`,[nombre,descripcion,idProyecto], (error, result) => {
            if(error) return reject(error);
            resolve({id:idProyecto,nombre:nombre,descripcion:descripcion});
        })
    })
}

export function eliminarProyecto(tabla,idProyecto){
    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`,[idProyecto] ,(error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}