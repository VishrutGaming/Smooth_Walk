import React from "react";

type CartItemProps = {
  image: string;
  title: string;
  price: number;
  size: string;
  inStock: boolean;

  onDelete: () => void;
};

const CartView: React.FC<CartItemProps> = ({
  image,
  title,
  price,
  size,
  inStock,

  onDelete,
}) => {
  return (
    <div className="flex border-b py-6 gap-6">
      <img src={image} className="w-40 h-40 object-contain rounded" />

      <div className="flex-1">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="text-green-600 font-medium">
          {inStock ? "In stock" : "Out of stock"}
        </p>

        <p className="text-sm text-gray-600">Size: {size}</p>

        <div className="text-xl font-bold mt-2">₹{price.toLocaleString()}</div>

        <div className="flex gap-4 mt-4 text-blue-600 cursor-pointer">
          <span onClick={onDelete} className="hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" 
     className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800"
     fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
        d="M6 7h12M9 7V4h6v3m-7 4v7m4-7v7m4-7v7M4 7h16l-1 13a2 2 0 01-2 2H7a2 2 0 01-2-2L4 7z" />
</svg>

          </span>
        </div>
      </div>
    </div>
  );
};

export default CartView;
