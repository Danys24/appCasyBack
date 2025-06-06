import express from 'express';
import {upload} from '../config/multer.js';
import {crearResultadoPrueba} from '../controllers/resultado.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerResultados = express.Router();

//POST /resultados - crear un paso de prueba
routerResultados.post('/',authMiddleware,upload.array('imagenes', 5),crearResultadoPrueba);

//GET /resultados/:id - obtener un resultado por id
routerResultados.get('/:id',authMiddleware,obtenerUnPaso);

//PUT /resultados/:id - actualizar un resultado por id
routerResultados.put('/:id',authMiddleware,actualizarUnPaso);

export default routerResultados;