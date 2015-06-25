import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';

const App = (props) => {

  App.propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };

  return {
    props,

    render() {
      return (
        <DocumentTitle title='Sample App'>
          <div className='App'>
            <h2>Sample App</h2>
            <RouteHandler {...this.props} />
          </div>
        </DocumentTitle>
      );
    }
  };
};

export default App;
