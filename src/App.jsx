import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/theme.styled';
import { GlobalStyle } from './components/styles/GlobalStyles';
import { CardContainer } from './components/CardContainer';


export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
      <GlobalStyle />
        <CardContainer />
      </ThemeProvider>
    </>
  )
}
