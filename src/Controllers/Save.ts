import { Request, Response } from "express";
import db from "../lib/db";

export const save = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
    const existingLike = await db.saved.findFirst({
      where: { userId, postId },
    });

    if (existingLike) {
      await db.saved.delete({
        where: { id: existingLike.id },
      });
    } else {
      await db.saved.create({
        data: { userId, postId },
      });
    }

    res.status(200).json("success");
  } catch (error) {
    res.status(500).json("Internal server error!");
  }
};

export const getSavedPosts = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const posts = await db.saved.findMany({
      where: { userId },
      include: {
        post: { include: { like: true, user: true } },
        user: {
          select: { username: true, avatar: true, gmail: true, id: true },
        },
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("Internal server error!");
  }
};
