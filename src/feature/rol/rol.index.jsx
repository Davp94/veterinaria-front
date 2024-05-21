'use client'
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useSearchParams } from "next/navigation";

export default function RolIndex() {
  const params = useSearchParams();
  const [count, setCount] = useState(0);

  useEffect(()=>{
  }, [count])

  return (
    <>
    </>
  );
}
