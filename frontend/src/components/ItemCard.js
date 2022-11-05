import React, {useState, useEffect} from 'react';
import { Rating } from 'react-simple-star-rating';
import "../styles/ItemCard.css";
export default function ItemCard({name, pricePound, storeName, distance, address, rating}) {
    const [rate, setRate] = useState(rating);
    useEffect(() => {
        setRate(rating);
    }, []);
    return (
        <div className="card">
            <div className="image">

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
    )
}