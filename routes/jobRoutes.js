const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  toggleFavorite,
  toggleArchive,
  getDashboard,
} = require('../controllers/jobController');
const { protect } = require('../middlewares/authMiddleware');

// All routes are protected
router.use(protect);

router.get('/dashboard', getDashboard);
router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.patch('/:id/favorite', toggleFavorite);
router.patch('/:id/archive', toggleArchive);

module.exports = router;