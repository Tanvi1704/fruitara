const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const registerController = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        message: "User already exist",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    const confirmPassword = await bcrypt.hash(req.body.passwordConfirm, salt);

    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCasea: false,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    req.body.passwordConfirm = confirmPassword;
    if (req.body.password === req.body.passwordConfirm) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        profileImage: req.body.profileImage,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        otp: otp,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "jreet121@gmail.com",
          pass: "pzafyosxkuxsmdov",
        },
      });

      const mailOption = {
        from: "Client Reet Jain",
        to: req.body.email,
        subject: "Otp for Email Verification",
        text: `Your verify OTP is ${otp}`,
      };
      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error sending mail..");
        }
        res.send({
          message: "Otp Sent to email",
        });
      });

      return res.status(201).send({
        message: "Register Successfully",
        data: {
          user: newUser,
          token,
        },
        success: true,
      });
    } else {
      return res.status(201).send({
        message: "Password Not Match!",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Register Error",
      success: false,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    } else {
      console.log(user);
      return res.status(200).send({
        message: "Register successfully",
        data: {
          user,
        },
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Auth error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    const signuser = await User.findOne({ email: req.body.email });
    if (!isMatch) {
      return res.status(200).send({
        message: "Invali Password and Email",
        success: false,
      });
    }

    const token = jwt.sign({ id: signuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).send({
      message: "Login successfully",
      data: {
        user: signuser,
        token,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login error",
    });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.otp === req.body.combineOtp) {
      user.isVerified = true;
      await user.save();
      res.status(200).send({
        success: true,
        message: "User Verified Successfully",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "User Not Verified Successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Verify Otp error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      profileImage,
      userId,
      street,
      city,
      state,
      country,
      zipcode,
    } = req.body;

    const user = await User.findById(userId);
    if(!user){
      return res.status(200).send({
        message: "User not Found",
        success: false,
      });
    }
    user.name = name || user.name;
    user.profileImage = profileImage || user.profileImage;
    user.street = street || user.street;
    user.city = city || user.city;
    user.state = state || user.state;
    user.zipcode = zipcode || user.zipcode;
    user.country = country || user.country;

    await user.save();

    return res.status(201).send({
      message : "Profile Updated Successfully",
      success : true
    })
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      message: "User error",
      success: false,
    });
  }
};

module.exports = {
  registerController,
  authController,
  loginController,
  verifyOtpController,
  updateUserProfile
};
