
import { auth } from '@/auth'
import HomeComponent from '@/components/HomeComponent'
import { redirect } from 'next/navigation';
import React from 'react'

const HomePage =async () => {
  const session=await auth();
  if(session?.user) redirect(`/dashboard/${session.user.role.toLocaleLowerCase()}`)
  return (
    <div>
      <HomeComponent/>
    </div>
  )
}

export default HomePage