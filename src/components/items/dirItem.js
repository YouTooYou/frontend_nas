import React, {Component} from 'react';

class DirItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const itemIcon = "http://192.168.1.4:3000/itemIcons/directory.svg"
        const itemId = this.props.item.global_path
        return (
            <button type="submit" className="pure-button buttonDirItem">
                <div id={itemId} key={"dirItem_" + this.props.i} className="divDirItem">
                    <div id={itemId} className="dirItemIcon">
                        <img id={itemId} src={itemIcon} alt={"just look bro "}/>
                    </div>
                    <div id={itemId} className="dirItemFooter">
                        {/*TODO add typography of hoe tf da ook heet */}
                        <a id={itemId}>{this.props.item.filename}</a>
                    </div>
                </div>
            </button>
        );
    }
}

export default DirItem;