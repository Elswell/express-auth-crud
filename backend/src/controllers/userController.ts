import { Request, Response } from "express";
import { currentSchema, loginSchema, registerSchema } from "../validators/user";
import { db } from "../lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = 1;

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = await registerSchema.parse(req.body);

    const userExists = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      res.status(400).json("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name: username,
      },
    });

    res.status(201).send({
      msg: "User registerd",
      data: {
        _id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json("Invalid user data");
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.name,
            email: user.email,
            id: user.id,
          },
        },
        process.env.SECRET_KEY!,
        { expiresIn: "60m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(400).json({ error: "Invalid user input" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid user input" });
  }
};
export const currentUser = async (req: Request, res: Response) => {
  try {
    const { id } = currentSchema.parse(req.body);
    console.log(id);

    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ msg: "User not found", error: error });
  }
};
