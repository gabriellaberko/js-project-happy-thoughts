import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/theme.styled';
import { GlobalStyle } from './components/styles/GlobalStyles';
import { FormCard } from './components/cards/FormCard';


export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
      <GlobalStyle />
        <h1>Happy Thoughts</h1>
        <FormCard />
      </ThemeProvider>
    </>
  )
}
