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
        const videoPath = "http://192.168.1.8:5000/" + this.state.activeItem.static_path
        return (
            <>
                <button id={"back"} className="pure-button detail_buttonBackItem "
                        onClick={async event => {
                            await this.changePath(event)
                        }}>
                    <div id={"back"} key={"item_back"} className="divBackItem">
                        <div id={"back"} className="backItemIcon">
                            <img id={"back"}
                                 src={"http://192.168.1.8:3000/itemIcons/back.png"}
                                 alt={"GTFO with that alt bs"}/>
                        </div>
                        <div id={"back"} className="backItemFooter">
                            <a id={"back"}>{"Back"}</a>
                        </div>
                    </div>
                </button>
                <div className="detailContainer">

                    <video class="videoItem" controls>
                        <source src={videoPath} type="video/mp4"/>
                        <source src={videoPath} type="video/webm"/>
                        Your browser does not support the video tag
                    </video>
                </div>
            </>
        );
    }
}

export default withRouter(VideoDetail);