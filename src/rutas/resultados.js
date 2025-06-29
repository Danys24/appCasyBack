import express from 'express';
import {upload} from '../config/multer.js';
import {crearResultadoPrueba, actualizarUnResultado, obtenerUnResultado, crearEvidencias, obtenerEvidenciaPorIdResultado,eliminarEvidencia} from '../controllers/resultado.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerResultados = express.Router();


//POST /resultados - crear resultado
routerResultados.post('/',authMiddleware,crearResultadoPrueba);

//GET /resultados/:id - obtener un resultado por id
routerResultados.get('/:id',authMiddleware,obtenerUnResultado);

//PUT /resultados/:id - actualizar un resultado por id
routerResultados.put('/:id',authMiddleware,actualizarUnResultado);

//POST /resultados/evidencias- crear una evidencia
routerResultados.post('/evidencias',authMiddleware,upload.array('imagenes', 5),crearEvidencias);

//GET /resultados/evidencias/:id - obtener evidencias  por id resultado
routerResultados.get('/:idResultado/evidencias',authMiddleware,obtenerEvidenciaPorIdResultado);

//DELETE /resultados/evidencias/:id - eliminar una evidencia por id
routerResultados.delete('/evidencias/:id',authMiddleware,eliminarEvidencia);

export default routerResultados;