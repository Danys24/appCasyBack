import express from 'express';
import { configuracion } from './config/config.js';
const app = express();
const PORT = configuracion.app.port;
import userRouter from './rutas/usuarios.js'

// Middleware para leer JSON
app.use(express.json());

// Rutas para la gestion de usuarios
app.use('/usuarios', userRouter); //Muestra todos los usuarios
app.use('/usuarios/:id', userRouter); //Muestra un usuario segun su id
app.use('/usuarios', userRouter); //Para crear un usuario

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});