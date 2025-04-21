import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || "your-secret-key"; // Pastikan JWT_SECRET ada di environment

export const Login = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const match = await argon2.verify(user.password, req.body.password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, nama: user.nama, email: user.email, role: user.role },  // Payload JWT
      secretKey,
      { expiresIn: "1h" } // Konfigurasi expired
    );

    const { id, nama, email, role } = user;
    res.status(200).json({ id, nama, email, role, token }); // Kirim token ke client
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Login failed", error });
  }
};

export const Me = async (req, res) => {
  try {
    // Ambil user ID dari token JWT yang sudah diverifikasi oleh middleware
    const userId = req.user.userId; 

    const response = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
      },
    });

    if (!response) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(response);
  } catch (error) {
    console.error("Me error:", error);
    res.status(500).json({ msg: "Failed to retrieve user data", error });
  }
};

export const logOut = (req, res) => {
  //  JWT tidak menyimpan informasi sesi di server, jadi tidak ada yang perlu di-destroy.
  //  Yang perlu dilakukan adalah memberitahu client untuk menghapus token dari local storage atau cookie.
  res.status(200).json({ msg: "Logout successful" });
};
