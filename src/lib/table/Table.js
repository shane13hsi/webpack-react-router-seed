var React = require('react');
var { PropTypes } = React;

var simpleGet = key => data => data[key];
var keyGetter = keys => data => keys.map(key => data[key]);

var isEmpty = value => value === undefined || value === null || value === '';

var getCellValue =
      ({ prop, defaultContent, render }, row) => {
        var renderContent = render
          ? render(row[prop], row)
          : row[prop];
        return !isEmpty(prop) && isEmpty(row[prop]) ? defaultContent : renderContent;
      };

var getCellClass =
      ({ prop, className }, row) => {
        var clazz = typeof className === 'function'
          ? className(row[prop], row)
          : className;
        return !isEmpty(prop) && isEmpty(row[prop]) ? 'empty-cell' : clazz;
      };

class Table {

  constructor() {
    this._headers = [];
  }

  componentDidMount() {
    // If no width was specified, then set the width that the browser applied
    // initially to avoid recalculating width between pages.
    this._headers.forEach(header => {
      var thDom = React.findDOMNode(header);
      if (!thDom.style.width) {
        thDom.style.width = `${thDom.offsetWidth}px`;
      }
    });
  }

  render() {
    var { columns, keys, buildRowOptions } = this.props;

    var headers = columns.map((col, idx) => {

      return (
        <th
          ref={c => this._headers[idx] = c}
          key={idx}
          style={{width: col.width}}
          role="columnheader"
          scope="col">
          <span>{col.title}</span>
        </th>
      );
    });

    var getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
    var rows = this.props.dataArray.map(
        row =>
        <tr key={getKeys(row)} {...buildRowOptions(row)}>
          {columns.map(
            (col, i) =>
              <td key={i} className={getCellClass(col, row)}>
                {getCellValue(col, row)}
              </td>
          )}
        </tr>);

    return (
      <table className={this.props.className}>
        <thead>
        <tr>
          {headers}
        </tr>
        </thead>
        <tbody>
        {rows.length > 0 ? rows :
          <tr>
            <td colSpan={columns.length} className="text-center">No data</td>
          </tr>}
        </tbody>
      </table>
    );
  }

}

Table.propTypes = {

  keys: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired,

  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    prop: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    render: PropTypes.func,
    defaultContent: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  })).isRequired,

  dataArray: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])).isRequired,

  buildRowOptions: PropTypes.func
};

Table.defaultProps = {
  buildRowOptions: () => ({})
};

export default Table;
