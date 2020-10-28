---
title: "TypeScript Generics"
date: "2020-08-14 23:00:00"
author: "Han Sim"
category: "Web"
tags:
  - TypeScript
---

# Type Variable

```TypeScript
function foo<T>(arg: T): T {
  return arg;
}

let output_1 = foo<string>('hi');
let output_2 = foo('hi');
```

T is called a _Type Variable_.

The compiler will automatically look at the value 'hi' and then set 'T' to its type. However this can make potential pitfalls, so you may want to explicitly pass the type variable.

# Generic Type Variables

You can set a type of a generic variable by this.

```TypeScript
function foo<T>(args: Array<T>): Array<T> {
  console.log(args.length);
  return args;
}

// or we can write this way.
function foo_2<T>(args: T[]): T[] {
  console.log(args.length);
  return args;
}
```

You can also set a custom generic type interface.

```TypeScript
// Interface offers a generic signature, without any function specified.
interface IFoo<T> {
  <T>(arg: T): T;
}

function foo<T>(arg: T): T {
  return arg;
}

let myFoo: IFoo<number> = foo; // Set the generic type here. This is bound at this time.
myFoo(12);
myFoo('hi'); // compile error.
```

Another example here:

```TypeScript{10-11}
interface KeyPair<T, U> {
  key: T,
  vale: U,
}

function processNumKeyPairs(key: number, value: number): void {
  console.log('processNumKeyPairs: key = ' + key + ', value = ' + value)
}

// when declare foo here, the generic type will be set.
let foo: KeyValueProcessor<number, number> = processNumKeyPairs;
foo(1, 12345);
```

The interface `KeyPair` includes the generic signature of a method without the method name specified, which allows us to use any function with the matching signature.

# Generic Constraints

https://www.typescriptlang.org/docs/handbook/generics.html#using-type-parameters-in-generic-constraints

```TypeScript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m"); // error, since 'm' is not keyof x.
```

A `keyof T` type is a subtype of string. In this example, it will include 'a', 'b', 'c', or 'd'. (https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
