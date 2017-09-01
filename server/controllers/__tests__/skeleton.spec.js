// _This will only be created if 'Start with Sample' option is chosen from CLI setup_

import app from '../../server';
import { connectDB, dropDB } from '../../../config/utils/server/test-helpers';

beforeEach(() =>
{ connectDB(); });

afterEach(() =>
{ dropDB(); });

test('stub db test', () => {
  expect(true).toBeTruthy();
});
