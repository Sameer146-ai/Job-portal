import express from "express";
import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const companyModel = mongoose.model("company", companySchema);

export default companyModel;
