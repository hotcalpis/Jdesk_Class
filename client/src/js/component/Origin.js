import React from "react";

export default class Origin extends React.Component {
    constructor(props) {
        super(props);

        let style = {
            position: "absolute",
            left: this.props.x,
            top: this.props.y,
            height: "3px",
            width: "3px",
            backgroundColor: "black",
            borderRadius: "50%",
        };
        this.state = {
            style: style,
        };
    }

    render() {
        return (
            <div id="origin" style={this.state.style}></div>
        );
    }
}