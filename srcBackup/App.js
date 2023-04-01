import './App.css';

import Item from "./components/items/item"
import DirItem from "./components/items/dirItem"
import VideoItem from "./components/items/videoItem"
import ImageItem from "./components/items/imageItem"
import Overview from "./components/overview";
import {fetcher} from "./components/fetcher";
import React, {Component, useLayoutEffect} from 'react';
import ReactPlayer from "react-player/lazy";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            items: [],
            images: [],
            path: "/",
            this: this
        }
    }

    async componentDidMount() {
        console.log("IN COMPONENT DID MOUNT: ====================================================================")
        await this.walk("/");
        console.log("before get_image_urls:")
        console.log("\tthis.state.items:")
        console.log(this.state.items)
        console.log("\tthis.state.images:")
        console.log(this.state.images)
        this.forceUpdate()
        this.render()
        console.log("")
        console.log("")
        console.log("")
        console.log("")
    }

    async changePath(event) {
        this.setState({
            // isLoaded: false,
            path: event.target.id,
        })
        await this.walk(event.target.id);
        this.forceUpdate()
        this.render()
    }
    async walk(path) {
        await fetcher("POST", "/",
            {path: path}
        ).then(response => response.json()).then(items => {
            console.log("items in walk:")
            console.log(items)
            this.setState({
                isLoaded: true,
                items: items,
                path: path,
            })
        })
    }




    render() {

        let {isLoaded, items, path} = this.state

        if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <>
                    <ul onClick={async event => await this.changePath(event)}>
                        <li>
                            <a id="back" >..</a>
                        </li>
                    </ul>
                    <ul >
                        {
                            items.map((item, i) => {
                                if (item.is_img) {
                                    // return <img src={`http://${process.env.REACT_APP_IP_ADDRESS}:5000/` + item.static_path}
                                    //             id={item.global_path}
                                    //             key={i}/>
                                    return <ImageItem item={item} i={i}/>
                                } else if(item.is_video) {
                                    // console.log(videoPath)
                                    // return <ReactPlayer url={`http://${process.env.REACT_APP_IP_ADDRESS}:5000/` + item.static_path} key={i}/>
                                    return (
                                        // <video controls>
                                        //     <source src={videoPath} type="video/mp4" />
                                        //     <source src={videoPath} type="video/mkv" />
                                        //
                                        //     <source src={videoPath} type="video/webm" />
                                        //     <source src={videoPath} type='video/x-matroska; codecs="theora, vorbis"' />
                                        //     <source src={videoPath} type='video/x-matroska' />
                                        //
                                        //     <a href={videoPath}>download video</a>
                                        // </video>
                                        <VideoItem item={item} i={i}/>
                                    )
                                } else if(!item.is_dir) {
                                    return (
                                            // <li key={i} onClick={async event => {
                                            //     await this.changePath(event)
                                            // }}>
                                            //     <a id={ item.global_path } href={filePath} >{item.filename}</a>
                                            // </li>
                                            <Item item={item} i={i}/>
                                        )
                                }
                                else {
                                    return (
                                            // <li key={i} onClick={async event => {
                                            //     await this.changePath(event)
                                            // }}>
                                            //     <a id={ item.global_path } >{item.filename}</a>
                                            // </li>
                                        <a key={"divItem_" + i} onClick={async event => await this.changePath(event)}>
                                            <DirItem item={item} i={i}/>
                                        </a>
                                        )
                                }
                            })
                        }
                    </ul>
                </>
            );
        }
    }
}

export default App;














































