import axios from "axios";
import React from "react";
import { useUserDetails } from "../Context/AppContext";
import toast from "react-hot-toast";

export interface ShoeCardProps {
  name: string;
  brand: string;
  price: number;
  size: number;
  color: string;
  imageUrl: string;
  categories: string;
  fetchcart:()=>void;
}

const ShoeCard: React.FC<ShoeCardProps> = ({
  name,
  brand,
  price,
  size,
  color,
  imageUrl,
  categories,
  fetchcart
}) => {
  const { user } = useUserDetails();

 async function insertCart() {
  try {
    if (!user) {
      toast.error("User not logged in");
      return;
    }
    

    const payload = {
      user_id: user,
      name,
      brand,
      price,
      color,
      image_url: imageUrl,
      categories,
      size,
    };

    const response = await axios.post(
      "http://localhost:5000/api/cart",
      payload
    );

    if (response.data.success) {
      toast.success("Item added to cart");
      fetchcart()
    } else {
      toast.error(response.data.message || "Failed to add item");
    }
  } catch (err: any) {
    console.error(err);
    toast.error(err.response?.data?.message || "Something went wrong");
  }
}
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={imageUrl} alt={name} className="w-full h-48 object-contain" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm">{brand}</p>
        <p className="text-gray-700 font-bold mt-2">
          ₹{Number(price).toFixed(2)}
        </p>
        <p className="text-gray-500 text-sm">Size: {size}</p>
        <p className="text-gray-500 text-sm">Color: {color}</p>
        <p className="text-gray-500 text-sm">type: {categories}</p>
        <button
          onClick={insertCart}
          className="mt-3 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ShoeCard;
