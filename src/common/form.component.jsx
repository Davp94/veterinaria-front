'use client'
import React, { useEffect, useState } from 'react'; 
import { Button } from 'primereact/button';
import BasicDemo from './demo.component';
import { InputText } from 'primereact/inputtext';

export default function FormComponent({titleButton, severityButton}) {
    let greetingLet = 'Hola Mundo';
    const [titleForm, setTitleForm] = useState('NUEVO FORMULARIO');

    useEffect(() => {
        setTitleForm('NUEVO FORM UPDATED')
    },[])

    return (
        <div className="card flex justify-content-center">
            <h1>{titleForm}</h1>
            <InputText placeholder='form field'/>
            <BasicDemo title={titleButton} severity={severityButton}/>
        </div>
    )
}
