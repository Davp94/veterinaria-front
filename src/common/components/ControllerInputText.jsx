import React from 'react';
import { Controller } from 'react-hook-form';

import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const InputController = ({ name, control, rules, label, icon, placeholder, className, style, convertToUppercase, disabled, type, maxLength, onKeyDown }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <span className='p-float-label p-input-icon-right'>
            {icon && <i className={icon} />}
            <InputText
              id={field.name}
              {...field}
              placeholder={placeholder}
              value={field.value || ''}
              onChange={e => field.onChange(e.target.value)}
              onKeyUp={e => {
                if (convertToUppercase) {
                  e.target.value = e.target.value.toUpperCase();
                }
              }}
              className={
                className ||
                classNames({
                  'p-invalid': fieldState.invalid,
                })
              }
              style={style}
              disabled={disabled}
              type={type}
              maxLength={maxLength}
              onKeyDown={onKeyDown}
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

export default InputController;
