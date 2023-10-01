import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { signOut } from 'next-auth/react';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {

  const session = await getServerSession(authOptions);

  return (
    <div className="fixed w-full z-10 top-0 py-2">
      <div className="container flex items-center justify-between  py-2">
        <div>
          <Link href={"/"} className="text-2xl">
            Todoiee
          </Link>
        </div>
        {session?.user ? (
          <UserAccountNav />
        ) : (
            <div>
              <Link
                href="/signin"
                className="text-lg mx-8 bg-none hover:underline"
              >
                Sign in
              </Link>
              <Link href="/signup" className="text-lg hover:underline">
                Sign up
              </Link>
              </div>
          )}
      </div>
    </div>
  );
}

export default Navbar