"use client";
import React, { useEffect, useState } from "react";

type Props = {
  label: string;
  title: string;
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function FormInput({ label, title, placeholder, ...props }: Props) {
  // Check if input is of password type
  const isPassword = props.type === "password";
  // Check what is the provided type
  const [inputType, setInputType] = useState<string | undefined>(undefined);
  // Define if password should be shown or not
  const [showPassword, setShowPassword] = useState(false);

  // Assign type on component load
  useEffect(() => {
    setInputType(props.type ? props.type : undefined);
  }, []);

  // Handle showing or hiding password
  const handlePasswordDisplay = () => {
    // Toggle password display
    setShowPassword((prevVal) => !prevVal);
    // Manage currently displayed type
    setInputType(() => {
      // If passed and computed type equals password
      if (isPassword && inputType === "password") {
        return "text";
      }
      // If computed type was changed after input was rendered
      if (isPassword && inputType === "text") {
        return "password";
      }
    });
  };
  return (
    <>
      <label
        className="mx-auto w-4/5 font-bold first-letter:capitalize"
        htmlFor={label}
      >
        {title}
      </label>
      <input
        {...props}
        type={inputType}
        className="mx-auto w-4/5 rounded-md border p-1 px-2 outline-none hover:border-zinc-500 focus:border-zinc-500"
        name={label}
        placeholder={placeholder}
      />
      {/* If password is selected */}
      {isPassword && (
        <small
          className="mx-auto w-4/5 p-1 font-semibold text-teal-600 hover:animate-pulse hover:cursor-pointer"
          onClick={handlePasswordDisplay}
        >
          {showPassword ? "Hide password" : "Show password"}
        </small>
      )}
    </>
  );
}

export default FormInput;
