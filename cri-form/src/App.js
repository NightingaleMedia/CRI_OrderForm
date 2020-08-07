import React from 'react';
import Header from './components/Header';
import Pane from './components/Pane';
import Billing from './components/sections/Billing';
import './App.css';
import ProgressNodes from './components/ProgressNodes';
import BottomNav from './components/BotttomNav'

function App() {
  return (
    <div className="container-fluid px-0 main-form">
      <div className="row main-row"> 
        <div className="main-block mt-3"> 
          <Header />
          <ProgressNodes /> 
          <Pane sectionTitle="Billing" /> 
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
