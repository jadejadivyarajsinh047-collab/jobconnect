import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },
    headline: { type: String, default: "" },
    bio: { type: String, default: "" },
    skills: [String],
    resumeUrl: String,
    avatar: String,
    company: String,
    location: String,
  },
  { timestamps: true },
);
export default mongoose.model("User", schema);
