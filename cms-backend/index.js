const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const billingRoutes = require("./routes/billing");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/billing", billingRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const PING_URL = "https://test-billing-zpdr.onrender.com";

setInterval(() => {
  fetch(PING_URL)
    .then((res) => console.log("Ping successful"))
    .catch((err) => console.error("Ping failed:", err));
}, 600000);
