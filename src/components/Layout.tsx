import { Divider } from '@mantine/core'
import { NavLink } from 'react-router-dom'
export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='h-10 flex items-center px-10'>社員ID管理画面</div>
      <Divider className='border-gray-500 w-full' />
      <div className='flex-1 flex'>
        <div className='w-52 p-3'>
          <NavLink className='flex' to='/shainIdKnri'>
            社員ID管理
          </NavLink>
          <NavLink className='flex' to='/knrishaIdKnri'>
            KN利社ID管理
          </NavLink>
        </div>
        <Divider orientation='vertical' className='border-gray-500' />
        {children}
      </div>
    </div>
  )
}
