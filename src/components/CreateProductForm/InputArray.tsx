import React, { useEffect } from 'react';
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  useFieldArray,
  UseFormRegister,
  Validate,
} from 'react-hook-form';

import AddIcon from 'assets/img/icons/add.svg';
import ClearIcon from 'assets/img/icons/clear.svg';
import Input from 'components/FormElements/Input';
import InputError from 'components/FormElements/InputError';
import NestedInputArray from './NestedInputArray';

interface InputArrayProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  template: { [key: string]: string | {} };
  labelsExtra?: { [key: string]: string };
  validation?: { [key: string]: Validate<any> };
}

const InputArray: React.FC<InputArrayProps> = ({
  control,
  name,
  register,
  errors,
  template,
  validation = {},
  labelsExtra = {},
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  useEffect(() => {
    append(template);
  }, []);

  return (
    <table className="table-auto border-separate border-spacing-5 border rounded-lg p-5">
      {Object.keys(template).length > 1 && (
        <thead>
          <tr>
            {Object.keys(template).map((key, i) => {
              return (
                <React.Fragment key={key}>
                  {i === 0 && <th></th>}
                  <th className="capitalize text-[1.4rem]">
                    {key}
                    {labelsExtra[key] && (
                      <span className="font-normal text-[1.2rem]">
                        {' '}
                        {labelsExtra[key]}
                      </span>
                    )}
                  </th>
                </React.Fragment>
              );
            })}
            {!Object.keys(template).some(
              (key) => template[key] instanceof Object
            ) && <th></th>}
            <th></th>
          </tr>
        </thead>
      )}
      <tbody>
        {fields.map((field, index) => {
          return (
            <React.Fragment key={field.id}>
              {errors && (
                <tr>
                  {Object.keys(template).map((key, i) => {
                    return (
                      <React.Fragment key={key}>
                        {i === 0 && <td></td>}
                        {template[key] instanceof Object ? (
                          <td></td>
                        ) : (
                          <td className="capitalize text-[1.4rem]">
                            <InputError error={errors?.[index]?.[key]} />
                          </td>
                        )}
                      </React.Fragment>
                    );
                  })}
                  <td></td>
                  <td></td>
                </tr>
              )}
              <tr>
                {Object.keys(template).map((key, i) => {
                  if (!(template[key] instanceof Object)) {
                    return (
                      <React.Fragment key={key}>
                        {i === 0 && (
                          <td className="w-10">
                            <h1 className="text-[1.6rem]">{index + 1}.</h1>
                          </td>
                        )}
                        <td>
                          <Input
                            variant="outline"
                            type="text"
                            className="!w-full"
                            {...register(`${name}.${index}.${key}` as const, {
                              required: "Field can't be empty",
                              validate: validation[key],
                            })}
                          />
                        </td>
                      </React.Fragment>
                    );
                  } else {
                    if (
                      (template[key] as { [key: string]: string }).type ===
                      'file'
                    ) {
                      return (
                        <input
                          type="file"
                          {...register(`${name}.${index}.${key}` as const)}
                        />
                      );
                    }
                    return (
                      <React.Fragment key={key}>
                        <td>
                          <NestedInputArray
                            className="p-10"
                            errors={errors?.[index]?.[key]}
                            name={`${name}.${index}.${key}`}
                            control={control}
                            register={register}
                            template={
                              template[key] as { [key: string]: string }
                            }
                          />
                        </td>
                      </React.Fragment>
                    );
                  }
                })}
                {fields.length > 1 && (
                  <td>
                    <button
                      className="border border-slate-400 self-end h-12 w-12 rounded-full flex justify-center items-center"
                      onClick={() => remove(index)}
                    >
                      <ClearIcon className="h-6 w-6 fill-slate-500" />
                    </button>
                  </td>
                )}
                {index === fields.length - 1 && (
                  <td>
                    <button
                      className="border border-slate-400 self-end h-12 w-12 rounded-full flex justify-center items-center"
                      onClick={() => append(template)}
                    >
                      <AddIcon className="h-8 w-8 fill-slate-500" />
                    </button>
                  </td>
                )}
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default InputArray;
