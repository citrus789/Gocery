import '../styles/Filters.css';
import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Rating } from 'react-simple-star-rating'

export default function Filters() {
    const [distance, setDistance] = useState(10);
    const [cost, setCost] = useState(100);
    const [rating, setRating] = useState(0);
    const onPointerMove = (value, index) => console.log(value, index)

    return (
        <div className="filters">
            <div className="filter-section">
                <div className="filter-title">
                    <p>
                        Distance: 
                    </p>
                    <input min="0" type="number" step={0.5} value={distance} onChange={(event) => setDistance(event.currentTarget.value)} className="input-number"/>
                    <p>
                        km
                    </p>
                </div>
                <Slider 
                    min={0} 
                    max={50} 
                    step={0.5}
                    value={distance} 
                    onChange={(value) => setDistance(value)}
                    railStyle={{
                        height: 9,
                        backgroundColor: "lightgray"
                    }}
                    handleStyle={{
                        height: 24,
                        width: 24,
                        marginLeft: 0,
                        marginTop: -8,
                        backgroundColor: "red",
                        border: 0
                    }}
                    trackStyle={{
                        background: "none"
                    }}
                />
            </div>
            <div className="filter-section">
                <div className="filter-title">
                    <p>
                        Price: $
                    </p>
                    <input min="0" type="number" step={0.5} value={cost} onChange={(event) => setCost(event.currentTarget.value)} className="input-number"/>
                    <p>
                        
                    </p>
                </div>
                <Slider 
                    min={0} 
                    max={200} 
                    step={0.5}
                    value={cost} 
                    onChange={(value) => setCost(value)}
                    railStyle={{
                        height: 9,
                        backgroundColor: "lightgray"
                    }}
                    handleStyle={{
                        height: 24,
                        width: 24,
                        marginLeft: 0,
                        marginTop: -8,
                        backgroundColor: "red",
                        border: 0
                    }}
                    trackStyle={{
                        background: "none"
                    }}
                />
            </div>
            <div className="filter-section">
                <div className="filter-title">
                    <p>
                        Rating: 
                    </p>
                    <input min="0" type="number" step={0.5} value={rating} onChange={(event) => setRating(event.currentTarget.value)} className="input-number"/>
                </div>
                <Rating
                    allowFraction={true}
                    initialValue={rating}
                    size={33}
                    onClick={(rate) => setRating(rate)}
                />
            </div>
            <div className="filter-search">
                Search
            </div>
        </div>
    )
}