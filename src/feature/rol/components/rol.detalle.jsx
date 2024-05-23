import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const RolDetalle = ({ hideDialog, rol }) => {
  return (
    <>
      <Card>
        <div className='flex flex-column gap-3 justify-content-around'>
          <label>
            <span className='font-semibold'>Nombre:</span> {rol.nombre}
          </label>
          <label>
            <span className='font-semibold'>Descripcion:</span>
            {rol.descripcion}
          </label>
          <div className='w-4 align-self-end'>
            <Button
              label='Cancel'
              icon='pi pi-times'
              severity='danger'
              onClick={() => hideDialog()}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default RolDetalle;
