import { useMGen } from '@MG/contexts/MGenContext'

export type TSiteStyles = {}

export const SiteStyles = (props:TSiteStyles) => {
  const { mg, site } = useMGen()
  const config = mg?.__default?.()

  return (
    <style>
      {config?.css || ``}
      {site?.css || ``}
    </style>
  )
}
