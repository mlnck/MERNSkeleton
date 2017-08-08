import { Router } from 'express';
import * as SkeletonController from '../controllers/skeleton.controller';
const router = new Router();

// Get all Skeletons
router.route('/skeletons').get(SkeletonController.getSkeletons);

// Get one skeleton by cuid
router.route('/skeleton/:cuid').get(SkeletonController.getSkeleton);

// Add a new Skeleton
router.route('/skeleton').post(SkeletonController.addSkeleton);

// Delete a skeleton by cuid
router.route('/skeleton/:cuid').delete(SkeletonController.deleteSkeleton);

export default router;
