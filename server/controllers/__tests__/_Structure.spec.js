// name as xxx.spec.js
import app from '../../server';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial posts added into test db
const xxx = [
  new Xxx({ })
];

beforeEach('connect and add entrie(s)', (t) =>
{
  connectDB(t, () =>
  {
    Xxx.create(xxx, (err) =>
    {
      if(err) t.fail('Unable to create entries');
    });
  });
});

afterEach((t) =>
{
  dropDB(t);
});
