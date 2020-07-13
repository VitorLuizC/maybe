[@vitorluizc/maybe](../README.md) > [Maybe](../interfaces/maybe.md)

# Interface: Maybe

## Type parameters
#### T 
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

*Defined in [maybe.ts:120](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L120)*

___
<a id="get"></a>

###  get

**● get**: *`function`*

*Defined in [maybe.ts:134](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L134)*

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

*Defined in [maybe.ts:160](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L160)*

#### Type declaration
▸<`U`>(fn: *`function`*): [Maybe](maybe.md)<`U`>

**Type parameters:**

#### U 
**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** [Maybe](maybe.md)<`U`>

___
<a id="match"></a>

###  match

**● match**: *`function`*

*Defined in [maybe.ts:184](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L184)*

#### Type declaration
▸<`U`>(pattern: *[MaybePattern](maybepattern.md)<`T`, `U`>*): `U`

**Type parameters:**

#### U 
**Parameters:**

| Name | Type |
| ------ | ------ |
| pattern | [MaybePattern](maybepattern.md)<`T`, `U`> |

**Returns:** `U`

___
<a id="unwrap"></a>

###  unwrap

**● unwrap**: *`function`*

*Defined in [maybe.ts:197](https://github.com/VitorLuizC/maybe/blob/4e94bc2/src/maybe.ts#L197)*

#### Type declaration
▸(): `T` \| [Nothing](../#nothing)

**Returns:** `T` \| [Nothing](../#nothing)

___

