import { useEffect, useState } from "react";
import Header from "../components/Header";
import Carousel from "../components/ImageSlider";
import ShoeCard from "../components/ShoesCard";
import axios from "axios";
import { useUserDetails } from "../Context/AppContext";
import CartView from "./CartView";
import CartSummary from "./CartSummary";
import toast from "react-hot-toast";

interface Shoe {
  id: number;
  name: string;
  brand: string;
  price: number;
  size: number;
  color: string;
  image_url: string;
  categories: string;
}
function Dashboard() {
  const { user } = useUserDetails();
  console.log(user, "user");
  const [opencart, setopencart] = useState<boolean>(false);
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [cart, setcart] = useState<any[]>([]);
  const [itemsWithPrice, setitemsWithPrice] = useState<{
    totalItems: number;
    totalPrice: number;
  }>({
    totalItems: 0,
    totalPrice: 0,
  });
  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    },
  ];
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/shoes");
      setShoes(response.data.shoes);
      console.log(response.data.shoes, "shoes");
    } catch (err: any) {
      console.log("Error fetching users");
    }
  };
  const fetchcart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${user}`
      );
      setcart(response.data.cart);
      setitemsWithPrice({
        totalItems: response.data.totalItems,
        totalPrice: response.data.totalPrice,
      });
    } catch (err: any) {
      console.log("Error fetching users");
    }
  };
  useEffect(() => {
    console.log("Cart", cart);
  }, [cart]);
  const handelDelete = async (item: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/delete/${item.id}`
      );
      console.log("response", response);
      fetchcart();
      toast.success("succefully deleted the item");
    } catch (error) {
      toast.error("failed to delete the item ");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchcart();
  }, []);
  return (
    <div>
      <Header setopencart={setopencart} cart={cart} />
      {opencart ? (
      <div
  className={`flex flex-col md:flex-row px-4 md:px-10 py-6 gap-6
    ${cart.length === 0 ? "justify-center items-center min-h-screen" : "justify-between"}
  `}
>
  {cart.length === 0 ? (
    <div className="flex flex-col items-center justify-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
        alt="Delivery Truck"
        className="w-32 mx-auto mb-5 animate-float transition-transform duration-300 hover:scale-110"
      />
      <p className="text-gray-600 text-lg font-semibold">Your cart is empty</p>
    </div>
  ) : (
    <>
      <div className="w-2/3">
        {cart.map((item) => (
          <CartView
            key={item.id}
            image={item.image_url}
            title={item.name}
            price={item.price}
            size={item.size}
            inStock={true}
            onDelete={() => handelDelete(item)}
          />
        ))}
      </div>

      <div>
        <CartSummary
          totalItems={itemsWithPrice?.totalItems}
          totalPrice={itemsWithPrice?.totalPrice}
        />
      </div>
    </>
  )}
</div>

      ) : (
        <>
          <div className="p-6">
            <Carousel images={images} autoSlideInterval={2000} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {shoes.map((shoe: Shoe) => (
              <ShoeCard
                fetchcart={fetchcart}
                key={shoe.id}
                name={shoe.name}
                brand={shoe.brand}
                price={shoe.price}
                size={shoe.size}
                color={shoe.color}
                imageUrl={shoe.image_url}
                categories={shoe.categories}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
