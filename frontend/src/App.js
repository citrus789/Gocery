import './App.css';
import './styles/Header.css';
import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import Filters from './components/Filters';
import Items from './components/Items';
import {Squash as Hamburger} from 'hamburger-react';
import {push as Push, slide as Slide} from 'react-burger-menu';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const aquaticCreatures = [
  { label: 'Shark', value: 'Shark' },
  { label: 'Dolphin', value: 'Dolphin' },
  { label: 'Whale', value: 'Whale' },
  { label: 'Octopus', value: 'Octopus' },
  { label: 'Crab', value: 'Crab' },
  { label: 'Lobster', value: 'Lobster' },
];

function App() {
  const [open, setOpen] = useState(true);
  return (
    <div className="App" id="outer-container">
      <div className="header">
        <div className="logo">
          <Hamburger toggled={open} toggle={setOpen}/>        
        </div>
        <div className="search-wrapper">
          <div className="search">
            <Select
              options={aquaticCreatures}
              isMulti={true}
            />
          </div>
          <div className="main-search">
            Search
          </div>
        </div>
        <div className="profile">
          <FontAwesomeIcon icon={faUser}/>
        </div>
      </div>
      <Push noOverlay={true} outerContainerId='outer-container' pageWrapId='page-wrap' width={200} isOpen={open} onClose={() => setOpen(false)} customBurgerIcon={false}>
        <Filters/>
      </Push>
      <div className="content" id="page-wrap">
        <Items open={open}/>
      </div>
    </div>
  );
}

export default App;
