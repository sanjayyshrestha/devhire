

import { getUser } from '@/action/user.action'
import Auth from '@/components/Auth'
import { redirect } from 'next/navigation';
import React from 'react'

const AuthPage = async () => {
  const user=await getUser();
  if(user) redirect('/');
  return (
    <div>
      <Auth/>
    </div>
  )
}

export default AuthPage