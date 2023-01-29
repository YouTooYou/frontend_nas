import React, {Component} from 'react';
import {withRouter} from "../navigate"

class VideoItem extends Component {
    constructor(props) {
        super(props);
        this.movieTime = this.movieTime.bind(this)
    }

    movieTime() {
        // SOURCE: https://stackoverflow.com/questions/70143135/how-to-use-react-router-dom-v6-navigate-in-class-component
        this.props.navigate("/yo")
    }



    render() {
        const itemIcon = "http://192.168.1.10:3000/itemIcons/video.svg"
        const itemId = this.props.item.global_path
        return (

            <button onClick={this.movieTime} className="pure-button buttonVideoItem">
                <div id={itemId} key={"videoItem_" + this.props.i} className="divVideoItem">
                    <div id={itemId} className="videoItemIcon">
                        <img id={itemId} src={itemIcon} alt={"just look bro "}/>
                    </div>
                    <div id={itemId} className="videoItemFooter">
                        {/*TODO add typography of hoe tf da ook heet */}
                        <a id={itemId}>{this.props.item.filename}</a>
                    </div>
                </div>
            </button>

        );
    }
}

export default withRouter(VideoItem);