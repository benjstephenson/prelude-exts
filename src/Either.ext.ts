import { Future, Either, Right, Left } from 'prelude-ts'

declare module "prelude-ts/dist/src/Either" {
  interface EitherStatic {
    mapLeftF<L, R>(e: Either<Future<L>, R>): Future<Either<L, R>>;
    mapF<L, R>(e: Either<Future<L>, R>): Future<Either<L, R>>;
  }

  interface Left<L, R> {
    flatten<L, R>(): Either<L, R>;
    mapF<L, R>(): Future<Either<L, R>>;
  }

  interface Right<L, R> {
    flatten<L, R>(): Either<L, R>;
  }
}

// EitherStatic.prototype.mapLeftF = <L, R>(either: Either<Future<L>, R>): Future<Either<L, R>> => {
//   return either.match({
//     Left: (leftF) => leftF.map((l) => Either.left(l)),
//     Right: (right) => Future.ok(Either.right(right)),
//   })
// }

// EitherStatic.prototype.mapF = <L, R>(either: Either<L, Future<R>>): Future<Either<L, R>> => {
//   return either.match({
//     Left: left => Future.ok(Either.left(left)),
//     Right: rightF => rightF.map(r => Either.right(r))
//   })
// }


Left.prototype.flatten = function <L, R>(): Either<L, R> {
  return this.match({
    Left: left => left,
    Right: right => Either.right(right),
  })
}


Right.prototype.flatten = function <L, R>(): Either<L, R> {
  return this.match({
    Left: left => Either.left(left),
    Right: right => right,
  })
}


 // const leftFmap = <A, B>(either: Either<Future<A>, B>): Future<Either<A, B>> => {
 //   return either.match({
 //     Left: (leftF) => leftF.map((l) => Either.left(l)),
 //     Right: (right) => Future.ok(Either.right(right)),
 //   })
 // }

 // const rightFmap = <A, B>(either: Either<A, Future<B>>): Future<Either<A, B>> => {
 //   return either.match({
 //     Left: (left) => Future.ok(Either.left(left)),
 //     Right: (rightF) => rightF.map((r) => Either.right(r)),
 //   })
 // }
