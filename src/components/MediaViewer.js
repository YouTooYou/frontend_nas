import "../style/mediaViewer.css"

import React, {Component} from 'react';
import cache from "memory-cache";
import VideoDetail from "./videoDetail";
import ImageDetail from "./imageDetail";
import MediaScroller from "./MediaScroller";


class MediaViewer extends Component {
    constructor(props) {
        super(props);
        // console.log("MediaViewer Constructor:")
        let cache_state = cache.get("state")
        let mediaItems = cache.get("mediaItems")
        let activeItem = cache.get("activeItem")
        this.setActiveItemPosition(activeItem, mediaItems)
        console.log("IMPORTANT")
        console.log("activeItem and mediaItems")
        console.log(activeItem)
        console.log(mediaItems)
        const extra_state = {   mediaItems: mediaItems, activeItem: activeItem}
        // console.log("cache_state")
        // console.log(cache_state)
        // console.log("extra_state")
        // console.log(extra_state)
        this.state = Object.assign({}, cache_state, extra_state)
    }
    setActiveItemPosition(activeItem, mediaItems) {
        for (let i = 0; i < mediaItems.length; i++) {
            if(activeItem.global_path === mediaItems[i].global_path) {
                activeItem.position = i
                activeItem.active_item = true
                break
            }
        }
    }

    componentDidMount() {
        this.setCacheState()
    }

    setCacheState() {
        // console.log("setCacheState function:")
        let cache_state = cache.get("state")
        let mediaItems = cache.get("mediaItems")
        let activeItem = cache.get("activeItem")
        this.setActiveItemPosition(activeItem, mediaItems)
        const extra_state = {mediaItems: mediaItems, activeItem: activeItem}
        let final_state = Object.assign({}, cache_state, extra_state)


        // console.log("cache_state")
        // console.log(cache_state)
        // console.log("extra_state")
        // console.log(extra_state)
        // console.log("final_state")
        // console.log(final_state)

        this.setState(final_state)
    }

    render() {
        const activeItem = this.state.activeItem
        const mediaScroller = <MediaScroller mediaViewer={this} state={this.state} />

        if(activeItem.is_img) {
            return (<><ImageDetail state={this.state} mediaViewer={this} mediaScroller={<MediaScroller mediaViewer={this} state={this.state} />} /> <MediaScroller mediaViewer={this} state={this.state} /></>)
        } else if(activeItem.is_video) {
            return (<><VideoDetail state={this.state} mediaViewer={this} mediaScroller={<MediaScroller mediaViewer={this} state={this.state} />} /> <MediaScroller mediaViewer={this} state={this.state} /></>)
        } else {
            return (<><h1>I don't know what to tell you chief :'/</h1> <MediaScroller mediaViewer={this} state={this.state} /> /></>)
        }
    }
}

export default MediaViewer;