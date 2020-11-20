const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const orderSchema = mongoose.Schema({
   booking: {
     type:ObjectId,
     ref:"Booking",
     unique:true
   },
   user:{
     type:ObjectId,
     ref:"User"
   },
   total_amount:{
     type:Number,
     default:null
   },
   agent: {
      type:ObjectId,
      ref:"User",
      default:null
   },
   order_type:{
     type:String,
     default:null
   },
   order_status:{
     type:String,
     enum:['ASSIGN_TO_ADMIN', 'ASSIGN_TO_AGENT','IN_PROGRESS','COMPLETED','CANCELLED','NO_SHOW'],
     default:'ASSIGN_TO_ADMIN'
   },
   payment_verified:{
     type:Boolean,
     default: false
   },
   razorpay_payment_id:{
     type:String,
     default:null
   },
   razorpay_order_id:{
     type:String,
     default:null
   },
   del_flag:{
     type:Boolean,
     default:false
   },
}, { timestamp:true })

module.exports = mongoose.model("Order", orderSchema);
