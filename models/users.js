import { db } from "./db.js";
import { DataTypes } from "sequelize";

 const User = db.define( 'user', {
    id:{
       type:DataTypes.INTEGER,
       autoIncrement:true,
       allowNull:false,
       primaryKey:true,
       unique:true
    },
    username:{
      type:DataTypes.TEXT(100),
      allowNull:false,
      unique:true
    },
    email:{
        type:DataTypes.TEXT(100),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.TEXT(200),
        allowNull:false
    }
},{freezeTableName:true, timestamps:false})

User.sync({alter:true}).then(()=>{
  console.log('user table created successfully!')
}).catch((error)=>{
    console.log("error syncing user table")
})

export default User;

