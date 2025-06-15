import express from 'express';
import {crearSets,vincularSetConCiclo, obtenerUnSet,actualizarUnSet,eliminarUnSet} from '../controllers/set.controller.js';
import {obtenerCasosByIdSet, ordenarCasos,obtenerCasosByIdSetPaginas} from '../controllers/casos.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerSets = express.Router();

//POST /sets - crear un set de prueba
routerSets.post('/',authMiddleware,crearSets);

//GET /sets/:id/casos - obtener un caso por id set
routerSets.get('/:id/casos',authMiddleware,obtenerCasosByIdSet);

//GET /sets/:id/casosPaginas - obtener un caso por id set
routerSets.get('/:id/casosPaginas',authMiddleware,obtenerCasosByIdSetPaginas);

//PUT /sets/:id/casos - ordenar casos por id set
routerSets.put('/:id/casos',authMiddleware,ordenarCasos);

//GET /sets/:id - obtener un set por id
routerSets.get('/:id',authMiddleware,obtenerUnSet);

//PUT /sets/:id - actualizar un set por id
routerSets.put('/:id',authMiddleware,actualizarUnSet);

//DELETE /sets/:id - eliminar un set por id
routerSets.delete('/:id',authMiddleware,eliminarUnSet);

//POST /vicularSetsCiclo - vincular el set al ciclo
routerSets.post('/vicularSetsCiclo',authMiddleware,vincularSetConCiclo);

export default routerSets;