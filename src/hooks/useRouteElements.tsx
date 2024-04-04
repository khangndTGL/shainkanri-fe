import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import KnrishaIdKnri from '../components/knrishaIdKnri/KnrishaIdKnri'
import ShainIdKnri from '../components/shainIdKnri/ShainIdKnri'
import { lsActions } from '../services/common'

function PrivateRoute() {
  const isAuthenticated = !!lsActions.getToken()
  console.log('private route', lsActions.getToken())
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function PublicOnlyRoute() {
  const isAuthenticated = !!lsActions.getToken()
  console.log('public only route', lsActions.getToken())
  return isAuthenticated ? <Navigate to='/shainIdKnri' /> : <Outlet />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    // {
    //   path: '/',
    //   element: <PublicOnlyRoute />,
    //   children: [
    //     {
    //       path: '/',
    //       element: <Auth />
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   element: <PrivateRoute />,
    //   children: [
    //     {
    //       path: 'shainIdKnri',
    //       element: <ShainIdKnri />
    //     },
    //     {
    //       path: 'knrishaIdKnri',
    //       element: <KnrishaIdKnri />
    //     }
    //   ]
    // },
    // {
    //   path: '*',
    //   element: <Navigate to='/' />
    // }

    {
      path: 'shainIdKnri',
      element: <ShainIdKnri />
    },
    {
      path: 'knrishaIdKnri',
      element: <KnrishaIdKnri />
    }
  ])

  return routeElements
}
