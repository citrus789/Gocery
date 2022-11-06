import React, {useState, useEffect} from 'react';
import { Rating } from 'react-simple-star-rating';
import "../styles/ItemCard.css";
import axios from 'axios';
import { faCartArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ItemCard({index, name, pricePound, storeName, distance, address, rating, image, list, setList, profile}) {
    const [rate, setRate] = useState(rating);
    const [alreadyAdded, setAdded] = useState(false);
    const [success, setSuccess] = useState(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        setRate(rating);
    }, []);
    function compareItem(item1, item2) {
        if (
            item1.name === item2.name &&
            item1.storeName === item2.storeName &&
            item1.pricePound === item2.pricePound &&
            item1.address === item2.address &&
            item1.distance === item2.distance &&
            item1.rating === item2.rating
        ) {
            return true;
        }
        return false;
    }
    function addToList(item) {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/dataBackend"
        }).then((res) => {
            let exists = false;
            for (let i = 0; i < res.data.data.length; i++) {
                if (compareItem(item, res.data.data[i])) {
                    setAdded(true);
                    setTimeout(() => {
                        setAdded(false);
                    }, 2000);
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                let tempList = [...list];
                tempList.push(item);
                setList(tempList);
                axios({
                    method: "POST",
                    withCredentials: true,
                    url: "http://localhost:4000/updateBackend",
                    data: tempList
                }).then((res) => {
                    console.log(res);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 2000);
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
        
    }
    function deleteFromList() {
        let tempList = [...list]
        tempList.splice(index, 1);
        setDeleted(true);

        setTimeout(() => {
            setList(tempList);
            setDeleted(false);
        }, 500);
        axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:4000/updateBackend",
            data: tempList
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <div className={deleted ? "card deleted" : "card"}>
            <div className="left">
                <div className="image">
                    <img src={image}/>
                </div>
                <div className="description">
                    <div className="title">
                        <div className="name">
                            {name}
                        </div>
                        <div className="price">
                            ${pricePound} / lb
                        </div>
                    </div>
                    <div className="rating">
                        <Rating
                            allowFraction={true}
                            initialValue={rate}
                            readonly={true}
                            size={25}
                            onClick={(rate) => setRate(rate)}
                        />
                    </div>
                    <div className="store">
                        <div className="store-name">
                            {storeName}
                        </div>
                        <div className="distance">
                            {distance} km
                        </div>
                    </div>
                    <div className="address">
                        {address}
                    </div>
                </div>
            </div>
            <div className={alreadyAdded === true ? 'added error-visible' : 'added error-hidden'}>
                Item Added
            </div>
            <div className={success === true ? 'success error-visible2' : 'success error-hidden'}>
                Successful
            </div>
            {
                !profile &&
                <div className="add-cart" onClick={() => addToList({
                    "name": name,
                    "pricePound": pricePound,
                    "storeName": storeName,
                    "distance": distance,
                    "address": address,
                    "rating": rating,
                    "image": image
                })}>
                    <FontAwesomeIcon icon={faCartArrowDown} size="xl"/>
                </div>
            }
            {
                profile &&
                <div className="delete-item" onClick={() => deleteFromList()}>
                    <FontAwesomeIcon icon={faTrash} size="xl"/>
                </div>
            }
            
        </div>
    )
}