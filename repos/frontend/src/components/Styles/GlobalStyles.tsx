export type TGlobalCSS = Record<string, any>

const globalCss = (props: TGlobalCSS) => {
  return `

    :root {
      --mgen-sidebar-width: 260px;
      --mgen-outline-width: 260px;
      --mgen-header-height: 66px;
    }

    .max-w-screen {
      max-width: 100vw;
    }

    .nav-height-offset {
      top: var(--mgen-header-height);
    }

    .max-content-height {
      max-height: calc(100% - 160px);
    }

    .side-bar-width {
      width: var(--mgen-sidebar-width);
      max-width: var(--mgen-sidebar-width);
    }

    .outline-width {
      width: var(--mgen-outline-width);
      max-width: var(--mgen-outline-width);
    }

    .content-center-offset {
      position: relative;
      left: var(--mgen-sidebar-width);
      max-width: calc(100% - var(--mgen-sidebar-width) - var(--mgen-outline-width));
    }

    body, #root, .mg-app {
      max-width: 100vw;
      min-height: 100vh;
    }
  `
}

export const GlobalStyles = (props: TGlobalCSS) => {
  return <style>{globalCss?.(props) || ``}</style>
}
