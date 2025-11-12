import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/ImageSlider'
import ShoeCard, { type ShoeCardProps } from '../components/ShoesCard';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Shoe {
  id: number;
  name: string;
  brand: string;
  price: number;
  size: number;
  color: string;
  image_url: string;
}
function Dashboard() {
      const [shoes, setShoes] = useState<Shoe[]>([]);
const images = [
  { id: 1, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" },
  { id: 3, url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735" },
];

useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/shoes");
        setShoes(response.data.shoes);
        console.log(response.data.shoes,"shoes");
        
      } catch (err: any) {
        console.log("Error fetching users");
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
    <Header/>
     <div className="p-6">
      <Carousel images={images} autoSlideInterval={2000} />
    </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {shoes.map((shoe:Shoe) => (
        <ShoeCard
          key={shoe.id}
          name={shoe.name}
          brand={shoe.brand}
          price={shoe.price}
          size={shoe.size}
          color={shoe.color}
          imageUrl={shoe.image_url}
        />
      ))}
    </div>
    </div>
  )
}

export default Dashboard
