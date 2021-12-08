import {Either, Vector} from "prelude-ts";
import {MarkRequired} from "ts-essentials";

export function id(i: any): any {
  return i
}

export function tuple<T extends ReadonlyArray<any>>(...t: T) {
  return t
}

export const isUsableInstanceE = <K extends keyof U, U>(fields: K[], obj: U): Either<string, MarkRequired<U, K>> =>
    Either.sequenceAcc(
        Vector.ofIterable(fields).map((field) =>
            (obj[field] !== undefined && obj[field] !== null) ? Either.right(undefined) : Either.left(field as string)
        )
    )
        .map((_) => obj as MarkRequired<U, K>)
        .mapLeft((missingFields) => `object is missing required fields ${missingFields.mkString(',')}`)