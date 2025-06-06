import {setsByIdProyecto, setsById, crearSet, actualizarSet, eliminarSet, setConCiclo} from '../models/setModel.js';

const TABLAS = 'set_prueba';
const TABLAR = 'relacion_set_ciclo';

export const crearSets = async(req, res) => {
    try{
        const { idProyecto, nombre, descripcion, estado } = req.body;
        const idUsuario = req.usuarioId;

        if (!idProyecto, !nombre || !descripcion || !estado) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const sets = await crearSet(TABLAS, idProyecto, nombre, descripcion, estado);

        if (!sets) {
            //return res.status(401).json({ error: 'El set no se ha creado' });
        }

        res.status(201).json({mensaje: 'Set de prueba creado', nombre: sets});

    }catch (error){
        console.error('Error al crear el set:', error);
        res.status(500).json({ error: 'Error al crear un set de prueba' });
    }
}

export const obtenerSetsByIdProyecto = async(req, res) => {
    try{
        const sets = await setsByIdProyecto(TABLAS, req.params.id);
        res.json(sets)
    }catch{
        res.status(500).json({ error: 'Error al obtener los sets de prueba' });
    }
}

export const obtenerUnSet = async(req, res) => {
    try{
        const set = await setsById(TABLAS,req.params.id);
        set ? res.json(set) : res.status(404).send('Set no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al obtener el set' });
    }
}

export const actualizarUnSet = async(req, res) => {
    try{
        const { nombre, descripcion, estado } = req.body;

        if (!nombre || !descripcion || !estado) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const set = await actualizarSet(TABLAS, nombre, descripcion, estado, req.params.id);

        set ? res.status(200).json({mensaje:'El set se ha actualizado exitosamente', set: set}) : res.status(404).send('Set no encontrado');

    }catch(error){
        console.error("Error al actualizar", error)
        res.status(500).json({ error: 'Error al actualizar el set de prueba' });
    }
}

export const eliminarUnSet = async(req, res) => {
    try{
        const set = await eliminarSet(TABLAS,req.params.id);

        set ? res.status(200).json({mensaje:'El set se ha eliminado exitosamente'}):res.status(404).send('Set no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al eliminar el set de prueba' });
    }
}

export const vincularSetConCiclo = async(req, res) => {
    try{
        const { idSet, idCiclo } = req.body;

        if (!idSet || !idCiclo) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const setCiclo = await setConCiclo(TABLAR,idSet,idCiclo);

        res.status(201).json({mensaje: 'Set de prueba vinculado con exito', set: setCiclo});

    }catch{
        res.status(500).json({ error: 'Error al vincular el set de prueba al ciclo' });
    }
}