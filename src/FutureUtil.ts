import { Future } from "prelude-ts";



export default class FutureUtil {

  static flatten<T>(f: Future<Future<T>>): Future<T> {
    return f.flatMap(id)
  }


  static sequenceFutureT<T extends Array<Future<any>>>(
    ...t: T & { readonly 0: Future<any> }
  ): Future<{ [K in keyof T]: [T[K]] extends [Future<infer U>] ? U : never }>
  static sequenceFutureT<U>(...list: Array<Future<U>>) {
    return Future.sequence(list).map((results) => {
      const [head, ...tail] = results.toArray()
      return tail.reduce<any>((acc, cur) => tuple(...acc, cur), tuple(head))
    })
  }

}

