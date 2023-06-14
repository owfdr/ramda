import {
  F,
  T,
  __,
  add,
  adjust,
  always,
  and,
  append,
  assoc,
  assocPath,
  both,
  complement,
  compose,
  concat,
  cond,
  curry,
  dec,
  defaultTo,
  dissoc,
  dissocPath,
  divide,
  drop,
  dropLast,
  either,
  equals,
  evolve,
  filter,
  find,
  flip,
  forEach,
  gt,
  gte,
  has,
  identical,
  identity,
  ifElse,
  inc,
  includes,
  insert,
  isEmpty,
  isNil,
  keys,
  lens,
  lensIndex,
  lensPath,
  lensProp,
  lt,
  lte,
  map,
  mergeAll,
  mergeLeft,
  mergeRight,
  multiply,
  negate,
  not,
  nth,
  nthArg,
  omit,
  or,
  over,
  partial,
  partialRight,
  path,
  pathOr,
  pick,
  pipe,
  prepend,
  prop,
  propEq,
  propOr,
  reduce,
  reject,
  remove,
  set,
  slice,
  subtract,
  unless,
  update,
  values,
  view,
  when,
  without,
} from "ramda";

// --- 1. Getting Started ---

const log = (value) => console.log(value);
forEach(log, [1, 2, 3]); // 1, 2, 3

const double = (value) => value * 2;
map(double, [1, 2, 3]); //= [2, 4, 6]

const isOdd = (x) => x % 2 === 1;
filter(isOdd, [1, 2, 3, 4, 5]); //= [1, 3, 5]
reject(isOdd, [1, 2, 3, 4, 5]); //= [2, 4]
find(isOdd, [1, 2, 3, 4, 5]); //= 1

reduce(add, 0, [1, 2, 3]); //= 6

// --- 2. Combining Functions ---

const isEven = complement(isOdd);
find(isEven, [1, 2, 3, 4, 5]); //= 2

const bornInUsa = (person) => person.birthCountry === "USA";
const naturalized = (person) => Boolean(person.naturalizationDate);
const citizen = either(bornInUsa, naturalized);
const over18 = (person) => person.age >= 18;
const votable = both(citizen, over18);
votable({ age: 19, birthCountry: "USA" }); //= true

pipe(add(1), multiply(3), add(2))(2); //= 11
compose(add(2), multiply(3), add(1))(2); //= 11

// --- 3. Partial Application ---

const books = [
  { year: 2000, title: "A" },
  { year: 2001, title: "B" },
];

// Starter
var publishedIn = (book, year) => book.year === year;
var titles = (books, year) => {
  const filtered = filter((book) => publishedIn(book, year), books);
  const titles = map((book) => book.title, filtered);

  return titles;
};
titles(books, 2001); //= ["B"]

// Higher-Order
var publishedIn = (year) => (book) => book.year === year;
var titles = (books, year) => {
  const filtered = filter(publishedIn(year), books);
  const titles = map((book) => book.title, filtered);

  return titles;
};
titles(books, 2001); //= ["B"]

// Partially-Applying
var publishedIn = (year, book) => book.year === year;
var titles = (books, year) => {
  const filtered = filter(partial(publishedIn, [year]), books);
  const titles = map((book) => book.title, filtered);

  return titles;
};
titles(books, 2001); //= ["B"]

// Partially-Applying (from Right)
var publishedIn = (book, year) => book.year === year;
var titles = (books, year) => {
  const filtered = filter(partialRight(publishedIn, [year]), books);
  const titles = map((book) => book.title, filtered);

  return titles;
};
titles(books, 2001); //= ["B"]

// Currying
var publishedIn = curry((year, book) => book.year === year);
var titles = (books, year) => {
  const filtered = filter(publishedIn(year), books);
  const titles = map((book) => book.title, filtered);

  return titles;
};
titles(books, 2001); //=

// Flip Order
var publishedIn = curry((book, year) => book.year === year);
var titles = (books, year) => {
  const filtered = filter(flip(publishedIn)(year), books);
  const titles = map((book) => book.title, filtered);

  return titles;
};
titles(books, 2001); //=

// Placeholder
var publishedIn = curry((year, book) => book.year === year);
var titles = (books, year) => {
  const filtered = filter(publishedIn(year, __), books);
  const titles = map((book) => book.title, filtered);

  return titles;
};
titles(books, 2001); //= ["B"]

// Pipeline
var publishedIn = curry((year, book) => book.year === year);
var titles = curry((year, books) =>
  pipe(
    filter(publishedIn(year)),
    map((book) => book.title)
  )(books)
);
titles(2001, books); //= ["B"]

