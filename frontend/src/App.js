import React, {useState} from 'react';
import SearchPage from './components/SearchPage';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import {
    Routes,
    Route
} from 'react-router-dom';
import './App.css';
export default function App() {
    const [list, setList] = useState([]);  
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div id="App">
            <Routes>
                <Route key={0} path="/" element={ <SearchPage list={list} setList={setList} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> } />
                <Route key={1} path="/login" element={ <Login /> } />
                <Route key={2} path="/profile" element={ <Profile list={list} setList={setList} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> } />
                <Route key={3} path="/register" element={ <Register/> } />
            </Routes>
        </div>
    )
}