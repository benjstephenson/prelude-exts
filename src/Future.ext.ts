import { Future } from "prelude-ts";
import { id } from './functions'

declare module "prelude-ts/dist/src/Future" {
  interface Future<T> {
    flatten(): Future<T>;
  }
}

Future.prototype.flatten = function() {
  return this.flatMap(id)
}
