import "../style/imageDetail.css"

import React, {Component} from 'react';
import {withRouter} from "./navigate"
import {fetcher} from "./fetcher";
// https://github.com/ptarjan/node-cache
let cache = require("memory-cache")
// TODO add a feature where user can click on the left or right side of the picture to get the next one, ha haha good luck bro
// TODO also ad nice buttons that do the same thing; you'll probs want to start with this as a test, although getting the x&y's on an image is probs fun
// FIXME ah nvm it'll probably be easy as fuck if i think 2 seconds about it lulz
class ImageDetail extends Component {
    constructor(props) {
        super(props);

        // Finding current media position to allow leftOrRight 'ing
        // let mediaPosition = 0
        // TOD put this in the activeItem through the server side
        // FIXM put this in the activeItem through the server side
        // TOD put this in the activeItem through the server side
        // FIXM put this in the activeItem through the server side
        // TOD put this in the activeItem through the server side
        // FIXM put this in the activeItem through the server side
        // const items = props.state.items
        // const activeItem = props.state.activeItem
        //  watafaaak
        // for (let i = 0; i < items.length; i++) {
        //     if(items[i].global_path === activeItem.global_path) {
        //         mediaPosition = i
        //         break;
        //     }
        // }
        // this.nextOrBack = this.nextOrBack.bind(this)

        this.state = this.props.state
        // this.state = Object.assign({}, this.props.state, {mediaPosition: mediaPosition})

    }



    async changePath(event) {
        // Just refreshing the cache, cause why not \_(o-o)_/
        // cache.put("state", this.state)
        // NVM :"(
        this.props.navigate("/")
    }

    render() {
        const imagePath = "http://localhost:5000/" + this.props.state.activeItem.static_path
        return (
            <>
                <div class="imageDetail-flex" onClick={async event => await this.movieTime(event)} >
                    <button id={"back"} className="pure-button detail_buttonBackItem "
                            onClick={async event => {
                                await this.changePath(event)
                            }}>
                        <div id={"back"} key={"item_back"} className="divBackItem">
                            <div id={"back"} className="backItemIcon">
                                <img id={"back"}
                                     src={"http://localhost:3000/itemIcons/back.png"}
                                     alt={"GTFO with that alt bs"}/>
                            </div>
                            <div id={"back"} className="backItemFooter">
                                <button id={"back"}>{"Back"}</button>
                            </div>
                        </div>
                    </button>
                    <div className="detailContainer">
                        <img className="detailImage" src={imagePath} key={imagePath} alt={"FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCK"}/>
                    </div>
                </div>
            </>
        );
    }

    async movieTime(event) {
        console.log("movieTime() in ImageDetail")

        // console.log("activeItem")
        // console.log(activeItem)
        // console.log("filteredItems")
        // console.log(filteredItems)
        // console.log("items")
        // console.log(items)
        // console.log("event.target.id")
        // console.log(event.target.id)


        const isLeft = window.screen.width/2 > event.screenX
        let position = this.state.activeItem.position
        let cursor = isLeft ? position - 1 : position + 1
        if (cursor < 0 || cursor > this.state.mediaItems.length) {
            cursor = position
        }
        const newActiveItem = this.state.mediaItems[cursor]
        this.setState({activeItem: newActiveItem})

        // Gathering all media items in current folder and Filling up cache
        await fetcher("POST", "/media_items", {path: this.state.path, "activeItem.global_path": newActiveItem.global_path}).then(response => response.json())
            .then(mediaItems => {
                // cache.put("items", items)
                // activeItem.active_item = true
                cache.del("activeItem")
                cache.put("activeItem", newActiveItem)
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

        // this.props.mediaScroller.render()

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

    // nextOrBack(event) {
    //     const isLeft = window.screen.width/2 > event.screenX
    //     let position = this.state.activeItem.position
    //     const cursor = isLeft ? position - 1 : position + 1
    //     const newActiveItem = this.state.mediaItems[cursor]
    //     this.setState({
    //         activeItem: newActiveItem
    //     })
    //     console.log("this.state.activeItem")
    //     console.log(this.state.activeItem)
    //     this.props.mediaViewer.render()
    // }

}

export default withRouter(ImageDetail);