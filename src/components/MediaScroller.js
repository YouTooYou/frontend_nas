import "../style/mediaScroller.css"

import React, {Component} from 'react';
import ImageItem from "./items/imageItem";
import VideoItem from "./items/videoItem";

class MediaScroller extends Component {
    constructor(props) {
        super(props);
        this.state = props.state
    }

    render() {

        return (
            <div class="mediaScroller">
                {
                    this.state.mediaItems.map((item, i) => {
                        if (item.is_img) {
                            return <ImageItem state={this.state} item={item} i={i}/>
                        } else if (item.is_video) {
                            return <VideoItem mediaViewer={this.props.mediaViewer} state={this.state} item={item} i={i}/>
                        }
                    })
                }
            </div>
        );
    }
}

export default MediaScroller;