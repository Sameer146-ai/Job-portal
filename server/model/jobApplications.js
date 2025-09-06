import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Number,
    required: true,
  },
});

const jobApplicationModel = mongoose.model(
  "jobApplications",
  jobApplicationSchema
);

export default jobApplicationModel;
