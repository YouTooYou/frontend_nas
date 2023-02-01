import React, {Component} from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        const filePath = "http://192.168.1.15:5000/" + this.props.item.static_path
        return (
            <li key={"item_" + this.props.i} onClick={async event => {
                await this.props.changePath(event)
            }}>
                <a id={this.props.item.global_path}
                   href={filePath}>{this.props.item.filename}</a>
            </li>
        )
    }
}

export default Item;