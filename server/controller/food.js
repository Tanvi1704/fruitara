// const Food = require("../model/Food");

// const createFood = async (req, res) => {
//   try {
//     // console.log(req.body)
//     // const{ name,price,description,catagory,weight,foodImage}=req.body;
//     console.log(req.body)
//     const newFood = new Food(req.body);
//     const saveFood = newFood.save();
//     res.status(200).json({
//       message: "Food successfully added",
//       success: true,
//       data: {
//         food: saveFood,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: "Internal Server Error",
//       success: false,
//     });
//   }
// };

// const getAllFoods = async (req, res) => {
//   try {
//     const foodItems = await Food.find();
//     res.status(200).json({
//       message: "Food successfully added Error",
//       success: true,
//       data: {
//         food: foodItems,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: "Internal Server Error",
//       success: false,
//     });
//   }
// };

// module.exports = { createFood, getAllFoods };


const Food=require("../model/Food");

const createFood=async(req,res)=>{
    try{
        // const{ name,price,description,catagory,weight,foodImage}=req.body;
        // const newFood=new Food({
        //     name,
        //     price,
        //     description,
        //     catagory,
        //     weight,
        //     foodImage
        // });
        console.log(req.body);
        const newFood=new Food(req.body);
        const saveFood=newFood.save();
        res.status(200).json({
            message:"Food successfully added",
            success:true,
            data:{
                food:saveFood,
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal Server Error",
            success:false,
        });
    }
}

const getAllFoods=async(req,res)=>{
    try{
        const {catagory}=req.query;
        // console.log(category);
        if(catagory==='all'){
            const foodItems=await Food.find();

            res.status(200).json({
            message:"Food successfully added Error",
            success:true,
            data:{
                food:foodItems,
            }
        });
        }
        else{
            const foodItems=await Food.find({ catagory:catagory });

            res.status(200).json({
            message:"Food successfully Added",
            success:true,
            data:{
                food:foodItems,
            }
        });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal Server Error",
            success:false,
        });
    }
}
const getNewFoods =async(req,res)=>{
    try{
            const foodItems=await Food.find().sort({createdAt : -1}).limit(12);

            res.status(200).json({
            message:"12 Register food showing",
            success:true,
            data:{
                food:foodItems,
            }
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal Server Error",
            success:false,
        });
    }
}
const getFoodsFromDistinctCatagory =async(req,res)=>{
    try{
            const distinctCatagory =await Food.distinct('catagory');
            const distinctfood = await Promise.all(
                distinctCatagory.slice(0,4).map(async (catagory) => {
                    const food = await Food.findOne({catagory});
                    return food;
                })
            )


            res.status(200).json({
            message:"4 different catagory food",
            success:true,
            data:{
                food:distinctfood,
            }
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal Server Error",
            success:false,
        });
    }
}
const getTopRating =async(req,res)=>{
    try{
            const topRatingFoods =await Food.find().sort({'reviews.rating' : -1}).limit(4);
           


            res.status(200).json({
            message:"4 different catagory food",
            success:true,
            data:{
                food:topRatingFoods,
            }
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal Server Error",
            success:false,
        });
    }
}
const getFoodById =async(req,res)=>{
    try{
        const {id} = req.params;
            const foodItems=await Food.findById(id);

            res.status(200).json({
            message:"Food Details",
            success:true,
            data:{
                food:foodItems,
            }
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal Server Error",
            success:false,
        });
    }
}


module.exports={ createFood ,getAllFoods, getFoodById, getNewFoods, getFoodsFromDistinctCatagory, getTopRating};