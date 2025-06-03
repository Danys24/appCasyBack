import express from 'express';
import {crearSets,obtenerTodosSets, obtenerUnSet,actualizarUnSet,eliminarUnSet} from '../controllers/set.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerSets = express.Router();

//POST /sets - crear un set de prueba
routerSets.post('/',authMiddleware,crearSets);

//GET /sets - obtener todos los sets
routerSets.get('/',authMiddleware,obtenerTodosSets);

//GET /sets/:id - obtener un set por id
routerSets.get('/:id',authMiddleware,obtenerUnSet);

//PUT /sets/:id - actualizar un set por id
routerSets.put('/:id',authMiddleware,actualizarUnSet);

//DELETE /sets/:id - eliminar un set por id
routerSets.delete('/:id',authMiddleware,eliminarUnSet);

export default routerSets;