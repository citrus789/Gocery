import { useEffect, useState } from 'react';
import '../styles/Items.css';
import ItemCard from './ItemCard';
const products = [
    {
        name: "Oranges",
        pricePound: "1.20",
        storeName: "Loblaws",
        distance: "2.3",
        address: "396 St Clair Ave W, Toronto, ON M5P 3N3",
        rating: "5"
    },
    {
        name: "Cauliflower",
        pricePound: "1.50",
        storeName: "Loblaws",
        distance: "2.3",
        address: "396 St Clair Ave W, Toronto, ON M5P 3N3",
        rating: "5"
    },
    {
        name: "Onion",
        pricePound: "0.90",
        storeName: "Loblaws",
        distance: "2.3",
        address: "396 St Clair Ave W, Toronto, ON M5P 3N3",
        rating: "3.5"
    }
]
export default function Items({open}) {
    const [items, setItems] = useState([]);
    const [width, setWidth] = useState("calc(100% - 200px");
    useEffect(() => {
        setItems(products);
    }, []);
    useEffect(() => {
        if (open) {
            setWidth("calc(100% - 200px");
        } else {
            setWidth("100%");
        }
    }, [open])
    return (
        <div className="items" style={{width: width, transition: "0.5s"}}>
            {
                items.map((item, index) => (
                    <ItemCard 
                        key={index}
                        name={item.name}
                        pricePound={item.pricePound}
                        storeName={item.storeName}
                        distance={item.distance}
                        address={item.address}
                        rating={item.rating}
                    />
                ))
            }
        </div>
    )
}