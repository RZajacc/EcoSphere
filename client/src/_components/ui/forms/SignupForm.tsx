"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "../../../../lib/actions/signup";
import FormInput from "./FormInput";
import FormErrors from "./FormErrors";
import SubmitButton from "./SubmitButton";

type Props = {
  children: React.ReactNode;
};

function SignupForm({ children }: Props) {
  const [state, action] = useFormState(signup, undefined);
  const { pending } = useFormStatus();

  return (
    <form
      action={action}
      className="grid gap-2 rounded-lg border-2 border-teal-500 p-2 shadow-md shadow-teal-700"
    >
      {children}

      {/* Form inputs */}
      <FormInput
        name="name"
        placeholder="ie. John"
        type="text"
        errors={state?.errors.name}
      />
      {state?.errors.name && <FormErrors errors={state.errors.name} />}
      <FormInput
        name="email"
        placeholder="ie. John@mail.com"
        type="email"
        errors={state?.errors.email}
      />
      {state?.errors.email && <FormErrors errors={state.errors.email} />}
      <FormInput
        name="password"
        placeholder="your secret password"
        type="password"
        errors={state?.errors.password}
      />
      {state?.errors.password && (
        <FormErrors title="Password must:" errors={state.errors.password} />
      )}
      <FormInput
        name="confirm"
        text="Confirm password"
        placeholder="your secret password"
        type="password"
        errors={state?.errors.confirm}
      />
      {state?.errors.confirm && (
        <FormErrors title="Password must:" errors={state.errors.confirm} />
      )}

      <SubmitButton pending={pending} />
    </form>
  );
}

export default SignupForm;
