jest.dontMock '../CheckboxWithLabel.js'
# jest.autoMockOff()

describe 'CheckboxWithLabel', ->
  it 'changes the text after click', ->
    React = require 'react/addons'
    TestUtils = React.addons.TestUtils
    CheckboxWithLabel = require '../CheckboxWithLabel.js'

    shallowRenderer = TestUtils.createRenderer()
#    shallowRenderer.render(
#      React.createElement CheckboxWithLabel,
#        labelOn: 'On'
#        labelOff: 'Off'
#    )
    shallowRenderer.render `(<CheckboxWithLabel labelOn="On" labelOff="Off"/>)`

    component = shallowRenderer.getRenderOutput()
    expect(component.type).toBe 'label'

    textContent = component.props.children[1]
    expect(textContent).toBe 'Off'

    mockEvent = {}
    input = component.props.children[0]
    input.props.onChange mockEvent
    component = shallowRenderer.getRenderOutput()
    textContent = component.props.children[1]
    expect(textContent).toBe 'On'


#    # Render a checkbox with label in the document
#    checkbox = TestUtils.renderIntoDocument `(<CheckboxWithLabel labelOn="On" labelOff="Off"/>)`
#
#    # Verify that it's "Off" by default
#    label = TestUtils.findRenderedDOMComponentWithTag checkbox, 'label'
#    # Test that the label is off
#    expect(label.getDOMNode().textContent).toEqual 'Off'
#
#    # Simulate a click and verify that it is now On
#    input = TestUtils.findRenderedDOMComponentWithTag checkbox, 'input'
#    # Make a click on the checkbox
#    TestUtils.Simulate.change input
#    # Now the label should have "On" as text content
#    expect(label.getDOMNode().textContent).toEqual 'On'
