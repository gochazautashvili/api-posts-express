import { Request, Response } from "express";
import db from "../lib/db";

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const posts = await db.post.findMany({
      include: {
        user: {
          select: { username: true, avatar: true, gmail: true, id: true },
        },
        like: { select: { userId: true } },
        saved: { select: { userId: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { postId } = req.params;

  try {
    const post = await db.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: { username: true, avatar: true, gmail: true, id: true },
        },
        like: { select: { userId: true } },
        saved: { select: { userId: true } },
      },
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const getFilteredPosts = async (req: Request, res: Response) => {
  const { q } = req.query;

  try {
    const posts = await db.post.findMany({
      where: {
        body: { contains: q?.toString() },
      },
      include: {
        user: {
          select: { username: true, avatar: true, gmail: true, id: true },
        },
        like: { select: { userId: true } },
        saved: { select: { userId: true } },
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const posts = await db.post.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: { username: true, avatar: true, gmail: true, id: true },
        },
        like: { select: { userId: true } },
        saved: { select: { userId: true } },
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { image, body, userId } = req.body;

  try {
    const post = await db.post.create({
      data: { image, body, userId },
      include: {
        user: { select: { username: true, avatar: true, gmail: true } },
        like: { select: { userId: true } },
        saved: { select: { userId: true } },
      },
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
    await db.post.delete({
      where: { id: postId, userId },
    });

    res.status(200).json("Post successfully deleted");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const updatePostById = async (req: Request, res: Response) => {
  const { image, body, userId } = req.body;
  const { postId } = req.params;

  try {
    await db.post.update({
      where: { id: postId, userId },
      data: { image, body },
    });

    res.status(200).json("Poet successfully updated");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
