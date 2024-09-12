import './global.styles.css'
import { ife } from '@keg-hub/jsutils/ife'
import { MGen } from '@MG/services/MGen'



ife(async () => {
  const mm = new MGen({selector: `#mgen`})
  await mm.init()
})