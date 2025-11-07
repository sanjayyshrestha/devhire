import RoleSelect from '@/components/RoleSelect'
import { Suspense } from 'react'

function RoleSelectSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-pulse">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>

        {/* Role cards skeleton */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              {/* Icon skeleton */}
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              
              {/* Title skeleton */}
              <div className="h-7 bg-gray-200 rounded w-2/3 mx-auto mb-3"></div>
              
              {/* Description skeleton */}
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
              </div>
              
              {/* Button skeleton */}
              <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
            </div>
          ))}
        </div>

        {/* Footer text skeleton */}
        <div className="text-center">
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}

export default function SelectRolePage() {
  return (
    <Suspense fallback={<RoleSelectSkeleton />}>
      <RoleSelect/>
    </Suspense>
  )
}