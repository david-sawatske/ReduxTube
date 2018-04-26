import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isWelcome: true };
  }

  onPlayerReady = () => {
    this.player.playVideo();
  }

  onPlayerStateChange = ({ data }) => {
    const { ENDED } = YT.PlayerState;
    switch(data) {
      case ENDED:
        this.props.setVidIdx(null, this.props.currentIndex + 1)
        break;
      default:
    }
  }

  componentDidMount() {
    let current = window.onYouTubePlayerAPIReady;
    window.onYouTubePlayerAPIReady = () => {
      this.initializePlayer();
    }
  }

  initializePlayer = () => {
    const { videoId } = this.props;

    this.player = new YT.Player('video-player', {
      videoId: videoId,
      controls: '1',
      playerVars: {
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
      },
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoId !== this.props.videoId) {
      if (!this.player) {
        this.initializePlayer();

      } else {
        this.player.loadVideoById(this.props.videoId);
      }
    }
  }

  playlistPopulator(event, videoArray) {
    event.preventDefault();

    const { setVidIdx, populatePlaylist } = this.props;
    setVidIdx(event, 0);

    this.setState({ isWelcome: false })
    populatePlaylist(videoArray);
  }

  render() {
    const videoArray = [
      {
        "id": "8dTzy_N0Pn4",
        "title": "The World is Beautiful (Timelapse & Hyperlapse)",
        "description": "Check out my other videos: Life is Awesome (#3) - http://youtu.be/5D5nsw3PMxc Life is Awesome (#2) - http://youtu.be/3nDGQj8hxn8 Life is Awesome - http://youtu.be/sWRCcJCnB48 Best of Parkour...",
        "thumbnail": "https://i.ytimg.com/vi/8dTzy_N0Pn4/hqdefault.jpg"
      },
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
      }
    ]

    let Welcome
    if (this.state.isWelcome) {
      Welcome = <div className='player-overlay'>
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
    }

    return (
      <div className='video-container'>
        { Welcome }

        <div id="video-player"></div>
      </div>
    )
  }
}

export default Player;
