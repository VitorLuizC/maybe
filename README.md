
`@vitorluizc/maybe`
===================

[![Build Status](https://travis-ci.org/VitorLuizC/maybe.svg?branch=master)](https://travis-ci.org/VitorLuizC/maybe) [![License](https://badgen.net/github/license/VitorLuizC/maybe)](./LICENSE) [![Library minified size](https://badgen.net/bundlephobia/min/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe) [![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe)

Usage
-----

```ts
import Maybe from '@vitorluizc/maybe';

// ...

const repositories: Maybe<Repository[]> = (
  Maybe(field.value)
    .map((name) => users.find((user) => user.name.includes(name)))
    .map((user) => repositories.filter((repository) => repository.owner === user.id))
);

repositories.get([]).forEach((repository) => {
  container.innerHTML += renderRepository(repository);
});
```

Installation
------------

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install @vitorluizc/maybe --save

# For Yarn, use the command below.
yarn add @vitorluizc/maybe
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<script src="https://unpkg.com/@vitorluizc/maybe@^0.0.0"></script>

<script>
  // jQuery is here just to show the example.

  $('#field-name').on('change', (event) => {
    Maybe(event.target.value)
      .map((name) => users.filterByName(name))
      .map((users) => $('#template-users').render(users));
  });
</script>
```

API
---

#### `Maybe`

Maybe is a factory function that receives a value, generic type `T` or `Nothing`, and returns an object of type `Maybe<T>`.

```ts
Maybe(12);
//=> Maybe<number>

Maybe<string>();
//=> Maybe<string>
```

#### `Some`

A factory function

```ts
Maybe(12);
//=> Maybe<number>

Maybe<string>();
//=> Maybe<string>
```

#### `None`

Maybe is a factory function that receives a value, generic type `T` or `Nothing`, and returns an object of type `Maybe<T>`.

```ts
Maybe(12);
//=> Maybe<number>

Maybe<string>();
//=> Maybe<string>
```

#### `Maybe<T>`

`Maybe<T>` is a type to define Maybe object instances.

```ts
  // ...

  const name: Maybe<string> = (
    Maybe(field.value)
      .map((name) => capitalize(name))
  );

  console.log('Name is ' + name.get('Unknown'));
```

*   **`.get(placeholder)`** receives a placeholder and returns the value or the placeholder if it is `None`.
    
    ```ts
    // ...
    
    Maybe<string>('Naruto Uzumaki').get('Unknown');
    //=> 'Naruto Uzumaki'
    
    Maybe<string>(null).get('Unknown');
    //=> 'Unknown'
    ```
    
*   **`.map(fn)`** receives mapper function as argument and returns a new Maybe (an empty one if the value is `None`).
    
    ```ts
    // ...
    
    Maybe<number>(100).map((price) => '$' + price.toFixed(2));
    //=> Maybe<string>
    
    Maybe<number>().map((price) => '$' + price.toFixed(2));
    //=> Maybe<string>
    ```
    
    > The return of mapper function can be a `Maybe` or another value that will be encapsulated in `Maybe`.
    > 
    > ```ts
    >  Maybe<number>(-19).map((price) => Maybe('$' + price.toFixed(2)));
    >  //=> Maybe<string>
    > ```
    
*   **`.then(fn)`** receives a function as argument and executes it if value is not `None`.
    
    > Use **side-effects** with this function.
    
    ```ts
    // ...
    
    Maybe<number>(field.value).then((name) => console.log(name));
    //=> undefined
    ```
    

*   **`Maybe.isNone`** is a function that checks if value is `None`.
    
    ```ts
    Maybe.isNone(null);
    //=> true
    
    Maybe.isNone(undefined);
    //=> true
    ```
    
*   **`Maybe.isMaybe`** is a function that checks if value is a `Maybe<any>`.
    
    > It is used internally, but I think it might be useful.
    
    ```ts
    Maybe.isMaybe(Maybe<number>());
    //=> true
    ```
    
*   **`None`** represents the absence of value and is a combination of `void`, `null` and `undefined` types.
    
    ```ts
    let valueA: None;
    let valueC: None = null;
    let valueB: None = undefined;
    let valueD: None = ((): void => {})();
    ```
    
    > _Falsy_ values are not `None`.
    > 
    > ```ts
    >  const empty: None = ''; // This is a TypeError.
    > 
    >  Maybe.isNone(0) \|\| Maybe.isNone('') \|\| Maybe.isNone(NaN) \|\| Maybe.isNone(false)
    >  //=> false
    > ```
    

License
-------

Released under [MIT License](./LICENSE).

## Index

### Type aliases

* [Maybe](#maybe)
* [MaybePattern](#maybepattern)
* [Nothing](#nothing)

### Functions

* [None](#none)
* [Some](#some)
* [get](#get)
* [isMaybe](#ismaybe)
* [isNothing](#isnothing)
* [map](#map)
* [match](#match)

---

## Type aliases

<a id="maybe"></a>

###  Maybe

▸ **Maybe**<`T`>(value: *`T` \| [Nothing](#nothing)*): [Maybe]()<`T`>

*Defined in [maybe.ts:82](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/maybe.ts#L82)*

Maybe constructor (factory) and helpers.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` \| [Nothing](#nothing) |   |

**Returns:** [Maybe]()<`T`>

___
<a id="maybepattern"></a>

###  MaybePattern

**Ƭ MaybePattern**: *`object`*

*Defined in [maybe.ts:24](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/maybe.ts#L24)*

MaybePattern is a type to used to match maybe patterns and handle each one.

#### Type declaration

 none: `function`

▸(): `U`

**Returns:** `U`

 some: `function`

▸(value: *`T`*): `U`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `T` |

**Returns:** `U`

___
<a id="nothing"></a>

###  Nothing

**Ƭ Nothing**: *`void` \| `null` \| `undefined`*

*Defined in [nothing.ts:4](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/nothing.ts#L4)*

Combine JavaScript null and undefined types.

___

## Functions

<a id="none"></a>

###  None

▸ **None**<`T`>(): [Maybe](#maybe)<`T`>

*Defined in [maybe.ts:104](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/maybe.ts#L104)*

Create a Maybe instance for none value.

**Type parameters:**

#### T 

**Returns:** [Maybe](#maybe)<`T`>

___
<a id="some"></a>

###  Some

▸ **Some**<`T`>(value: *`T`*): [Maybe](#maybe)<`T`>

*Defined in [maybe.ts:112](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/maybe.ts#L112)*

Create a Maybe instance for some value (non-none), throws Error otherwise.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  A non-none value. |

**Returns:** [Maybe](#maybe)<`T`>

___
<a id="get"></a>

###  get

▸ **get**<`T`>(value: *`T` \| [Nothing](#nothing)*, placeholder: *`T`*): `T`

*Defined in [maybe.ts:8](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/maybe.ts#L8)*

Returns value if some or placeholder otherwise.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` \| [Nothing](#nothing) |  None or a value. |
| placeholder | `T` |  A value returned if first is none. |

**Returns:** `T`

___
<a id="ismaybe"></a>

###  isMaybe

▸ **isMaybe**(value: *`unknown`*): `boolean`

*Defined in [maybe.ts:74](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/maybe.ts#L74)*

Check if value is a Maybe.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `unknown` |  Any value compared to Maybe. |

**Returns:** `boolean`

___
<a id="isnothing"></a>

###  isNothing

▸ **isNothing**(value: *`unknown`*): `boolean`

*Defined in [nothing.ts:10](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/nothing.ts#L10)*

Check if value is none.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `unknown` |  Any value compared to none. |

**Returns:** `boolean`

___
<a id="map"></a>

###  map

▸ **map**<`T`,`U`>(value: *`T` \| [Nothing](#nothing)*, fn: *`function`*): `U` \| [Nothing](#nothing)

*Defined in [maybe.ts:17](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/maybe.ts#L17)*

if some or return none.

**Type parameters:**

#### T 
#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` \| [Nothing](#nothing) |  None or a value. |
| fn | `function` |  A mapper function |

**Returns:** `U` \| [Nothing](#nothing)

___
<a id="match"></a>

###  match

▸ **match**<`T`,`U`>(value: *`T` \| [Nothing](#nothing)*, pattern: *[MaybePattern](#maybepattern)<`T`, `U`>*): `U`

*Defined in [maybe.ts:34](https://github.com/VitorLuizC/maybe/blob/ef30c0b/src/maybe.ts#L34)*

Match a pattern and execute it's function with value.

**Type parameters:**

#### T 
#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` \| [Nothing](#nothing) |  None or a value. |
| pattern | [MaybePattern](#maybepattern)<`T`, `U`> |  Patterns to handle. |

**Returns:** `U`

___

