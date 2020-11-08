const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signin=(req,res)=>{
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token =jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
                const {firstName,lastName,email,role,_id}=user;
                res.status(200).json({
                    token,
                    user:{
                        _id,firstName,lastName,email,role
                    }
                })
            }else{
                res.status(400).json({
                    message: "Invalid password"
                })
            }
        }else{
            return res.status(400).json({message: "Something went wrong"});
        }
    })
};

exports.signup=(req,res)=>{
    User.findOne ({ email: req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message: 'User already registered'
        });
        const {
            firstName,
            lastName,
            email,
            password,
            userName,
        } = req.body;
        const _user= new User({
            firstName,
            lastName,
            email,
            password,
            userName: Math.random().toString()
        });
        _user.save((error,data)=>{
            if (error){
                return res.status(400).json({
                    message: error
                });
            }
            if (data){
                return res.status(201).json({
                    message:"User created successfully",
                    user: data
                })
            }
        })
    });
};

