import React from "react";

type Props = {
  pending: boolean;
};

function SubmitButton({ pending }: Props) {
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

export default SubmitButton;
