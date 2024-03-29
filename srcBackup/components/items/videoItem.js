import React, {Component} from 'react';

class VideoItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const videoPath = `http://${process.env.REACT_APP_IP_ADDRESS}:5000/` + this.props.item.static_path
        return (
            <video controls key={"videoItem_" + this.props.i}>
                <source src={videoPath} type="video/mp4"/>
                <source src={videoPath} type="video/mkv"/>

                <source src={videoPath} type="video/webm"/>
                <source src={videoPath}
                        type='video/x-matroska; codecs="theora, vorbis"'/>
                <source src={videoPath} type='video/x-matroska'/>

                <a href={videoPath}>download video</a>
            </video>
        );
    }
}

export default VideoItem;