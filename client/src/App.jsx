import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Addfood from "./pages/admin/Addfood.jsx";
import Cancel from "./pages/Cancel.jsx";
import FoodPage from "./pages/FoodPage.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Menu from "./pages/Menu.jsx";
import Order from "./pages/Order.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import Success from "./pages/Success.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import ViewCart from "./pages/ViewCart.jsx";
import Footer from "./shared/Footer.jsx";
import Navbar from "./shared/Navbar.jsx";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrder from "./pages/MyOrder.jsx";
import AllOrder from "./pages/admin/AllOrder.jsx";
import RecommendedFood from "./components/RecommendedFood.jsx";

function App() {
  const stripePromise = loadStripe(
    `pk_test_51P2bxzSAAoahtwbwio4iJeiZbw5JlFoby22SvC9BFu9tDGYZOdTFMLnF23xClf80Jt6f8Fqh4bo7FLQZX00TZJjU00ScfaoyR3`
  );
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/recommendedfood" element={<RecommendedFood />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/verifyOtp"
          element={
            <ProtectedRoute>
              <VerifyOtp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addfood"
          element={
            <ProtectedRoute>
              <Addfood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu/:id"
          element={
            <ProtectedRoute>
              <FoodPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewcart"
          element={
            <ProtectedRoute>
              <ViewCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancel"
          element={
            <ProtectedRoute>
              <Cancel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myorder"
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Elements stripe={stripePromise}>
                <Order />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/allorder"
          element={
            <ProtectedRoute>
              <AllOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
