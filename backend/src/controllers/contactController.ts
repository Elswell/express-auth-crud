import { Request, Response } from "express";
import {
  contactSchema,
  emailSchema,
  updateSchema,
} from "../validators/contact";
import { db } from "../lib/db";

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await db.contact.findMany({});
    res.status(200).json({ data: contacts });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Error while getting all contacts", error: error });
  }
};

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber } = contactSchema.parse(req.body);

    await db.contact.create({
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.status(200).json({ message: "User created" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while creating user", error: error });
  }
};

export const getContact = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const contact = await db.contact.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json({ data: contact });
  } catch (error) {
    res.status(400).json({
      message: `Couldn't find user with id: ${req.params.id}`,
      error: error,
    });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { id, name, email, phoneNumber } = updateSchema.parse(req.body);

    const contact = await db.contact.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.status(200).json({
      msg: `Contact with id: ${id} and email: ${email} was updated`,
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      message: `Couldn't update user with id: ${req.params.id}`,
      error: error,
    });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { email } = emailSchema.parse(req.body);

    await db.contact.deleteMany({
      where: {
        email,
      },
    });

    res.status(200).json({ msg: `Contact with email: ${email} was deleted!` });
  } catch (error) {
    res.status(400).json({
      message: `Error while deleting user with email: ${req.params.email}`,
      error: error,
    });
  }
};
