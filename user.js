const mongoose = require("mongoose");

const GeolocationSchema = new mongoose.Schema({
  lat: {
    type: String,
    required: [true, "Lattitude field must be filled"],
  },
  lng: {
    type: String,
    required: [true, "Longitude field must be filled"],
  }
})

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "Street field is required"],
  },
  suite: {
    type: String,
    required: [true, "Suite field is required"],
  },
  city: {
    type: String,
    required: [true, "City field is required"],
    validate: {
      validator: (value) => {
        return /^[a-zA-Z ]*$/.test(value);
      },
      message: "City field can only contain alphabets and space",
    },
  },
  zipcode: {
    type: String,
    required: [true, "Zip code field is required"],
    validate: {
      validator: (value) => {
        return /^\d{5}-\d{4}$/.test(value);
      },
      message:
        "Please enter a proper zip code pattern DDDDD-DDDD, where D represent digit",
    },
  },
  geo: {
    type: GeolocationSchema,
    required: [true, "Geolocation details is required"],
  },
});

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company name field is required"],
  },
  catchPhrase: {
    type: String,
    required: [true, "Catch Phrase of Company field is required"],
  },
  bs: {
    type: String,
    required: [true, "BS field is required"],
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  username: {
    type: String,
    required: [true, "Username field is required"],
    minlength: [4, "Username must have at least 4 character, got {VALUE}"],
  },
  email: {
    type: String,
    require: [true, "Email field is required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => {
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
      },
      message: "Please fill a valid email address",
    },
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill a valid email address",
    ],
  },
  address: {
    type: AddressSchema,
    required: [true, "Address details is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone field is required"],
    validate: {
      validator: (value) => {
        return /^\d{1}-\d{3}-\d{3}-\d{4}$/.test(value);
      },
      message:
        "Please enter a proper phone number pattern D-DDD-DDD-DDD where D represent digit",
    },
  },
  website: {
    type: String,
    required: [true, "Website field is required"],
    validate: {
      validator: (value) => {
        return /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
          value
        );
      },
      message: "Please enter a proper website URL",
    },
  },
  company: {
    type: CompanySchema,
    requried: [true, "Company details is required"],
  },
});

module.exports = mongoose.model('User', UserSchema);
