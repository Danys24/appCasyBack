import {crearCaso,casosByIdSet,
        casoById,actualizarCasoById, 
        eliminarCasoById, ordenarCasoByIdSet, 
        casoConCiclo, 
        casosByIdSetPagina, 
        casosByIdSetTotal,
        casoConCicloActualizar,
        casoConCicloEliminar} from '../models/casosModel.js';

const TABLAS = 'caso_prueba';
const TABLAR = "relacion_caso_ciclo";

export const crearCasoPrueba = async(req, res) => {
    try{
        const { idSet, nombre, descripcion, estado, responsable } = req.body;

        if (!idSet || !nombre || !descripcion || !estado || !responsable) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const caso = await crearCaso(TABLAS, idSet, nombre, descripcion, estado, responsable);

        if (!caso) {
            //return res.status(401).json({ error: 'El set no se ha creado' });
        }

        res.status(201).json({mensaje: 'caso de prueba creado', caso: caso});

    }catch (error){
        console.error('Error al crear el caso:', error);
        res.status(500).json({ error: 'Error al crear un caso de prueba' });
    }
}

export const obtenerCasosByIdSet = async(req, res) => {
    try{
        const casos = await casosByIdSet(TABLAS, req.params.id);
        res.json(casos);
    }catch{
        res.status(500).json({ error: 'Error al obtener los casos de prueba' });
    }
}

export const obtenerUnCaso = async(req, res) => {
    try{
        const caso = await casoById(TABLAS, req.params.id);
        caso ? res.json(caso) : res.status(404).send('Caso no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al obtener el caso' });
    }
}

export const obtenerCasosByIdSetPaginas = async(req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const casos = await casosByIdSetPagina(TABLAS, req.params.id, limit, offset);

        const totalCaso = await casosByIdSetTotal(TABLAS, req.params.id);

        const total = totalCaso[0].total;


        res.json({
            data:casos,
            total,
            page,
            limit
        });

    }catch(error){
        console.error("error al obtener los casos", error);
        res.status(500).json({ error: 'Error al obtener los casos' });
    }
}

export const actualizarUnCaso = async(req, res) => {
    try{
        const { nombre, descripcion, estado, responsable } = req.body;

        if (!nombre || !descripcion || !estado || !responsable) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const actualizar = await actualizarCasoById(TABLAS, nombre, descripcion, estado, responsable, req.params.id);

        actualizar ? res.status(200).json({mensaje:'El set se ha actualizado exitosamente', caso: actualizar}) : res.status(404).send('Caso no encontrado');

    }catch(error){
        res.status(500).json({ error: 'Error al actualizar el caso de prueba' });
    }
}


export const eliminarUnCaso = async(req, res) => {
    try{

        const caso = await eliminarCasoById(TABLAS,req.params.id);

        caso ? res.status(200).json({mensaje:'El caso se ha eliminado exitosamente'}):res.status(404).send('caso no encontrado');
    }catch(error){
        console.error("Error al eliminar el caso", error)
        res.status(500).json({ error: 'Error al eliminar el caso de prueba' });
    }
}

export const ordenarCasos = async(req, res) => {
    try{

        const caso = await ordenarCasoByIdSet(TABLAS,req.params.id);

        caso ? res.status(200).json({mensaje:'Los casos se han ordenado correctamente'}):res.status(404).send('casos no encontrados');
    }catch(error){
        console.error("Error al ordenar los casos", error)
        res.status(500).json({ error: 'Error al ordenar los casos de prueba' });
    }
}

export const vincularCasoConCiclo = async(req, res) => {
    try{
        const { idCaso, idCiclo, estado } = req.body;

        if (!idCaso || !idCiclo || !estado) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const casoCiclo = await casoConCiclo(TABLAR,idCaso,estado);

        res.status(201).json({mensaje: 'Caso de prueba vinculado con exito', caso: casoCiclo});

    }catch{
        res.status(500).json({ error: 'Error al vincular el caso de prueba al ciclo' });
    }
}

export const vincularCasoConCicloActualizar = async(req, res) => {
    try{
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const casoCiclo = await casoConCicloActualizar(TABLAR,estado, req.params.idCaso, req.params.idCiclo);

        res.status(200).json({mensaje: 'vinculo del Caso de prueba actualizado con exito', caso: casoCiclo});

    }catch{
        res.status(500).json({ error: 'Error al vincular el caso de prueba al ciclo' });
    }
}

export const vincularCasoConCicloEliminar = async(req, res) => {
    try{
        const casoCiclo = await casoConCicloEliminar(TABLAR, req.params.idCaso, req.params.idCiclo);

        res.status(200).json({mensaje: 'vinculo del Caso de prueba eliminado con exito'});

    }catch{
        res.status(500).json({ error: 'Error al eliminar el vinculo del caso de prueba al ciclo' });
    }
}