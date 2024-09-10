import './global.styles.css'
import { ife } from '@keg-hub/jsutils/ife'
import { Micromark } from '@MG/services/Micromark'



ife(async () => {
  const mm = new Micromark({selector: `#mgen`})
  await mm.init()
})