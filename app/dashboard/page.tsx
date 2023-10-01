import AddTodo from '@/components/AddTodo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

    const session = await getServerSession(authOptions);
    

    return (
      <div className="mt-32">
        {" "}
        {/* Adjust margin-top value */}
        {session?.user ? (
          <AddTodo />
        ) : (
          <div className="text-center">Login to see this dashboard</div>
        )}
      </div>
    );


}

export default page