import { Request, Response } from "express";
import db from "../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Sign_in = async (req: Request, res: Response) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(404).json("All filed is required");
  }

  try {
    const user = await db.user.findUnique({
      where: { gmail },
    });

    if (!user) {
      return res.status(404).json("User is not exist, try again!");
    }

    const comparedPassword = await bcrypt.compare(password, user?.password);

    if (!comparedPassword) {
      return res.status(404).json("User is not exist, try again!");
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET as string);

    return res.status(200).json(token);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const Sign_up = async (req: Request, res: Response) => {
  const { username, gmail, avatar, password } = req.body;

  if (!username || !gmail || !avatar || !password) {
    return res.status(404).json("All filed is required");
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { gmail },
    });

    if (existingUser) {
      return res.status(404).json("User already exist!");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        gmail,
        avatar,
        username,
        password: hashPassword,
      },
    });

    return res.status(200).json("Sign-up successfully!");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { username: true, avatar: true, id: true, gmail: true },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      select: { username: true, avatar: true, gmail: true, id: true },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { username: true, avatar: true, gmail: true, id: true },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
