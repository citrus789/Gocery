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
        rating: "5",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Local_Orange_Variety_of_Kozan_-_Kozan_Yerli_Portakal_04.jpg"
    },
    {
        name: "Cauliflower",
        pricePound: "1.50",
        storeName: "Loblaws",
        distance: "2.3",
        address: "396 St Clair Ave W, Toronto, ON M5P 3N3",
        rating: "5",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Cauliflower_heads_on_a_shelf.jpg"
    },
    {
        name: "Carrots",
        pricePound: "0.90",
        storeName: "Loblaws",
        distance: "2.3",
        address: "396 St Clair Ave W, Toronto, ON M5P 3N3",
        rating: "3.5",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Starr-070730-7894-Daucus_carota_subsp_sativus-in_store-Foodland_Pukalani-Maui_%2824522940419%29.jpg"
    }
]
export default function Items({open, items, list, setList}) {
    const [products, setItems] = useState([]);
    const [width, setWidth] = useState("calc(100% - 200px");

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
                        image={item.image}
                        list={list}
                        setList={setList}
                    />
                ))
            }
        </div>
    )
}