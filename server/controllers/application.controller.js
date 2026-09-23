import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Notification from "../models/Notification.js";
export async function apply(req, res) {
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });
  try {
    const a = await Application.create({
      job: job._id,
      candidate: req.user.id,
      coverLetter: req.body.coverLetter || "",
    });
    await Notification.create({
      user: job.recruiter,
      title: "New application",
      message: `A candidate applied for ${job.title}.`,
    });
    res.status(201).json(a);
  } catch (e) {
    if (e.code === 11000)
      return res
        .status(409)
        .json({ message: "You already applied for this job." });
    throw e;
  }
}
export async function mine(req, res) {
  res.json(
    await Application.find({ candidate: req.user.id })
      .populate("job")
      .sort({ createdAt: -1 }),
  );
}
export async function recruiter(req, res) {
  const jobs = await Job.find({ recruiter: req.user.id }).select("_id");
  res.json(
    await Application.find({ job: { $in: jobs } })
      .populate("job", "title company")
      .populate("candidate", "name email headline resumeUrl")
      .sort({ createdAt: -1 }),
  );
}
export async function update(req, res) {
  const a = await Application.findById(req.params.id).populate("job");
  if (!a) return res.status(404).json({ message: "Application not found" });
  const job = await Job.findOne({ _id: a.job._id, recruiter: req.user.id });
  if (!job) return res.status(403).json({ message: "Not your job" });
  a.status = req.body.status;
  a.recruiterNote = req.body.recruiterNote;
  a.save();
  await Notification.create({
    user: a.candidate,
    title: "Application updated",
    message: `Your application for ${job.title} is now ${a.status}.`,
  });
  res.json(a);
}
