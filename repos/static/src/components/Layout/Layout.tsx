import { Nav } from '../Nav'

export type TLayout = {
  content:any
}

export const Layout = (props:TLayout) => {
  
  const {
    content
  } = props
  
  return (
    <div>
      <header>
        <Nav />
      </header>
      <main>
        {content}
      </main>
    </div>
  )
}