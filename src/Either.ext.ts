import {Either, EitherStatic, Future} from 'prelude-ts'
import {id} from "./functions";

const flattenRight = <L, R>(fa: Either<L, Either<L, R>>) => fa.match({
  Left: l => Either.left(l),
  Right: id
})

declare module "prelude-ts/dist/src/Either" {
  namespace EitherStatic {
    export function flattenLeft<L, R>(fa: Either<Either<L, R>, R>): Either<L, R>;
    export function leftFmap<A, B>(either: Either<Future<A>, B>): Future<Either<A, B>>

    export function flattenRight<L, R>(fa: Either<L, Either<L, R>>): Either<L, R>;
    export function flattenEitherW <A, A2, B>(e: Either<A, Either<A2, B>>): Either<A | A2, B>
    export function rightFmap<A, B>(either: Either<A, Future<B>>): Future<Either<A, B>>
  }
}

EitherStatic.flattenLeft = <L, R>(fa: Either<Either<L, R>, R>) => fa.match({
  Left: id,
  Right: r =>  Either.right(r)
})


EitherStatic.leftFmap = <A, B>(either: Either<Future<A>, B>): Future<Either<A, B>> => {
  return either.match({
    Left: (leftF) => leftF.map((l) => Either.left(l)),
    Right: (right) => Future.ok(Either.right(right)),
  })
}

EitherStatic.flattenRight = flattenRight


EitherStatic.flattenEitherW = flattenRight as any

EitherStatic.rightFmap = <A, B>(either: Either<A, Future<B>>): Future<Either<A, B>> => {
  return either.match({
    Left: (left) => Future.ok(Either.left(left)),
    Right: (rightF) => rightF.map((r) => Either.right(r)),
  })
}
