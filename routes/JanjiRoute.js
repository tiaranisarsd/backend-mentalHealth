import express from "express";
import {
    getJanji,
    getJanjiById,
    createJanji,
    updateJanji,
    deleteJanji
} from "../controllers/JanjiController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/janji', getJanji);
router.get('/janji/:id', getJanjiById);
router.post('/janji', createJanji);
router.patch('/janji/:id', verifyUser, adminOnly, updateJanji);
router.delete('/janji/:id', verifyUser, adminOnly, deleteJanji);


export default router;