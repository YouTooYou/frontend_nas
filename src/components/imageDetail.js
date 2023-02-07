import React, {Component} from 'react';
import {withRouter} from "./navigate"
// https://github.com/ptarjan/node-cache
let cache = require("memory-cache")
// TODO add a feature where user can click on the left or right side of the picture to get the next one, ha haha good luck bro
// TODO also ad nice buttons that do the same thing; you'll probs want to start with this as a test, although getting the x&y's on an image is probs fun
// FIXME ah nvm it'll probably be easy as fuck if i think 2 seconds about it lulz
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
        const imagePath = "http://192.168.1.4:5000/" + this.props.state.activeItem.static_path
        return (
            <>
                <button id={"back"} className="pure-button detail_buttonBackItem "
                        onClick={async event => {
                            await this.changePath(event)
                        }}>
                    <div id={"back"} key={"item_back"} className="divBackItem">
                        <div id={"back"} className="backItemIcon">
                            <img id={"back"}
                                 src={"http://192.168.1.4:3000/itemIcons/back.png"}
                                 alt={"GTFO with that alt bs"}/>
                        </div>
                        <div id={"back"} className="backItemFooter">
                            <a id={"back"}>{"Back"}</a>
                        </div>
                    </div>
                </button>
                <div className="detailContainer">
                    <img src={imagePath} key={imagePath} alt={"FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCK"}/>
                </div>
            </>
        );
    }
}

export default withRouter(ImageDetail);