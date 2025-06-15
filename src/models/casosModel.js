import {conexion} from '../config/db.js';

export function crearCaso(tablas, idSet, nombre, descripcion, estado, responsable){

    return new Promise((resolve, reject) =>{
        
        conexion.query(`SELECT COALESCE(MAX(orden), 0) AS maxOrden FROM ${tablas} WHERE id_set = ?`, 
            [idSet], 
            (error, result) => {

                if(error) return reject(error);

                const nuevoOrden = result[0].maxOrden + 1;

                conexion.query(`INSERT INTO ${tablas}(id_set, nombre, descripcion, estado, responsable, orden) VALUES(?,?,?,?,?,?)`,
                    [idSet, nombre, descripcion, estado, responsable,nuevoOrden],
                    (error1, result1) => {
                        if(error1) return reject(error1);
                        resolve({
                            idSet:idSet, 
                            nombre:nombre, 
                            descripcion:descripcion, 
                            estado:estado, 
                            responsable:responsable,
                            orden:nuevoOrden
                        })
                    }
                )
            }
        )
    })
}

export function casosByIdSet(tabla, idSet){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_set = ?`,[idSet], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function casosByIdSetPagina(tabla, idSet, limit, offset){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT * FROM ${tabla}
                        WHERE id_set = ? ORDER BY id ASC LIMIT ? OFFSET ?                   
                        `
        conexion.query(querys,[idSet, limit, offset], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function casosByIdSetTotal(tabla, idSet){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT COUNT(*) AS total FROM ${tabla}
                        WHERE id_set = ?                  
                        `
        conexion.query(querys,[idSet], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function casoById(tabla, idCaso){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`,[idCaso], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}


export function actualizarCasoById(tabla,nombre,descripcion,estado,responsable,idCaso){
    return new Promise( (resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET nombre=?, descripcion=?, estado=?, responsable =? WHERE id=?`,
            [nombre,descripcion,estado,responsable,idCaso], 
            (error, result) => {
            if(error) return reject(error);
            resolve({
                id:idCaso,
                nombre:nombre,
                descripcion:descripcion,
                estado:estado,
                responsable:responsable
            });
        })
    })
}

export function eliminarCasoById(tabla,idCaso, idSet){
    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`,[idCaso] ,(error, result) => {
            if(error) return reject(error);
            resolve(result);   
        })
    })
}

export function ordenarCasoByIdSet(tabla,idSet){
    return new Promise( (resolve, reject) => {
        conexion.query(`SET @orden = 0`,(error, result) => {
            if(error) return reject(error);

            conexion.query(`UPDATE ${tabla}  SET orden = (@orden := @orden + 1) WHERE id_set = ? ORDER BY orden ASC`,
                [idSet],
                (error1, result1) => {
                    if(error1) return reject(error1);
                    resolve(result1);
            })
             
        })
    })
}

export function casoConCiclo(tabla,idCaso, idCiclo, estado){
    return new Promise( (resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla}(id_caso,id_ciclo,estado) VALUES (?,?,?)`,[idCaso,idCiclo,estado] ,(error, result) => {
            if(error) return reject(error);
            resolve({idCaso:idCaso, idCiclo:idCiclo, estado:estado});
        })
    })
}

export function casoConCicloActualizar(tabla,idCaso, idCiclo, estado){
    return new Promise( (resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET estado=? WHERE id_caso=? AND id_ciclo=?`,[idCaso,idCiclo,estado] ,(error, result) => {
            if(error) return reject(error);
            resolve({idCaso:idCaso, idCiclo:idCiclo, estado:estado});
        })
    })
}

export function casoConCicloEliminar(tabla,idCaso, idCiclo){
    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_caso=? AND id_ciclo=?`,[idCaso,idCiclo] ,(error, result) => {
            if(error) return reject(error);
            resolve({idCaso:idCaso, idCiclo:idCiclo});
        })
    })
}