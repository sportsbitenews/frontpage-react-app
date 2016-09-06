import React from 'react';
import ReactDOM from 'react-dom';

import schema from './schema';
import App from './App';
import './index.css';

ReactDOM.render(
  <App schema={schema}/>,
  document.getElementById('root')
);
