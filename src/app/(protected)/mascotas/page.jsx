'use client'
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useSearchParams } from "next/navigation";
import MascotasIndex from "../../../feature/mascotas/mascotas.index";

export default function MascotasPage() {

  return (
    <>
      <MascotasIndex />
    </>
  );
}
