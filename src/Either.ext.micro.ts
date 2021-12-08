import {Either, EitherStatic} from "prelude-ts";
import './Either.ext'
import {assertThat} from "mismatched";


describe("Either extensions", () => {

    it("flattens left", () => {
        const left = Either.left(Either.left(1))
        const result = EitherStatic.flattenLeft(left)
        result.match({
            Left: l => assertThat(l).is(1),
            Right: fail
        })
    })

    it("flattens right", () => {
        const right = Either.right(Either.right(1))
        const result = EitherStatic.flattenRight(right)
        result.match({
            Left: fail,
            Right: r => assertThat(r).is(1)
        })
    })
})