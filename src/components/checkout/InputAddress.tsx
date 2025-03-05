import { FieldErrors, UseFormRegister } from "react-hook-form";
import { addressFormValues } from "../../lib/validators";

interface Props {
  register: UseFormRegister<addressFormValues>;
  errors: FieldErrors<addressFormValues>;
  name: keyof addressFormValues;
  className?: string;
  placeholder: string;
}

export const Inputaddress = ({
  register,
  errors,
  name,
  className,
  placeholder,
}: Props) => {
  return (
    <>
      <div
        className={`border border-pink-300 rounded-md overflow-hidden py-2 ${
          errors[name] && "border-red-500"
        } ${className}`}
      >
        <input
          type="text"
          className="w-full px-3 py-1 text-sm focus:outline-none"
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs">{errors[name].message}</p>
      )}
    </>
  );
};
