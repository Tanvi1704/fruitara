import React, { useEffect, useState } from 'react'
import { useFoodContext } from '../../context/foodContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Foods from './Foods';

function Special() {
  const [specialfood, setSpecialFood] = useState([])
  const {food, setFood} = useFoodContext()
  const getFoods = async () => {
    try {
      const res = await axios.get(
        `https://fruitara.vercel.app/api/v1/food/specialFoods`
      );
      if (res.data.success) {
        setSpecialFood(res.data.data.food);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
    getFoods();
  }, [specialfood]);
  return (
    <div className="py-3 px-10 sm:px-4 d:px-6 lg:px-6">
    <div className="container mx-auto py-[2vh]">
      <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
        Seasonal <span className="text-[#f54748]">Fruits</span>
      </div>
         <div className="grid gap-8 py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {
            specialfood.map(curElem => <Foods curElem={curElem}/>)
            
          }
        </div>
    </div>
  </div>
  )
}

export default Special
