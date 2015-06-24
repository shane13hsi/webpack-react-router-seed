jest.donMock '../CheckboxWithLabel.js'

describe 'CheckboxWithLabel', ->
  it 'changes the text after click', ->
    React = require 'react/addons'
    CheckboxWithLabel = require '../CheckboxWithLabel.js'
    TestUtils = React.addons.TestUtils

    checkbox = TestUtils.renderIntoDocument(React.createElement(
      CheckboxWithLabel,
      {
        labelOn: "On"
        labelOff: "Off"
      }
    ))

    # Verify that it's Off by default
    label = TestUtils.findRenderedDOMComponentWithTag checkbox, 'label'
    expect(label.getDOMNode().textContent).toEqual 'Off'

    # Simulate a click and verify that it is now On
    input = TestUtils.findRenderedDOMComponentWithTag checkbox, 'input'
    TestUtils.Simulate.change input
    expect(label.getDOMNode().textContent).toEqual 'On'

