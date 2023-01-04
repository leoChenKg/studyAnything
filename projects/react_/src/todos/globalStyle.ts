import { createGlobalStyle } from 'styled-components'

// const devicePixelRatio = window.devicePixelRatio

export const GlobalStyle = createGlobalStyle`
html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img { margin:0; padding:0; }

fieldset, c{ border:none; }

img{display: block;}

address, caption, cite, code, dfn, th, var { font-style:normal; font-weight:normal; }

ul, ol ,li{ list-style:none; }

a { color:#666; text-decoration:none; }

*{box-sizing:border-box}

body,html,#app{
    height: 100%;
}
`
