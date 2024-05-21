'use client'
import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/state-management/react-context/user.context";

export default function MascotasIndex() {
  const params = useSearchParams();
  const [count, setCount] = useState(0);
  const { user, rol } = useContext(UserContext);
  useEffect(()=>{
  }, [count])

  return (
    <>
     <div className="w-full p-0 m-0">
      <p>{JSON.stringify(user)}</p>
      <p>{JSON.stringify(rol)}</p>
    </div>
    </>
  );
}
