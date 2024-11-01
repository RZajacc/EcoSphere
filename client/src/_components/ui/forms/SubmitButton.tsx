import React from "react";

type Props = {
  pending: boolean;
  title: string;
};

function SubmitButton({ pending, title }: Props) {
  return (
    <button
      disabled={pending}
      type="submit"
      className="mx-auto my-2 w-4/5 rounded-md bg-zinc-600 p-1 text-white hover:bg-zinc-200 hover:text-zinc-600"
    >
      {title}
    </button>
  );
}

export default SubmitButton;
