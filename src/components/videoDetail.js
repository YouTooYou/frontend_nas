import React, {Component} from 'react';
import {withRouter} from "./navigate"
// https://github.com/ptarjan/node-cache
let cache = require("memory-cache")

class VideoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.state
        console.log("this.state -> in VideoDetail:")
        console.log(this.state)
    }

    componentDidMount() {
        this.setCacheState()
    }

    setCacheState() {
        // console.log("VideoDetail setCacheState function:")
        let cache_state = cache.get("state")
        const extra_state = {   mediaItems: cache.get("mediaItems"), activeItem: cache.get("activeItem")}
        let final_state = Object.assign({}, cache_state, extra_state)

        // console.log("cache_state")
        // console.log(cache_state)
        // console.log("extra_state")
        // console.log(extra_state)
        // console.log("final_state")
        // console.log(final_state)

        this.setState(final_state)

        // this.render()
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

        const videoPath = "http://localhost:5000/" + this.props.state.activeItem.static_path
        // console.log("videoPath")
        // console.log(videoPath)
        return (
            <>
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
            </>
        );
    }
}

export default withRouter(VideoDetail);