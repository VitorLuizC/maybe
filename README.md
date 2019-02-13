# `@vitorluizc/maybe`

[![Build Status](https://travis-ci.org/VitorLuizC/maybe.svg?branch=master)](https://travis-ci.org/VitorLuizC/maybe)
[![License](https://badgen.net/github/license/VitorLuizC/maybe)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe)

## Usage

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

## Installation

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
      .then((users) => $('#template-users').render(users));
  });
</script>
```

## API

This module exports the `Maybe` as default and the `None` type. `Maybe` is a type and a function factory with some static methods.

```ts
import Maybe, { None } from '@vitorluizc/maybe';
```

- **`Maybe`** (factory function) receives a value, of generic type `T` or `None`, and returns an object of type `Maybe<T>`.

  ```ts
  Maybe(12);
  //=> Maybe<number>

  Maybe<string>(/* undefined */);
  //=> Maybe<string>
  ```

- **`Maybe<T>`** (type) defines an object created by the factory function `Maybe`.

  A `Maybe` has methods that ensure a safe flow to handle optional and / or nullable values.

  ```ts
  // ...

  const name: Maybe<string> = (
    Maybe(field.value)
      .map((name) => capitalize(name))
  );

  console.log('Name is ' + name.get('Unknown'));
  ```

  - **`.get(placeholder)`** receives a placeholder and returns the value or the placeholder if it is `None`.

    ```ts
    // ...

    Maybe<string>('Naruto Uzumaki').get('Unknown');
    //=> 'Naruto Uzumaki'

    Maybe<string>(null).get('Unknown');
    //=> 'Unknown'
    ```

  - **`.map(fn)`** receives mapper function as argument and returns a new Maybe (an empty one if the value is `None`).

    ```ts
    // ...

    Maybe<number>(100).map((price) => '$' + price.toFixed(2));
    //=> Maybe<string>

    Maybe<number>().map((price) => '$' + price.toFixed(2));
    //=> Maybe<string>
    ```

    > The return of mapper function can be a `Maybe` or another value that will be encapsulated in `Maybe`.
    > ```ts
    >  Maybe<number>(-19).map((price) => Maybe('$' + price.toFixed(2)));
    >  //=> Maybe<string>
    > ```

  - **`.then(fn)`** receives a function as argument and executes it if value is not `None`.

    > Use **side-effects** with this function.

    ```ts
    // ...

    Maybe<number>(field.value).then((name) => console.log(name));
    //=> undefined
    ```

- **`Maybe.isNone`** is a function that checks if value is `None`.

  ```ts
  Maybe.isNone(null);
  //=> true

  Maybe.isNone(undefined);
  //=> true
  ```

- **`Maybe.isMaybe`** is a function that checks if value is a `Maybe<any>`.

  > It is used internally, but I think it might be useful.

  ```ts
  Maybe.isMaybe(Maybe<number>());
  //=> true
  ```

- **`None`** represents the absence of value and is a combination of `void`, `null` and `undefined` types.

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
  >  Maybe.isNone(0) || Maybe.isNone('') || Maybe.isNone(NaN) || Maybe.isNone(false)
  >  //=> false
  > ```

## License

Released under [MIT License](./LICENSE).
