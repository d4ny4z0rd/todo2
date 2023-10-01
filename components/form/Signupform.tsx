"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";
import axios from "axios";
import Router from "next/navigation";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";



const formSchema = z.object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message : 'Passwords do not match'
    });

const Signupform = () => {

  const { toast } = useToast();

    const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post('/api/user', values);
      if (response.status >= 200 && response.status < 300) {
          router.push('/signin');
      }      
      else {
          toast({
            title: "Error",
            description: "Oops something went wrong",
          });
      }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md p-8 rounded-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-14">
          <h1 className="text-4xl">Todoiee</h1>
        </div>
        <p className="text-xl mb-6">Create your account</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
                      {...field}
                      className="w-full text-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                          <Input
                              type="email"
                      placeholder="name@example.com"
                      {...field}
                      className="w-full text-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Password</FormLabel>
                  <FormControl>
                          <Input
                              type="password"
                      placeholder="password"
                      {...field}
                      className="w-full text-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Confirm Password</FormLabel>
                  <FormControl>
                          <Input
                              type="password"
                      placeholder="confirm password"
                      {...field}
                      className="w-full text-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-md h-11">
              Create your account
            </Button>
          </form>
        </Form>
        <div className="mt-8 flex justify-center">
          <p>
            Already have an account?{" "}
            <Link href={"/signin"} className="hover:underline hover:text-blue-500">
               Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signupform;
