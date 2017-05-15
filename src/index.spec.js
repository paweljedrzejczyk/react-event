import { Component, createElement } from 'react'
import ReactDOM from 'react-dom'
import simulant from 'simulant'

import enhanceWithEvent from '.'

const getComponentWithHandler = ( handler, ...args) =>
  enhanceWithEvent(...args)(class extends Component {
    handleEvent(event) { handler(event) }
    render() { return createElement('div') }
  })

const getComponentWithoutHandler = (...args) =>
  enhanceWithEvent(...args)(class extends Component {
    render() { return createElement('div') }
  })

describe('enhanceWithEvent', () => {
  const rootElement = document.createElement('div')
  const siblingElement = document.createElement('div')

  document.body.appendChild(rootElement)
  document.body.appendChild(siblingElement)

  it(`doesn't throw, if handleEvent() is not defined`, () => {
    expect(getComponentWithoutHandler).not.toThrow()
  })

  it(`doesn't do anything, if handleEvent() is not defined`, () => {
    const handler = jest.fn()
    const TestComponent = getComponentWithoutHandler('mousedown')

    ReactDOM.render(createElement(TestComponent), rootElement)
    simulant.fire(document.body, 'mousedown')
    expect(handler).not.toHaveBeenCalled()
  })

  it('calls handler, when we target all events', () => {
    const handler = jest.fn()
    const TestComponent = getComponentWithHandler(handler, 'mousedown')

    ReactDOM.render(createElement(TestComponent), rootElement)
    const componentElement = rootElement.querySelector('div')

    simulant.fire(componentElement, 'mousedown')
    simulant.fire(siblingElement, 'mousedown')
    simulant.fire(rootElement, 'mousedown')

    expect(handler).toHaveBeenCalledTimes(3)
  })

  it('calls handler correctly, when we target outside events only', () => {
    const handler = jest.fn()
    const TestComponent = getComponentWithHandler(handler, 'mousedown', { outside: true })

    ReactDOM.render(createElement(TestComponent), rootElement)
    const componentElement = rootElement.querySelector('div')

    simulant.fire(componentElement, 'mousedown')
    simulant.fire(siblingElement, 'mousedown')
    simulant.fire(rootElement, 'mousedown')

    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('calls handler correctly, when we target inside events only', () => {
    const handler = jest.fn()
    const TestComponent = getComponentWithHandler(handler, 'mousedown', { inside: true })

    ReactDOM.render(createElement(TestComponent), rootElement)
    const componentElement = rootElement.querySelector('div')

    simulant.fire(componentElement, 'mousedown')
    simulant.fire(siblingElement, 'mousedown')
    simulant.fire(rootElement, 'mousedown')

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('calls handler only if correct event is fired', () => {
    const handler = jest.fn()
    const TestComponent = getComponentWithHandler(handler, 'mousedown')

    ReactDOM.render(createElement(TestComponent), rootElement)
    const componentElement = rootElement.querySelector('div')

    simulant.fire(componentElement, 'click')
    simulant.fire(siblingElement, 'click')
    simulant.fire(rootElement, 'click')

    expect(handler).not.toHaveBeenCalled()
  })
})
