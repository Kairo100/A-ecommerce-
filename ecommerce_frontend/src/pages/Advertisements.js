import React, { useEffect, useState } from 'react';
import { fetchAdvertisements } from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css'; 
import '../css/advertisements.css';

// Function to fetch and set advertisements state
export default function Advertisements() {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const getAdvertisements = async () => {
      try {
        const data = await fetchAdvertisements(); 
        setAdvertisements(data);
      } catch (error) {
        console.error('Failed to load advertisements:', error);
      }
    };
    getAdvertisements();
  }, []);

  // Render the Swiper component with advertisements
  return (
    <div className="advertisements-container">
<Swiper
  spaceBetween={10}
  slidesPerView={1}
  modules={[Autoplay]}
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
  }}
  loop={true}
>
        {advertisements.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div className="advertisement-card">
             <div className='advImg'>
             <img src={`http://127.0.0.1:8000${ad.image}`} alt={ad.title} />
             </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
