import React from 'react';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

const DropdownController = ({
  name,
  control,
  rules,
  label,
  className,
  style,
  options,
  optionLabel,
  optionValue,
  filter,
  showClear,
  disabled,
  emptyFilterMessage,
  emptyMessage,
  pt,
  onChange, // Agregamos onChange como prop
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <span className='p-float-label'>
            <Dropdown
              inputId={field.name}
              value={field.value}
              onChange={e => {
                field.onChange(e); // Actualizamos el valor interno
                onChange && onChange(e.value); // Propagamos el cambio al componente padre
              }}
              options={options || []}
              optionLabel={optionLabel}
              optionValue={optionValue}
              filter={filter || true}
              showClear={showClear || true}
              disabled={disabled}
              panelClassName='block overflow-hidden'
              className={
                className ||
                classNames({
                  'p-invalid': fieldState.invalid,
                })
              }
              style={style}
              pt={{ ...pt, clearIcon: 'mr-2' }}
              emptyMessage={emptyMessage || 'No se han encontrado resultados'}
              emptyFilterMessage={emptyFilterMessage || 'No hay opciones disponibles'}
            />
            {label && (
              <label
                htmlFor={field.name}
                className={disabled ? 'l-disabled' : classNames({ 'p-error': fieldState.name })}
              >
                {label}
              </label>
            )}
          </span>
          {fieldState.error && <small className='p-error'>{fieldState.error.message}</small>}
        </>
      )}
    />
  );
};

export default DropdownController;
