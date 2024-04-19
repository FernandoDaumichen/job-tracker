import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";


export function Login() {
  const { login, register } = useKindeAuth();
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg bg-white max-w-sm">
        <h1 className="text-4xl  text-custom-body-dark-200 mb-4">Welcome to Expense Tracker</h1>
        <p className="text-xl mb-8 text-gray-700">Please login to continue</p>
        <div className="flex flex-col gap-y-4">
          <button 
            onClick={() => login()}
            className="bg-custom-body-dark-300 text-white text-lg font-semibold py-2 px-4 rounded hover:bg-green-900 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => register()}
            className="bg-gray-300 text-gray-800 text-lg font-semibold py-2 px-4 rounded hover:bg-gray-400 transition-colors"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}


  const Component = () => {
    const { isAuthenticated } = useKindeAuth();
    if (!isAuthenticated) {
      return <Login />;
    }
    return <Outlet />;
  };
  
  export const Route = createFileRoute("/_authenticated")({
    component: Component,
  });