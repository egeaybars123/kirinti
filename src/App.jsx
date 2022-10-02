import React from 'react';
import {Header, WhatX,Features} from './containers';
import {Navbar} from './components';
import './App.css'
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

const getLibrary =(provider) => {
  return new Web3(provider);
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
          <div className='gradient__bg'>
           <Navbar/>
           <Header/>
           <WhatX/>
         </div>
         
       </div>
    </Web3ReactProvider>
  )
}

export default App