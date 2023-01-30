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

        // Gathering all media items in current folder and Filling up cache
        await fetcher("POST", "/media_items", {path: this.props.state.path, "activeItem.global_path": activeItem.global_path}).then(response => response.json())
            .then(mediaItems => {
                // cache.put("items", items)
                console.log("putting activeItem")
                console.log(activeItem)
                cache.put("activeItem", activeItem)
                cache.put("mediaItems", mediaItems)
                // cache.put("path", this.props.state.path)
                cache.put("state", this.props.state)
                console.log('cache.get("state")')
                console.log(cache.get("state"))
                console.log('cache.get("activeItem")')
                console.log(cache.get("activeItem"))
            })

        // Navigate to route using wrapper method
        this.props.navigate("/item")

        console.log()
        if(window.location.href.endsWith("/item")) {
            this.render()
        }
    }

    render() {
        const src = "http://192.168.1.8:5000/" + this.props.item.static_path
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

export default withRouter(ImageItem);