import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme, GlobalStyles } from './styles/theme';
import Login from './components/Login/Login';
import { store } from './store/store';

const GlobalStyle = createGlobalStyle`${GlobalStyles}`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Login />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
