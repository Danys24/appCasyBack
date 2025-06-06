import {conexion} from '../config/db.js';

export function crearSet(tablas, idProyecto, nombre, descripcion, estado){
    return new Promise( (resolve, reject) => {

        conexion.query(`INSERT INTO ${tablas}(id_proyecto, nombre, descripcion, estado) VALUES(?,?,?,?)`,[idProyecto, nombre, descripcion, estado], (error, result) => {
            if (error) return reject(error);
            resolve({idProyecto:idProyecto, nombre:nombre, descripcion:descripcion, estado:estado});
        })
    })
}

export function setsByIdProyecto(tabla, idProyecto){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_proyecto = ?`,[idProyecto], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function setsById(tabla, idCiclo){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`,[idCiclo], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}


export function actualizarSet(tabla,nombre,descripcion,estado,idSet){
    return new Promise( (resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET nombre=?, descripcion=?, estado=? WHERE id=?`,[nombre,descripcion,estado,idSet], (error, result) => {
            if(error) return reject(error);
            resolve({id:idSet,nombre:nombre,descripcion:descripcion,estado:estado});
        })
    })
}

export function eliminarSet(tabla,idSet){
    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`,[idSet] ,(error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function setConCiclo(tabla,idSet, idCiclo){
    return new Promise( (resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla}(id_set,id_ciclo) VALUES (?,?)`,[idSet,idCiclo] ,(error, result) => {
            if(error) return reject(error);
            resolve({idSet:idSet, idCiclo:idCiclo});
        })
    })
}