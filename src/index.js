import {
  __,
  add,
  addIndex,
  addIndexRight,
  adjust,
  all,
  allPass,
  always,
  and,
  andThen,
  any,
  anyPass,
  ap,
  aperture,
  append,
  apply,
  applySpec,
  applyTo,
  ascend,
  assoc,
  assocPath,
  binary,
  map,
  pipe,
  sort,
} from "ramda";

add(1, 2); //= 3

add(__, 2)(1); //= 3

addIndex(map)((value, index) => `${index}. ${value}`, ["A", "B", "C"]); //= ["0. A", "1. B", "2. C"]

addIndexRight(map)((value, index) => `${index}. ${value}`, ["A", "B", "C"]); //= ["2. A", "1. B", "0. C"]

adjust(1, add(9), [1, 2, 3]); //= [1, 11, 3]

all((x) => x < 10)([1, 2, 3]); //= true

allPass([(x) => x > 0, (x) => x < 10])(5); //= true

always("blue")(); //= "blue"

and(false, true); //= false

pipe(
  (x) => Promise.resolve(x),
  andThen((x) => x + 1)
)(1).then(console.log); //= 2

any((x) => x > 10)([1, 20, 3]); //= true

anyPass([(x) => x < 0, (x) => x > 5])(10); //= true

ap([add(1), add(2)])([1, 2]); //= [2, 3, 3, 4]

aperture(3, [1, 2, 3, 4, 5]); //= [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

append("cherry", ["apple", "berry"]); //= ["apple", "berry", "cherry"]

apply(Math.max, [1, 2, 3]); //= 3

applySpec({
  sum: add,
  nested: {
    result: and,
  },
})(1, 2); //= { sum: 3, nested: { result: true } }

applyTo(1, add(2)); //= 3

ascend(Math.abs); //= [Function: f2]
applyTo([-4, 3, -2, 1], sort(ascend(Math.abs))); //= [1, -2, 3, -4]

assoc("c", 3, { a: 1, b: 2 }); //= { a: 1, b: 2, c: 3 }

assocPath(["a", "b", "c"], "cherry", {}); //= { a: { b: { c: "cherry" } } }

binary((...args) => [...args])(1, 2, 3, 4); //= [1, 2]
