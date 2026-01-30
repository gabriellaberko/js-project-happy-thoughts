import { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme.styled';
import { GlobalStyle } from './components/styles/GlobalStyles';
import { CardContainer } from './components/CardContainer';
import { useAuthStore } from './stores/authStore';
import { useEffect } from 'react';


export const App = () => {

  const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
  
  return (
    <>
      <ThemeProvider theme={theme}>
      <GlobalStyle />
        <CardContainer />
      </ThemeProvider>
    </>
  )
}
