import { Router } from 'express';
import * as SkeletonController from '../controllers/skeleton.controller';
const router = new Router();

// Get all Skeletons
router.route('/skeletons').get(SkeletonController.getSkeletons);

// Get one skeleton by cuid
router.route('/skeletons/:cuid').get(SkeletonController.getSkeleton);

// Add a new Skeleton
router.route('/skeletons').skeleton(SkeletonController.addSkeleton);

// Delete a skeleton by cuid
router.route('/skeletons/:cuid').delete(SkeletonController.deleteSkeleton);

export default router;
