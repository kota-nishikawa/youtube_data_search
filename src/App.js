import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Youtube from './components/Youtube';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css"; // ?

const YOUTUBE_API_KEY = 'AIzaSyCjUm3hjiTGHmrckI0ClAAwmNorhwh3NTA';

export default class App extends React.Component {
  state = {
    videos: [],
    nextPageToken: "",
    prevPageFlg: 1,
    prevPageToken: "",
    nextPageFlg: 1,
  }


  // console.log(getSearchNextPageToken)
  onSerchYoutube = (keyword) => {
    const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=id,snippet&order=viewCount&q=${keyword}&maxResults=50&key=${YOUTUBE_API_KEY}`;

    if(keyword == '' && keyword.length < 3) {
      return;
    }
    axios
      .get(url)
      .then(response => {

          this.setState({
            videos: response.data.items,
            nextPageToken: response.data.nextPageToken,
            prevPageToken: response.data.prevPageToken,
            prevPageFlg : response.data.prevPageToken ? 0 : 1,
            nextPageFlg : response.data.nextPageToken ? 0 : 1,
            keyword: keyword,
          });
      })
      .catch(() => {
          console.log('通信に失敗しました');
      });
  }


  getNextPage =  (event)=> {
    // ネストされたオブジェクトのdataまでアクセスしておく
    const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=id,snippet&order=viewCount&maxResults=50&q=${this.state.keyword}&key=${YOUTUBE_API_KEY}&pageToken=${this.state.nextPageToken}`;
    if(this.state.keyword == '' && this.state.keyword < 3) {
      return;
    }


    axios
      .get(url)
      .then(response => {
          this.setState({
            videos: response.data.items,
            nextPageToken: response.data.nextPageToken,
            prevPageToken: response.data.prevPageToken,
            prevPageFlg : response.data.prevPageToken ? 0 : 1,
            nextPageFlg : response.data.nextPageToken ? 0 : 1,
          });
      })
      .catch(() => {
          console.log('通信に失敗しました');
      });
  }
  getPrevPage =  (event)=> {
    // ネストされたオブジェクトのdataまでアクセスしておく
    const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=id,snippet&order=viewCount&maxResults=50&q=${this.state.keyword}&key=${YOUTUBE_API_KEY}&pageToken=${this.state.prevPageToken}`;
    if(this.state.keyword == '' && this.state.keyword.length < 3) {
      return;
    }


    axios
      .get(url)
      .then(response => {

          this.setState({
            videos: response.data.items,
            nextPageToken: response.data.nextPageToken,
            prevPageToken: response.data.prevPageToken,
            prevPageFlg : response.data.prevPageToken ? 0 : 1,
            nextPageFlg : response.data.nextPageToken ? 0 : 1,
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
        <Button className="btn btn-demo" disabled={ this.state.prevPageFlg } onClick={this.getPrevPage}>前のページ</Button>
        <Button className="btn btn-demo" disabled={ this.state.nextPageFlg } onClick={this.getNextPage}>次のページ</Button>

        {/* 追加 */}
        <Youtube videos={this.state.videos}/>
      </>
    )

  }
}

