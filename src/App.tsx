import useRouteElements from './hooks/useRouteElements'

function App() {
  const routers = useRouteElements()
  return <>{routers}</>
}

export default App
