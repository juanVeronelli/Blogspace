import jwt from 'jsonwebtoken';
import cookie from 'js-cookie';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//database
import connectToDatabase from '../database/connect.js'

//dotenv
import dotenv from 'dotenv';
dotenv.config();

//bcrypt
import passwordsCrypt from '../utils/bycrypt.js';

const user = {
    register: async (req, res) => {
        // Connect to the database
        const connection = await connectToDatabase();
      
        try {
          const email = req.body.email;
          const password = await passwordsCrypt.encrypt(req.body.password);
          const username = req.body.username;
          const thumbnail = `${req.protocol}://${req.get('host')}/uploads/${req.body.thumbnail}`;

          // SQL query to check if the email already exists
          const checkEmailSql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
      
          // Function to check if the email already exists
          const checkEmail = (email) => {
            return new Promise((resolve, reject) => {
              connection.query(checkEmailSql, [email], (err, result) => {
                if (err) return reject(err);
                const emailCount = result[0].count;
                resolve(emailCount > 0);
              });
            });
          };
      
          // Check if the email already exists
          const emailExists = await checkEmail(email);
      
          if (emailExists) {
            // Send a response if the email already exists
            res.status(409).send({ error: true, message: "The email provided is already associated with an existing account." });
          } else {
            // Create a new user registration
            const newRegister = { email, password, username, thumbnail };
            const insertSql = 'INSERT INTO users SET ?';
      
            connection.query(insertSql, [newRegister], (err) => {
              if (err) {
                //close connection
                connection.end();
                // Send a response in case of a server error
                res.status(500).send({ error: true, message: "Internal server error" });
              } else {
                //close connection
                connection.end();
                // Send a response if the registration was successful
                res.status(200).send({ error: false, message: "Successful registration" });
              }
            });
          }
        } catch (error) {
          console.log("ERR: " + error);
          //close connection
          connection.end();
          // Handle errors
        }
      },      
    login: async (req, res) => {
      // Connect to the database
      const connection = await connectToDatabase();
      try{
        const { email, password } = req.body;
        const sqlGetUser = 'SELECT * FROM users WHERE email = ?';

        // Function to get user by email and get the password
        const getUser = (email) => {
          return new Promise((resolve, reject) => {
            connection.query(sqlGetUser, [email], (err, result) => {
              if (err) return reject(err);
              const user = result[0];
              resolve(user);
            })
          })
        }

        const sqluser = await getUser(email);
        const match = await passwordsCrypt.compare(password, sqluser.password);
        if(match){
          const token = jwt.sign({ id: sqluser.id}, process.env.SECRET, {expiresIn: '3h'});
          //close connection
          connection.end();
          res.status(200).send({ error: false, message: "Successfully logged in", token: token});
        } else {
          //close connection
          connection.end();
          res.status(401).send({ error: true, message:"Invalid password"});
        }
      }catch(err){
        //close connection
        connection.end();
        console.log("ERR:" + err);
      }
    },
    verificate: async (req, res) => {
      //verify token
      const token = req.header('x-access-token');
      if(!token) return res.status(200).send({state: false, user: null});
      
      try{
        const current = Math.floor(Date.now() / 1000);
        
        //decoded token and verify expiration
        const decoded = jwt.verify(token, process.env.SECRET);
        if(decoded.exp && decoded.exp < current) return res.staus(200).send({state: false, user: null});
        
        // Connect to the database
        const connection = await connectToDatabase();
        try{
          const sql = 'SELECT email, username, followers, following, thumbnail FROM users WHERE id = ?'
          connection.query(sql, [decoded.id], (err, result) => {
            if(err) throw err;
            
            connection.end();
            res.status(200).send({state: true, user: result[0]});
          })
        }catch(err){
          res.status(401).send({ message: "Internal Error"})
        }
      } catch(err){
          console.log(err)
          res.status(200).send({ status: false, user: null});
      }
    },
    getProfiles: async (req,res) => {
      const username = req.params.username;
      const connection = await connectToDatabase();
      try{
        const sqlGetUser = 'SELECT * FROM users WHERE username = ?';
        connection.query(sqlGetUser, [username], (err, result) => {
          if(err) result.status(401).send({error: true, user:null, message: "Error in DB"});
          res.status(200).send({error: false, user: result[0], message: "Success"});
        })
      } catch(err){
        console.log(err)
      }
    }
}

export default user