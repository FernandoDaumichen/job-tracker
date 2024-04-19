import { createFileRoute } from '@tanstack/react-router'
import {useKindeAuth} from '@kinde-oss/kinde-auth-react'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage
})

function ProfilePage() {
  const { logout, user } = useKindeAuth();
  return (
    <div className="flex flex-col items-center  min-h-screen">
      <div className="p-8 rounded-lg shadow-xl bg-white max-w-md text-center">
        <h1 className="text-4xl  text-custom-body-dark-200  mb-2">{user?.given_name}</h1>
        <p className="text-xl text-gray-700 mb-6">{user?.email}</p>
        <button 
          onClick={() => logout()}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}