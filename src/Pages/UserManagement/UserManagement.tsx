import React from 'react'
import UserList from '../../Components/UserList/UserList'
import Menu from '../../Components/Menu/Menu'

type Props = {}

export default function UserManagement({}: Props) {
  return (
    <div className='jira'>
        <Menu/>
        <div className='main'>
            <div className='mb-4'>
                <UserList/>
            </div>
        </div>
    </div>
  )
}