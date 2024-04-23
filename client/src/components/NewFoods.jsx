import React, { useEffect, useState } from "react";
import { useFoodContext } from "../../context/foodContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Foods from "./Foods";

function NewFoods() {
  const [newfood, setNewFood] = useState([])
  const {food, setFood} = useFoodContext()
  const getFoods = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/food/getNewFoods`
      );
      if (res.data.success) {
        setNewFood(res.data.data.food);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
    getFoods();
  }, [newfood]);
  return (
    <div className="py-3 px-10 sm:px-4 d:px-6 lg:px-6">
      <div className="container mx-auto py-[2vh]">
        <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
          New <span className="text-[#f54748]">Collections</span>
        </div>
        <div className="grid gap-8 py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {
            newfood.map(curElem => <Foods curElem={curElem}/>)
            
          }
        </div>
      </div>
    </div>
  );
}

export default NewFoods;
