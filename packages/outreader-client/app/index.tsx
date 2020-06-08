import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './app.global.css';
import { initDb } from './database';
import { DbContext } from './hooks';
import Root from './root';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', async () => {
  const db = await initDb();
  render(
    <AppContainer>
      <DbContext.Provider value={db}>
        <Root />
      </DbContext.Provider>
    </AppContainer>,
    document.getElementById('root')
  );
});
