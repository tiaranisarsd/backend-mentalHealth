import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
import TinjauanRoute from "./routes/TinjauanRoute.js";
import UsersRoute from "./routes/UsersRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import EdukasiRoute from "./routes/EdukasiRoute.js";
import JanjiRoute from "./routes/JanjiRoute.js";
import serverless from 'serverless-http';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Backend Berjalan!');
});

// Ambil URL Netlify dari environment variable jika tersedia
const netlifyUrl = process.env.NETLIFY_URL;

// Konfigurasi CORS yang lebih baik - HANDLED IN EXPRESS
const corsOptions = {
    origin: netlifyUrl ? [netlifyUrl, 'http://localhost:3000', 'https://mental-health1.netlify.app'] : 'http://localhost:3000', // Allow both
    credentials: true,
};
app.use(cors(corsOptions)); // **Apply CORS middleware here!**
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



//  Netlify export (if needed)
export default app;
if (process.env.NETLIFY) {
  module.exports.handler = serverless(app);
} 
