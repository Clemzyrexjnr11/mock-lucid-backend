import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:process.env.DB_DIALECT
  }
);

db.authenticate().then(()=>{
 console.log('connection successful')
}).catch((error)=>{
  console.log('Error message:' + error.message);
})
