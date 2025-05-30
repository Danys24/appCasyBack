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