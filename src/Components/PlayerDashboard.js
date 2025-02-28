import React, { useState, useContext } from 'react'
import { Card, CardTitle, Row, Col, Container } from 'reactstrap';
import RedStarTracker from './RedStarTracker'
import Recruitment from './Recruitment'
import MapTabs from './MapTabs';
import DataContext from '../utilities/DataContext';

const PlayerDashboard = (props) => {

    //map through each continent within the territories JSON
    //return array of territories objects

    const { players } = useContext(DataContext)


    return (
        <Container className='mt-3'>
            <Card>
                <Row className="my-3 justify-content-center">
                    {players.map((item, idx) => {
                        return (
                            <Col key={idx} className='my-2'>
                                <RedStarTracker player={item} />
                            </Col>
                        )
                    })
                    }
                </Row>
            </Card>
            <Row className="mt-3">
                <Col sm="6">
                    {/* Territory Pane */}
                    <Card body>
                        <CardTitle tag="h5">Territories</CardTitle>
                        <MapTabs
                            players={players}
                        />
                    </Card>
                </Col>
                <Col sm="6">
                    <Row>
                        <Col>
                            <Recruitment
                                players={players}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default PlayerDashboard;