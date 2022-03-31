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
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.
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