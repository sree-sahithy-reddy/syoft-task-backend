const db = require('../db/index');
const authorize = require ('../common/util');
const jwt = require('jsonwebtoken');

function apis(server) {
    server.post('/v1/users_register', async (req,res) => {

        try{
            const {username,email,password,role} = req.body;
            const response = await db.registerUser(username,email,password,role);
            res.send({
                response:"success",
                statusCode: 200
            })
        }catch(err) {
            console.log(err);
        }
    });

    server.post('/v1/user_login', async (req,res) => {

        try{
            const {username,password} = req.body;
            const response = await db.checkLoginDetails(username,password);
            console.log(response);
            const secretKey = "syoft_secret";

            const payload = {
            name: response.username
            };
            
           jwt.sign(payload, secretKey, (err, token) => {
                if (err) {
                    console.log("While creating the token error: ", err);
                } else {
                    console.log("token", token);
                    res.send({
                        token:token,
                        user:response.username,
                        role:response.role,
                        statusCode: 200
                    })
                }
            });
          
        }catch(err) {
            console.log(err);
        }
    });

    server.get('/v1/get_all_products',authorize.authorize(), async (req,res) => {

        try{
            const response = await db.getAllProductsList();
            res.send({
                response:response,
                statusCode: 200
            })
        }catch(err) {
            console.log(err);
        }
    });

    server.post('/v1/add_product',authorize.authorize(), async (req,res) => {

        try{
            const {productname,description,count,price} = req.body;
            const response = await db.addProduct(productname,description,count,price);
            res.send({
                response:"success",
                statusCode: 200
            })
        }catch(err) {
            console.log(err);
        }
    });

    server.post('/v1/remove_product',authorize.authorize(), async (req,res) => {

        try{
            const response = await db.deleteProduct(req.body.id);
            res.send({
                response:"success",
                statusCode: 200
            })
        }catch(err) {
            console.log(err);
        }
    });
}

module.exports =  apis;
