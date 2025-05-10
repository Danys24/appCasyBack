import dotenv from 'dotenv';
dotenv.config();

export const configuracion = {
    app : {
        port : process.env.PORT || 3000
    },
    mysql : {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'casyapp',
        pass: process.env.MYSQL_PASS || '12345',
        db: process.env.MYSQL_DB || 'casy',
        port: process.env.MYSQL_PORT || '3306'
    }
}

