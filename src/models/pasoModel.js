import {conexion} from '../config/db.js';

export function crearPaso(tablas, idCaso, paso, resultado){

    return new Promise((resolve, reject) =>{
        
        conexion.query(`SELECT COALESCE(MAX(orden), 0) AS maxOrden FROM ${tablas} WHERE id_caso = ?`, 
            [idCaso], 
            (error, result) => {

                if(error) return reject(error);

                const nuevoOrden = result[0].maxOrden + 1;

                conexion.query(`INSERT INTO ${tablas}(id_caso, paso, resultado, orden) VALUES(?,?,?,?)`,
                    [idCaso, paso, resultado,nuevoOrden],
                    (error1, result1) => {
                        if(error1) return reject(error1);
                        resolve({
                            idCaso:idCaso, 
                            paso:paso, 
                            resultado:resultado, 
                            orden:nuevoOrden
                        })
                    }
                )
            }
        )
    })
}

export function pasosByIdCaso(tabla, idCaso){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_caso = ?`,[idCaso], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function pasoById(tabla, idPaso){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`,[idPaso], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}


export function actualizarPasoById(tabla,paso,resultado,idPaso){
    return new Promise( (resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET paso=?, resultado=? WHERE id=?`,
            [paso,resultado,idPaso], 
            (error, result) => {
            if(error) return reject(error);
            resolve({
                id:idPaso,
                paso:paso,
                resultado:resultado,
            });
        })
    })
}

export function eliminarPasoById(tabla,idPaso){
    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`,[idPaso] ,(error, result) => {
            if(error) return reject(error);
            resolve(result);   
        })
    })
}

export function ordenarPasoByIdCaso(tabla,idCaso){
    return new Promise( (resolve, reject) => {
        conexion.query(`SET @orden = 0`,(error, result) => {
            if(error) return reject(error);

            conexion.query(`UPDATE ${tabla}  SET orden = (@orden := @orden + 1) WHERE id_caso = ? ORDER BY orden ASC`,
                [idCaso],
                (error1, result1) => {
                    if(error1) return reject(error1);
                    resolve(result1);
            })
             
        })
    })
}
