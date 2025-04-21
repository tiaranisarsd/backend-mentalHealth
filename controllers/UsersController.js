import {PrismaClient} from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export const getUsers = async (req, res) =>{
    try {
        const response = await prisma.users.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUsersById = async (req, res) =>{
    try {
        const response = await prisma.users.findUnique({
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

export const createUsers = async (req, res) =>{
    const {nama, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const hashPassword = await argon2.hash(password);
    try {
        await prisma.users.create({
            data:{
                nama: nama,
                email: email,
                password: hashPassword,
                role: role
            }
        });
        res.status(201).json({ msg: "Users Created Successfully" });
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUsers = async (req, res) => {
    const response = await prisma.users.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    if (!response) return res.status(404).json({ msg: "User not found" });

    const { nama, email, password, confPassword, role } = req.body;
    let hashPassword = response.password; 

    if (password && password !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }

    if (password) {
        hashPassword = await argon2.hash(password);
    }

    try {
        await prisma.users.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                nama,
                email,
                password: hashPassword,
                role
            }
        });
        res.status(200).json({ msg: "Users updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deleteUsers = async (req, res) =>{
    const response = await prisma.users.findUnique({
        where:{
            id: Number(req.params.id)
        }
    });
    if(!response) return res.status(404).json({msg: "User not found"});
    try {
        await prisma.users.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(201).json({msg: "Users deleted successfully"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
