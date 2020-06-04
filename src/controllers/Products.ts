import mongoose from 'mongoose'
import Product from '../model/Products'
import {RequestHandler} from 'express'
import AppError from '../Error/AppError'
import User from '../model/Auth'

export const getAllProducts:RequestHandler = async(req,res,next)=>{
    const reqQuery = {...req.query}
    delete reqQuery.owned;
    delete reqQuery.search;
    let productQuery =  Product.find(reqQuery)

    if(req.token && req.query.owned === 'true'){
        const currentUserId = await User.getIdFromJwt(req.token)
        const currentUser = await User.findById(currentUserId)
        if(!currentUser?.isAdmin()){
            productQuery = productQuery.where('vendor').equals(currentUserId)
        }
    }
        if(req.query.search){
          
            const searchKeyWord = req.query.search.split('+').join(' ') as string;
            productQuery.where('title').regex(new RegExp(searchKeyWord,'i'))
        
    }
    const products = await productQuery;
    res.json({
        status:'success',
        data:products
    })
}

export const getProduct:RequestHandler = async (req,res,next)=>{
    const product = await Product.findById(req.params.prodId)
    if(!product){
        throw new AppError('NO PRODUCTS',404)
    }
    res.status(200).json({
        status:'success',
        data:product
    })
}
export const createProducts:RequestHandler = async (req,res,next)=>{
    const {title,description,role,imageUrl,price,tags,category,ratings,scadenza,maxQuantity,vendor} = req.body
    const newProduct = await Product.create(req.body)
    if(!newProduct){
        throw new AppError('NO PRODUCTS',404)
    }
    res.status(201).json({
        status:'success',
        data:newProduct
    })
}
export const editProduct:RequestHandler = async (req,res,next)=>{
  const product = await Product.findById(req.params.prodId)
  if(!product){
    throw new AppError('NO PRODUCTS',404)
  }
  const user = req.user
  if(!user){
    throw new AppError('NO PRODUCTS',404)
  }
  if(user.role !== 'admin'){
      if(user.vendor._id.toString() !== user._id.toString()){
        throw new AppError('NO PRODUCTS',404)
      }
   
  }
  Object.keys(req.body).forEach((k)=>{
      if(k in product){
          product[k] = req.body[k]
      }
  })
  product.save()
  res.status(201).json({
      status:'success',
      data:product
  })

}


export const deleteProduct:RequestHandler = async(req,res,next)=>{
    const product = await Product.findById(req.params.prodId)
    if(!product){
        throw new AppError('NO PRODUCTS',404)
    }
    const user = req.user;
    if(!user){
        throw new AppError('NO USER',404)
    }
    if(user.role !== 'admin'){
        if(product.vendor._id.toString() !== user._id.toString()){
            throw new AppError('NO PRODUCTS',404)

        }
    }
    await Product.findByIdAndDelete(product._id)
    res.status(204).json({
        status:'success',
        data:null
    })

}