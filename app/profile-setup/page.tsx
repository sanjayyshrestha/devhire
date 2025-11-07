

import ProfileSetup from '@/components/ProfileSetup'
import { Suspense } from 'react';


export default function ProfileSetupPage() {
  return (
    <Suspense fallback={<ProfileSetupSkeleton/>}>
          <ProfileSetup/>
        </Suspense>
  )
}

function ProfileSetupSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse space-y-4 w-full max-w-md">
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}