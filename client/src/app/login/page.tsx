import LoginForm from "@/_components/ui/forms/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

function Login() {
  return (
    <div className="mx-auto mt-8 max-w-md">
      <LoginForm>
        <h1 className="text-center text-xl font-semibold">Login to the app</h1>
      </LoginForm>
    </div>
  );
}

export default Login;
