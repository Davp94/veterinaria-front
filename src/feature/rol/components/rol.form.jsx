'use client'
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useSearchParams } from "next/navigation";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Controller, useForm } from "react-hook-form";
import { createRol } from "../services/rol.service";
import { classNames } from "primereact/utils";

export default function RolForm({hideDialog}) {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { nombre: '', descripcion: '' } });

  const onSubmit = async data => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    await createRol(data)
    hideDialog(true);
  };
  return (
    <form
      className='p-4 flex flex-column gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name='nombre'
        control={control}
        rules={{ required: 'Nombre - Nombre es requerido.' }}
        render={({ field, fieldState }) => (
          <>
            <label
              htmlFor={field.name}
              className={classNames({ 'p-error': errors.value })}
            ></label>
            <span className='p-float-label'>
              <InputText
                id={field.name}
                value={field.value}
                className={classNames({ 'p-invalid': fieldState.error })}
                onChange={e => field.onChange(e.target.value)}
              />
              <label htmlFor={field.name}>Nombre</label>
            </span>
          </>
        )}
      />

      <Controller
        name='descripcion'
        control={control}
        rules={{ required: 'Descripcion - Descripcion es requerido.' }}
        render={({ field, fieldState }) => (
          <>
            <label
              htmlFor={field.name}
              className={classNames({ 'p-error': errors.value })}
            ></label>
            <span className='p-float-label'>
              <InputText
                id={field.name}
                value={field.value}
                className={classNames({ 'p-invalid': fieldState.error })}
                onChange={e => field.onChange(e.target.value)}
              />
              <label htmlFor={field.name}>Descripcion</label>
            </span>
          </>
        )}
      />

      <div className='flex justify-content-end gap-2'>
        <Button
          label='Cancel'
          icon='pi pi-times'
          outlined
          onClick={() => hideDialog()}
        />
        <Button
          type='submit'
          label='Save'
          icon='pi pi-check'
        />
      </div>
    </form>
  );
}
