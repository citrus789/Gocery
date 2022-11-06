import '../styles/SearchPage.css';
import '../styles/Header.css';
import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import Filters from './Filters';
import Items from './Items';
import {Squash as Hamburger} from 'hamburger-react';
import {push as Push} from 'react-burger-menu';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const aquaticCreatures = [
  { label: 'Shark', value: 'Shark' },
  { label: 'Dolphin', value: 'Dolphin' },
  { label: 'Whale', value: 'Whale' },
  { label: 'Octopus', value: 'Octopus' },
  { label: 'Crab', value: 'Crab' },
  { label: 'Lobster', value: 'Lobster' },
];


function SearchPage({list, setList}) {
  const [open, setOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/dataBackend"
    }).then((res) => {
        let jsonData = res.data;
        setList(jsonData);
        setLoggedIn(true);
    }).catch((_) => {
        setLoggedIn(false);
    });
    setLoggedIn(false);
  }, []);

  function navigateLogin() {
      navigate("/login");
  }
  function handleLogout() {
      axios({
          method: "POST",
          withCredentials: true,
          url: "http://localhost:4000/logoutBackend"
      }).then((res) => {
          if (res.data === true) {
              setLoggedIn(false);
              navigate("/login");
          }
      }).catch((err) => {
          console.log(err);
      })
  }
  function handleProfile() {
    if (profile) {
      setProfile(false);
    } else {
      setProfile(true);
    }
  }
  return (
    <div className="search-page" id="outer-container">
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
        <div className="profile" onClick={() => handleProfile()}>
          <FontAwesomeIcon icon={faUser} size="xl"/>
        </div>
        <div className={profile ? "profile-dropdown-visible" : "profile-dropdown-hidden"}>
          <div className="profile-page">
            Profile
          </div>
          {
            loggedIn &&
            <div className="logout" onClick={() => handleLogout()}>
              Logout
            </div>
          }
          {
            !loggedIn &&
            <div className="login" onClick={() => navigateLogin()}>
              Login
            </div>
          }
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

export default SearchPage;
