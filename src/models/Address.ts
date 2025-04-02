import mongoose, { Schema } from "mongoose";

interface IAddress extends Document {
    userId : string
    fullName : string
    floor : string
    mobile : string
    room  : string
    createdAt : Date
}

const AddressSchema = new Schema<IAddress>({
    userId : { type:String,required:true },
    fullName : {type:String,required:true},
    mobile : {type:String,required:true},
    room : {type:String,required:true},
    floor : {type:String,required:true},
    createdAt : {type:Date,default:Date.now}
})

export default mongoose.models.Address || mongoose.model<IAddress>("Address",AddressSchema)