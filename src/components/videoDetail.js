import React, {Component} from 'react';
import {withRouter} from "./navigate"
import {fetcher} from "./fetcher";
// https://github.com/ptarjan/node-cache
let cache = require("memory-cache")

class VideoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.state
        // console.log("this.state -> in VideoDetail:")
        // console.log(this.state)
        this.setCacheState = this.setCacheState.bind(this)
    }

    componentDidMount() {
        this.setCacheState()
    }

    // setCacheState() {
    //     // console.log("VideoDetail setCacheState function:")
    //     let cache_state = cache.get("state")
    //     const extra_state = {   mediaItems: cache.get("mediaItems"), activeItem: cache.get("activeItem")}
    //     let final_state = Object.assign({}, cache_state, extra_state)
    //
    //     // console.log("cache_state")
    //     // console.log(cache_state)
    //     // console.log("extra_state")
    //     // console.log(extra_state)
    //     // console.log("final_state")
    //     // console.log(final_state)
    //
    //     this.setState(final_state)
    //
    //     // this.render()
    // }
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
    setActiveItemPosition(activeItem, mediaItems) {
        for (let i = 0; i < mediaItems.length; i++) {
            if(activeItem.global_path === mediaItems[i].global_path) {
                activeItem.position = i
                activeItem.active_item = true
                break
            }
        }
    }

    async changePath(event) {
        // this.setState({
        //     // isLoaded: false,
        //     path: event.target.id,
        // })
        // // console.log(event)
        // await this.walk(event.target.id);
        // this.forceUpdate()
        // this.render()

        // Just refreshing the cache, cause why not \_(o-o)_/
        // cache.put("state", this.state)

        this.props.navigate("/")
    }

    render() {

        // console.log("VideoDetail render:")
        // console.log("this.state")
        // console.log(this.state)
        // console.log("this.props")
        // console.log(this.props.state.activeItem.static_path)

        const videoPath = `http://${process.env.REACT_APP_IP_ADDRESS}:5000/` + this.props.state.activeItem.static_path
        // console.log("videoPath")
        // console.log(videoPath)
        return (
            <>
                <div className="imageDetail-flex" onClick={async event => await this.movieTime(event)}>
                    <button id={"back"} className="pure-button detail_buttonBackItem "
                            onClick={async event => {
                                await this.changePath(event)
                            }}>
                        <div id={"back"} key={"item_back"} className="divBackItem">
                            <div id={"back"} className="backItemIcon">
                                <img id={"back"}
                                     src={`http://${process.env.REACT_APP_IP_ADDRESS}:3000/itemIcons/back.png`}
                                     alt={"GTFO with that alt bs"}/>
                            </div>
                            <div id={"back"} className="backItemFooter">
                                <a id={"back"}>{"Back"}</a>
                            </div>
                        </div>
                    </button>
                    <div className="detailContainer">

                        <video className="videoItem" src={videoPath} controls>
                            <source type="video/mp4"/>
                            <source type="video/webm"/>
                            Your browser does not support the video tag
                        </video>
                    </div>
                </div>
            </>
        );
    }

    async movieTime(event) {
        console.log("movieTime() in ImageDetail")
        console.log("event")
        console.log(event.target.localName)
        if(event.target.localName === "video") return;

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
            // this.setCacheState()
            this.props.mediaViewer.setCacheState()
            // this.props.mediaScroller.setCacheState()
            // this.props.videoDetail.setCacheState()
        } else {
            // Navigate to route using wrapper method
            this.props.navigate("/item")
        }
    }
}

export default withRouter(VideoDetail);