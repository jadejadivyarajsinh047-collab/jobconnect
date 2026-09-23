import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    company: { type: String, required: true, index: true },
    location: { type: String, index: true },
    salaryMin: Number,
    salaryMax: Number,
    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract", "Remote"],
      default: "Full Time",
    },
    experience: { type: String, default: "Fresher" },
    skills: [String],
    category: { type: String, default: "Software Development" },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
schema.index({
  title: "text",
  company: "text",
  description: "text",
  skills: "text",
});
export default mongoose.model("Job", schema);
