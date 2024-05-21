// import { PrimeReactProvider } from 'primereact/api';
"use client";
import BasicDemo from "@/common/demo.component";
import FormComponent from "@/common/form.component";
import ProductsDemo from "@/feature/rol/components/rol.table";
import { UserContext } from "@/state-management/react-context/user.context";
import useUserStore from "@/state-management/zustand/user.store";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useContext } from "react";
export default function StateManagement() {
  const { user, rol, clearUser } = useContext(UserContext);
  const { user: userZustand, rol: rolZustand, clearUser: clearUserZ } = useUserStore();
  return (
    <>
      <div className="w-full p-0 m-0">
        <h1>FROM REACT CONTEXT</h1>
        <p>{JSON.stringify(user)}</p>
        <p>{JSON.stringify(rol)}</p>
        <Button label="Clear state user" onClick={()=>clearUser()}/>
      </div>
      <div className="w-full p-0 m-0">
        <h1>FROM ZUSTAND</h1>
        <p>{JSON.stringify(userZustand)}</p>
        <p>{JSON.stringify(rolZustand)}</p>
        <Button label="Clear state user zustand" onClick={()=>clearUserZ()}/>
      </div>
    </>
  );
}
