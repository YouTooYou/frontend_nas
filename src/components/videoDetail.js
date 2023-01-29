import React, {Component} from 'react';

class VideoDetail extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    //     TODO             EXTRACT cache items, path and selected video and put in state
    }

    render() {
        const videoPath = "http://192.168.1.10:5000/" + this.props.item.static_path
        return (
            <div>
                <h1>EYOO</h1>
            </div>
        );
    }
}

export default VideoDetail;