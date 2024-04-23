import React, { useEffect, useState } from 'react'
import {useUserContext} from '../../../context/userContext'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

function AllOrder() {
  const [order, getOrders] = useState([]);
  const {user, setUser} = useUserContext();

  const getAllOrders = async () => {
    try{
      const res = await axios.post("https://fruitara.vercel.app/api/v1/order/getorders", {
        userId : user?.user._id,
        token : localStorage.getItem("token")
      }, {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
      
      if(res.data.success){
        getOrders(res.data.data);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [order])
  return (
    <div className="pt-14">
      <div className={
        order?.length === 0 ? "bg-gray-100 h-96" : "bg-gray-100"
      }>

        <div className="container mx-auto py-6">
          <div className="bg-white px-10 py-5 text-black rounded-md">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">My Orders</h1>
            </div>
            <div className="mt-10 flex mb-5">
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">
                Food Details
              </h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-1/5">
                Payment
              </h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-1/5">
                Status
              </h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-1/5">
                Action
              </h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-1/5">
                Date
              </h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase w-1/5">
                Total Price
              </h3>
            </div>
            {
              order?.map((order) => {
                return(
                  <OrderFoods
                    key={order._id}
                    order={order}
                    />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllOrder

const OrderFoods = ({order}) => {
  const {user, setUser} = useUserContext();
  const handleDelivered = async (id) => {
    try{
      const res = await axios.post("https://fruitara.vercel.app/api/v1/order/delivered", {
        userId : user?.user._id,
        orderId:id,
        token : localStorage.getItem("token")
      }, {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
      
      if(res.data.success){
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message)
      }
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
      <div className="flex w-2/5">
        <div className="grid grid-cols-3">
          {
            order?.items?.map((item) => <div className="flex flex-col justify-between ml-4 flex-grow">
              <div>
                <img className='h-20' src={item?.food?.foodImage} alt="" />
              </div>
              <span className="font-bold text-sm">{item?.food?.name}</span>
              <span className="flex items-center space-x-4">
                qty : 
                <span className='text-red-500 px-3 py-2 bg-slate-50 text-lg font-medium'>
                  {item?.qty}
                </span>
              </span>
            </div> 
            )
          }
        </div>

      </div>
      <div className="flex justify-center w-1/5 cursor-pointer">
        {order?.payment === false && <span className='font-bold text-sm'>Not Paid</span> }
        {order?.payment && <span className='font-bold text-green-600 text-sm'>Paid</span> }
      </div>
      
      <div className="flex justify-center w-1/5 cursor-pointer">
        <span className='font-bold text-sm'>{order?.status}</span>
        
      </div>

      <div className="flex justify-center w-1/5 cursor-pointer">
       <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center' onClick={handleDelivered(order?._id)}>Delivered</button>
      </div>

      <span className='text-center w-1/5 font-semibold text-sm'>
        {order?.createdAt}
      </span>

      <span className='text-center w-1/5 font-semibold text-sm'>
        {order?.totalAmount}
      </span>
      <ToastContainer />
    </div>
  )
}
