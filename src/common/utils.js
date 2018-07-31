export function lazyFunction(f) {
  return (...args) => f().apply(this, args);
}
