
export function id(i: any): any {
  return i
}

export function tuple<T extends ReadonlyArray<any>>(...t: T) {
  return t
}
