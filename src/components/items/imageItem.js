import React, {Component} from 'react';

class ImageItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const src = "http://192.168.1.10:5000/" + this.props.item.static_path
        return (
            <button onClick={async event => await this.movieTime(event)} className="pure-button buttonImageItem">
                <div class="divImageItem">
                    <div class="itemIcon">
                        <img src={src} id={this.props.item.global_path}
                             key={"imageItem_" + this.props.i} alt={"wish you could see this, right -_-"}/>
                    </div>
                    <div class="itemFooter">
                        <a id={this.props.item.global_path}>{this.props.item.filename}</a>
                    </div>
                </div>
            </button>
        );
    }
}

export default ImageItem;