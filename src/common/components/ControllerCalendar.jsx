import React from 'react';
import { Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { addLocale } from 'primereact/api';
import { convertDateStringToDate } from '@/utils/functions';

import { calendarDefinition } from '@/constants/environment.enum';

const CalendarController = ({ name, control, rules, label, dateFormat, mask, minDate, maxDate, editable, placeholder, disabled, view, className }) => {
  const locale = require('../../../public/locales/es/common.json');
  addLocale(calendarDefinition.LOCALE, locale.calendar);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <span className='p-float-label'>
              <Calendar
                {...field}
                inputId={field.name}
                value={
                  field.value
                    ? (() => {
                        if (typeof field.value == 'string') {
                          return convertDateStringToDate(field.value);
                        } else if (typeof field.value == 'object' && field.value instanceof Date) {
                          return field.value;
                        }
                      })()
                    : null
                }
                dateFormat={dateFormat || calendarDefinition.DATE_FORMAT}
                mask={mask || calendarDefinition.MASK}
                minDate={minDate || calendarDefinition.MIN_DATE_TIME}
                maxDate={maxDate || calendarDefinition.MAX_DATE_TIME}
                locale={calendarDefinition.LOCALE}
                readOnlyInput={!editable}
                showIcon
                onChange={e => field.onChange(e)}
                placeholder={placeholder || calendarDefinition.PLACEHOLDER}
                className={
                  className ||
                  classNames({
                    'p-invalid': fieldState.error,
                  })
                }
                disabled={disabled}
                view={view || 'date'}
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
    </>
  );
};

export default CalendarController;
