export type TGlobalCSS = Record<string, any>

const globalCss = (props: TGlobalCSS) => {
  return `

    :root {
      --mgen-sidebar-width: 16rem;
      --mgen-outline-width: 16rem;
      --mgen-header-height: 66px;
      --mgen-footer-height: 93px;
    }

    .max-w-screen {
      max-width: 100vw;
    }

    .nav-height-offset {
      top: var(--mgen-header-height);
    }

    .sticky-content {
      max-height: 1px;
      overflow: visible;
    }

    .side-bar-width {
      width: var(--mgen-sidebar-width);
      max-width: var(--mgen-sidebar-width);
    }

    .outline-width {
      order: 9999;
      flex-shrink: 0;
      width: var(--mgen-outline-width);
      max-width: var(--mgen-outline-width);
    }

    .content-center-offset {
      position: relative;
      margin-left: auto;
      margin-right: auto;
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
