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

        // Finding current media position to allow leftOrRight 'ing
        let mediaPosition = 0
        // TODO put this in the activeItem through the server side
        // FIXME put this in the activeItem through the server side
        // TODO put this in the activeItem through the server side
        // FIXME put this in the activeItem through the server side
        // TODO put this in the activeItem through the server side
        // FIXME put this in the activeItem through the server side
        const items = props.state.items
        const activeItem = props.state.activeItem

        for (let i = 0; i < items.length; i++) {
            if(items[i].global_path === activeItem.global_path) {
                mediaPosition = i
                break;
            }
        }

        this.state = Object.assign({}, this.props.state, {mediaPosition: mediaPosition})

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
                    <img className="detailImage" onClick={event => this.nextOrBack(event)} src={imagePath} key={imagePath} alt={"FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCK"}/>
                </div>
            </>
        );
    }

    nextOrBack(event) {
        const isLeft = window.screen.width/2 > event.screenX
        console.log("isLeft")
        console.log(isLeft)
        const cursor = isLeft ? this.state.mediaPosition - 1 : this.state.mediaPosition + 1
        console.log("this.state.mediaItems[cursor]")
        console.log(this.state.mediaItems[cursor])
    }
}

export default withRouter(ImageDetail);