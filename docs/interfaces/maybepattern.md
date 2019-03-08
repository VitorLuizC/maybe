[@vitorluizc/maybe](../README.md) > [MaybePattern](../interfaces/maybepattern.md)

# Interface: MaybePattern

Interface of patterns and their handlers (functions) for the value that maybe is `Nothing`.

*__example__*:
 ```ts
const pattern: MaybePattern<string, Array<string>> = {
  none: () => [],
  some: (name) => name.split(''),
};
```

## Type parameters
#### T 

Generic type of the safe value (other than `Nothing`).

#### U 

The generic type of value returned by handlers (functions).

## Hierarchy

**MaybePattern**

## Index

### Properties

* [none](maybepattern.md#none)
* [some](maybepattern.md#some)

---

## Properties

<a id="none"></a>

###  none

**● none**: *`function`*

*Defined in [maybe.ts:69](https://github.com/VitorLuizC/maybe/blob/2e4d614/src/maybe.ts#L69)*

Handler (function) for pattern matched if the value is `Nothing`. It doesn't receive the value as the argument.

#### Type declaration
▸(): `U`

**Returns:** `U`

___
<a id="some"></a>

###  some

**● some**: *`function`*

*Defined in [maybe.ts:76](https://github.com/VitorLuizC/maybe/blob/2e4d614/src/maybe.ts#L76)*

Handler (function) for pattern matched if the value isn't `Nothing`. In contrast to the none handler, it receives value as the argument.

*__param__*: The value (not `Nothing`).

#### Type declaration
▸(value: *`T`*): `U`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `T` |

**Returns:** `U`

___

