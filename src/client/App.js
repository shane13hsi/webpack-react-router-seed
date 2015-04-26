'use strict';

import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';

const App = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        query: PropTypes.object.isRequired
    },

    render() {
        return (
            <DocumentTitle title='Sample App'>
                <div className='App'>
                    <RouteHandler {...this.props} />
                </div>
            </DocumentTitle>
        );
    }
});

export default App;
