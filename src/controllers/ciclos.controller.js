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