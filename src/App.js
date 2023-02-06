import './App.css';

// import Item from "./components/items/item"
// import DirItem from "./components/items/dirItem"
// import VideoItem from "./components/items/videoItem"
// import ImageItem from "./components/items/imageItem"
import Overview from "./components/overview";
import VideoDetail from "./components/videoDetail";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
// import {fetcher} from "./components/fetcher";
import React, {Component/*, useLayoutEffect*/} from 'react';
import MediaViewer from "./components/MediaViewer";

// import ReactPlayer from "react-player/lazy";

// TODO add redis caching or something, just to make it more complete
// https://github.com/node-cache-manager/node-cache-manager
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            items: [],
            images: [],
            path: "/",
            // Execute next line when we are on the video detail route; that is if and only
            // if the route accepts a param, not sure yet; but i'll find out tomorrow :)
            video: (globalPath) => this.state.items.filter(item => item.global_path === globalPath)[0],
        }
    }

    // componentDidMount() {
    //     console.log("======================================================================================================================================================================================================================================================================================================================== ")
    //     console.log(this.state)
    // }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path={"/"} element={<Overview state={this.state}/>} > </Route>
                    <Route exact path={"/item"} element={<MediaViewer />} > </Route>
                </Routes>
            </Router>
        );
    }
}

export default App;














































