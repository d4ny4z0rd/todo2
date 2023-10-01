'use client'


import React from 'react'
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

const UserAccountNav = () => {
  return (
    <div>
          <Button className="text-md" onClick={() => signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/signin`
      })}>
        Sign out
      </Button>
    </div>
  );
}

export default UserAccountNav