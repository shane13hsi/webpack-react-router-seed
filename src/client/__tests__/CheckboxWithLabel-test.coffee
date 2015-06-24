jest.dontMock '../CheckboxWithLabel.js'

describe 'CheckboxWithLabel', ->
  it 'changes the text after click', ->
    React = require 'react/addons'
    CheckboxWithLabel = require '../CheckboxWithLabel.js'
    TestUtils = React.addons.TestUtils

    # Render a checkbox with label in the document
    checkbox = TestUtils.renderIntoDocument `(<CheckboxWithLabel labelOn="On" labelOff="Off"/>)`

    # Verify that it's "Off" by default
    label = TestUtils.findRenderedDOMComponentWithTag checkbox, 'label'
    # Test that the label is off
    expect(label.getDOMNode().textContent).toEqual 'Off'

    # Simulate a click and verify that it is now On
    input = TestUtils.findRenderedDOMComponentWithTag checkbox, 'input'
    # Make a click on the checkbox
    TestUtils.Simulate.change input
    # Now the label should have "On" as text content
    expect(label.getDOMNode().textContent).toEqual 'On'
