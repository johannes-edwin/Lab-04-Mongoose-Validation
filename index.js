const express = require("express");
const mongoose = require("mongoose");
const User = require("./user");

require("dotenv").config();

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, connectOptions);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        errors
      });
    }
    return res.status(500).json(error);
  }
});
