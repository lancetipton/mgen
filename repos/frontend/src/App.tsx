import { Toaster } from 'sonner'
import { cls } from '@keg-hub/jsutils/cls'
import { Layout } from '@MG/components/Layout'
import { MGContent } from '@MG/components/MGContent'


export type TApp = {}

const App = (props:TApp) => {

  return (
    <div className={cls(`mg-app`, `min-h-screen`, `w-screen max-w-screen`)} >
      <Toaster />
      <Layout />
    </div>
  )
}

export default App

