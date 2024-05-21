'use client'
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useSearchParams } from "next/navigation";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export default function MascotasForm() {
  return (
    <>
      <FloatLabel>
        <InputText id="username" />
        <label htmlFor="username">Username</label>
      </FloatLabel>
      <FloatLabel>
        <InputTextarea id="description" rows={5} cols={30} />
        <label htmlFor="description">Description</label>
      </FloatLabel>
    </>
  );
}
