import "../style/mediaViewer.css"

import React, {Component} from 'react';
import cache from "memory-cache";
import VideoDetail from "./videoDetail";
import ImageDetail from "./imageDetail";
import MediaScroller from "./MediaScroller";


class MediaViewer extends Component {
    constructor(props) {
        super(props);
        let cache_state = cache.get("state")
        const extra_state = {mediaItems: cache.get("mediaItems"), activeItem: cache.get("activeItem")}
        this.state = Object.assign({}, cache_state, extra_state)
    }

    render() {
        const activeItem = this.state.activeItem

        if(activeItem.is_img) {
            console.log("activeItem.is_img")
            console.log(activeItem.is_img)
            return (<><ImageDetail state={this.state}/> <MediaScroller mediaViewer={this} state={this.state} /></>)
        } else if(activeItem.is_video) {
            return (<><VideoDetail state={this.state}/> <MediaScroller mediaViewer={this} state={this.state} /></>)
        } else {
            return (<><h1>I don't know what to tell you chief :'/</h1> <MediaScroller mediaViewer={this} state={this.state} /></>)
        }
    }
}

export default MediaViewer;