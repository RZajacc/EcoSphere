"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "../../../lib/actions/signup";
import SubmitButton from "@/_components/ui/forms/SubmitButton";
import Link from "next/link";
import FormInput from "@/_components/ui/forms/FormInput";
import FormErrors from "@/_components/ui/forms/FormErrors";

function Signup() {
  const [state, action] = useFormState(signup, undefined);
  const { pending } = useFormStatus();

  console.log(state?.errors.email);
  return (
    <div className="mx-auto mt-8 max-w-md">
      <form
        action={action}
        className="grid gap-2 rounded-lg border-2 border-teal-500 p-2 shadow-md shadow-teal-700"
      >
        <h1 className="text-center text-xl font-bold">Sign up</h1>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-teal-600" href={"/login"}>
            Log in
          </Link>
        </p>

        {/* Form inputs */}
        <FormInput
          label="name"
          title="Name:"
          placeholder="ie. John"
          type="text"
          errors={state?.errors.name}
        />
        {state?.errors.name && <FormErrors errors={state.errors.name} />}
        <FormInput
          label="email"
          title="Email"
          placeholder="ie. John@mail.com"
          type="email"
          errors={state?.errors.email}
        />
        {state?.errors.email && <FormErrors errors={state.errors.email} />}
        <FormInput
          label="password"
          title="Password:"
          placeholder="your secret password"
          type="password"
          errors={state?.errors.password}
        />
        {state?.errors.password && (
          <FormErrors title="Password must:" errors={state.errors.password} />
        )}
        <FormInput
          label="confirm"
          title="Confirm password:"
          placeholder="your secret password"
          type="password"
          errors={state?.errors.confirm}
        />
        {state?.errors.confirm && (
          <FormErrors title="Password must:" errors={state.errors.confirm} />
        )}

        <SubmitButton pending={pending} />
      </form>
    </div>
  );
}

export default Signup;
