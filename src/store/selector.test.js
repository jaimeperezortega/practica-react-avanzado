import { getAdvertsSelector } from './selectors';

describe('getAdverts', () => {
  const data = [
    { createdAt: '1', id: 'a' },
    { createdAt: '2', id: 'b' },
  ];
  test('should return all adverts', () => {
    const result = getAdvertsSelector({ adverts: { data } });
    expect(result).toHaveLength(data.length);
  });
  test('should return adverts sorted by createdAt desc', () => {
    const result = getAdvertsSelector({ adverts: { data } });
    expect(result[0].id).toBe('b');
  });
});
