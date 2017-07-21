const SkeletonController = require('../controllers/skeleton.controller');
const express = require('express');
const router = new express.Router();

// Get all Skeletons
router.get('/', SkeletonController.getSkeletons);

module.exports = router;
// export default router;
