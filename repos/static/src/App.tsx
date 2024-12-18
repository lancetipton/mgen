import routes from '~react-pages'
import { useRoutes } from 'react-router-dom'
import { Layout } from './components/Layout'

const App = () => {
  const content = useRoutes(routes)
  return (
    <Layout
      content={content}
    />
  )
}

export default App
