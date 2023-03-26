import React, {Component} from 'react';
import {withRouter} from "../navigate"
import {fetcher} from "../fetcher";
// https://github.com/ptarjan/node-cache
let cache = require("memory-cache")

class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.movieTime = this.movieTime.bind(this)
        cache.put("items", this.props.state.items)
    }

    async movieTime(event) {
        console.log("movieTime() in VideoItem")
        console.log(event)
        // Cache setup
        const items = [...this.props.state.items]
        let activeItem = items.filter(item => item.global_path === event.target.id)[0]
        console.log("IMPORTANT 2.0")
        console.log("activeItem")
        console.log(activeItem)
        console.log("items")
        console.log(items)
        console.log("event.target.id")
        console.log(event.target.id)

        // Gathering all media items in current folder and Filling up cache
        await fetcher("POST", "/media_items", {path: this.props.state.path, "activeItem.global_path": activeItem.global_path}).then(response => response.json())
            .then(mediaItems => {
                // cache.put("items", items)
                // activeItem.active_item = true
                cache.del("activeItem")
                cache.put("activeItem", activeItem)
                // console.log("cache.get('activeItem')")
                // console.log(cache.get('activeItem'))
                cache.del("mediaItems")
                cache.put("mediaItems", mediaItems)
                // console.log("cache.get('mediaItems')")
                // console.log(cache.get('mediaItems'))
                // cache.put("path", this.props.state.path)
                cache.del("state")
                cache.put("state", this.props.state)
                // console.log('cache.get("state")')
                // console.log(cache.get("state"))
            })

        // Navigate to route using wrapper method
        this.props.navigate("/item")

        console.log()
        if(window.location.href.endsWith("/item")) {
            this.props.mediaViewer.setCacheState()
            // this.props.mediaScroller.setCacheState()
            // this.props.videoDetail.setCacheState()
        } else {
            // Navigate to route using wrapper method
            this.props.navigate("/item")
        }
    }

    render() {
        const src = "http://192.168.1.8:5000/" + this.props.item.static_path
        const itemId = this.props.item.global_path
        return (
            <button id={itemId} onClick={async event => await this.movieTime(event)} className="pure-button buttonImageItem">
                <div id={itemId} className="divImageItem">
                    <div id={itemId} className="itemIcon">
                        <img src={src} id={itemId}
                             key={"imageItem_" + this.props.i} alt={"wish you could see this, right -_-"}/>
                    </div>
                    <div id={itemId} className="itemFooter">
                        <a id={itemId}>{this.props.item.filename}</a>
                    </div>
                </div>
            </button>
        );
    }
}

export default withRouter(ImageItem);