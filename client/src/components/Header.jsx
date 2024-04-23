import React from "react";
import { FaPlay, FaSearch } from "react-icons/fa";
import header from "../assets/Images/banner.png";

const Header = () => {
  const scrollToRecommendFood = () => {
    // Find the "Recommend Food" section by its ID
    const recommendFoodSection = document.getElementById("recommend-food");

    // Scroll to the "Recommend Food" section smoothly
    recommendFoodSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="py-7 px-20 sm:px-6 md:px-8 lg:px-8">
      <div className="container mx-auto py-[16vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
          <div className="lg:w-[32rem] w-full flex flex-col space-y-6">
            <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl ">
              We are <span className="text-[#f54748">Serious</span> For
              <span className="text-[#f54748]"> Fruits </span>&
              <span className="text-[#Fdc55e]"> Delivery </span>
            </div>
            <div className="lg:text-2xl text-[#191919] md-text-lg text-base">
            <span className="text-red-500 font-semibold">Swadisht phalo ka safar</span> ab ek click door! From mango mania to grape goodness, we deliver freshness to your doorstep. Get fruity with us!
            </div>
    
            <div className="flex  gap-8 items-center">
              <button
                className="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white"
                onClick={scrollToRecommendFood} // Call scrollToRecommendFood function when button is clicked
              >
                explore now
              </button>
            
            </div>
          </div>
          <img src={header} className="h-[28rem] mx-auto justify-end" alt="" />
        </div>
      </div>
      {/* Recommend Food section */}
      <div id="recommend-food" className="mt-10 text-center">
        {/* Content of the Recommend Food section */}
      </div>
    </div>
  );
};

export default Header;
