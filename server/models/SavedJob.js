import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);
schema.index({ job: 1, user: 1 }, { unique: true });
export default mongoose.model("SavedJob", schema);
