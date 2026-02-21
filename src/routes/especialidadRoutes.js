import express from 'express';
import checkAuth from '../middleware/checkAuth.js'

import{
    agregarEspecialidad,
    obtenerEspecialidad,
    obtenerEspecialidades,
    actualizarEspecialidad,
    eliminarEspecialidad
} from '../controllers/especialidadController.js';

const router = express.Router()

router
    .route("/")
    .post(checkAuth, agregarEspecialidad)
    .get(checkAuth, obtenerEspecialidades);

router
    .route("/:id")
    .get(checkAuth, obtenerEspecialidad)
    .put(checkAuth, actualizarEspecialidad)
    .delete(checkAuth, eliminarEspecialidad)

export default router;
