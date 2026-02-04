import { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme.styled';
import { GlobalStyle } from './components/styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { LikedThoughts } from './pages/LikedThoughts';
import { useAuthStore } from './stores/authStore';
import { useEffect } from 'react';


export const App = () => {

  const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/liked" element={<LikedThoughts />} />
          </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}
