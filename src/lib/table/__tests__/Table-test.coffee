jest.dontMock '../Table.js'
jest.autoMockOff()

describe 'Table', ->
  it 'sort on col with prop', ->
    React = require 'react/addons'
    TestUtils = React.addons.TestUtils
    Table = require '../Table.js'

    onSort = jest.genMockFunction()
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
        onSort={onSort}
        sortBy={{ order: 'ascending', prop: 'test' }}
        dataArray={[]}
        keys="test"
        />
    )`

    component = shallowRenderer.getRenderOutput()

    console.log JSON.stringify(component)



