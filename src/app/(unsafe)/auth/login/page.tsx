/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { authLogin } from '../../../../services/auth.service';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    const loginData = {
        username: username,
        password: password
    }
    console.log("🚀 ~ login ~ loginData:", loginData)
    authLogin(loginData).then(token => {
      console.log("🚀 ~ authLogin ~ token:", token)
    });
  } 
  return (
    <div className='flex align-items-center justify-content-center h-screen'>
      <div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
        <div className='text-center mb-5'>
          <img
            src='/demo/images/blocks/logos/hyper.svg'
            alt='hyper'
            height={50}
            className='mb-3'
          />
          <div className='text-900 text-3xl font-medium mb-3'>Ingresar</div>
        </div>

        <div>
          <label
            htmlFor='username'
            className='block text-900 font-medium mb-2'
          >
            Usuario
          </label>
          <InputText
            id='username'
            type='text'
            placeholder='Nombre de usuario'
            className='w-full mb-3'
            onChange={(e)=>setUsername(e.target.value)}
          />

          <label
            htmlFor='password'
            className='block text-900 font-medium mb-2'
          >
            Contraseña
          </label>
          <InputText
            id='password'
            type='password'
            placeholder='Contraseña'
            className='w-full mb-3'
            onChange={(e)=>setPassword(e.target.value)}
          />


          <Button
            label='Ingresar'
            icon='pi pi-user'
            className='w-full'
            onClick={()=> login()}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
