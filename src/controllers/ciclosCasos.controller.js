import {crearCicloCasos, 
        ciclosCasosByIdProyecto, 
        ciclosCasosById, 
        actualizarCiclosCasosById, 
        eliminarCiclosCasosById, 
        ciclosCasosByIdCaso,
        ciclosByIdProyectoPagina,
        ciclosByIdProyectoTotal,
        ciclosCasosByIdCasoNoRelacionados} from '../models/cicloCasosModel.js';

const TABLAS = 'ciclo_caso';
const TABLAP = 'proyectos';
const TABLAR = 'relacion_caso_ciclo';

export const crearCiclosCasos = async(req, res) => {
    try{
        const { idProyecto, nombre} = req.body;

        if (!idProyecto || !nombre) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const ciclo = await crearCicloCasos(TABLAS, idProyecto, nombre);

        if (!ciclo) {
            //return res.status(401).json({ error: 'El set no se ha creado' });
        }

        res.status(201).json({mensaje: 'ciclo creado', cliclo: ciclo});

    }catch (error){
        console.error('Error al crear el ciclo:', error);
        res.status(500).json({ error: 'Error al crear el ciclo' });
    }
}

export const obtenerCiclosCasosByIdProyecto = async(req, res) => {

    try{
        const ciclo = await ciclosCasosByIdProyecto(TABLAS, req.params.id);

        if (ciclo.length === 0) {
            return res.status(404).json({ error: 'Ciclos no encontrados' });
        }

        res.json(ciclo);

    }catch (error){
        console.error('Error al obtener los ciclos:', error);
        res.status(500).json({ error: 'Error al obtener los ciclos' });
    }
}

export const obtenerCiclosCasosByIdCaso = async(req, res) => {

    try{
        const ciclo = await ciclosCasosByIdCaso(TABLAS,TABLAR,req.params.id);

        if (ciclo.length === 0) {
            return res.status(404).json({ error: 'Ciclos no encontrados' });
        }

        res.json(ciclo);

    }catch (error){
        console.error('Error al obtener los ciclos:', error);
        res.status(500).json({ error: 'Error al obtener los ciclos' });
    }
}

export const obtenerCiclosCasosByIdCasoNoRelacionados = async(req, res) => {

    try{
        const ciclo = await ciclosCasosByIdCasoNoRelacionados(TABLAS,TABLAR,req.params.id,req.params.idProyecto);

        if (ciclo.length === 0) {
            return res.status(404).json({ error: 'Ciclos no encontrados' });
        }

        res.json(ciclo);

    }catch (error){
        console.error('Error al obtener los ciclos:', error);
        res.status(500).json({ error: 'Error al obtener los ciclos' });
    }
}

export const obtenerCiclosByIdProyectoPaginas = async(req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const ciclos = await ciclosByIdProyectoPagina(TABLAS, req.params.id, limit, offset);

        const totalCiclos = await ciclosByIdProyectoTotal(TABLAS, req.params.id);

        const total = totalCiclos[0].total;


        res.json({
            data:ciclos,
            total,
            page,
            limit
        });

    }catch(error){
        console.error("error al obtener los ciclos", error);
        res.status(500).json({ error: 'Error al obtener los ciclos' });
    }
}

export const obtenerCiclosCasosById = async(req, res) => {

    try{
        const ciclo = await ciclosCasosById(TABLAS, req.params.id);

        if (ciclo.length === 0) {
            return res.status(404).json({ error: 'Ciclo no encontrado' });
        }

        res.json(ciclo);

    }catch (error){
        console.error('Error al obtener el ciclo:', error);
        res.status(500).json({ error: 'Error al obtener el ciclo' });
    }
}

export const editarCiclosCasosById = async(req, res) => {

    try{

        const {nombre} = req.body;

        if (!nombre) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const ciclo = await actualizarCiclosCasosById(TABLAS, nombre, req.params.id);

        ciclo ? res.status(200).json({mensaje:'El ciclo se ha actualizado exitosamente', ciclo: ciclo}) : res.status(404).send('Ciclo no encontrado');

    }catch (error){
        console.error('Error al actualizar el ciclo:', error);
        res.status(500).json({ error: 'Error al actualizar el ciclo' });
    }
}

export const borrarCiclosCasosById = async(req, res) => {

    try{
        const ciclo = await eliminarCiclosCasosById(TABLAS, req.params.id);

        ciclo ? res.status(200).json({mensaje:'El ciclo se ha eliminado exitosamente'}) : res.status(404).send('Ciclo no encontrado');

    }catch (error){
        console.error('Error al eliminar el ciclo:', error);
        res.status(500).json({ error: 'Error al eliminar el ciclo' });
    }
}