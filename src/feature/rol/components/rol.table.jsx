import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import RolForm from './rol.form';
import RolDetalle from './rol.detalle';
import { deleteRol, findAllRoles, reporteRoles } from '../services/rol.service';
import { Operations } from '../../../constant/operationType';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import useUserStore from '../../../state-management/zustand/user.store';
import Image from 'next/image';
export default function RolTable() {
  const [roles, setRoles] = useState(null);
  const [rolDialog, setRolDialog] = useState(false);
  const [operation, setOperation] = useState(0);
  const [rol, setRol] = useState({});
  const [globalFilter, setGlobalFilter] = useState(null);
  const { token, setToken } = useUserStore();
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    
    findAllRoles().then(data => {
      console.log('🚀 ~ findAllRoles ~ data:', data);
      setRoles(data);
    });
  }, []);

  const acceptConfirmationDialog = () => {
    deleteRol(rol.id).then(() => {
        toast.current.show({ severity: 'success', summary: 'Operacion realizada', detail: 'Registro Eliminado', life: 3000 });
        findAllRoles().then(data => {
            console.log('🚀 ~ findAllRoles ~ data:', data.data);
            setRoles(data.data);
        });
    });
  };

  const rejectConfirmationDialog = () => {
    toast.current.show({ severity: 'warn', summary: '', detail: 'Operacion Cancelada', life: 3000 });
  };

  const confirm1 = (dataRow) => {
    setRol(dataRow);
    confirmDialog({
        group: 'headless',
        message: 'Esta seguro de eliminar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'acceptConfirmationDialog',
        acceptConfirmationDialog,
        rejectConfirmationDialog
    });
};

  const openDialog = (operation, dataRow = {}) => {
    setRol(dataRow);
    setOperation(operation);
    setRolDialog(true);
  };

  const hideDialog = (refresh = false) => {
    setRolDialog(false);
    if (refresh) {
      findAllRoles().then(data => {
        setRoles(data.data);
      });
    }
  };

  const downloadFile = () => {
    reporteRoles().then(res=> {
      const url = window.URL.createObjectURL(res);
      window.open(url);
      window.URL.revokeObjectURL(url);
    })
  }

  const leftToolbarTemplate = () => {
    return (
      <div className='flex flex-wrap gap-2'>
        <Button
          label='New'
          icon='pi pi-plus'
          severity='success'
          onClick={() => openDialog(Operations.CREATE)}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label='Export'
        icon='pi pi-upload'
        className='p-button-help'
        onClick={()=>downloadFile()}
      />
    );
  };

  const imageBodyTemplate = rowData => {
    return (
      <Image
        src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
        alt={rowData.image}
        className='shadow-2 border-round'
        style={{ width: '64px' }}
      />
    );
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button
          size='small'
          icon='pi pi-pencil'
          rounded
          outlined
          className='mr-2'
          onClick={() => openDialog(Operations.UPDATE, rowData)}
        />
        <Button
          size='small'
          icon='pi pi-trash'
          rounded
          outlined
          className='mr-2'
          onClick={()=>confirm1(rowData)}
        />
        <Button
          size='small'
          icon='pi pi-eye'
          rounded
          outlined
          className='mr-2'
          onClick={() => openDialog(Operations.DETAIL, rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className='flex flex-wrap gap-2 align-items-center justify-content-between'>
      <h4 className='m-0'>Manejar Roles</h4>
      <IconField iconPosition='left'>
        <InputIcon className='pi pi-search' />
        <InputText
          type='search'
          onInput={e => setGlobalFilter(e.target.value)}
          placeholder='Search...'
        />
      </IconField>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className='card'>
        <Toolbar
          className='mb-4'
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={roles}
          dataKey='id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} roles'
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field='id'
            header='Id'
            sortable
            style={{ minWidth: '12rem' }}
          ></Column>
          <Column
            field='nombre'
            header='Nombre'
            sortable
            style={{ minWidth: '12rem' }}
          ></Column>
          <Column
            field='descripcion'
            header='Descripcion'
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '12rem' }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={rolDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='Detalle Rol'
        modal
        className='p-fluid'
        onHide={hideDialog}
        blockScroll
      >
        {operation == Operations.DETAIL && (
          <RolDetalle
            hideDialog={hideDialog}
            rol={rol}
          />
        )}
        {[Operations.UPDATE, Operations.CREATE].includes(operation) && (
          <RolForm
            hideDialog={hideDialog}
            rol={rol}
            operation={operation}
          />
        )}
        {operation == Operations.DELETE && <div>CONFIRMATION DIALOG</div>}
      </Dialog>
      <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                        <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                            <i className="pi pi-question text-5xl"></i>
                        </div>
                        <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                            {message.header}
                        </span>
                        <p className="mb-0" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
                            <Button
                                label="Save"
                                onClick={(event) => {
                                    hide(event);
                                    acceptConfirmationDialog();
                                }}
                                className="w-8rem"
                            ></Button>
                            <Button
                                label="Cancel"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    rejectConfirmationDialog();
                                }}
                                className="w-8rem"
                            ></Button>
                        </div>
                    </div>
                )}
            />
    </>
  );
}
