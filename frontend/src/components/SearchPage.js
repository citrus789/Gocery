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


function SearchPage({list, setList, loggedIn, setLoggedIn}) {
  const [open, setOpen] = useState(true);
  const [profile, setProfile] = useState(false);
  const [keywords, setKeywords] = useState([]);

  const [distance, setDistance] = useState(10);
  const [cost, setCost] = useState(100);
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/dataBackend"
    }).then((res) => {
        let jsonData = res.data;
        console.log(jsonData);
        setList(jsonData.data);
        setLoggedIn(true);
    }).catch((_) => {
        setLoggedIn(false);
    });
    setLoggedIn(false);
  }, []);

  function navigateLogin() {
      navigate("/login");
  }
  function navigateProfile() {
    navigate("/profile");
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
  function handleSearch() {
    var words = [];
    for (let i = 0; i < keywords.length; i++) {
      words.push(keywords[i].value);
    }
    var request = {}
    request["keywords"] = words;
    request["price"] = cost;
    request["distance"] = distance;
    request["rating"] = rating;

    console.log(request);
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
              onChange={opt => setKeywords(opt)}
            />
          </div>
          <div className="main-search" onClick={() => handleSearch()}>
            Search
          </div>
        </div>
        <div className="profile" onClick={() => handleProfile()}>
          <FontAwesomeIcon icon={faUser} size="xl"/>
        </div>
        <div className={profile ? "profile-dropdown-visible" : "profile-dropdown-hidden"}>
          <div className="profile-page" onClick={() => navigateProfile()}>
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
        <Filters handleSearch={handleSearch} distance={distance} setDistance={setDistance} cost={cost} setCost={setCost} rating={rating} setRating={setRating}/>
      </Push>
      <div className="content" id="page-wrap">
        <Items open={open} list={list} setList={setList}/>
      </div>
    </div>
  );
}

export default SearchPage;
