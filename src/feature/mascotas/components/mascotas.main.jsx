'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useMascotas } from '../hooks/mascotas.hook';
export default function MascotasMain() {
  const { mascotas, loadingMascotas, fetchFindAllMascotas } = useMascotas();
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: 'car_codigo',
    sortOrder: 1,
  });

  const onPage = event => {
    console.log('🚀 ~ onPage ~ event:', event);
    setlazyState(event);
  };

  const getLazyData = () => {
    const bodyFiltering = {};
    (bodyFiltering.take = lazyState.rows),
      (bodyFiltering.page = lazyState.page || 0),
      (bodyFiltering.sortParam = lazyState.sortField),
      (bodyFiltering.sortDirection = lazyState.sortOrder == 1 ? 'ASC' : 'DESC');
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
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={mascota.nombre}
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

  const listTemplate = items => {
    if (!items || items.length === 0) return null;

    let list = items.map((mascota, index) => {
      return itemTemplate(mascota, index);
    });

    return <div className='grid grid-nogutter'>{list}</div>;
  };

  return (
    <div
      className='card'
      title='Listado de Mascotas'
    >
      {/* <DataView
        value={mascotas?.content}
        lazy
        totalRecords={mascotas?.total}
        first={lazyState.first}
        loading={loadingMascotas}
        onPage={onPage}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        rows={lazyState.rows}
        rowsPerPageOptions={[5, 10, 20]}
        listTemplate={listTemplate}
        paginator    
        emptyMessage='No existen datos registrados'    
      /> */}
    </div>
  );
}
