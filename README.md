# `@vitorluizc/maybe`

[![Build Status](https://travis-ci.org/VitorLuizC/maybe.svg?branch=master)](https://travis-ci.org/VitorLuizC/maybe)
[![License](https://badgen.net/github/license/VitorLuizC/maybe)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/@vitorluizc/maybe)](https://bundlephobia.com/result?p=@vitorluizc/maybe)

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

## Usage

```ts
import Maybe from '@vitorluizc/maybe';

// ...

button.addEventListener('click', () => {
  Maybe(field.value)
    .map((name) => users.find((user) => user.name.includes(name)))
    .map((user) => repositories.filter((repository) => repository.owner === user.id))
    .then((repositories) => {
      container.innerHTML = '';
      repositories.forEach((repository) => {
        container.innerHTML += renderRepository(repository);
      });
    });
});
```

## License

Released under [MIT License](./LICENSE).
