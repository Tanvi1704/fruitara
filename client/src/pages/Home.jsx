import React from "react";
import Header from "../components/Header.jsx";
import RecommendedFood from "../components/RecommendedFood.jsx";
import Service from "../components/Service.jsx";
import NewFoods from "../components/NewFoods.jsx";
import Services2 from "../components/Services2.jsx";
import Special from "../components/Special.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <RecommendedFood />
      <Service />
      <NewFoods />
      <Services2 />
      <Special/>
    </>
  );
};

export default Home;
