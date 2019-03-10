import React from 'react';

import './Topic.css';

export default class Topic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.topicNum}
            </div>
        );
    }
}