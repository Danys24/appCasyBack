import {conexion} from '../config/db.js';

export function crearResultado(tablas, tablae, idPaso, idCiclo, idCaso, observacion, evidencia, estado){

    return new Promise((resolve, reject) =>{
        
        conexion.query(`INSERT INTO ${tablas}(id_paso, id_ciclo, idCaso, observacion, estado) VALUES(?,?,?,?,?)`, 
            [idPaso, idCiclo, idCaso, observacion,estado], 
            (error, result) => {

                if(error) return reject(error);

                const idResultado = result.insertId;

                for(const img of evidencia){
                    conexion.query(`INSERT INTO ${tablae}(id_resultado, evidencia) VALUES(?,?)`,
                        [idResultado, img.filename],
                        (error1, result1) => {
                            if(error1) return reject(error1);
                            resolve({
                                idPaso:idPaso,
                                idCiclo:idCiclo,
                                idCaso:idCaso,
                                observacion:observacion,
                                estado: estado
                            })
                        }
                    )
                }
            }
        )
    })
}

export function resultsByIdPasoCiclo(tabla,tablae, idpaso, idCiclo){
    return new Promise( (resolve, reject) => {
        const querys = `SELECT r.observacion,JSON_ARRAYAGG(e.evidencia) as evidencia,r.estado 
                        FROM ${tabla} as r 
                        LEFT JOIN ${tablae} as e ON r.id = e.id_resultado
                        WHERE id_paso= ? AND id_ciclo= ?
                        GROUP BY r.id`
        conexion.query(querys,[idpaso, idCiclo], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function resultsByIdCasoCiclo(tabla,tablae, idCaso, idCiclo){
    return new Promise( (resolve, reject) => {
        const querys = `SELECT r.observacion,JSON_ARRAYAGG(e.evidencia) as evidencia,r.estado 
                        FROM ${tabla} as r 
                        LEFT JOIN ${tablae} as e ON r.id = e.id_resultado
                        WHERE id_caso= ? AND id_ciclo= ?
                        GROUP BY r.id`
        conexion.query(querys,[idCaso, idCiclo], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

export function resultadoById(tabla, idResultado){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`,[idResultado], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}


export function actualizarResultadoById(tabla,observacion, estado,idResultado){
    return new Promise( (resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET observacion=?, estado=?  WHERE id=?`,
            [observacion, estado,idResultado], 
            (error, result) => {
            if(error) return reject(error);
            resolve({
                id:idResultado,
                observacion:observacion,
                estado:estado
            });
        })
    })
}

export function crearEvidencia(tablae,idResultado, evidencia){
    return new Promise( (resolve, reject) => {
        for(const img of evidencia){
            conexion.query(`INSERT INTO ${tablae}(id_resultado, evidencia) VALUES(?,?)`,
                        [idResultado, img.filename],
                        (error, result) => {
                            if(error) return reject(error);
                            resolve(result);
                        }
            )

        }
    })
}

export function eliminarEvidenciaById(tablae,idEvidencia){
    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE FROM ${tablae}  WHERE id=?`,
            [idEvidencia], 
            (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}



