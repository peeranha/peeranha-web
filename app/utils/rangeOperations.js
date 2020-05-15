import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

const rangeSort = (rangeA, rangeB) => {
  const first = rangeA[0] < rangeB[0] ? _cloneDeep(rangeA) : _cloneDeep(rangeB);
  const second = _isEqual(first, rangeA)
    ? _cloneDeep(rangeB)
    : _cloneDeep(rangeA);
  return [first, second];
};

export const rangeUnion = (rangeA, rangeB) => {
  const [first, second] = rangeSort(rangeA, rangeB);

  // [1, 3] [5, 6] => [[1, 3], [5, 6]
  if (second[0] > first[1]) {
    return [first, second];
  }

  // [1, 5] [3, 7] => [1, 7] | [1, 5] [3, 5] => [1, 5]
  if (second[0] <= first[1] && second[1] >= first[1]) {
    return [first[0], second[1]];
  }

  // [1, 5] [2, 3] => [1, 5]
  return first;
};

export const rangeIntersection = (rangeA, rangeB) => {
  const [first, second] = rangeSort(rangeA, rangeB);

  // [1,3] [5, 6] => []
  if (second[0] > first[1]) {
    return [];
  }

  // [1, 5] [3, 7] => [3, 5] | [1, 5] [3, 5] => [1, 5]
  if (second[0] <= first[1] && first[1] <= second) {
    return [second[0], first[1]];
  }

  // [1, 5] [2, 3] => [2, 3]
  return second;
};

// [[1, 3] [5, 7]] => [1, 7]
export const rangeUnionWithIntersection = (rangeA, rangeB) => {
  const newRange = rangeUnion(rangeA, rangeB);
  if (Array.isArray(newRange[0])) {
    return [newRange[0][0], Math.max(newRange[0][1], newRange[1][1])];
  }

  return newRange;
};
