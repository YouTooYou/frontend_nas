import React, {Component} from 'react';
import {withRouter} from "../navigate"
import {fetcher} from "../fetcher";
// https://github.com/ptarjan/node-cache
let cache = require("memory-cache")

class VideoItem extends Component {
    constructor(props) {
        super(props);
        this.movieTime = this.movieTime.bind(this)
        // cache.put("items", this.props.state.items)
        // Possible fix to double prints ???
        // cache.put("items", [])
    }

    async movieTime(event) {
        console.log("movieTime() in VideoItem")
        console.log(event)
        // Cache setup
        const items = [...this.props.state.items]
        let activeItem = items.filter(item => item.global_path === event.target.id)[0]

        // Gathering all media items in current folder and Filling up cache
        await fetcher("POST", "/media_items", {path: this.props.state.path, "activeItem.global_path": activeItem.global_path}).then(response => response.json())
            .then(mediaItems => {
                // cache.put("items", items)
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
        this.props.navigate("/item")


        console.log()
        if(window.location.href.endsWith("/item")) {
            // Synchronize MediaViewer with simple memory-cache
            this.props.mediaViewer.setCacheState()
        } else {
            // Navigate to route using wrapper method
            this.props.navigate("/item")
        }

    }

    render() {
        const itemIcon = "http://192.168.1.8:3000/itemIcons/video.svg"
        const itemId = this.props.item.global_path
        return (

            <button id={itemId} onClick={async event => await this.movieTime(event)} className="pure-button buttonVideoItem">
                <div id={itemId} key={"videoItem_" + this.props.i}
                     className="divVideoItem">
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