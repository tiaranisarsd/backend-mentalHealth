import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import pgSession from 'connect-pg-simple'; // Tidak digunakan, jadi saya komentari
import { PrismaClient } from '@prisma/client';
import TinjauanRoute from "./routes/TinjauanRoute.js";
import UsersRoute from "./routes/UsersRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import EdukasiRoute from "./routes/EdukasiRoute.js";
import JanjiRoute from "./routes/JanjiRoute.js";

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Backend Berjalan!');
  });

// Konfigurasi CORS yang lebih baik
const corsOptions = {
    origin: 3000, // Ganti dengan origin frontend Anda
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Rute-rute aplikasi
app.use(TinjauanRoute);
app.use(UsersRoute);
app.use(AuthRoute);
app.use(EdukasiRoute);
app.use(JanjiRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});

export default app; // Ekspor aplikasi untuk digunakan di Vercel atau tempat lain
