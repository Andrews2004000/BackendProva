import mongoose, { Schema } from'mongoose'
export interface IUproducts extends mongoose.Document{
    _id:any,
    title:string,
    description:string,
    imageUrl?:string,
    price:number,
    scadenza?:Date,
    size?:[number],
    colorsAvailable?:[string],
    category:'Tecnology'|'House'|'Book'|'Not Specified',
    ratings:number,
    MaxQuantity:number,
    [key:string]:any


}

const ProductsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    imageUrl:{
        type:String,  
    },
    size:{
        type:Number,
        
    },
    colorsAvailable:{
    type:String,
    default:'Not Specified'

    },
    price:{
        type:Number,
        required:true,
    },
  

    category:{
        type:String,
        enum:['Tecnology','House','Book','Not Specified'],
        default:'Not Specified'

    },
    ratings:{
        type:Number,
        required:true

    },
    MaxQuantity:{
        required:true,
        type:Number,
    },
    vendor:{
        ref:'User',
        type:Schema.Types.ObjectId,
        immutable: true,

    },
    scadenza:{
        type:Date,
        default:Date.now()
    },
    

},
{ versionKey: false })
const Product = mongoose.model<IUproducts>('Products',ProductsSchema)
export default Product
