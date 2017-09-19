/** show_sample_project **/ //on create of serverside model, at least add import to this file
import Skeleton from '../../../server/models/skeleton';

export default function () {
  Skeleton.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `All the functionality`;
    const content2 = `None of the bloat`;

    const skeleton1 = new Skeleton({ title: 'A Skeleton', content: content1 });
    const skeleton2 = new Skeleton({ title: 'In the closet', content: content2 });

    Skeleton.create([skeleton1, skeleton2], (error) => {
      if (!error) {
        console.log('Skeleton Table Successfully Seeded');
      }
    });
  });
}
/** end_show_sample_project **/
