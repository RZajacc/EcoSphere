import React from "react";

type Props = {
  fieldName: string;
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function FormInput({ fieldName, placeholder, ...props }: Props) {
  return (
    <>
      <label
        className="mx-auto w-4/5 font-bold first-letter:capitalize"
        htmlFor={fieldName}
      >
        {fieldName}:
      </label>
      <input
        {...props}
        className="mx-auto w-4/5 rounded-md border p-1 px-2 outline-none hover:border-zinc-500 focus:border-zinc-500"
        name={fieldName}
        placeholder={placeholder}
      />
    </>
  );
}

export default FormInput;
