import { getProjectsForDev } from '@/action/developer.action'
import BrowseProjects from '@/components/BrowseProjects'
import React from 'react'

export type DevProjects=Awaited<ReturnType <typeof getProjectsForDev>>

const BrowseProjectsPage = async () => {
  const devProjects=await getProjectsForDev()
  return (
    <BrowseProjects devProjects={devProjects}/>
  )
}

export default BrowseProjectsPage