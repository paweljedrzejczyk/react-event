# React Event
> Declarative way to handle events outside / inside of React Component.

[![Build Status](https://semaphoreci.com/api/v1/rpunkfu/react-event/branches/master/badge.svg)](https://semaphoreci.com/rpunkfu/react-event)

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

_Better docs coming soon_
