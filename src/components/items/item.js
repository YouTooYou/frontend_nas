import React, {Component} from 'react';
import {fetcher} from "../fetcher";

class Item extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
    }

    render() {
        const filePath = "http://192.168.1.4:5000/" + this.props.item.static_path
        const itemIcon = "http://192.168.1.4:3000/itemIcons/word.svg"
        return (
            <form action={filePath} className="formItem">
                <button type="submit" className="pure-button buttonItem">
                    <div key={"item_" + this.props.i} className="divItem">
                        <div className="itemIcon">
                            <img src={itemIcon} alt={"holyyy fuck; fucjkoff already with this bssss"}/>
                        </div>
                        <div className="itemFooter">
                            <a id={this.props.item.global_path}>{this.props.item.filename}</a>
                        </div>
                    </div>
                </button>
            </form>
        )
    }
}

export default Item;