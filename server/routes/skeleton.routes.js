import { Router } from 'express';
import * as SkeletonController from '../controllers/skeleton.controller';
const router = new Router();

// Get all Skeletons
router.get('/skeletons',SkeletonController.getSkeletonsByBrowser);

// Get one skeleton by cuid
router.get('/skeleton/:cuid',SkeletonController.getSkeletonByBrowser);

// Add a new Skeleton
router.post('/skeleton',SkeletonController.addSkeletonByBrowser);

// Delete "Tony" skeleton(s)
router.delete('/skeleton',SkeletonController.deleteDemoSkeletonByBrowser);
// Delete a skeleton by cuid
router.delete('/skeleton/:cuid',SkeletonController.deleteSkeletonByBrowser);

export default router;
