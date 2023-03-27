import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cx from 'classnames';
import axios from 'axios';

import Input from 'components/FormElements/Input';
import InputError from 'components/FormElements/InputError';
import Button from 'shared/Button';
import Label from 'components/FormElements/Label';
import InputArray from './InputArray';
import ClearIcon from 'assets/img/icons/clear.svg';

interface CreateProductFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ className }) => {
  const { register, setValue, getValues, handleSubmit, formState, control } =
    useForm();
  const { errors } = formState;
  const [isMaster, setIsMaster] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [readingFile, setReadingFile] = useState(false);

  const user = null;

  return (
    <form
      className={cx('flex flex-col', className)}
      onSubmit={handleSubmit(async (data) => {
        data.categories = data.categories.map((category) => category.value);
        data.details = data.details.map((detail) => detail.value);
        data.materialCare = data.materialCare.map((row) => row.value);
        data.tags = data.tags.map((tag) => tag.value);
        data.sizeFit = data.sizeFit.map((row) => row.value);

        const ev = {};
        data.extraVariants = data.extraVariants.map((variant) => {
          ev[variant.key] = variant.values.map((value) => value.value);
        });
        data.extraVariants = ev;

        const specs = {};
        data.specifications = data.specifications.map((spec) => {
          specs[spec.key] = spec.value;
        });
        data.specifications = specs;

        const formData = new FormData();

        formData.append('data', JSON.stringify(data));

        for (const file of files) {
          formData.append('images', file);
        }

        const token = await user.getIdToken();

        try {
          await axios.post('/products', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (e) {
          console.log(e);
        }
      })}
    >
      <table className="table-auto border-separate border-spacing-10 align-top">
        <tbody>
          <tr>
            <td>
              <Label>Is this a master product*</Label>
            </td>
            <td className="flex gap-x-10">
              <Label className="flex items-center gap-x-2">
                Yes
                <input
                  type="radio"
                  {...register('isMaster', {
                    onChange: (e) => setIsMaster(e.target.checked),
                  })}
                  name="isMaster"
                  defaultChecked
                  value="true"
                />
              </Label>
              <Label className="flex items-center gap-x-2">
                No
                <input
                  type="radio"
                  {...register('isMaster', {
                    onChange: (e) => setIsMaster(!e.target.checked),
                  })}
                  name="isMaster"
                  value="false"
                />
              </Label>
            </td>
          </tr>
          <tr>
            <td>
              <Label htmlFor="name">Name*</Label>
            </td>
            <td>
              <InputError error={errors.name} />
              <Input
                variant="outline"
                type="text"
                id="name"
                {...register('name', {
                  required: 'Please provide a product name',
                  minLength: {
                    value: 12,
                    message: 'Name must be atleast 12 characters long',
                  },
                  maxLength: {
                    value: 256,
                    message:
                      'Name must be less than or equal to 256 characters',
                  },
                })}
              />
            </td>
          </tr>
          {isMaster && (
            <tr>
              <td>
                <Label htmlFor="masterName">Name of master product*</Label>
              </td>
              <td>
                <InputError error={errors.masterName} />
                <Input
                  variant="outline"
                  type="text"
                  id="masterName"
                  {...register('masterName', {
                    required: 'Please provide a master product name',
                    minLength: {
                      value: 12,
                      message: 'Name must be atleast 12 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message:
                        'Name must be less than or equal to 256 characters',
                    },
                  })}
                />
              </td>
            </tr>
          )}
          {!isMaster && (
            <tr>
              <td>
                <Label htmlFor="master">Master Product Id*</Label>
              </td>
              <td>
                <InputError error={errors.master} />
                <Input
                  variant="outline"
                  type="text"
                  id="master"
                  {...register('master', {
                    required: 'Please provide a master product id',
                  })}
                />
              </td>
            </tr>
          )}
          <tr>
            <td>
              <Label>Details*</Label>
            </td>
            <td>
              <InputArray
                errors={errors.details}
                name="details"
                control={control}
                register={register}
                template={{ value: '' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label>Size & Fit*</Label>
            </td>
            <td>
              <InputArray
                errors={errors.sizeFit}
                name="sizeFit"
                control={control}
                register={register}
                template={{ value: '' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label>Material & Care*</Label>
            </td>
            <td>
              <InputArray
                errors={errors.materialCare}
                name="materialCare"
                control={control}
                register={register}
                template={{ value: '' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label>Specifications*</Label>
            </td>
            <td>
              <InputArray
                errors={errors.specifications}
                name="specifications"
                control={control}
                register={register}
                template={{ key: '', value: '' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
            </td>
            <td>
              <InputError error={errors.expiryDate} />
              <Input
                variant="outline"
                type="date"
                id="expiryDate"
                {...register('expiryDate')}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label>Variant*</Label>
            </td>
            <td>
              <InputArray
                errors={errors.variant}
                name="variant"
                control={control}
                register={register}
                template={{
                  key: '',
                  value: '',
                  priority: '',
                  image: { type: 'file' },
                }}
                labelsExtra={{ priority: '(Lesser number higher priority)' }}
                validation={{
                  priority: (value) => {
                    if (isNaN(parseInt(value))) {
                      return 'Priority must be a number';
                    }
                  },
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label htmlFor="gender">Gender (Optional)</Label>
            </td>
            <td>
              <select
                id="gender"
                {...register('gender')}
                className="p-5 text-[1.4rem] font-medium"
              >
                <option value="">None</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <Label htmlFor="brand">Brand*</Label>
            </td>
            <td>
              <InputError error={errors.brand} />
              <Input
                variant="outline"
                type="text"
                id="brand"
                {...register('brand', {
                  required: 'Please provide a brand name',
                  minLength: {
                    value: 1,
                    message: 'Brand name must be atleast 1 characters long',
                  },
                  maxLength: {
                    value: 256,
                    message:
                      'Brand name must be less than or equal to 256 characters',
                  },
                })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label>Categories*</Label>
            </td>
            <td>
              <InputArray
                errors={errors.categories}
                name="categories"
                control={control}
                register={register}
                template={{ value: '' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label>Tags*</Label>
            </td>
            <td>
              <InputArray
                errors={errors.tags}
                name="tags"
                control={control}
                register={register}
                template={{ value: '' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label htmlFor="mrp">MRP*</Label>
            </td>
            <td>
              <InputError error={errors.mrp} />
              <Input
                variant="outline"
                type="text"
                id="mrp"
                {...register('mrp', {
                  required: 'Please provide mrp',
                  onChange: ({ currentTarget: { value } }) => {
                    setValue('mrp', value.replace(/[^0-9]/g, ''));
                  },
                })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label htmlFor="discount">Discount*</Label>
            </td>
            <td>
              <InputError error={errors.discount} />
              <Input
                variant="outline"
                type="number"
                id="discount"
                {...register('discount', {
                  required: 'Please provide discount',
                  validate: (value) => {
                    if (value < 0 || value > 100) {
                      return 'Discount must be between 0 and 100';
                    }
                  },
                })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label>Extra Variants*</Label>
            </td>
            <td>
              <InputArray
                errors={errors.extraVariants}
                name="extraVariants"
                control={control}
                register={register}
                template={{ key: '', values: { value: '' } }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <InputError error={errors?.images} />
              <Label>Images*</Label>
            </td>
            <td className="flex flex-wrap gap-5">
              {fileUrls.map((url, i) => {
                return (
                  <div
                    key={url}
                    className="border rounded overflow-hidden relative"
                  >
                    <img className="w-[20rem]" src={url} alt="Preview image" />
                    <button
                      className="border border-red-400 self-end h-12 w-12 rounded-full flex justify-center items-center top-4 right-4 absolute"
                      onClick={() => {
                        setFiles(files.filter((file, idx) => i !== idx));
                        setFileUrls(
                          fileUrls.filter((fileUrl, idx) => i !== idx)
                        );
                      }}
                    >
                      <ClearIcon className="h-6 w-6 fill-red-500" />
                    </button>
                  </div>
                );
              })}
              <input
                id="images"
                hidden
                multiple
                disabled={readingFile}
                type="file"
                {...register('images', {
                  required: 'Images are required',
                  onChange: (e) => {
                    const targetFiles = e.target.files;
                    const reader = new FileReader();

                    let i = 0;

                    const newFiles = [...files];
                    const newFileUrls = [];

                    function readFile(file) {
                      reader.onloadend = function () {
                        newFileUrls.push(reader.result);
                        newFiles.push(targetFiles[i - 1]);

                        if (i != targetFiles.length) {
                          readFile(targetFiles[i++]);
                        } else {
                          setFiles(newFiles);
                          setReadingFile(false);
                          setFileUrls([...fileUrls, ...newFileUrls]);
                        }
                      };
                      reader.readAsDataURL(file);
                    }

                    readFile(targetFiles[i++]);
                    setReadingFile(true);
                  },
                })}
              />
              <div className="flex justify-center items-center w-[20rem]">
                <label
                  htmlFor="images"
                  className="cursor-pointer border border-slate-700 h-40 w-40 rounded-lg flex flex-col items-center justify-center text-[1.4rem]"
                >
                  <span className="text-[3rem]">+</span>
                  <span className="">Add Image</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <Button>Submit</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default CreateProductForm;
