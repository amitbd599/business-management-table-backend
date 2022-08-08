const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    avatar: { type: String },
    price: { type: String },
    special_price: { type: String },
    category: { type: String },
    sub_category: { type: String },
    description: { type: String },
    companyName: { type: String },
    remark: { type: String },
    inStock: { type: String },
    fastDelivery: { type: String },
    ratings: { type: String },
  },
  { versionKey: false }
);

const productModel = mongoose.model("products", DataSchema);
module.exports = productModel;