// --- 4. Declarative Programming ---

add(1, 1); //= 2
subtract(2, 1); //= 1

multiply(2, 2); //= 4
divide(4, 2); //= 2

pipe(subtract(__, 1), divide(__, 2))(5); //= 2

inc(1); //= 2
dec(1); //= 0

negate(1); //= -1

gt(2, 1); //= true
gte(2, 1); //= true

lt(1, 2); //= true
lte(1, 2); //= true

equals("a", "a"); //= true
identical({}, {}); //= false

isEmpty([]); //= true
isNil(undefined); //= true

both(gt(__, 2), lt(__, 4))(3); //= true
either(gt(__, 2), lt(__, 4))(4); //= true
complement(gt(__, 2))(3); //= false

and(true, false); //= false
or(true, false); //= true
not(true); //= false

defaultTo(1, undefined); //= 1

ifElse(gt(__, 2), inc, dec)(3); //= 4

T(); //= true
F(); //= false
always(21)(); //= 21

identity(3); //= 3
nthArg(1)(1, 2, 3); //= 2

when((x) => x > 21, always(21))(22); //= 21;
unless((x) => x < 21, always(21))(10); //= 10;

cond([
  [equals(0), always("water freezes at 0°C")],
  [equals(100), always("water boils at 100°C")],
  [T, (temp) => `nothing special happens at ${temp}°C`],
])(99); //= "nothing special happens at 99°C"

// --- 5. Point-free Style ---

const eligible = both(
  either(propEq("USA", "birthCountry"), has("naturalizationDate")),
  compose(gte(__, 18), prop("age"))
);

eligible({
  age: 20,
  birthCountry: "Japan",
  naturalizationDate: "2022-09-21",
}); //= true

// --- 6. Immutability and Objects ---

prop("name", { name: "John" }); //= "John"

pick(["name", "age"], { name: "John", age: 20 }); //= { name: "John", age: 20 }

has("name", { name: "John" }); //= true

path(["address", "street"], { address: { street: "123 Main St." } }); //= "123 Main St."

propOr("John", "name", {}); //= "John"

pathOr("123 Main St.", ["address", "street"], {}); //= "123 Main St."

keys({ name: "John", age: 20 }); //= ["name", "age"]

values({ name: "John", age: 20 }); //= ["John", 20]

assoc("name", "John", {}); //= { name: "John" }

assocPath(["address", "street"], "123 Main St.", {}); //= { address: { street: "123 Main St." } }

dissoc("name", { name: "John" }); //= {}

dissocPath(["address", "street"], { address: { street: "123 Main St." } }); //= { address: {} }

omit(["name", "age"], { name: { first: "Oscar" }, age: 20 }); //= {}

evolve({ age: inc }, { name: "John", age: 20 }); //= { name: "John", age: 21 }

mergeLeft({ name: "John" }, { name: "Oscar" }); //= { name: "John" }

mergeRight({ name: "John" }, { name: "Oscar" }); //= { name: "Oscar" }

mergeAll([{ name: "John" }, { age: 27 }, { name: "Oscar" }]); //= { name: "Oscar", age: 27 }

// --- 7. Immutability and Arrays ---

nth(2, [1, 2, 3]); //= 3

slice(0, 2, [1, 2, 3, 4, 5]); //= [1, 2]

includes(1, [1, 2, 3]); //= true

insert("c", 3, ["a", "b", "d"]); //= ["a", "b", "c", "d"]

update(2, "c", ["a", "b", "d"]); //= ["a", "b", "c"]

prepend("a", ["b", "c"]); //= ["a", "b", "c"]

append("c", ["a", "b"]); //= ["a", "b", "c"]

concat(["a", "b"], ["c"]); //= ["a", "b", "c"]

remove(2, 1, ["a", "b", "c", "d"]); //= ["a", "b", "d"]

without(["a", "b"], ["a", "b", "c", "d"]); //= ["c", "d"]

drop(2, ["a", "b", "c", "d"]); //= ["c", "d"]

dropLast(2, ["a", "b", "c", "d"]); //= ["a", "b"]

adjust(2, inc, [1, 2, 3]); //= [1, 2, 4]

// --- 8. Lenses ---

lens(prop("name"), assoc("name"));

const name = lensProp("name");

const street = lensPath(["address", "street"]);

const first = lensIndex(0);

view(name, { name: "John" }); //= "John"

set(street, "123 Main St.", {}); //=

over(first, inc, [3, 2, 1]); //= [4, 2, 1]
