//importing
require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripepayment")
const paypalRoutes = require("./routes/paypalpayment")


//app config
const app = express();
const port = process.env.PORT || 8000;


//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB config
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
})

//My Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);
app.use("/api",paypalRoutes);


//Listening
app.listen(port, () => {
    console.log(`App is running at ${port}`);
})