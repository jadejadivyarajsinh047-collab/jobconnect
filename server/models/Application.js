import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverLetter: { type: String, default: "" },
    status: {
      type: String,
      enum: [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
      ],
      default: "Applied",
    },
    recruiterNote: String,
  },
  { timestamps: true },
);
schema.index({ job: 1, candidate: 1 }, { unique: true });
export default mongoose.model("Application", schema);
