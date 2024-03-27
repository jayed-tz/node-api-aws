export type LowercaseKeys<T> = {
  [K in keyof T as Lowercase<K & string>]: T[K];
};