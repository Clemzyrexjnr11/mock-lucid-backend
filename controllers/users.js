import { response } from "express";
import User from "../models/users.js";
import jwt from "jsonwebtoken";


export const loginUsers = async function (req, res) {
  let { username, email, password } = req.body;

  let matchedUser = await User.findOne({ where: { email, password } });

  try {
    if (matchedUser) {
      let userPayload =   { id: matchedUser.id, email: matchedUser.email};
      let accessToken = jwt.sign(
        userPayload,
        process.env.SECRET_ACCESS_TOKEN_KEY,
        {
          expiresIn: "10m",
        }
      );

      return res.status(200).json({
        accesstoken: accessToken,
        email: matchedUser.email,
        response: "success",
      });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: "500",
      response: "failed",
    });
  }
};

export const changeUserPassword = async function (req, res) {
  let authtoken = req.headers["authorization"].split(" ")[1];
  let { username, currentPassword, newPassword } = req.body;

  try {
    let user = await User.findOne({
      where: { email: username, password: currentPassword },
    });

   if (!authtoken) {
      res.status(401).json({ message: "User is unauthorized." });
    }

    else if (!user) {
       res.status(404).json({ message: "User not found, Kindly provide a correct Current password" });
    }

    else if (currentPassword === newPassword) {
      res
        .status(400)
        .json({
          message: "New password cannot be thesame with previous password",
        });
    } else {

      await User.update({
        password: newPassword
      }, {where: { email : username}}).then((result)=>{

         res
        .status(200)
        .json({
          message: "Password updated successfully",
          response: "success",
        });
      
      }).catch((err)=>{

        console.log('Error occured while changing password', err)
      })

    }
  } catch(error) {

  }
}