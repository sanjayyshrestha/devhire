import { getMyAppliedProjects } from '@/action/developer.action'
import DeveloperApplications from '@/components/DeveloperApplications'
import React from 'react'


export type AppliedProject=Awaited<ReturnType<typeof getMyAppliedProjects>>

const DeveloperApplicationsPage = async () => {
  const applications=await getMyAppliedProjects()
  return (
   <DeveloperApplications applications={applications}/>
  )
}

export default DeveloperApplicationsPage