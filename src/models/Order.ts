import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    userId: string;
    items: { productId: string; quantity: number }[];
    totalPrice: number;
    status: "pending" | "confirmed" | "shipped" | "delivered";
    createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
    userId: { type: String, required: true },
    items: [{ productId: String, quantity: Number }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
