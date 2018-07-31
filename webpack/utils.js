export function packageSort(packages) {
  return (left, right) => {
    const leftIndex = packages.indexOf(left.names[0]);
    const rightIndex = packages.indexOf(right.names[0]);

    if (leftIndex < 0 && rightIndex < 0) {
      return 0;
    }

    if (leftIndex > rightIndex) {
      return 1;
    }

    return -1;
  };
}
