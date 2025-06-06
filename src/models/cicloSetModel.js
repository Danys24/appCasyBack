import {conexion} from '../config/db.js';

export function crearCicloSet(tablaCS, idProyecto, nombre, descripcion){
    return new Promise( (resolve, reject) => {

        conexion.query(`INSERT INTO ${tablaCS}(id_proyecto, nombre, descripcion) VALUES(?,?,?)`,[idProyecto, nombre, descripcion], (error, result) => {
            if (error) return reject(error);
            resolve({idProyecto:idProyecto, nombre:nombre, descripcion:descripcion});
        })
            
    })
}

export function ciclosSetByIdProyecto(tablaCS, idProyecto){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT * FROM ${tablaCS} 
                       WHERE id_proyecto = ?`

        conexion.query(querys, [idProyecto], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
            
    })
}

export function ciclosSetById(tablaCS, idCiclo){
    return new Promise( (resolve, reject) => {

        conexion.query(`SELECT * FROM ${tablaCS} WHERE id = ?`,[idCiclo], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
            
    })
}

export function actualizarCiclosSetById(tablaCS, nombre, descripcion, idCiclo){
    return new Promise( (resolve, reject) => {

        conexion.query(`UPDATE ${tablaCS} SET nombre = ?, descripcion = ? WHERE id = ?`,[nombre, descripcion, idCiclo], (error, result) => {
            if (error) return reject(error);
            resolve({id:idCiclo, nombre:nombre, descripcion:descripcion});
        })
            
    })
}

export function eliminarCiclosSetById(tablaCS, idCiclo){
    return new Promise( (resolve, reject) => {

        conexion.query(`DELETE FROM ${tablaCS} WHERE id=?`,[idCiclo], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
            
    })
}