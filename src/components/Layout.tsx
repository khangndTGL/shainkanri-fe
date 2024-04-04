import { Button, Divider } from '@mantine/core'
import { NavLink, useNavigate } from 'react-router-dom'
import { lsActions } from '../services/common'
export default function Layout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='flex-1 flex'>
        <div className='w-52 p-3 flex-none flex flex-col bg-[#373737] gap-4'>
          <div className='flex-1 flex flex-col gap-4'>
            <NavLink
              to='/shainIdKnri'
              className={({ isActive }) =>
                `px-4 py-3 group text-[#ffffff] font-medium flex items-center gap-2 rounded-lg no-underline text-sm ${
                  isActive ? 'active bg-[#ffffff18]' : ''
                }`
              }
            >
              <div className='h-2 w-2 rounded-full bg-white group-[.active]:bg-blue-500' />
              社員ID管理
            </NavLink>
            <NavLink
              to='/knrishaIdKnri'
              className={({ isActive }) =>
                `px-4 py-3 text-[#ffffff] group font-medium flex items-center gap-2 rounded-lg no-underline text-sm ${
                  isActive ? 'active bg-[#ffffff18]' : ''
                }`
              }
            >
              <div className='h-2 w-2 rounded-full bg-white group-[.active]:bg-blue-500' />
              管理者ID
            </NavLink>
          </div>
          <Button
            variant='filled'
            color='red'
            onClick={() => {
              lsActions.clearLS()
              navigate('/')
            }}
          >
            ログアウト
          </Button>
        </div>
        <Divider orientation='vertical' className='border-gray-500' />
        {children}
      </div>
    </div>
  )
}
