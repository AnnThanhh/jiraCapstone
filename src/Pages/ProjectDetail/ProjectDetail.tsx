import React from 'react'
import Menu from '../../Components/Menu/Menu'
import Board from '../../Components/Board/Board'

type Props = {}

export default function ProjectDetail({}: Props) {
  return (
    <div className='jira'>
      <Menu/>
      <div className='main'>
        <div className='mb-4'>
          <Board/>
        </div>
      </div>
    </div>
  )
}