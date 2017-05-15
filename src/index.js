import { Component, createElement } from 'react'
import ReactDOM from 'react-dom'

export default (events, options = {}) => X => class ReactEvent extends Component {
  getEvents() {
    return Array.isArray(events) ? events : [events]
  }

  componentDidMount() {
    if (!this.x.handleEvent) return null
    if (!events || !events.length) return null

    this.getEvents().forEach(event => {
      window.addEventListener(event, this.handleEvent, false)
    })
  }

  componentWillUnmount() {
    if (!this.x.handleEvent) return null
    if (!events || !events.length) return null

    this.getEvents().forEach(event => {
      window.removeEventListener(event, this.handleEvent, false)
    })
  }

  handleEvent = event => {
    const { target } = event
    const parentElement = ReactDOM.findDOMNode(this.x)

    if (!parentElement) return null

    const isInside = parentElement.contains(target) || parentElement === target
    const isOutside = !isInside

    if (isOutside && options.inside) return null
    if (isInside && options.outside) return null

    return this.x.handleEvent(event)
  }

  render() {
    return createElement(X, Object.assign({}, this.props, { ref: x => this.x = x }))
  }
};
