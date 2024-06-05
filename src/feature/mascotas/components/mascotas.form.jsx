'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Controller, useForm } from 'react-hook-form';
import { createRol, updateRol } from '../services/rol.service';
import { classNames } from 'primereact/utils';
import { Operations } from '../../../constant/operationType';
import InputController from '../../../common/components/ControllerInputText';
import DropdownController from '../../../common/components/ControllerDropdown';
import { FileUpload } from 'primereact/fileupload';
export default function RolForm({ hideDialog, operation, rol }) {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { nombre: '', descripcion: '' } });

  const onSubmit = async data => {
    if (operation == Operations.CREATE) {
      await createRol(data);
      hideDialog(true);
    }
    if (operation == Operations.UPDATE) {
      await updateRol(data, rol.id);
      hideDialog(true);
    }
  };

  const onUpload = (event) =>{
    const fomrData = new FormData();
    fomrData.append('file', event.files[0] )
  }

  useEffect(() => {
    if (Object.keys(rol).length > 0 && operation == Operations.UPDATE) {
      setValue('nombre', rol?.nombre);
      setValue('descripcion', rol?.descripcion);
    }
  }, []);

  return (
    <form
      className='p-4 flex flex-column gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='grid p-fluid'>
        <div className='field col-12 md:col-6'>
          <InputController
            name='car_monto'
            control={control}
            rules={rules.required()}
            errors={errors}
            label='Monto*'
          />
        </div>
        <div>
          <div className='card field col-12 md:col-6'>
            <FileUpload
              name='Imagen Mascota'
              multiple={false}
              accept='image/*'
              maxFileSize={1000000}
              customUpload={true}
              uploadHandler={onUpload($event)}
              emptyTemplate={<p className='m-0'>Seleccione una imagen para añadir.</p>}
            />
          </div>
        </div>
        <div className='field col-12 md:col-6'>
          <DropdownController
            name='mon_codigo'
            control={control}
            rules={rules.required()}
            label='Tipo de Moneda*'
            options={moneda}
            optionLabel='mon_descripcion'
            optionValue='mon_codigo'
          />
        </div>
      </div>
      <div></div>
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
