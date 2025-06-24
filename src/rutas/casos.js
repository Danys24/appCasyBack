import express from 'express';
import {crearCasoPrueba, obtenerUnCaso, actualizarUnCaso, eliminarUnCaso, vincularCasoConCiclo,vincularCasoConCicloActualizar,vincularCasoConCicloEliminar} from '../controllers/casos.controller.js';
import {obtenerPasosByIdCasos, ordenarPasos} from '../controllers/pasos.controller.js';
import {obtenerCiclosCasosByIdCaso,obtenerCiclosCasosByIdCasoNoRelacionados} from '../controllers/ciclosCasos.controller.js';
import {obtenerResultadosByIdCasoCiclo} from '../controllers/resultado.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerCasos = express.Router();

//POST /casos - crear un set de prueba
routerCasos.post('/',authMiddleware,crearCasoPrueba);

//GET /casos/:id/pasos - obtener pasos por id caso
routerCasos.get('/:id/pasos',authMiddleware,obtenerPasosByIdCasos);

//GET /casos/:id/ciclos - obtener ciclos por id caso
routerCasos.get('/:id/ciclos',authMiddleware,obtenerCiclosCasosByIdCaso);

//GET /casos/:idCaso/ciclos/:idCiclo/resultados - obtener resultados por id ciclos e id caso
routerCasos.get('/:idCaso/ciclos/:idCiclo/resultados',authMiddleware,obtenerResultadosByIdCasoCiclo);

//GET /casos/:id/ciclosNoRelacionados - obtener ciclos por id caso no relacionados
routerCasos.get('/:id/ciclosNoRelacionados',authMiddleware,obtenerCiclosCasosByIdCasoNoRelacionados);

//PUT /casos/:id/pasos - ordenar pasos por id caso
routerCasos.put('/:id/pasos',authMiddleware,ordenarPasos);

//GET /casos/:id - obtener un caso por id
routerCasos.get('/:id',authMiddleware,obtenerUnCaso);

//PUT /casos/:id - actualizar un caso por id
routerCasos.put('/:id',authMiddleware,actualizarUnCaso);

//DELETE /casos/:id - eliminar un caso por id
routerCasos.delete('/:id',authMiddleware,eliminarUnCaso);

//POST /vicularCasosCiclo - vincular el caso al ciclo
routerCasos.post('/vincularCasosCiclo',authMiddleware,vincularCasoConCiclo);

//PUT /:idCaso/vicularCasosCiclo/:idCiclo - actualizar el vinculo del caso al ciclo
routerCasos.put('/:idCaso/vicularCasosCiclo/:idCiclo',authMiddleware,vincularCasoConCicloActualizar);

//DELETE /:idCaso/vicularCasosCiclo/:idCiclo - eliminar el vinculo del caso al ciclo
routerCasos.delete('/:idCaso/vicularCasosCiclo/:idCiclo',authMiddleware,vincularCasoConCicloEliminar);


export default routerCasos;