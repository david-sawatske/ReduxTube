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

    if (prevProps.isWelcome !== this.props.isWelcome) {
      this.setState({ isWelcome: this.props.isWelcome })
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
        "id": "hs86eBCT4dI",
        "title": "Stunning Blooming Flowers & Relax Music - 2 Hours Timelapse - Color Therapy - Sleep Music - HD 1080P",
        "description": "Relaxing music and Beautiful Blooming Flowers such as Roses, Peony, Orchid, Lily, Weigela Florida Flower, Apricot Flower, Quince Flower, Japanese Crabapple. Helps Relax & Fall Asleep FAST!...",
        "thumbnail": "https://i.ytimg.com/vi/hs86eBCT4dI/hqdefault.jpg"
      },
      {
        "id": "8dTzy_N0Pn4",
        "title": "The World is Beautiful (Timelapse & Hyperlapse)",
        "description": "Check out my other videos: Life is Awesome (#3) - http://youtu.be/5D5nsw3PMxc Life is Awesome (#2) - http://youtu.be/3nDGQj8hxn8 Life is Awesome - http://youtu.be/sWRCcJCnB48 Best of Parkour...",
        "thumbnail": "https://i.ytimg.com/vi/8dTzy_N0Pn4/hqdefault.jpg"
      },
      {
        "id": "8gD_9WPPFb4",
        "title": "HD Video 1080p - Time Lapse with Sunsets, Clouds, Stars",
        "description": "HD Video 1080p - Time Lapse with Sunsets, Clouds, Stars. Dreamlapse is a time lapse film with relaxing music, soothing sunsets, stars & clouds. Buy and download the film in original 4K quality...",
        "thumbnail": "https://i.ytimg.com/vi/8gD_9WPPFb4/hqdefault.jpg"
      },
      {
        "id": "DFEtnhfQcqI",
        "title": "Relax Music - The Most Stunning Sunsets Time Lapse - 2 Hours - Sleep Meditation - 1080P HD",
        "description": "2 hours of relaxing music with Beautiful Time Lapse with Sunsets, Clouds, Stars in HD, great for stress relief, help sleep, study, meditation and background music screensaver. ▽ See More!...",
        "thumbnail": "https://i.ytimg.com/vi/DFEtnhfQcqI/hqdefault.jpg"
      },
      {
        "id": "KgMpKsp23yY",
        "title": "Beautiful Planet Earth || Nature In Motion - Timelapse Compilation 2017 ||  Oddly Satisfying Video",
        "description": "I wanted to create a slightly different compilations of known \"Satisfying Compilation\" I hope I did and appreciate my work put into this video. I invite you to watch in 1440p :) - Watch, rate,...",
        "thumbnail": "https://i.ytimg.com/vi/KgMpKsp23yY/hqdefault.jpg"
      },
      {
        "id": "AHrCI9eSJGQ",
        "title": "30 Days Timelapse at Sea | 4K | Through Thunderstorms, Torrential Rain & Busy Traffic",
        "description": "30 Days of Timelapse, about 80000 photos combined. 1500GB of Project files. Sailing in the open ocean is a unique feeling and experience.I hope to capture and share it for everyone to see....",
        "thumbnail": "https://i.ytimg.com/vi/AHrCI9eSJGQ/hqdefault.jpg"
      },
      {
        "id": "Scxs7L0vhZ4",
        "title": "NORWAY - A Time-Lapse Adventure 4K",
        "description": "NEW INSTAGRAM: morten.rustad Link to camera: http://amzn.to/2dg5Ex8 Link to lens: http://amzn.to/2d7MVVJ Link to motion control: http://amzn.to/2clQBBX Link to slider: http://amzn.to/2dg8thv...",
        "thumbnail": "https://i.ytimg.com/vi/Scxs7L0vhZ4/hqdefault.jpg"
      },
      {
        "id": "bGmp4N4gQy4",
        "title": "Beautiful Naural Paces in Scotland | 4k Timelapse | BBC Earth | Natural World 2017",
        "description": "Beautiful Naural Paces in Scotland | 4k Timelapse | BBC Earth | Natural World 2017.",
        "thumbnail": "https://i.ytimg.com/vi/bGmp4N4gQy4/hqdefault.jpg"
      },
      {
        "id": "I8W4LyIXINE",
        "title": "Time-Lapse: Beautiful Cacti Bloom Before Your Eyes | Short Film Showcase",
        "description": "Filmmaker Greg Krehel captures 15 varieties of stunning Echinopsis cactus flowers blooming in this incredible time-lapse. The process happens overnight, and the flowers last for only a day,...",
        "thumbnail": "https://i.ytimg.com/vi/I8W4LyIXINE/hqdefault.jpg"
      },
      {
        "id": "Cgkstofi2ug",
        "title": "Beauty of Winter in Countryside 4K UHD Timelapse Photography Video",
        "description": "Amazing cold, white, snowed winter mornings, sunsets, sunrises and fogy days. Timelapses and Pan timelapses. Photographed In Latvia- Europe. Music: At Rest - Romance by Kevin MacLeod is licensed...",
        "thumbnail": "https://i.ytimg.com/vi/Cgkstofi2ug/hqdefault.jpg"
      }
    ]

    let Welcome
    if (this.state.isWelcome) {
      Welcome = <div className='player-overlay'>
                  <div className='search-suggestion'>
                    <h1>Search for Videos to Build Playlist</h1>
                    <h2>⤵</h2>
                  </div>

                  <h3> ~ or ~ </h3>

                  <div className='populate-suggestion'>
                    <h1>
                      Click Below for Default Playlist
                    </h1>

                    <img alt='play'
                         className='play'
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
