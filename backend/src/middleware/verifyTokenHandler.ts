import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedUser {
  user: {
    username: string;
    email: string;
    id: string;
  };
  iat: number;
  exp: number;
}

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  let authHeader =
    req.headers.authorization || (req.headers.Authorization as string);

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "User not authorized" });
      }
      const decodedUser = decoded as DecodedUser;
      req.user = decodedUser.user;
      next();
    });

    if (!token) {
      res.status(401).json({ error: "User not authorized" });
    }
  }
};
