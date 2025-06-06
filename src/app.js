import express from 'express';
import userRouter from './rutas/usuarios.js';
import routerAuth from './rutas/auth.js';
import routerSets from './rutas/sets.js';
import routerProyecto from './rutas/proyectos.js';
import routerCicloSet from './rutas/cliclosSet.js';
import routerCicloCasos from './rutas/cliclosCasos.js';
import routerCasos from './rutas/casos.js';
import routerPasos from './rutas/pasos.js';
import routerResultados from './rutas/resultados.js';
import cors from 'cors';

const app = express();

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

// Rutas para los ciclos del set
app.use('/ciclosSet', routerCicloSet);


// Rutas para los ciclos de casos
app.use('/ciclosCasos', routerCicloCasos);

// Rutas para los sets de prueba
app.use('/sets', routerSets);

// Rutas para los casos de prueba
app.use('/casos', routerCasos);

// Rutas para los pasos de prueba
app.use('/pasos', routerPasos);

// Rutas para los resultados de prueba
app.use('/resultados', routerResultados);

//Ruta para las imagenes
app.use('/imagenes', express.static('uploads'));


export default app;
