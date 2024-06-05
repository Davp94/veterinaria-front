import React from 'react';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';

const InputTextAreaController = ({ name, control, rules, label, placeholder, autoResize, className, style, disabled, rows, cols }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <span className='p-float-label p-input-icon-right w-full'>
            <InputTextarea
              id={field.name}
              {...field}
              rows={rows || 4}
              cols={cols || 30}
              className={
                className ||
                classNames({
                  'p-invalid': fieldState.invalid,
                })
              }
              placeholder={placeholder}
              style={style}
              autoResize={autoResize || false}
              disabled={disabled}
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
          {fieldState.error && label && <small className='p-error'>{fieldState.error.message}</small>}
        </>
      )}
    />
  );
};

export default InputTextAreaController;
