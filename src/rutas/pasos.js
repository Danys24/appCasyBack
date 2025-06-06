import express from 'express';
import {crearPasoPrueba,obtenerUnPaso,actualizarUnPaso,eliminarUnPaso} from '../controllers/pasos.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerPasos = express.Router();

//POST /pasos - crear un paso de prueba
routerPasos.post('/',authMiddleware,crearPasoPrueba);

//GET /pasos/:id - obtener un paso por id
routerPasos.get('/:id',authMiddleware,obtenerUnPaso);

//PUT /pasos/:id - actualizar un paso por id
routerPasos.put('/:id',authMiddleware,actualizarUnPaso);

//DELETE /casos/:id - eliminar un paso por id
routerPasos.delete('/:id',authMiddleware,eliminarUnPaso);


export default routerPasos;