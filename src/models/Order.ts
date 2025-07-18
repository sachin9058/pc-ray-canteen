import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId; // 🔹 Reference to User model
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: "pending" | "paid" | "prepared" | "delivered"; 
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "prepared", "delivered"], 
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
