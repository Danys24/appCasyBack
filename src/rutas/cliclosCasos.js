import express from 'express';
import {crearCiclosCasos, obtenerCiclosCasosById, editarCiclosCasosById, borrarCiclosCasosById} from '../controllers/ciclosCasos.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerCicloCasos = express.Router();

//POST /ciclos - crear un ciclo 
routerCicloCasos.post('/',authMiddleware,crearCiclosCasos);

//GET /ciclos - obtener los ciclos
//routerCicloCasos.get('/:id/ciclosSet',authMiddleware,obtenerCiclosSetByIdProyecto);

//GET /ciclos/:id - obtener los ciclos por id
routerCicloCasos.get('/:id',authMiddleware,obtenerCiclosCasosById);

//PUT /ciclos/:id - actualizar un ciclo por id
routerCicloCasos.put('/:id',authMiddleware,editarCiclosCasosById);

//DELETE /ciclos/:id - eliminar un ciclo por id
routerCicloCasos.delete('/:id',authMiddleware,borrarCiclosCasosById);

export default routerCicloCasos;