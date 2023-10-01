'use client'
import React, { useState } from 'react'
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const AddTodo = () => {

    const {data : session} = useSession();

    const [todoText, setTodoText] = useState<string>('');

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    };

    const handleAddTodo = async () => {
      try {
            const response = await axios.post('/api/createTodo', {
              todoText: todoText,
              userId : session?.user?.id,
            });

            console.log('Todo created : ', response.data);
            setTodoText('');
        } catch (error) {
            console.log('Error creating todo : ', error);
        }
    }

    return (
        <div>
          <Card className="mx-auto max-w-md p-4 rounded-lg shadow-md text-center text-xl">
            <div className="my-3">
              <h1 className="text-2xl">
                Add your todos, {session?.user.username}
              </h1>
            </div>
            <Input className="mt-10 h-11 text-md" value={todoText} onChange={handleInputChange}></Input>
            <Button className="my-4 w-full h-11 text-3xl" onClick={handleAddTodo}>+</Button>
          </Card>
        </div>
    );
}

export default AddTodo