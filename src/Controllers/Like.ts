import { Request, Response } from "express";
import db from "../lib/db";

export const like = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
    const existingLike = await db.like.findFirst({
      where: { userId, postId },
    });

    if (existingLike) {
      await db.like.delete({
        where: { id: existingLike.id },
      });

      await db.post.update({
        where: { id: postId },
        data: { likeQuantity: { decrement: 1 } },
      });
    } else {
      await db.like.create({
        data: { userId, postId },
      });

      await db.post.update({
        where: { id: postId },
        data: { likeQuantity: { increment: 1 } },
      });
    }

    res.status(200).json("success");
  } catch (error) {
    res.status(500).json("Internal server error!");
  }
};

export const getLikedPosts = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const posts = await db.like.findMany({
      where: { userId },
      include: {
        post: { include: { saved: true, user: true } },
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
