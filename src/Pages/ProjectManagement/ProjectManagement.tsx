import React from 'react'
import Menu from '../../Components/Menu/Menu'
import ProjectList from '../../Components/ProjectList/ProjectList'

type Props = {}

export default function ProjectManagement({}: Props) {
  return (
    <div className='jira'>

        <Menu/>
        <div className='main'>
            <div className='mb-4'>
                <ProjectList/>
            </div>
        </div>
    </div>
  )
}