import React from 'react'; 
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { string } from 'prop-types';

export default function BasicDemo({title, severity}) {
    const greeting = 'Hola Mundo';
    let greetingLet = 'Hola Mundo';
    return (
        <div className="card flex justify-content-center">
            <Tooltip title={title}/>
            <Button label={title} icon="pi pi-check" severity={severity} />
        </div>
    )
}

BasicDemo.propTypes = {
    title: [string, required, match(["sucess", "warning", "info", "danger"])],
    severity: string
}