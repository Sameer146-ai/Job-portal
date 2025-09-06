import jobModel from "../model/job.model.js";

// Get all Jobs
export async function getAllJobs(req, res) {
  try {
    const jobs = await jobModel
      .find({ visible: true })
      .populate({ path: "companyId", select: "-password" });

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// Get single job
export async function getSingleJobById(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const job = await jobModel
      .findById(id)
      .populate({ path: "companyId", select: "-password" });

    if (!job) {
      return res.json({
        success: false,
        message: "job Not Found",
      });
    }

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
