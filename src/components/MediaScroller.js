import "../style/mediaScroller.css"

import React, {Component} from 'react';
import ImageItem from "./items/imageItem";
import VideoItem from "./items/videoItem";
// import ScrollManager from './scrollManager'

import cache from "memory-cache";

class MediaScroller extends Component {
    constructor(props) {
        super(props);

        this.updateCache = this.updateCache.bind(this)

        this.state = Object.assign({}, props.state, {isVisible: false, position: 0, activeItem: cache.get("activeItem")})
    }

    handleScroll() {
        console.log("handleScroll")
        const position = window.scrollX;
        cache.put("mediaScroller_position", position)
        console.log("position")
        console.log(position)
    };

    updateCache(activeItem) {
        cache.del("activeItem")
        cache.put("activeItem", activeItem)
        this.setState({activeItem: activeItem})
    }

    componentDidMount() {
        if (this.state.isVisible) {
            // (function () {
            //     window.addEventListener("scroll", this.handleScroll, {passive: true})
            // }).bind(this);
            window.addEventListener("scroll", this.handleScroll, {passive: true})
        } else {
            window.removeEventListener("scroll", this.handleScroll)
        }
    }

    mediaScrollerButtonHandler(event) {
        console.log("mediaScrollerButtonHandler:")
        console.log("event")
        console.log(event)
        this.setState({
            isVisible: !this.state.isVisible
        })
        console.log("this.state.isVisible")
        console.log(this.state.isVisible)
    }

    render() {
        const activeItem = this.state.activeItem
        if (this.state.isVisible) {
            return (
                <>
                    {/*<ScrollManager scrollKey="MediaScrollerKey">*/}
                    <div className="mediaScrollerDivWrapper">
                        <button className="mediaScrollerButton"
                                onClick={event => this.mediaScrollerButtonHandler(event)}></button>
                        <div className="mediaScroller">
                            {
                                this.state.mediaItems.map((item, i) => {
                                    if(item.global_path === activeItem.global_path) return;

                                    if (item.is_img) {
                                        return (
                                            <div onClick={() => this.updateCache(item)}>
                                                <ImageItem className="mediaScrollerItem"
                                                           mediaViewer={this.props.mediaViewer}
                                                           state={this.state} item={item}
                                                           i={i} key={"imageItem_" + i}/>
                                            </div>
                                        )
                                    } else if (item.is_video) {
                                        return (
                                            <div onClick={() => this.updateCache(item)}>
                                                <VideoItem className="mediaScrollerItem"
                                                           mediaViewer={this.props.mediaViewer}
                                                           state={this.state} item={item}
                                                           i={i} key={"videoItem_" + i}/>
                                            </div>
                                        )
                                    }
                                    else {
                                        return <h1> i got nofin bruv </h1>
                                    }
                                })
                            }
                        </div>
                    </div>
                    {/*</ScrollManager>*/}
                </>
            );
        } else {
            return (
                <div className="mediaScroller">
                    <button className="mediaScrollerButton"
                            onClick={event => this.mediaScrollerButtonHandler(event)}></button>
                </div>
            )
        }
    }
}

export default MediaScroller;