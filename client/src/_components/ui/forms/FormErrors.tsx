import React from "react";

type Props = {
  title?: string;
  errors: string[];
};

function FormErrors({ title, errors }: Props) {
  const par = (
    <p className="mx-auto w-4/5 rounded-md bg-rose-400 p-2 text-white">
      {errors}
    </p>
  );
  const errList = (
    <div className="mx-auto w-4/5 rounded-md bg-rose-400 p-2 text-white">
      {title && <p className="font-semibold">{title}</p>}
      <ul>
        {errors.map((err, idx) => (
          <li key={idx} className="ml-3 list-inside list-disc">
            {err}
          </li>
        ))}
      </ul>
    </div>
  );
  return errors.length === 1 ? par : errList;
}

export default FormErrors;
