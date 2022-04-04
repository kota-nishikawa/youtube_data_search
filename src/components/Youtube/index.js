import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
const Youtube = (props) => {

    const thumbnails = props.videos.map((video) => {
        return (
           //<Col xs={12} md={4}>
        //     <div  class="card">
        //       <div className={"title-header"}>

        //       </div>
        //   </div>
        //</Col>
            <Col>
                <Card>
                    <img src={video.snippet.thumbnails.high.url}  alt="thumbnail"/>
                </Card>
                <Card.Text>
                <b>Youtubeチャンネルタイトル:</b>{ video.snippet.channelTitle}<br/>
                <b>Youtubeタイトル:</b>{ video.snippet.title}
                </Card.Text>
            </Col>
        )
    });


    return (
        <Row xs={1} md={3} className="g-4">
          {thumbnails}
        </Row>

    )
}

export default Youtube;