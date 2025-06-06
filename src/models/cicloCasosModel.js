import {conexion} from '../config/db.js';

export function crearCicloCasos(tablaCS, idProyecto, nombre){
    return new Promise( (resolve, reject) => {

        conexion.query(`INSERT INTO ${tablaCS}(id_proyecto, nombre) VALUES(?,?)`,[idProyecto, nombre], (error, result) => {
            if (error) return reject(error);
            resolve({idProyecto:idProyecto, nombre:nombre});
        })
            
    })
}

export function ciclosCasosByIdProyecto(tablaCS, idProyecto){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT * FROM ${tablaCS} 
                       WHERE id_proyecto = ?`

        conexion.query(querys, [idProyecto], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
            
    })
}

export function ciclosCasosById(tablaCS, idCiclo){
    return new Promise( (resolve, reject) => {

        conexion.query(`SELECT * FROM ${tablaCS} WHERE id = ?`,[idCiclo], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
            
    })
}

export function actualizarCiclosCasosById(tablaCS, nombre, idCiclo){
    return new Promise( (resolve, reject) => {

        conexion.query(`UPDATE ${tablaCS} SET nombre = ? WHERE id = ?`,[nombre, idCiclo], (error, result) => {
            if (error) return reject(error);
            resolve({id:idCiclo, nombre:nombre});
        })
            
    })
}

export function eliminarCiclosCasosById(tablaCS, idCiclo){
    return new Promise( (resolve, reject) => {

        conexion.query(`DELETE FROM ${tablaCS} WHERE id=?`,[idCiclo], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
            
    })
}