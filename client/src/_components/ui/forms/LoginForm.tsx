import React from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

type Props = {
  children: React.ReactNode;
};

function LoginForm({ children }: Props) {
  return (
    <form className="grid gap-2 rounded-lg border-2 border-teal-500 p-2 shadow-md shadow-teal-700">
      {children}
      <FormInput name="email" placeholder="type your email here" type="email" />
      <FormInput
        name="password"
        placeholder="type your password here"
        type="password"
      />
      <SubmitButton title="Log In" />
    </form>
  );
}

export default LoginForm;
