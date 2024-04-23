import React from "react";
import seller from "../assets/Images/seller.png";

const Service = () => {
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
      <div className="container mx-auto py-[2vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
          <img src={seller} alt="" className="h-[28rem] mx-auto justify-end " />
          <div className="w-full md:w-[24rem] flex flex-col space-y-6 justify-between">
            <div className="text-2xl md:text-3xl font-bold text-[#2e2e2e] lg:text-4xl text-right">
              Our <span className="text-[#f54748]"> Service</span> {" "}
              <span className="text-[#fdc55e]"> - FRUITARA</span> 
            </div>
            {/* -------------------- */}
            <div className="lg:text-lg text-[#191919] md:text-base text-sm text-right">
            Welcome to Fruitara, where freshness is our fruitiest pursuit! We're your go-to gurus for all things fruity and fabulous, delivering juicy delights right to your doorstep faster than you can say "banana split"! 🚚 
            Whether you're craving a classic apple or feeling fancy with some exotic mango, we've got the goods to satisfy every fruity whim. Need snacks for the office? We've got you covered with our corporate orders—because who says meetings can't be a-peeling?  Let's make your taste buds sing and your snack time swing with Fruitara! 
            </div>
            <div className="flex gap-8 items-center justify-end">
              <button className="bg-[#f64748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-5 py-2 text-xl font-medium text-white">
                About us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
