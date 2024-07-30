import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(404).json("Authorization header not found");
  }

  const userToken = authorization.split(" ")[1];

  if (!userToken) {
    return res.status(404).json("Token not found");
  }

  try {
    const token = jwt.verify(userToken, process.env.JWT_SECRET as string);

    if (!token) {
      return res.status(404).json("Token not found, you ar not authorized");
    }

    req.body.userId = token;
    next();
  } catch (error) {
    res.status(500).json("Internal server error in auth!");
  }
};
