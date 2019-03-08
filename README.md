# `@vitorluizc/maybe`

[![Build Status](https://travis-ci.org/VitorLuizC/maybe.svg?branch=master)](https://travis-ci.org/VitorLuizC/maybe)
[![License](https://badgen.net/github/license/VitorLuizC/maybe)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe)

Maybe wraps unsafe values and provide methods to handle them in a _safe flow_.

## Usage

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

## Documentation

[Documentation generated from source files by Typedoc](./docs/README.md).

## License

Released under [MIT License](./LICENSE).
