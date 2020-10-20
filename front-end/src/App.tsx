import React from 'react';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

import Routes from './routes'

function App() {
  console.log(process.env.REACT_APP_MAPBOX_TOKEN)

  return (
    <Routes/>
  );
}

export default App;
