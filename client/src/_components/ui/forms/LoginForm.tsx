"use client";
import React from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "../../../../lib/actions/login";
import FormErrors from "./FormErrors";

type Props = {
  children: React.ReactNode;
};

function LoginForm({ children }: Props) {
  const [state, action] = useFormState(login, undefined);
  const { pending } = useFormStatus();

  return (
    <form
      className="grid gap-2 rounded-lg border-2 border-teal-500 p-2 shadow-md shadow-teal-700"
      action={action}
    >
      {children}
      <FormInput
        name="email"
        required
        placeholder="type your email here"
        type="email"
      />
      <FormInput
        name="password"
        placeholder="type your password here"
        type="password"
      />
      {state?.msg && <FormErrors errors={[state.msg]} />}
      <SubmitButton pending={pending} title="Log In" />
    </form>
  );
}

export default LoginForm;
