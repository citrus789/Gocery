import '../styles/Header.css';
import React from 'react';
import Select from 'react-select';
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

export default function Header() {
    return (
        <div className="header">
            <div className="logo">

            </div>
            <div className="search">
                <Select
                    options={aquaticCreatures}
                />
            </div>
            <div className="profile">
                <FontAwesomeIcon icon={faUser}/>
            </div>
        </div>
    )
}