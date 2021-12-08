import { Future } from "prelude-ts";
import {id, tuple} from './functions'

declare module "prelude-ts/dist/src/Future" {
  namespace Future {
    export function flatten<T>(fa: Future<Future<T>>): Future<T>;
    export function sequenceT<T extends Array<Future<any>>>(
        ...t: T & { readonly 0: Future<any> }
    ): Future<{ [K in keyof T]: [T[K]] extends [Future<infer U>] ? U : never }>
  }
}

Future.flatten = <T>(fa: Future<Future<T>>) => fa.flatMap(id)

Future.sequenceT = <U>(...list: Array<Future<U>>) => {
  return Future.sequence(list).map((results) => {
    const [head, ...tail] = results.toArray()
    return tail.reduce<any>((acc, cur) => tuple(...acc, cur), tuple(head))
  })
}