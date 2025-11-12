import React from "react";

export interface ShoeCardProps {

  name: string;
  brand: string;
  price: number;
  size: number;
  color: string;
  imageUrl: string;
}

const ShoeCard: React.FC<ShoeCardProps> = ({
  name,
  brand,
  price,
  size,
  color,
  imageUrl,
}) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm">{brand}</p>
        <p className="text-gray-700 font-bold mt-2">${Number(price).toFixed(2)}</p>
        <p className="text-gray-500 text-sm">Size: {size}</p>
        <p className="text-gray-500 text-sm">Color: {color}</p>
        <button className="mt-3 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ShoeCard;
