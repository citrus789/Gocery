import ItemCard from "./ItemCard";
import '../styles/Header.css';
import '../styles/Profile.css';
import '../styles/SearchPage.css';
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";
export default function Profile({list, setList, loggedIn, setLoggedIn}) {
    const [profile, setProfile] = useState(false);
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        console.log("profile");
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/dataBackend"
        }).then((res) => {
            console.log(res.data);
            setEmail(res.data.username);
            setAddress(res.data.address);
            setList(res.data.data);
            setLoading(false);
            setLoggedIn(true);
        }).catch((_) => {
            setLoggedIn(false);
            setList([]);
        });
        setLoading(false);
    }, []);
    function handleProfile() {
        if (profile) {
          setProfile(false);
        } else {
          setProfile(true);
        }
    }
    function navigateLogin() {
        navigate("/login");
    }
    function navigateSearch() {
        navigate("/");
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
    return (
        <div className="user">
            <div className="header">
                <div className="logo" onClick={() => navigateSearch()}>
                    <FontAwesomeIcon icon={faHouse} size="xl"/>      
                </div>
                <div className="profile-title">
                    <h2>
                        Profile
                    </h2>
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
            { !loading &&
                <div className="profile-content">
                    <div className="grocery-list">
                        <h3 style={{marginLeft: "15px"}}>
                            My Info
                        </h3>
                        <div className="email">
                            Email: {email}
                        </div>
                        <div className="address-personal">
                            Address: {address}
                        </div>
                        <h3 style={{marginLeft: "15px"}}>
                            My Shopping List
                        </h3>
                        {
                            list.map((item, index) => (
                                <ItemCard index={index} key={index} name={item.name} pricePound={item.pricePound} storeName={item.storeName} rating={item.rating} address={item.address} distance={item.distance} image={item.image} profile={true} list={list} setList={setList} />
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}