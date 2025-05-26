import mysql from 'mysql2'
import { configuracion } from './config.js';


// Crear la conexión
const dbConfig = {
    host : configuracion.mysql.host,
    user : configuracion.mysql.user,
    password : configuracion.mysql.pass,
    database : configuracion.mysql.db,
    port : configuracion.mysql.port
}

export let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbConfig);

    conexion.connect((err) => {
        if(err){
            console.log('[db err]', err);
        } else {
            console.log('Conexion exitosa a la base de datos !!')
        }
    });

    conexion.on('error', (err) => {

        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        } else {
            throw err;
        }
    });
}

conMysql();