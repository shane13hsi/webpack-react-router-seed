import React from 'react';
import Table from '../../lib/table/Table.js';

const SampleTable = React.createClass({

  render() {
    const tableColumns = [
      {title: 'Name', prop: 'NAME'},
      {title: 'City', prop: 'CITY'},
      {title: 'Street address', prop: 'STREET ADDRESS'},
      {title: 'Phone', prop: 'PHONE NUMBER', defaultContent: '<no phone>'}
    ];

    return (
      <Table
        keys={[ 'NAME', 'STREET ADDRESS' ]}
        columns={tableColumns}
        dataArray={[]}
        />
    );
  }
});

export default SampleTable;
