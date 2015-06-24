jest.dontMock '../sum.js'
describe 'sum', ->
  it 'adds 1 + 2 to equal 3', ->
    sum = require '../sum.js'
    expect(sum 1, 2).toBe 3
