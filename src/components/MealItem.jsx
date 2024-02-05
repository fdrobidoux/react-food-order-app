import { useState } from "react";

export default function MealItem({ id, name, price, description, image, addToCartHandle, ...props }) {
  const [] = useState();

  return <div {...props}>
    <article>
      <img src={"http://localhost:3000/" + image} alt={name}/>
      <h3>{name}</h3>
      <span><p className="meal-item-price">${price}</p></span>
      <p className="meal-item-description">{description}</p>
      <div className="meal-item-actions">
        <button className="button" value={id} type="button" onClick={() => addToCartHandle(id)}>Add to Cart</button>
      </div>
    </article>
  </div>;
}