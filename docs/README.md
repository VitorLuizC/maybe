
`@vitorluizc/maybe`
===================

[![Build Status](https://travis-ci.org/VitorLuizC/maybe.svg?branch=master)](https://travis-ci.org/VitorLuizC/maybe) [![License](https://badgen.net/github/license/VitorLuizC/maybe)](./LICENSE) [![Library minified size](https://badgen.net/bundlephobia/min/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe) [![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe)

Maybe wraps unsafe values and provide methods to handle them in a _safe flow_.

Usage
-----

```ts
import { createMaybe } from '@vitorluizc/maybe'

const repositories =
  createMaybe(field.value)
    .map(name => users.find(user => user.name.includes(name)))
    .map(user => repositories.filter(repository => repository.owner === user.id))

repositories.get([]).forEach(repository => {
  container.innerHTML += renderRepository(repository);
})
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
<script src="https://unpkg.com/@vitorluizc/maybe@^2.0.0"></script>

<script>
  // jQuery is here just to show the example.

  $("#field-name").on("change", event => {
    Maybe.createMaybe(event.target.value)
      .map(name => users.filterByName(name))
      .map(users => $("#template-users").render(users));
  });
</script>
```

Documentation
-------------

[Documentation generated from source files by Typedoc](./docs/README.md).

License
-------

Released under [MIT License](./LICENSE).

## Index

### Interfaces

* [Maybe](interfaces/maybe.md)
* [MaybePattern](interfaces/maybepattern.md)

### Type aliases

* [Nothing](#nothing)

### Functions

* [None](#none)
* [Some](#some)
* [createMaybe](#createmaybe)
* [get](#get)
* [isMaybe](#ismaybe)
* [isNothing](#isnothing)
* [map](#map)
* [match](#match)

---

## Type aliases

<a id="nothing"></a>

###  Nothing

**Ƭ Nothing**: *`void` \| `null` \| `undefined`*

*Defined in [nothing.ts:12](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/nothing.ts#L12)*

___

## Functions

<a id="none"></a>

###  None

▸ **None**<`T`>(): [Maybe](interfaces/maybe.md)<`T`>

*Defined in [maybe.ts:266](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L266)*

**Type parameters:**

#### T 

**Returns:** [Maybe](interfaces/maybe.md)<`T`>

___
<a id="some"></a>

###  Some

▸ **Some**<`T`>(value: *`T`*): [Maybe](interfaces/maybe.md)<`T`>

*Defined in [maybe.ts:288](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L288)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  A safe value of generic type \`T\`. |

**Returns:** [Maybe](interfaces/maybe.md)<`T`>

___
<a id="createmaybe"></a>

###  createMaybe

▸ **createMaybe**<`T`>(value: *`T` \| [Nothing](#nothing)*): [Maybe](interfaces/maybe.md)<`T`>

*Defined in [maybe.ts:226](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L226)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` \| [Nothing](#nothing) |  An unsafe value of generic type \`T\` or \`Nothing\`. |

**Returns:** [Maybe](interfaces/maybe.md)<`T`>

___
<a id="get"></a>

###  get

▸ **get**<`T`>(value: *`T` \| [Nothing](#nothing)*, placeholder: *`T`*): `T`

*Defined in [maybe.ts:21](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L21)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` \| [Nothing](#nothing) |  An unsafe value of generic type \`T\` or \`Nothing\`. |
| placeholder | `T` |  Placeholder of type \`T\` returned if value is \`Nothing\`. |

**Returns:** `T`

___
<a id="ismaybe"></a>

###  isMaybe

▸ **isMaybe**(value: *`unknown`*): `boolean`

*Defined in [maybe.ts:204](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L204)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `unknown` |  Any value compared to Maybe. |

**Returns:** `boolean`

___
<a id="isnothing"></a>

###  isNothing

▸ **isNothing**(value: *`unknown`*): `boolean`

*Defined in [nothing.ts:33](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/nothing.ts#L33)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `unknown` |  A value to be compared to \`Nothing\`. |

**Returns:** `boolean`

___
<a id="map"></a>

###  map

▸ **map**<`T`,`U`>(value: *`T` \| [Nothing](#nothing)*, fn: *`function`*): `U` \| [Nothing](#nothing)

*Defined in [maybe.ts:47](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L47)*

**Type parameters:**

#### T 
#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` \| [Nothing](#nothing) |  An unsafe value of generic type \`T\` or \`Nothing\`. |
| fn | `function` |  The map function called with value as the argument if it isn't \`Nothing\`. |

**Returns:** `U` \| [Nothing](#nothing)

___
<a id="match"></a>

###  match

▸ **match**<`T`,`U`>(value: *`T` \| [Nothing](#nothing)*, pattern: *[MaybePattern](interfaces/maybepattern.md)<`T`, `U`>*): `U`

*Defined in [maybe.ts:106](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L106)*

**Type parameters:**

#### T 
#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` \| [Nothing](#nothing) |  An unsafe value of generic type \`T\` or \`Nothing\`. |
| pattern | [MaybePattern](interfaces/maybepattern.md)<`T`, `U`> |  A MaybePattern implementation for the value. |

**Returns:** `U`

___

