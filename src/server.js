import express from 'express';
import { configuracion } from './config/config.js';
import userRouter from './rutas/usuarios.js';
import routerAuth from './rutas/auth.js';
import routerSets from './rutas/sets.js';
import routerProyecto from './rutas/proyectos.js';
import cors from 'cors';


const app = express();
const PORT = configuracion.app.port;


// Habilita CORS para todas las rutas
app.use(cors());

// Middleware para leer JSON
app.use(express.json());

// Rutas para la gestion de usuarios
app.use('/usuarios', userRouter); //Muestra todos los usuarios
app.use('/usuarios/:id', userRouter); //Muestra un usuario segun su id
app.use('/usuarios', userRouter); //Para crear un usuario
app.use('/login', routerAuth);

// Rutas para los proyectos
app.use('/proyectos', routerProyecto);
app.use('/proyectos/:id', routerProyecto);

// Rutas para los sets de prueba
//app.use('/sets', routerSets);
//app.use('/sets/:id', routerSets);


// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});