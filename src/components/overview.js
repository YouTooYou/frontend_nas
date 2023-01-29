import "../style/overview.css"

import React, {Component} from 'react';
import {fetcher} from "./fetcher";
import ImageItem from "./items/imageItem";
import VideoItem from "./items/videoItem";
import Item from "./items/item";
import DirItem from "./items/dirItem";

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = props.state
    }

    async componentDidMount() {
        console.log("IN COMPONENT DID MOUNT: ====================================================================")
        await this.walk("/");
        console.log("before get_image_urls:")
        console.log("\tthis.state.items:")
        console.log(this.state.items)
        console.log("\tthis.state.images:")
        console.log(this.state.images)
        // await this.updateCache()
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
        console.log(event)
        await this.walk(event.target.id);
        this.forceUpdate()
        this.render()
    }

    async updateCache() {
        // TODO                                         https://medium.com/javascript-dots/cache-api-in-javascript-644380391681#:~:text=Adding%20an%20item%20to%20cache,data%20and%20set%20the%20cache.
        // Accepts JSON: {accheName: 'CacheOne', cacheData: '1 CacheData', url: 'https://localhost:3000'}
        for (let i = 0; i < this.state.items.length; i++) {
            // Converting our response into Actual Response form
            const data = new Response(JSON.stringify(this.state.items[i]));

            if ('caches' in window) {
                // Opening given cache and putting our data into it
                let cache = await caches.open(this.state.items[i].global_name)
                await cache.put("http://192.168.1.10:3000", data);
            }
        }

        for (let i = 0; i < this.state.items.length; i++) {
            Cache().put(this.state.items[i].global_name,)
        }
        console.log(caches.open("http://192.168.1.10:3000"))
    }

    // Function to add our give data into cache
    async addDataIntoCache(cacheName, url, response) {
        // Converting our response into Actual Response form
        const data = new Response(JSON.stringify(response));

        if ('caches' in window) {
            // Opening given cache and putting our data into it
            caches.open(cacheName).then((cache) => {
                cache.put(url, data);
                // alert('Data Added into cache!')
            });
        }
    };

    async walk(path) {
        await fetcher("POST", "/",
            {path: path}
        ).then(response => response.json()).then(items => {
            // this.addDataIntoCache("items", "http://")
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
                    <div class="overviewContainer">
                        <button id={"back"} className="pure-button buttonBackItem"
                                onClick={async event => {
                                    await this.changePath(event)
                                }}>
                            <div id={"back"} key={"item_back"} className="divBackItem">
                                <div id={"back"} className="backItemIcon">
                                    <img id={"back"}
                                         src={"http://192.168.1.10:3000/itemIcons/back.png"}
                                         alt={"GTFO with that alt bs"}/>
                                </div>
                                <div id={"back"} className="backItemFooter">
                                    <a id={"back"}>{"Back"}</a>
                                </div>
                            </div>
                        </button>
                        {
                            items.map((item, i) => {
                                if (item.is_img) {
                                    // return <img src={"http://192.168.1.10:5000/" + item.static_path}
                                    //             id={item.global_path}
                                    //             key={i}/>
                                    return <ImageItem item={item} i={i}/>
                                } else if (item.is_video) {
                                    // console.log(videoPath)
                                    // return <ReactPlayer url={"http://192.168.1.10:5000/" + item.static_path} key={i}/>
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
                                } else if (!item.is_dir) {
                                    return (
                                        // <li key={i} onClick={async event => {
                                        //     await this.changePath(event)
                                        // }}>
                                        //     <a id={ item.global_path } href={filePath} >{item.filename}</a>
                                        // </li>
                                        <Item item={item} i={i}/>
                                    )
                                } else {
                                    return (
                                        // <li key={i} onClick={async event => {
                                        //     await this.changePath(event)
                                        // }}>
                                        //     <a id={ item.global_path } >{item.filename}</a>
                                        // </li>
                                        <div key={"divItem_" + i} class="clickDivItem"
                                             onClick={async event => await this.changePath(event)}>
                                            <DirItem item={item} i={i}/>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </>
            );
        }
    }

}

export default Overview;