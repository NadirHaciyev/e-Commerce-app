import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  adress: {
    type: String,
    required: true
  },
  items: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "product"
      },
      amount: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("order", OrderSchema);

export default Order;
