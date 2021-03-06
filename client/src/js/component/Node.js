import React from "react";
import axios from "axios";
import Draggable from 'react-draggable';
import EditMenu from './EditMenu';

const JDESK_ENDPOINT = 'http://localhost:3001/api/tasks';

export default class Node extends React.Component {
  constructor(props) {
    super(props);

     let style = {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      left: this.props.x + this.props.origin.x,
      top: this.props.y + this.props.origin.y,
      width: this.props.width,
      height: this.props.height,
      backgroundColor: "aqua",
      borderRadius: "17%",
      borderStyle: "solid",
      borderWidth: 2, 
    };

    this.state = {
      style: style,
      title: this.props.title,
      position: {
        x: this.props.x,
        y: this.props.y,
      },
      width: this.props.width,
      height: this.props.height,
      isEditable: false,
      isDeleted: false,
    };

    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickEvent);
  }

  handleClickEvent = (e) => {
    if (
      this.wrapperRef &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(e.target)
    ) {
      this.setState({
        isEditable: false,
      });
    }
  }

  handleStop = (e) => {
    const origin = document.getElementById('origin').getBoundingClientRect();
    let originX = origin.x;
    let originY = origin.y;
    const targetNode = e.target.closest(".node").getBoundingClientRect();
    let targetX = targetNode.x;
    let targetY = targetNode.y;
    if (targetX - originX === this.state.position.x && targetY - originY === this.state.position.y) {
      this.setState({
        isEditable: true,
      });
    } else {
      axios
        .patch(JDESK_ENDPOINT + '/' + this.props.id, {x: targetX - originX, y: targetY - originY})
        .then((results) => {
          this.setState({
            position: {
              x: results.data.data.x,
              y: results.data.data.y,
            },
          });
          console.log("更新完了");
        })
        .catch(() => {
          console.log("更新失敗");
        });
    }
  }

  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      const title = e.target.value;
      axios
        .patch(JDESK_ENDPOINT + '/' + this.props.id, {title: title})
        .then((results) => {
          this.setState({
            title: results.data.data.title,
            isEditable: false,
          })
          console.log("タイトル変更完了");
        })
        .catch(() => {
          console.log("タイトル変更失敗");
        });
    }
  }

  deleteMyself = () => {
    
    axios
    .delete(JDESK_ENDPOINT + '/' + this.props.id)
    .then((results) => {
      this.setState({
        isDeleted: true,
      });
      console.log("削除完了");
      })
      .catch(() => {
        console.log("削除失敗");
      });
  }

  extendSize = () => {
    axios
      .patch(JDESK_ENDPOINT + '/' + this.props.id, {width: this.state.width + 10, height: this.state.height + 10})
      .then((results) => {
        this.setState({
          style: {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            left: this.state.position.x + this.props.origin.x,
            top: this.state.position.y + this.props.origin.y,
            width: this.state.width + 10,
            height: this.state.height + 10,
            backgroundColor: "aqua",
            borderRadius: "17%",
            borderStyle: "solid",
            borderWidth: 2, 
          },
          width: this.state.width + 10,
          height: this.state.height + 10,
        });
        console.log("更新完了")
      })
      .catch(() => {
        console.log("更新失敗")
      });
  }

  shrinkSize = () => {
    axios
      .patch(JDESK_ENDPOINT + '/' + this.props.id, {width: this.state.width - 10, height: this.state.height - 10})
      .then((results) => {
        this.setState({
          style: {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            left: this.state.position.x + this.props.origin.x,
            top: this.state.position.y + this.props.origin.y,
            width: this.state.width - 10,
            height: this.state.height - 10,
            backgroundColor: "aqua",
            borderRadius: "17%",
            borderStyle: "solid",
            borderWidth: 2, 
          },
          width: this.state.width - 10,
          height: this.state.height - 10,
        });
        console.log("更新完了")
      })
      .catch(() => {
        console.log("更新失敗")
      });
  }

  render() {
    if (this.state.isDeleted === true) return null;
    return (
      <Draggable handle=".node" bounds="parent" cancel=".EditMenu" onStop={this.handleStop}>
        <div className="node" style={this.state.style}>
          {this.state.isEditable ? (
            <div ref={this.wrapperRef}>
              <EditMenu ref={this.wrapperRef} deleteNode={this.deleteMyself} extendNode={this.extendSize} shrinkNode={this.shrinkSize} title={this.state.title}/>
              <input
                  className="edit-node-title"
                  defaultValue={this.state.title}
                  onKeyPress={this.handleKeyPress}
              />
            </div>
          ) : (
            this.state.title
          )}
        </div>
      </Draggable>
    );
  }
}