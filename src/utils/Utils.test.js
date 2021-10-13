import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { urlToParams } from './Utils';

afterEach(cleanup)

test('params to object', () => {
  expect(urlToParams('?userId=1&postId=1')).toEqual({userId: "1", postId: "1"})
})