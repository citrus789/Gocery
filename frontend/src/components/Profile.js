import ItemCard from "./ItemCard";
export default function Profile({list, setList}) {
    return (
        <div className="profile-page">
            <div className="personal-info">
                <div className="name">

                </div>
                <div className="email">

                </div>
                <div className="address">

                </div>
            </div>
            <div className="grocery-list">
                {
                    list.map((item, index) => (
                        <ItemCard key={index} name={item.name} pricePound={item.pricePound} storeName={item.storeName} rating={item.rating} address={item.adddress} distance={item.distance}/>
                    ))
                }
            </div>
        </div>
    )
}