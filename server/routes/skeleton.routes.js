import { Router } from 'express';
import * as SkeletonController from '../controllers/skeleton.controller';
const router = new Router();

// Get all Skeletons
router.route('/skeletons').get(SkeletonController.getSkeletonsByBrowser);

// Get one skeleton by cuid
router.route('/skeleton/:cuid').get(SkeletonController.getSkeletonByBrowser);

// Add a new Skeleton
router.route('/skeleton').post(SkeletonController.addSkeletonByBrowser);

// Delete a skeleton by cuid
router.route('/skeleton/:cuid').delete(SkeletonController.deleteSkeletonByBrowser);

export default router;
