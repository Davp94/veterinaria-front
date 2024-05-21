// import { PrimeReactProvider } from 'primereact/api';
'use client'
import BasicDemo from "@/common/demo.component";
import FormComponent from "@/common/form.component";
import ProductsDemo from "@/feature/rol/components/rol.table";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
export default function MyApp() {
  const router = useRouter();
  const condition = true;
  return (
    <>
    <div className="w-full p-0 m-0">
      <ProductsDemo />
    </div>
 
    </>
  );
}
