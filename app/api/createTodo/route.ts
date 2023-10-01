import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Parse the request body as JSON
    const body = JSON.parse(req.body);

    const { title, userId } = body;

    const newTodo = await db.todo.create({
      data: {
        title: title,
        completed: false,
        userId: userId,
      },
    });

    return res.status(200).json({ message: "Todo created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
