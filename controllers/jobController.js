const Job = require('../models/Job');

// @desc    Create a job
// @route   POST /api/jobs
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const { search, status, jobType, location, company, sort, page, limit } = req.query;

    // Base filter - only logged in user's jobs
    let filter = { userId: req.user.id, isArchived: false };

    // Search
    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    // Filters
    if (status) filter.status = status;
    if (jobType) filter.jobType = jobType;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (company) filter.company = { $regex: company, $options: 'i' };

    // Sorting
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === 'salary') sortOption = { salary: 1 };
    if (sort === '-salary') sortOption = { salary: -1 };
    if (sort === 'company') sortOption = { company: 1 };
    if (sort === '-company') sortOption = { company: -1 };
    if (sort === 'appliedDate') sortOption = { appliedDate: 1 };
    if (sort === '-appliedDate') sortOption = { appliedDate: -1 };
    if (sort === 'createdAt') sortOption = { createdAt: 1 };
    if (sort === '-createdAt') sortOption = { createdAt: -1 };

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
const getJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle favorite
// @route   PATCH /api/jobs/:id/favorite
const toggleFavorite = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    job.isFavorite = !job.isFavorite;
    await job.save();
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle archive
// @route   PATCH /api/jobs/:id/archive
const toggleArchive = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    job.isArchived = !job.isArchived;
    await job.save();
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/jobs/dashboard
const getDashboard = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const total = await Job.countDocuments({ userId: req.user.id });

    const dashboard = {
      total,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
      accepted: 0,
    };

    stats.forEach((stat) => {
      if (stat._id === 'Applied') dashboard.applied = stat.count;
      if (['Interview Scheduled', 'HR Round', 'Technical Round'].includes(stat._id))
        dashboard.interview += stat.count;
      if (stat._id === 'Offer') dashboard.offer = stat.count;
      if (stat._id === 'Rejected') dashboard.rejected = stat.count;
      if (stat._id === 'Accepted') dashboard.accepted = stat.count;
    });

    res.status(200).json({ success: true, dashboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  toggleFavorite,
  toggleArchive,
  getDashboard,
};