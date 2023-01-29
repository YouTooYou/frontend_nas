import React, {Component} from 'react';

class DirItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li key={"dirItem_" + this.props.i}>
                <a id={this.props.item.global_path}>{this.props.item.filename}</a>
            </li>
        );
    }
}

export default DirItem;