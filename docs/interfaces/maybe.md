[@vitorluizc/maybe](../README.md) > [Maybe](../interfaces/maybe.md)

# Interface: Maybe

Interface of Maybe instances, objects that wraps unsafe values and provide methods to handle it in a _safe flow_.

## Type parameters
#### T 

Generic type of the safe value (other than `Nothing`).

## Hierarchy

**Maybe**

## Index

### Properties

* [_isMaybe](maybe.md#_ismaybe)
* [get](maybe.md#get)
* [map](maybe.md#map)
* [match](maybe.md#match)
* [unwrap](maybe.md#unwrap)

---

## Properties

<a id="_ismaybe"></a>

### `<Private>` _isMaybe

**● _isMaybe**: *`true`*

*Defined in [maybe.ts:120](https://github.com/VitorLuizC/maybe/blob/87f4245/src/maybe.ts#L120)*

___
<a id="get"></a>

###  get

**● get**: *`function`*

*Defined in [maybe.ts:134](https://github.com/VitorLuizC/maybe/blob/87f4245/src/maybe.ts#L134)*

Get Maybe wrapped value if it isn't `Nothing` and a placeholder otherwise.

*__example__*:
 ```ts
createMaybe<string>(null).get('Unknown');
//=> 'Unknown'

createMaybe<string>('Will').get('Unknown');
//=> 'Will'
```

*__param__*: The placeholder returned if wrapped value is `Nothing`.

#### Type declaration
▸(placeholder: *`T`*): `T`

**Parameters:**

| Name | Type |
| ------ | ------ |
| placeholder | `T` |

**Returns:** `T`

___
<a id="map"></a>

###  map

**● map**: *`function`*

*Defined in [maybe.ts:160](https://github.com/VitorLuizC/maybe/blob/87f4245/src/maybe.ts#L160)*

If Maybe wrapped value is `Nothing` it returns a Maybe, without calling fn (the map function). Otherwise, call fn (the map function) with Maybe wrapped value as the argument and return a new Maybe from its result, it also prevents Maybe from wrap anotherMaybe instance (flatten).

*__example__*:
 ```ts
createMaybe<string>().map((name) => name.split(''));
//=> Maybe<string[]>

createMaybe('Max').map((name) => name.split(''));
//=> Maybe<string[]>

const toLetters = (word: string) => createMaybe<string[]>(
  !!word.trim() ? [...word] : undefined
);

createMaybe('Max').map(toLetters);
//=> Maybe<string[]>
```

*__param__*: The map function called with value as the argument if it isn't `Nothing`.

#### Type declaration
▸<`U`>(fn: *`function`*): [Maybe](maybe.md)<`U`>

**Type parameters:**

#### U 

The generic type of value returned by fn (the map function).

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** [Maybe](maybe.md)<`U`>

___
<a id="match"></a>

###  match

**● match**: *`function`*

*Defined in [maybe.ts:184](https://github.com/VitorLuizC/maybe/blob/87f4245/src/maybe.ts#L184)*

Match Maybe wrapped value pattern, call its handler (function) and return the result. It matches pattern `none` if the value is `Nothing` and `some` otherwise.

*__example__*:
 ```ts
createMaybe<string>().match({
  none: () => [],
  some: (name) => name.split(''),
});
//=> []

createMaybe('Max').match({
  none: () => [],
  some: (name) => name.split(''),
});
//=> ['M', 'a', 'x']
```

*__param__*: A MaybePattern implementation for the value.

#### Type declaration
▸<`U`>(pattern: *[MaybePattern](maybepattern.md)<`T`, `U`>*): `U`

**Type parameters:**

#### U 

The generic type of value returned by handlers (functions) of the patterns.

**Parameters:**

| Name | Type |
| ------ | ------ |
| pattern | [MaybePattern](maybepattern.md)<`T`, `U`> |

**Returns:** `U`

___
<a id="unwrap"></a>

###  unwrap

**● unwrap**: *`function`*

*Defined in [maybe.ts:197](https://github.com/VitorLuizC/maybe/blob/87f4245/src/maybe.ts#L197)*

Return Maybe wrapped value (unwraps it).

*__example__*:
 ```ts
createMaybe<string>().unwrap();
//=> undefined

createMaybe<string>('Max').unwrap();
//=> 'Max'
```

#### Type declaration
▸(): `T` \| [Nothing](../#nothing)

**Returns:** `T` \| [Nothing](../#nothing)

___

