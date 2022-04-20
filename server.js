const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/dbConnect");

require("dotenv").config();
require("./models/user");
require("./models/post");
require("./models/client");
require("./models/image");
require("./models/video");
require("./models/reservation");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));
app.use("/image", require("./routes/image"));
app.use("/video", require("./routes/video"));
app.use("/reservation", require("./routes/reservation"));
connectDB();

const PORT = process.env.PORT;
app.listen(PORT || 5002, (err) => {
  err ? console.log(err) : console.log(`server is running on ${PORT}`);
});
