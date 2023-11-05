import React from "react";
import "./cart.scss";

interface Props {
  parameter: {
    authorId: number;
    created: string;
    authorName: string;
    locationName: string;
    id: number;
    imageUrl: string;
    locationId: number;
    name: string;
  };
}

function Cart({ parameter }: Props): JSX.Element {
  return (
    <div className="cart">
      <img
        className="cart__img"
        src={`https://test-front.framework.team/${parameter.imageUrl}`}
        alt=""
      />
      <div className="cart__block-info">
        <div className="cart__description">{parameter.name}</div>
        <div className="cart__param">
          <span className="cart__param_fatty">Author:</span>
          {parameter?.authorName === undefined ? "undefined" : ""}
          {parameter?.authorName}
        </div>
        <div className="cart__param">
          <span className="cart__param_fatty">Created:</span>
          {parameter.created}
        </div>
        <div className="cart__param">
          <span className="cart__param_fatty">Location:</span>
          {parameter?.locationName === undefined ? "undefined" : ""}
          {parameter?.locationName}
        </div>
      </div>
    </div>
  );
}

export default Cart;
