import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/places')
      .then(response => {
        setPlaces(response.data);
      });
  }, []);

  return (
    <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8'>
      {places.length > 0 && places.map((place, index) => (
        <Link key={index} to={'/Place/' + place._id}>
          <div className='bg-gray-500 rounded-2xl flex'>
            {place.photos?.[0] && (
              <img 
                className='rounded-2xl object-cover aspect-square'
                src={'http://localhost:4000/uploads/' + place.photos?.[0]} 
                alt={`Place ${index}`}
              />
            )}            
          </div>          
          <h3 className='text-sm font-bold'> {place.address} </h3>
          <h2 className='text-sm text-gray-500'>{place.title}</h2>
          <div className='mt-1'>
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
};

export default IndexPage;
