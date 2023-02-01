import React, {Component} from 'react';
import {withRouter} from "./navigate"
// https://github.com/ptarjan/node-cache
let cache = require("memory-cache")

class ImageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.state
        console.log("this.state -> in ImageDetail:")
        console.log(this.state)
    }



    async changePath(event) {
        // Just refreshing the cache, cause why not \_(o-o)_/
        // cache.put("state", this.state)
        // NVM :"(
        this.props.navigate("/")
    }

    render() {
        const imagePath = "http://192.168.1.15:5000/" + this.state.activeItem.static_path
        return (
            <>
                <button id={"back"} className="pure-button detail_buttonBackItem "
                        onClick={async event => {
                            await this.changePath(event)
                        }}>
                    <div id={"back"} key={"item_back"} className="divBackItem">
                        <div id={"back"} className="backItemIcon">
                            <img id={"back"}
                                 src={"http://192.168.1.15:3000/itemIcons/back.png"}
                                 alt={"GTFO with that alt bs"}/>
                        </div>
                        <div id={"back"} className="backItemFooter">
                            <a id={"back"}>{"Back"}</a>
                        </div>
                    </div>
                </button>
                <div className="detailContainer">
                    <img src={imagePath} alt={"FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCK"}/>
                </div>
            </>
        );
    }
}

export default withRouter(ImageDetail);