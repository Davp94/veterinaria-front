'use client';
// import { PrimeReactProvider } from 'primereact/api';
'use client'
import BasicDemo from "@/common/demo.component";
import FormComponent from "@/common/form.component";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
export default function MyApp() {
  const router = useRouter();
  const condition = true;
  return (
    <>
      <h1>HOLA MUNDO</h1>
      <div className="card flex justify-content-center">
        <Button label="Check" icon="pi pi-check" />
      </div>
      <BasicDemo title={"Crear"} severity={"danger"} />

      {/* CONDITIONAL RENDERING */}
      {condition && (
        <>
          <BasicDemo title={"Compartir"} severity={"sucess"} />
          <BasicDemo title={"Eliminar"} severity={"warning"} />
        </>
      )}
      {condition ? (
        <div>
          <BasicDemo title={"CONDITION TRUE"} severity={"sucess"} />
          <BasicDemo title={"CONDITION TRUE2"} severity={"warning"} />
        </div>
      ) : (
        <div>
          <BasicDemo title={"CONDITION False"} severity={"sucess"} />
          <BasicDemo title={"CONDITION False2"} severity={"warning"} />
        </div>
      )}
      <h1>PROPS HELL</h1>
      <FormComponent titleButton={"Formulario component"} severityButton={"danger"}/>
      <Button label="TO MAsCOTAS" onClick={()=>router.push(`/mascotas?condition=${condition}`)}/>
    </>
  );
}
