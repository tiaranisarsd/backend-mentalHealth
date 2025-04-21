import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getJanji = async (req, res) =>{
    try {
        const response = await prisma.janji.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getJanjiById = async (req, res) =>{
    try {
        const response = await prisma.janji.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        if(!response) return res.status(404).json({msg: "Data tidak ditemukan"});
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createJanji = async (req, res) =>{
    const {nama, email, no_telp, domisili, kategori_pengguna, tanggal, jenis_konsultasi, alasan_konsultasi} = req.body;
    try {
        await prisma.janji.create({
            data:{
                nama: nama,
                email: email,
                no_telp: no_telp,
                domisili: domisili,
                kategori_pengguna: kategori_pengguna,
                tanggal: tanggal,
                jenis_konsultasi:jenis_konsultasi,
                alasan_konsultasi: alasan_konsultasi
            }
        });
        res.status(201).json({ msg: "Janji Created Successfully" });
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateJanji = async (req, res) =>{
    const response = await prisma.janji.findUnique({
        where:{
            id: Number(req.params.id)
        }
    });
    if(!response) return res.status(404).json({msg: "Janji tidak ditemukan"});
    const {nama, email, no_telp, domisili, kategori_pengguna, tanggal, jenis_konsultasi, alasan_konsultasi} = req.body;
    try {
        await prisma.janji.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                nama: nama,
                email: email,
                no_telp: no_telp,
                domisili: domisili,
                kategori_pengguna: kategori_pengguna,
                tanggal: tanggal,
                jenis_konsultasi:jenis_konsultasi,
                alasan_konsultasi: alasan_konsultasi
            }
        });
        res.status(200).json({msg: "Janji updated successfully"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteJanji = async (req, res) =>{
    const response = await prisma.janji.findUnique({
        where:{
            id: Number(req.params.id)
        }
    });
    if(!response) return res.status(404).json({msg: "Janji tidak ditemukan"});
    try {
        await prisma.janji.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(201).json({msg: "Janji deleted successfully"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}