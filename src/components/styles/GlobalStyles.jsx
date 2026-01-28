import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`

  :root {
    font-family: ${(props) => props.theme.font.font};
    background: ${(props) => props.theme.colors.main.bg};
    color: ${(props) => props.theme.colors.main.primaryText};
    box-sizing: border-box;
    margin: 12px 24px 24px 24px;
  }

  h2 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 24px;
  }


`;