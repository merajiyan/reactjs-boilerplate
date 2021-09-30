import React from 'react';
import 'style/font.global.css';
import GlobalStyle from 'style/injectGlobal';
import { AppRoute } from 'routes';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppRoute />
    </>
  );
};

export default App;
