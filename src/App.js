import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Youtube from './components/Youtube';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css"; // ?

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export default class App extends React.Component {
  state = {
    videos: [],
    nextPageToken: "",
  }


  // console.log(getSearchNextPageToken)
  onSerchYoutube = (keyword) => {
    const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&order=viewCount&q=${keyword}&maxResults=50&key=${YOUTUBE_API_KEY}`;



    if(keyword !== '' && keyword.length < 2) {
      return;
    }
    // if(nextPageToken !== '') {
    //   url += `&pageToken=${nextPageToken}`;
    // }
    axios
      .get(url)
      .then(response => {
          this.setState({
            videos: response.data.items,
            nextPageToken: response.data.nextPageToken,
            keyword: keyword,
          });
      })
      .catch(() => {
          console.log('通信に失敗しました');
      });
  }


  getNextPage =  (event)=> {
    // ネストされたオブジェクトのdataまでアクセスしておく
    console.log(this.state.nextPageToken)
    const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=50&key=${YOUTUBE_API_KEY}&pageToken=${this.state.nextPageToken}`;
    // if(this.state.nextPageToken !== '') {
    //   url += `&pageToken=${this.state.nextPageToken}`;
    // }
    axios
      .get(url)
      .then(response => {
          this.setState({
            videos: response.data.items,
            nextPageToken: response.data.nextPageToken,
          });
      })
      .catch(() => {
          console.log('通信に失敗しました');
      });
  }

  render() {
    return (
      <>
        <Header  class="form-control"  variant="primary"  onSerchYoutube={this.onSerchYoutube} />
        <Button className="btn btn-demo" onClick={this.getNextPage}>次のページ</Button>

        {/* 追加 */}
        <Youtube videos={this.state.videos}/>
      </>
    )

  }
}

