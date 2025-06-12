import {conexion} from '../config/db.js';

export function todosUsuarios(tabla){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function crearUsuario(tabla,idRol,nombre,clave){
    return new Promise( (resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla}(id_rol, nombre, clave) values(?,?,?)`,[idRol,nombre,clave], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function verificarUser(tabla,nombre,clave){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE nombre=? and clave=?`,[nombre,clave], (error, result) => {
            if(error) return reject(error);
            if (result.length > 0) {
                resolve(result[0]); // usuario encontrado
            } else {
                resolve(null); // usuario no encontrado
            }
        })
    })
}

export function usuariosByIdProyecto(tablau, tablar, idProyecto){
    return new Promise( (resolve, reject) => {

        const querys = `
            SELECT u.id, u.nombre FROM ${tablar} as r
            JOIN ${tablau} as u ON r.id_usuario = u.id
            WHERE id_proyecto = ?
        `
        conexion.query(querys,[idProyecto], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function usuariosByIdProyectoNoRelacion(tablau, tablar, idProyecto){
    return new Promise( (resolve, reject) => {

        const querys = `
            SELECT id, nombre FROM ${tablau}
            WHERE id NOT IN(SELECT id_usuario FROM ${tablar} WHERE id_proyecto = ?);
        `
        conexion.query(querys,[idProyecto], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function vincularUsuarioProyecto(tablar, idUsuario, idProyecto){
    return new Promise( (resolve, reject) => {

        const querys = `
            INSERT INTO ${tablar}(id_usuario, id_proyecto) VALUES(?,?) 
        `
        conexion.query(querys,[idUsuario, idProyecto], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}