/* eslint func-names: ["error", "never"] */
const Skeleton = require('../models/skeleton.model');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
exports.getSkeletons = function (req, res)
{
  Skeleton.find().exec().then((skeletons) =>
{
    res.json({ skeletons });
  });
};
