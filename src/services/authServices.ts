const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import dotenv from "dotenv";
import db from "../db/connection";
import { Request, Response, NextFunction } from "express";
import { User } from "../types";

dotenv.config();
const secretKey = process.env.JWT_SECRET;
const tokenExpirationTime = process.env.JWT_EXPIRATION_TIME;

export const register = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const [existingUser]: [User[], any] = await db.query<[User[], any]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ]);
  } catch (error: any) {
    console.error("Error in register:", error);
    throw new Error(`Error in register: ${error.message}`);
  }
};
export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const [rows]: [User[], any] = await db.query<[User[], any]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const user = rows.length > 0 ? rows[0] : null;

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
      expiresIn: tokenExpirationTime,
    });
    console.log(tokenExpirationTime);

    return token;
  } catch (error: any) {
    console.error("Error in login:", error);
    throw new Error(`Error in login: ${error.message}`);
  }
};
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(
    token,
    secretKey,
    (err: any, user: { id: number; email: string }) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      req.user = user;
      next();
    }
  );
};
