//_This will only be created if 'Start with Sample' option is chosen from CLI setup_

import Skeleton from '../models/skeleton';

/*API / ROUTE STUBS*/

/**
 * Get all skeletons
 * @param req
 * @param res
 * @returns void
 */
export function getSkeletonsByBrowser(req, res) {
  Skeleton.find().sort('-dateAdded').exec((err, skeletons) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ skeletons });
  });
}

/**
 * Save a skeleton
 * @param req
 * @param res
 * @returns void
 */
export function addSkeletonByBrowser(req, res) {
  if (!req.body.skeleton.dateAdded || !req.body.skeleton.title || !req.body.skeleton.content) {
    res.status(403).end();
  }

  const newSkeleton = new Skeleton(req.body.skeleton);

  // Let's sanitize inputs
  newSkeleton.title = sanitizeHtml(newSkeleton.title);
  newSkeleton.name = sanitizeHtml(newSkeleton.name);
  newSkeleton.content = sanitizeHtml(newSkeleton.content);

  newSkeleton.slug = slug(newSkeleton.title.toLowerCase(), { lowercase: true });
  newSkeleton.cuid = cuid();
  newSkeleton.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ skeleton: saved });
  });
}

/**
 * Get a single skeleton
 * @param req
 * @param res
 * @returns void
 */
export function getSkeletonByBrowser(req, res) {
  Skeleton.findOne({ _id: req.params.cuid }).exec((err, skeleton) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ skeleton });
  });
}

/**
 * Delete a skeleton
 * @param req
 * @param res
 * @returns void
 */
export function deleteSkeletonByBrowser(req, res) {
  Skeleton.findOne({ cuid: req.params.cuid }).exec((err, skeleton) => {
    if (err) {
      res.status(500).send(err);
    }

    skeleton.remove(() => {
      res.status(200).end();
    });
  });
}



/* BRANCH / PROMISE STUBS  */
export function getSkeletonsByRoute(o)
{
  let obj = Skeleton.find().sort('dateAdded').exec((err, skeletons) => {
    if (err) { return { error:err } };
    skeletons.dataKey = 'skeletonsByRoute';
    return { skeletons };
  });
  console.log('ret obj',obj);
  return obj;
};
