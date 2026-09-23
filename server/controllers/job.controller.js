import Job from "../models/Job.js";
import SavedJob from "../models/SavedJob.js";
export async function list(req, res) {
  const {
    search = "",
    location = "",
    jobType = "",
    experience = "",
    category = "",
    page = 1,
    limit = 9,
  } = req.query;
  const q = { isActive: true };
  if (search) q.$text = { $search: search };
  if (location) q.location = { $regex: location, $options: "i" };
  if (jobType) q.jobType = jobType;
  if (experience) q.experience = experience;
  if (category) q.category = category;
  const skip = (Number(page) - 1) * Number(limit);
  const [jobs, total] = await Promise.all([
    Job.find(q)
      .populate("recruiter", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Job.countDocuments(q),
  ]);
  res.json({
    jobs,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
}
export async function getOne(req, res) {
  const j = await Job.findById(req.params.id).populate(
    "recruiter",
    "name company",
  );
  if (!j) return res.status(404).json({ message: "Job not found" });
  res.json(j);
}
export async function create(req, res) {
  const j = await Job.create({
    ...req.body,
    recruiter: req.user.id,
    skills: Array.isArray(req.body.skills) ? req.body.skills : [],
  });
  res.status(201).json(j);
}
export async function update(req, res) {
  const j = await Job.findOneAndUpdate(
    { _id: req.params.id, recruiter: req.user.id },
    req.body,
    { new: true },
  );
  if (!j) return res.status(404).json({ message: "Job not found" });
  res.json(j);
}
export async function remove(req, res) {
  const j = await Job.findOneAndUpdate(
    { _id: req.params.id, recruiter: req.user.id },
    { isActive: false },
    { new: true },
  );
  if (!j) return res.status(404).json({ message: "Job not found" });
  res.json({ message: "Job archived" });
}
export async function mine(req, res) {
  res.json(await Job.find({ recruiter: req.user.id }).sort({ createdAt: -1 }));
}
export async function toggleSave(req, res) {
  const found = await SavedJob.findOne({
    job: req.params.id,
    user: req.user.id,
  });
  if (found) {
    await found.deleteOne();
    return res.json({ saved: false });
  }
  await SavedJob.create({ job: req.params.id, user: req.user.id });
  res.json({ saved: true });
}
export async function saved(req, res) {
  const rows = await SavedJob.find({ user: req.user.id })
    .populate("job")
    .sort({ createdAt: -1 });
  res.json(rows.map((x) => x.job).filter(Boolean));
}
