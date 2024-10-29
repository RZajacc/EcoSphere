import React from "react";
import Link from "next/link";
import SignupForm from "@/_components/ui/forms/SignupForm";

function Signup() {
  return (
    <div className="mx-auto mt-8 max-w-md">
      <SignupForm>
        <h1 className="text-center text-xl font-bold">Sign up</h1>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-teal-600" href={"/login"}>
            Log in
          </Link>
        </p>
      </SignupForm>
    </div>
  );
}

export default Signup;
