jest.dontMock '../Table.js'
# jest.autoMockOff()

describe 'Table', ->
  it 'show "no data" when dataArray is empty', ->
    React = require 'react/addons'
    TestUtils = React.addons.TestUtils
    Table = require '../Table.js'

    columns = [
      {
        title: 'Test'
        prop: 'test'
      }
    ]

    shallowRenderer = TestUtils.createRenderer()
    shallowRenderer.render `(
      <Table
        columns={columns}
        dataArray={[]}
        keys='test'
        />
    )`
    component = shallowRenderer.getRenderOutput()

    expect(component.type).toBe 'table'
    # table > tbody > tr > td
    expect(
      component
      .props.children[1] # tbody
      .props.children    # tr
      .props.children    # td
      .props.children    # content
    ).toBe 'No data'
