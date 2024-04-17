import { createFileRoute } from '@tanstack/react-router'
import {useKindeAuth} from '@kinde-oss/kinde-auth-react'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage
})

function ProfilePage() {
  const {logout,user} = useKindeAuth();
  return (
  <div className="flex flex-col items-center">
    <h1 className="text-4xl font-bold">{user?.given_name}</h1>
    <p className="text-xl">{user?.email}</p>
    <button onClick={() => logout()}>Logout</button>
  </div>
  )
}