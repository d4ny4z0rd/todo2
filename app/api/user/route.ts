import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";


const userSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });



export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        //check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: 'User with this email already exists' }, { status: 409 });
        }

        //check if user exists by username
        const existingUserByUsername = await db.user.findUnique({
          where: { username : username },
        });
        if (existingUserByUsername) {
          return NextResponse.json(
            { user: null, message: "User with this username already exists" },
            { status: 409 }
          );
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password : hashedPassword
            }
        });

        const { password : newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: 'User created successfully' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}