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

export function ciclosByIdProyectoPagina(tabla, idProyecto, limit, offset){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT * FROM ${tabla}
                        WHERE id_proyecto = ? ORDER BY id ASC LIMIT ? OFFSET ?                   
                        `
        conexion.query(querys,[idProyecto, limit, offset], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function ciclosByIdProyectoTotal(tabla, idProyecto){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT COUNT(*) AS total FROM ${tabla}
                        WHERE id_proyecto = ?                  
                        `
        conexion.query(querys,[idProyecto], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function ciclosCasosByIdCaso(tablaCS,tablar, idCaso){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT c.id, c.nombre, r.estado FROM ${tablaCS} as c
                        JOIN ${tablar} as r ON c.id = r.id_ciclo
                        WHERE r.id_caso = ?;`

        conexion.query(querys, [idCaso], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
            
    })
}

export function ciclosCasosByIdCasoNoRelacionados(tablaCS,tablar, idCaso, idProyecto){
    return new Promise( (resolve, reject) => {

        const querys = `SELECT id, nombre FROM ${tablaCS}
                        WHERE id NOT IN( SELECT id_ciclo FROM ${tablar} WHERE id_caso = ?) AND id_proyecto= ?
                        `

        conexion.query(querys, [idCaso, idProyecto], (error, result) => {
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