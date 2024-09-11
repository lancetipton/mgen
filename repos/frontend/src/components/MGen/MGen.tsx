
import { useEffect, useRef } from 'react'
import { ife } from '@keg-hub/jsutils/ife'
import { Micromark } from '@MG/services/Micromark'

export type TMGen = {}

export const MGen = (props:TMGen) => {
  const mmRef = useRef<Micromark>()
  
  
  useEffect(() => {
    if(mmRef.current) return

    ife(async () => {
      mmRef.current = new Micromark({selector: `#mgen`})
      await mmRef.current.init()
    })

  }, [])

  return (
    <div id='mgen' />
  )

}