import express from "express";
import {
    getTinjauan,
    getTinjauanById,
    createTinjauan,
    updateTinjauan,
    deleteTinjauan
} from "../controllers/TinjuanController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/tinjauan', getTinjauan);
router.get('/tinjauan/:id', getTinjauanById);
router.post('/tinjauan', createTinjauan);
router.patch('/tinjauan/:id', verifyUser, adminOnly, updateTinjauan);
router.delete('/tinjauan/:id', verifyUser, adminOnly, deleteTinjauan);


export default router;