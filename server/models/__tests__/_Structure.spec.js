//name as xxx.spec.js
import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Post from '../post';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial posts added into test db
const xxx = [
  new Xxx({  }),
];

test.beforeEach('connect and add entrie(s)', t => {
  connectDB(t, () => {
    Post.create(posts, err => {
      if (err) t.fail('Unable to create entries');
    });
  });
});

test.afterEach.always(t => {
  dropDB(t);
});
