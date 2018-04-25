import React, { Component } from 'react';

import Player from './player';

class InitialPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  playlistPopulator(event, videoArray) {
    event.preventDefault();

    this.props.populatePlaylist(videoArray);
  }

  render() {
    const videoArray = [
      {
        "id": "2HuJNI_FOMo",
        "title": "After Effects Tutorial: Beautiful Timelapse",
        "description": "Open Description [click 'show more'] for info! Keep the creative mind flowing! Please read more! ---------------------------------------------------- Add my new Snapchat! ➤Snapchat: BehrSnaps...",
        "thumbnail": "https://i.ytimg.com/vi/2HuJNI_FOMo/hqdefault.jpg"
      },
      {
        "id": "8gD_9WPPFb4",
        "title": "HD Video 1080p - Time Lapse with Sunsets, Clouds, Stars",
        "description": "HD Video 1080p - Time Lapse with Sunsets, Clouds, Stars. Dreamlapse is a time lapse film with relaxing music, soothing sunsets, stars & clouds. Buy and download the film in original 4K quality...",
        "thumbnail": "https://i.ytimg.com/vi/8gD_9WPPFb4/hqdefault.jpg"
      },
      {
        "id": "apLevp7QI8E",
        "title": "Alone in a Peaceful dream - Relaxing music playlist with Beautiful time-lapse videos [+1 Hour]",
        "description": "Calm and inspirational relaxing music pieces that might fit your studying, thinking or mental work. This is what heaven would sound like. 1- 0:00 Extremely loud and incredibly close -...",
        "thumbnail": "https://i.ytimg.com/vi/apLevp7QI8E/hqdefault.jpg"
      },
      {
        "id": "8dTzy_N0Pn4",
        "title": "The World is Beautiful (Timelapse & Hyperlapse)",
        "description": "Check out my other videos: Life is Awesome (#3) - http://youtu.be/5D5nsw3PMxc Life is Awesome (#2) - http://youtu.be/3nDGQj8hxn8 Life is Awesome - http://youtu.be/sWRCcJCnB48 Best of Parkour...",
        "thumbnail": "https://i.ytimg.com/vi/8dTzy_N0Pn4/hqdefault.jpg"
      }
    ]

    return (
      <div className="initial-player">
        <div className='player-overlay'>
          <div className='search-suggestion'>
            <h1>Search for Videos to Build Playlist</h1>
            <h2>⤵</h2>
          </div>

          <h3> -or- </h3>

          <div className='populate-suggestion'>
            <h1>
              Click Below for Default Playlist
            </h1>

            <img alt='play'
                 onClick={ (e) => this.playlistPopulator(e, videoArray)}
                 src="http://res.cloudinary.com/sawatskeda10/image/upload/v1524672709/yt-play_jlajhz.png" />

          </div>
        </div>

        <Player videoId={'XEfDYMngJeE'}
                currentIndex={null}
                setVidIdx={null} />
      </div>
    );
  }

}

export default InitialPlayer;
