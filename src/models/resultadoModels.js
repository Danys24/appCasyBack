import {conexion} from '../config/db.js';

export function crearResultado(tablas, tablae, idPaso, idCiclo, observacion, evidencia, estado){

    return new Promise((resolve, reject) =>{
        
        conexion.query(`INSERT INTO ${tablas}(idPaso, idCiclo, observacion, estado) VALUES(?,?,?,?)`, 
            [idPaso, idCiclo, observacion,estado], 
            (error, result) => {

                if(error) return reject(error);

                const idResultado = result.insertId;

                for(const img of evidencia){
                    conexion.query(`INSERT INTO ${tablae}(id_resultado, evidencia) VALUES(?,?)`,
                        [idResultado, img],
                        (error1, result1) => {
                            if(error1) return reject(error1);
                        }
                    )
                }

                resolve({
                    idPaso: idPaso, 
                    idCiclo: idCiclo, 
                    observacion: observacion, 
                    estado:estado
                })
            }
        )
    })
}

export function resultsByIdCasoCiclo(tabla, idCaso, idCiclo){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_caso= ' AND id_ciclo= ?`,[idCaso, idCiclo], (error, result) => {
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

export function casoConCiclo(tabla,idCaso, idCiclo){
    return new Promise( (resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla}(id_caso,id_ciclo) VALUES (?,?)`,[idCaso,idCiclo] ,(error, result) => {
            if(error) return reject(error);
            resolve({idCaso:idCaso, idCiclo:idCiclo});
        })
    })
}