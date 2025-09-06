import express from "express";
import { getAllJobs, getSingleJobById } from "../controller/jobsController.js";

const jobRouter = express.Router();

// Route to get all job data
jobRouter.get("/", getAllJobs);

// Routes to get a single job
jobRouter.get("/:id", getSingleJobById);

export default jobRouter;
