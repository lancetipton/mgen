import type { ReactNode } from "react"
import type { ExtraProps } from 'react-markdown'

import "@nuclent/schema-viewer/dist/style.css"
import { Lightbox } from '@MG/components/Lightbox'
import { FlowWrapper } from "@nuclent/schema-viewer"

import { useMemo } from 'react'
import { parseJSON } from "@keg-hub/jsutils/parseJSON"

export type TSchema = ExtraProps & {
  className?:string
  children?:ReactNode
}

export const Schema = (props:TSchema) => {

  const data = useMemo(() => parseJSON(props.children as string, false), [props.children])

  return (
    <Lightbox manual backdrop={false} >
      <FlowWrapper
        data={data}
        toolbar={false}
        //legend={false}
        //minimap={false}
        //controls={false}
        background={`dots`}
        edgeType={`smoothstep`}
      />
    </Lightbox>
  )
}

export default Schema