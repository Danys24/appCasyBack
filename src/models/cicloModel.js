import {conexion} from '../config/db.js';

export function crearCicloSet(tablas, tablar, nombre, descripcion, estado,idUsuario){
    return new Promise( (resolve, reject) => {

        conexion.beginTransaction(error => {
            if (error) return reject(error);

            conexion.query(`INSERT INTO ${tablas}(nombre, descripcion) VALUES(?,?,?)`,[nombre, descripcion], (error1, result) => {
                if(error1){
                    return conexion.rollback(() => reject(error1));
                } 

                //Se guarda en una variable el id del registro insertado en la tabla
                //esto solo funciona cuando el id de la tabla fue credo con la propiedad AUTO_INCREMENT
                const idSet = result.insertId;

                conexion.query(`INSERT INTO ${tablar}(id_usuario, id_set) VALUES (?, ?)`, [idUsuario, idSet], (error2, result2) => {
                    if (error2) {
                        return conexion.rollback(() => reject(error2));
                    }

                    conexion.commit(commitError => {
                        if (commitError) {
                        return conexion.rollback(() => reject(commitError));
                        }
                        resolve({ nombre: nombre, descripcion: descripcion, estado: estado, idUsuario: idUsuario, idSet: idSet });
                    });
                })
            })
        })
            
    })
}