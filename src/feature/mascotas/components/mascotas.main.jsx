import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useMascotas } from '../hooks/mascotas.hook';
import { findAllMascotasPaginacion } from '../services/mascotas.service';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import Image from 'next/image';
export default function MascotasMain() {
  const { mascotas, loadingMascotas, fetchFindAllMascotas } = useMascotas();
  const [valueFilter, setValueFilter] = useState('');
  const [valueAscDesc, setValueAscDesc] = useState(null);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 2,
    page: 0,
    sortField: 'nombre',
    sortOrder: 1,
  });

  const onPage = event => {
    event.sortOrder = valueAscDesc ? valueAscDesc.order: 1;
    setlazyState(event);
  };

  const sortFields = [
    { name: 'Ascendente', order: 1 },
    { name: 'Descendente', order: 0 }
  ];

  const getLazyData = (value) => {
    const bodyFiltering = {};
    (bodyFiltering.size = lazyState.rows),
      (bodyFiltering.page = lazyState.page || 0),
      (bodyFiltering.sortParam = lazyState.sortField || 'nombre'),
      (bodyFiltering.order = lazyState.sortOrder);
      if(value){
        bodyFiltering.nombre = value;
      }
      fetchFindAllMascotas(bodyFiltering);
  };

  useEffect(() => {
    getLazyData();
  }, [lazyState]);

  const itemTemplate = (mascota, index) => {
    return (
      <div
        className='col-12'
        key={mascota.id}
      >
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
          <img
            className='w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round'
            src={`http://localhost:8200/images/${mascota.imagen}`}
            alt={mascota.nombre}
            width={200}
            height={150}
          />
          <div className='flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4'>
            <div className='flex flex-column align-items-center sm:align-items-start gap-3'>
              <div className='text-2xl font-bold text-900'>{mascota.nombre}</div>
              <div className='flex align-items-center gap-3'>
                <span className='flex align-items-center gap-2'>
                  <i className='pi pi-tag'></i>
                  <span className='font-semibold'>{mascota.tipo}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (items = []) => {
    if (!items || items.length === 0) return null;

    let list = items.map((mascota, index) => {
      return itemTemplate(mascota, index);
    });

    return <div className='grid grid-nogutter'>{list}</div>;
  };

  const onSortChange = value => {
    setValueAscDesc(value);
    setlazyState((prevState)=>({...prevState, sortOrder: value.order}));
  };

  const filterData = () => {
    getLazyData(valueFilter);
  }


  const header = () => {
    return (
      <div className='flex justify-content-between'>
        <Dropdown
          value={valueAscDesc}
          onChange={(e) => onSortChange(e.value)}
          options={sortFields}
          optionLabel='name'
          placeholder='Orden by Nombre'
          className='w-full sm:w-14rem'
        />
        <div>
          <InputText
            value={valueFilter}
            onChange={e => setValueFilter(e.target.value)}
            placeholder='filtro de busqueda por nombre'
          />
          <Button
            icon='pi pi-search'
            onClick={() => filterData()}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className='card'
        title='Listado de Mascotas'
      >
          <DataView
            value={mascotas?.content ? mascotas.content : []}
            lazy
            totalRecords={mascotas?.totalElements ? mascotas.totalElements : 0}
            first={lazyState?.first}
            loading={loadingMascotas}
            onPage={onPage}
            header={header()}
            sortField={lazyState?.sortField}
            sortOrder={lazyState?.sortOrder}
            rows={lazyState?.rows}
            rowsPerPageOptions={[2, 4, 10]}
            listTemplate={listTemplate}
            paginator
            emptyMessage='No existen datos registrados'
          />
      </div>
    </>
  );
}
