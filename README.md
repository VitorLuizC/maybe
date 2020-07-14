# `@bitty/maybe`

[![Library minified size](https://badgen.net/bundlephobia/min/@bitty/maybe)](https://bundlephobia.com/result?p=@bitty/maybe)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/@bitty/maybe)](https://bundlephobia.com/result?p=@bitty/maybe)

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install @bitty/maybe --save

# For Yarn, use the command below.
yarn add @bitty/maybe
```

### Installation from CDN

This module has a UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/@bitty/maybe"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/@bitty/maybe"></script>

<script>
  // UMD module is exposed through the "Maybe" global object.
  Maybe.fromFalsy(document.querySelector('input#id'))
    .chain((el) => Maybe.fromFalsy(el.value?.trim()))
    .map(console.log);
</script>
```

## License

Released under [MIT License](./LICENSE).
