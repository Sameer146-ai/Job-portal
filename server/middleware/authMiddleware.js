import jwt from "jsonwebtoken";
import companyModel from "../model/company.model.js";

export async function protectCompany(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized, login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.company = await companyModel.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
