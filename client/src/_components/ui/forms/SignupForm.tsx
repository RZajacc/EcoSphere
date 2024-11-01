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

  // Computed values
  const validationErrors = state && "errors" in state && state.errors;
  const apiError = state && "msg" in state && state.msg;

  return (
    <form
      action={action}
      className="grid gap-2 rounded-lg border-2 border-teal-500 p-2 shadow-md shadow-teal-700"
    >
      {children}

      {/* Form inputs and field validation*/}
      <FormInput
        name="name"
        placeholder="ie. John"
        type="text"
        errors={validationErrors ? validationErrors.name : undefined}
      />
      {validationErrors && validationErrors.name && (
        <FormErrors errors={validationErrors.name} />
      )}
      <FormInput
        name="email"
        placeholder="ie. John@mail.com"
        type="email"
        errors={validationErrors ? validationErrors.email : undefined}
      />
      {validationErrors && validationErrors.email && (
        <FormErrors errors={validationErrors.email} />
      )}
      <FormInput
        name="password"
        placeholder="your secret password"
        type="password"
        errors={validationErrors ? validationErrors.password : undefined}
      />
      {validationErrors && validationErrors.password && (
        <FormErrors title="Password must:" errors={validationErrors.password} />
      )}
      <FormInput
        name="confirm"
        text="Confirm password"
        placeholder="your secret password"
        type="password"
        errors={validationErrors ? validationErrors.confirm : undefined}
      />
      {validationErrors && validationErrors.confirm && (
        <FormErrors title="Password must:" errors={validationErrors.confirm} />
      )}

      {/* Error coming from the api after validation is complete */}
      {apiError && <FormErrors errors={[apiError]} />}

      <SubmitButton title="Sign up" pending={pending} />
    </form>
  );
}

export default SignupForm;
