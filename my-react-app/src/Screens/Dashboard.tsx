import { useEffect, useState } from "react";
import Header from "../components/Header";
import Carousel from "../components/ImageSlider";
import ShoeCard from "../components/ShoesCard";
import axios from "axios";
import { useUserDetails } from "../Context/AppContext";
import CartView from "./CartView";
import CartSummary from "./CartSummary";

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
      console.log(response.data.cart, "cart");
    } catch (err: any) {
      console.log("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchcart();
  }, []);
  return (
    <div>
      <Header  setopencart={setopencart} cart={cart} />
      {opencart ? (
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
      ) : (
              <div className="flex justify-between px-10 py-6">
          
          <div className="w-2/3">
            {cart.map((item) => (
              <CartView
                key={item.id}
                image={item.image_url}
                title={item.name}
                price={item.price}
                size={item.size}
                inStock={true}
                onDelete={() => {
                  console.log("deleted");
                }}
              />
            ))}
          </div>
   <div >
          <CartSummary totalItems={2} totalPrice={233} /></div>
        </div>

      )}
    </div>
  );
}

export default Dashboard;
