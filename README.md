<h1 align="center">&lt;StyledProxy&gt;</h1>
<h5 align="center">Avoid unneeded DOM nodes while using CSS-in-JS components</h5>

This small component allows to create visual primitives without excessive DOM pollution. Designed to be library-agnostic. Tested with `styled-components`.

## Installation

| npm                               | Yarn                    |
| --------------------------------- | ----------------------- |
| `npm install styled-proxy --save` | `yarn add styled-proxy` |


## Usage

Pass it as base component to CSS-in-JS library of your choice. Then wrap any component with it to get it styled without extra DOM nodes.

```jsx
// bubble.js
import StyledProxy from 'styled-proxy'
import styled from 'styled-components'

export default styled(StyledProxy)`
  padding: 1em 2em;
  border-radius: .3em;
  box-shadow: 0 .3em .5em rgba(0, 0, 0, .2);
`
```

```jsx
// app.js
import Bubble from './bubble'

function App() {
  return (
    <main>
      <h1>Styled Proxy demo</h1>
      <Bubble><p>This will be a single tag</p></Bubble>
    </main>
  )
}
```

```html
<!-- Resulting HTML -->
<main>
  <h1>Styled Proxy demo</h1>
  <p class="sc-hfu239h">This will be a single tag</p>
</main>
```

Important requirements are following:
  - library you use must accept components (`styled(StyledProxy)`);
  - library you use must inject `className` into given component;
  - component passed as child must accept `className`.


## API

### `children`

Type: React elements.

The `StyledProxy` styles target, will get `className` produced by CSS-in-JS library unless [`component`](#component) property is given (see below).

```jsx
<SomeStyledProxy>
  <div>Foo</div>
</SomeStyledProxy>
```

Resulting HTML:

```html
<div class="sc-3j03y55">Foo</div>
```


Multiple children will get the same class:

```jsx
<SomeStyledProxy>
  <div>Foo</div>
  <div>Bar</div>
  <div>Baz</div>
</SomeStyledProxy>
```

Resulting HTML:

```html
<div class="sc-3j03y55">Foo</div>
<div class="sc-3j03y55">Bar</div>
<div class="sc-3j03y55">Baz</div>
```


### `className`

Type: string

Class to inject together with a generated one. Allows to pass additional classes and helps nesting StyledProxy instances.

```jsx
<FirstStyledProxy>
  <SecondStyledProxy className="custom">
    <p>Example text</p>
  </SecondStyledProxy>
</FirstStyledProxy>
```

Resulting HTML:

```html
<p class="sc-hfu239h sc-384hb3j custom">
  Example text
</p>
```


### `component`

Type: React class, stateless component or string.

Render the `StyledProxy` element as regular component. Whatever passed to `component` prop will be used as element type. `className` will be attached to that element and not to children.

JSX:

```jsx
<SomeStyledProxy component="blockquote">
  <p>Example text</p>
</SomeStyledProxy>
```

Resulting HTML:

```html
<blockquote class="sc-384hb3j">
  <p>Example text</p>
</blockquote>
```


## License

MIT © Leonard Kinday
