"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "../../../lib/actions/signup";
import SubmitButton from "@/_components/ui/forms/SubmitButton";
import Link from "next/link";
import FormInput from "@/_components/ui/forms/FormInput";

function Signup() {
  const [state, action] = useFormState(signup, undefined);
  const { pending } = useFormStatus();
  return (
    <div className="mx-auto mt-12 max-w-md">
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
        <FormInput fieldName="name" placeholder="ie. John" type="text" />
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <FormInput
          fieldName="email"
          placeholder="ie. John@mail.com"
          type="email"
        />
        {state?.errors?.name && <p>{state.errors.email}</p>}
        <FormInput
          fieldName="password"
          placeholder="your secret password"
          type="password"
        />
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton pending={pending} />
      </form>
    </div>
  );
}

export default Signup;
