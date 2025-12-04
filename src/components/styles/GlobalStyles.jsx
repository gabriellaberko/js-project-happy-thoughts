import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`

  :root {
    font-family: ${(props) => props.theme.font.font};
    background: ${(props) => props.theme.colors.main.bg};
    color: ${(props) => props.theme.colors.main.primaryText};
    box-sizing: border-box;
    margin: 24px;
  }


`;