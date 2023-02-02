import React, {Component} from 'react';

class ImageItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const src = "http://192.168.1.12:5000/" + this.props.item.static_path
        return (
            <img src={src} id={this.props.item.global_path}
                 key={"imageItem_" + this.props.i} alt={"wish you could see this, right -_-"}/>
        );
    }
}

export default ImageItem;