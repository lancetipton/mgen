import { Button } from '@MG/components/Button'
import { Loading } from '@MG/components/Loading'
import { MGenId } from '@MG/constants/constants'
import { useMGen } from '@MG/contexts/MGenContext'

export type TApp = {}

const App = (props:TApp) => {

  const { mm } = useMGen()

  return !mm
    ? (<Loading text={`Loading`} />)
    : (
      <div>
        <Button>Button</Button>
        <article className="prose prose-a:text-blue-600 hover:prose-a:text-blue-500" id={MGenId} >Test</article>
      </div>
      )
}

export default App

