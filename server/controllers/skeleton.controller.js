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
  console.log('The information being POSTed from `containers/Skeleton/state/sagas` is:',req.body);

  Skeleton
    .create(req.body)
    .then((d) => { console.log('retD',d); return res.status(203).json(d)})
    .catch((e) => console.log('err:',e));
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

export function deleteDemoSkeletonByBrowser(req,res)
{
  Skeleton
    .find({title:'Tony'})
    .remove()
    .then(()=> { console.log('deleteDemoSkel:'); return res.status(204).json({delted:true}) })
    .catch((e) => console.log('err:',e));;
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



/* BRANCH / PRE-PROCESSED  */
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
