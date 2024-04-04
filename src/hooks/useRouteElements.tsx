/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Layout from '../components/Layout'
import Auth from '../components/auth/Auth'
import KnrishaIdKnri from '../components/knrishaIdKnri/index'
import ShainIdKnri from '../components/knrishaIdKnri/ShainIdKnri'
import { lsActions } from '../services/common'

function PrivateRoute({ children }: { children?: React.ReactNode }) {
  const isAuthenticated = !!lsActions.getToken()
  return isAuthenticated ? children : <Navigate to='/' />
}

function PublicOnlyRoute() {
  const isAuthenticated = !!lsActions.getToken()
  return isAuthenticated ? <Navigate to='/shainIdKnri' /> : <Outlet />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <PublicOnlyRoute />,
      children: [
        {
          path: '/',
          element: <Auth />
        }
      ]
    },
    {
      path: '/',
      element: (
        <PrivateRoute>
          <Layout>
            <Outlet />
          </Layout>
        </PrivateRoute>
      ),
      children: [
        {
          path: 'shainIdKnri',
          element: <ShainIdKnri />
        },
        {
          path: 'knrishaIdKnri',
          element: <KnrishaIdKnri />
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to='/' />
    }
    // {
    //   path: 'shainIdKnri',
    //   element: <ShainIdKnri />
    // },
    // {
    //   path: 'knrishaIdKnri',
    //   element: <KnrishaIdKnri />
    // }
  ])

  return routeElements
}
