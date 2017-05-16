# React Event

#### Declarative way to handle events outside / inside of React Component.

[![Build Status](https://semaphoreci.com/api/v1/rpunkfu/react-event/branches/master/badge.svg)](https://semaphoreci.com/rpunkfu/react-event)
![](https://img.shields.io/badge/license-MIT-blue.svg)

### Example

```js
import enhanceWithEvent from '@pinnacleio/react-event'

class HelloWorld extends Component {
  handleEvent() { /* Do whatever you want :) */ }
  render() { return <div /> }
}

// This component calls `handleEvent` method when `mousedown` is fired anywhere.
const Foo = enhanceWithEvent('mousedown')(HelloWorld)

// This component calls `handleEvent` method when `mousedown` is fired inside it.
const Bar = enhanceWithEvent('mousedown', { inside: true })(HelloWorld)

// This component calls `handleEvent` method when `mousedown` is fired outside of it.
const Baz = enhanceWithEvent('mousedown', { outside: true })(HelloWorld)
```

### API

Our component must define method `handleEvent()` in order for enhancer to work, otherwise nothing will happen.

```js
enhanceWithEvent(
  events: String | Array<String>, 
  options: Object,
): HigherOrderComponent
```

| Parameter | Description | Example | Default Value |
|:-:|:-:|:-:|:-:|
| events | Event type(s) to listen for. | `'mousedown', ['mousedown', 'touchstart']` | Nil |
| options | Where event will be accepted. | `{ outside: true }, { inside: true }` | {} |
