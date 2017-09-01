import * as mongoose from 'mongoose';
import {Mockgoose} from 'mockgoose';

import Skeleton from '../../../server/models/skeleton';

// Initial skeletons added into test db
const skeletons = [
  new Skeleton({ name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" }),
  new Skeleton({ name: 'Mayank', title: 'Hi Mern', slug: 'hi-mern', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'" })
];

let mockgoose: Mockgoose = new Mockgoose(mongoose);

export function connectDB(fnc) {
  mockgoose.prepareStorage().then(() => {
      mongoose.connect(process.env.MONGO_TESTING_URL);
      mongoose.connection.on('connected', () => {
        console.log('db connection is now open');
        Skeleton.create(skeletons, (err) =>
        {
          if(err) t.fail('Unable to create posts');
        });
      });
  });
}

export function dropDB(t) {
  mockgoose.helper.reset().then(() => {
      done()
  });
}
