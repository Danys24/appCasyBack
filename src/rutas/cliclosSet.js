import express from 'express';
import {crearCiclosSets, obtenerCiclosSetByIdProyecto, obtenerCiclosSetById, editarCiclosSetById, borrarCiclosSetById} from '../controllers/ciclosSet.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerCicloSet = express.Router();

//POST /ciclos - crear un ciclo 
routerCicloSet.post('/',authMiddleware,crearCiclosSets);

//GET /ciclos - obtener los ciclos
//routerCicloSet.get('/:id/ciclosSet',authMiddleware,obtenerCiclosSetByIdProyecto);

//GET /ciclos/:id - obtener los ciclos por id
routerCicloSet.get('/:id',authMiddleware,obtenerCiclosSetById);

//PUT /ciclos/:id - actualizar un ciclo por id
routerCicloSet.put('/:id',authMiddleware,editarCiclosSetById);

//DELETE /ciclos/:id - eliminar un ciclo por id
routerCicloSet.delete('/:id',authMiddleware,borrarCiclosSetById);

export default routerCicloSet;