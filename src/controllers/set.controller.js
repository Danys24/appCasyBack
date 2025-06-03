import {todosSets, crearSet, actualizarSet, eliminarSet} from '../models/setModel.js';

const TABLAS = 'set_prueba';
const TABLAR = 'usuarios_set';

export const crearSets = async(req, res) => {
    try{
        const { nombre, descripcion, estado } = req.body;
        const idUsuario = req.usuarioId;

        if (!nombre || !descripcion || !estado) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const sets = await crearSet(TABLAS, TABLAR, nombre, descripcion, estado, idUsuario);

        if (!sets) {
            //return res.status(401).json({ error: 'El set no se ha creado' });
        }

        res.status(201).json({mensaje: 'Set de prueba creado', nombre: sets});

    }catch (error){
        console.error('Error al crear el set:', error);
        res.status(500).json({ error: 'Error al crear un set de prueba' });
    }
}

export const obtenerTodosSets = async(req, res) => {
    try{
        const sets = await todosSets(TABLAS);
        res.json(sets)
    }catch{
        res.status(500).json({ error: 'Error al obtener los sets de prueba' });
    }
}

export const obtenerUnSet = async(req, res) => {
    try{
        const sets = await todosSets(TABLAS);
        const set = sets.find(u => u.id === parseInt(req.params.id));
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

        const sets = await todosSets(TABLAS);
        const set = sets.find(u => u.id === parseInt(req.params.id));
        const actualizar = await actualizarSet(TABLAS, nombre, descripcion, estado,set?.id);

        set ? res.status(200).json({mensaje:'El set se ha actualizado exitosamente', set: actualizar}) : res.status(404).send('Set no encontrado');

    }catch(error){
        res.status(500).json({ error: 'Error al actualizar el set de prueba' });
    }
}

export const eliminarUnSet = async(req, res) => {
    try{
        const sets = await todosSets(TABLAS);
        const set = sets.find(u => u.id === parseInt(req.params.id));
        const actualizar = await eliminarSet(TABLAS,set?.id);

        set ? res.status(200).json({mensaje:'El set se ha eliminado exitosamente'}):res.status(404).send('Set no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al eliminar el set de prueba' });
    }
}