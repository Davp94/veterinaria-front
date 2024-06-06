'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Controller, useForm } from 'react-hook-form';
import { Operations } from '../../../constant/operationType';
import InputController from '../../../common/components/ControllerInputText';
import DropdownController from '../../../common/components/ControllerDropdown';
import { FileUpload } from 'primereact/fileupload';
import { useMascotas } from '../hooks/mascotas.hook';
import { adjuntosService } from '../../../services/adjuntos.service';
export default function MascotasForm({ hideDialog, operation, rol }) {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { nombre: '', descripcion: '' } });
  const { clasificacion, loadingClasificacion, fetchFindAllMascotasClasificacion } = useMascotas();
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
    console.log('🚀 ~ onUpload ~ event:', event);
    const fomrData = new FormData();
    fomrData.append('file', event.files[0]);
    console.log('🚀 ~ onUpload ~ fomrData:', fomrData);
    adjuntosService(fomrData).then(res=>{
      console.log(res);
    })
  }

  useEffect(() => {
    fetchFindAllMascotasClasificacion();
  }, []);

  return (
    <form
      className='p-4 flex flex-column gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='grid p-fluid'>
        <div className='field col-12 md:col-12'>
          <InputController
            name='nombre'
            control={control}
            errors={errors}
            label='Nombre*'
          />
        </div>
        <div className='card field col-12 md:col-12'>
          <FileUpload
            name='Imagen Mascota'
            multiple={false}
            accept='image/*'
            maxFileSize={1000000}
            customUpload={true}
            uploadHandler={(e)=>onUpload(e)}
            emptyTemplate={<p className='m-0'>Seleccione una imagen para añadir.</p>}
          />
        </div>
        <div className='field col-12 md:col-6'>
          <DropdownController
            name='clasificacion'
            control={control}
            label='Clasificación*'
            options={clasificacion}
            optionLabel='nombre'
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
