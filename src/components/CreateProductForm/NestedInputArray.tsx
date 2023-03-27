import React, { useEffect } from 'react';
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import cx from 'classnames';

import AddIcon from 'assets/img/icons/add.svg';
import ClearIcon from 'assets/img/icons/clear.svg';
import Input from 'components/FormElements/Input';
import InputError from 'components/FormElements/InputError';

interface NestedInputArrayProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  template?: { [key: string]: string | {} };
}

const NestedInputArray: React.FC<NestedInputArrayProps> = ({
  control,
  name,
  register,
  errors,
  template,
  className,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  useEffect(() => {
    append(template);
  }, []);

  return (
    <table
      className={cx(
        'table-auto w-full border-separate border-spacing-5 text-center border rounded-lg',
        className
      )}
    >
      <tbody>
        {fields.map((field, index) => {
          return (
            <React.Fragment key={field.id}>
              {errors?.[index] && (
                <tr>
                  <td></td>
                  <td>
                    <InputError error={errors?.[index]?.value} />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              <tr>
                <td>
                  <h1 className="text-[1.6rem]">{index + 1}.</h1>
                </td>
                <td>
                  <Input
                    variant="outline"
                    type="text"
                    className="!w-full"
                    {...register(`${name}.${index}.value` as const, {
                      required: "Field can't be empty",
                    })}
                  />
                </td>
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

export default NestedInputArray;
