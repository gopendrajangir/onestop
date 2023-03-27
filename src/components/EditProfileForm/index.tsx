import React, { useState } from 'react';
import cx from 'classnames';
import { FieldError, useForm } from 'react-hook-form';

import FormGroup from 'components/FormElements/FormGroup';
import Label from 'components/FormElements/Label';
import Input from 'components/FormElements/Input';
import CheckLabel from 'components/FormElements/CheckLabel';
import Button from 'shared/Button';
import { IProfile } from 'common/types';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateProfile } from 'redux/slices/profile/thunks';
import InputError from 'components/FormElements/InputError';

interface EditProfileFormProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: IProfile;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  className,
  profile: { name, email, gender: defaultGender },
}) => {
  const [gender, setGender] = useState<'male' | 'female'>();

  const loading = useAppSelector((state) => state.profile.loading);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      name,
      email,
      gender: defaultGender,
    },
  });

  const genderValue = gender ?? defaultGender;

  return (
    <form
      className={cx(className, 'flex flex-col gap-y-5')}
      onSubmit={handleSubmit((d) => {
        dispatch(updateProfile(d));
      })}
    >
      <FormGroup>
        <InputError error={errors.name as FieldError} />
        <Label className="">Name</Label>
        <Input
          placeholder="Name"
          disabled={loading}
          type="text"
          {...register('name', {
            validate: (value) => {
              if (value.length < 1)
                return 'Name must be atleast 1 character long';
              if (value.length > 100)
                return 'Name must be less than equal to 100 characters long';
            },
          })}
        />
      </FormGroup>
      <FormGroup>
        <InputError error={errors.email as FieldError} />
        <Label>Email</Label>
        <Input
          disabled={loading}
          placeholder="Email"
          type="email"
          {...register('email')}
        />
      </FormGroup>
      <div className="flex border text-xs text-slate-500 mt-2">
        <CheckLabel htmlFor="male" checked={genderValue === 'male'}>
          Male
        </CheckLabel>
        <div className="w-[1px] bg-slate-200"></div>
        <CheckLabel htmlFor="female" checked={genderValue === 'female'}>
          Female
        </CheckLabel>
        <input
          hidden
          type="radio"
          {...register('gender', {
            onChange: (e) => {
              setGender(e.target.value);
            },
          })}
          id="male"
          value="male"
        />
        <input
          hidden
          disabled={loading}
          type="radio"
          {...register('gender', {
            onChange: (e) => {
              setGender(e.target.value);
            },
          })}
          id="female"
          value="female"
        />
      </div>
      <Button
        disabled={!isDirty}
        loading={loading}
        className="rounded-sm font-medium !text-xs disabled:bg-violet-400"
      >
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileForm;
