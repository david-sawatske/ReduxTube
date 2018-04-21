import React, { Component } from 'react';

class VideoIndexItem extends Component {
  constructor(props) {
    super(props);

    this.state = { isHovered: false };

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    this.setState({ isHovered: !this.state.isHovered })
  }

  render() {
    const { video, setVidIdx, videoIdx, buttonFn, buttonDisplay } = this.props;
    const divClass = (this.state.isHovered) ? "hovered" : "not-hovered";

    let PlayNow
    if (setVidIdx) {
      PlayNow = <button className="nav-btn"
                        onClick={ (e) => setVidIdx(e, videoIdx) }>
                PlayNow
              </button>
    }

    return (
      <div className={divClass}
           onMouseEnter={this.handleHover}
           onMouseLeave={this.handleHover} >

          <img src={video.thumbnail} />
          <h2>{video.title}</h2>

          <button className="nav-btn" onClick={ (e) => buttonFn(e, video) }>
            { buttonDisplay }
          </button>

        { PlayNow }
      </div>
    )
  }
}

export default VideoIndexItem;
