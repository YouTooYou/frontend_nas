import React, {Component} from 'react';
import {fetcher} from "../fetcher";

class Item extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
    }

    render() {
        const filePath = `http://${process.env.REACT_APP_IP_ADDRESS}:5000/` + this.props.item.static_path
        const itemIcon = `http://${process.env.REACT_APP_IP_ADDRESS}:3000/itemIcons/word.svg`
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