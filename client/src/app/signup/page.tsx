"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "../../../lib/actions/signup";

function Signup() {
  const [state, action] = useFormState(signup, undefined);
  return (
    <div className="mx-auto mt-12 max-w-md">
      <h1 className="text-center text-xl font-semibold">
        You don't have an account yet?
      </h1>
      <form
        action={action}
        className="grid gap-2 rounded-lg border-2 border-teal-500 bg-teal-400 p-2 shadow-md shadow-teal-700"
      >
        <label className="text-center font-semibold" htmlFor="name">
          Name
        </label>
        <input
          className="mx-auto w-4/5 rounded-md border p-1"
          id="name"
          name="name"
          placeholder="Name"
        />
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <label className="text-center font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="mx-auto w-4/5 rounded-md border p-1"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
        {state?.errors?.name && <p>{state.errors.email}</p>}
        <label className="text-center font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="mx-auto w-4/5 rounded-md border p-1"
          id="password"
          name="password"
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
        <SubmitButton />
      </form>
    </div>
  );
}

export default Signup;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="mx-auto w-4/5 rounded-md bg-zinc-600 p-1 text-white hover:bg-zinc-200 hover:text-zinc-600"
    >
      Sign Up
    </button>
  );
}
