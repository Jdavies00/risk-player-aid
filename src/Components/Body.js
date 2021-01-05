import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faDice } from '@fortawesome/free-solid-svg-icons'
import { Card, Button, CardTitle, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { faFortAwesomeAlt } from '@fortawesome/free-brands-svg-icons'
import RedStarTracker from './RedStarTracker'
import { territories } from '../utilities/territories'
import Select from "react-select";

const Body = (props) => {
    const [battleground, setBattleground] = useState(false);
    const [attackingFrom, setAttackingFrom] = useState(false);
    const { className } = props;
    const [modal, setModal] = useState(false);
    {/* players will need to be moved to a useContext helper that is populated from Austin's new game modal */ }
    const [players, setPlayers] = useState([{ name: "Player 1" }, { name: "Player 2" }, { name: 'Player 3' }]);
    const toggle = () => setModal(!modal);

    const [states, setStates] = useState([])

    //map through each continent within the territories JSON
    //return array of territories objects

    return (
        <Container>
            <Card>
                <Row className="mt-3 justify-content-center">
                    {/* players will need to be moved to a useContext helper that is populated from Austin's new game modal */}
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
                    {/* Recruitment Pane */}
                    <Card body>
                        <CardTitle tag="h5">Territories</CardTitle>
                        <ListGroup>
                            {
                                territories.map((item, idx) => {
                                    return (
                                        <ListGroupItem key={idx}><h3>{item.continent} <span class="badge rounded-pill bg-secondary ml-3 text-light">{item.bonus}</span></h3></ListGroupItem>

                                    )
                                })
                            }
                        </ListGroup>
                    </Card>
                </Col>
                <Col sm="6">
                    <Row>
                        <Col>
                            <Card body>
                                {/* Recruit Panel */}
                                <CardTitle tag="h5">Recruitment</CardTitle>

                            </Card>
                        </Col>
                        <Col>
                            <Card body>
                                {/* Combat Modal */}
                                <CardTitle tag="h5">Combat Roll</CardTitle>
                                <>
                                    <Button onClick={toggle}>
                                        <FontAwesomeIcon className='mx-2 fa-3x text-light' icon={faDice} />
                                    </Button>
                                    <Modal isOpen={modal} size='lg' toggle={toggle} className={className}>
                                        <ModalHeader toggle={toggle}></ModalHeader>
                                        <ModalBody>
                                            <Row>
                                                <Col className="justify-content-center">
                                                    <Label>Battleground</Label>
                                                    <Select
                                                        className="text-dark"
                                                        defaultValue={'Select...'}
                                                        onChange={setBattleground}
                                                        options={territories}
                                                    />
                                                </Col>
                                                <Col className="justify-content-center">
                                                    <Label>Attacking From</Label>
                                                    {battleground ?
                                                        <Select
                                                            className="text-dark"
                                                            defaultValue={'Select Battleground First'}
                                                            onChange={setAttackingFrom}
                                                            //needs to only display the adjacent territories to the selected battleground (part of the territory object)
                                                            options={territories}
                                                        />
                                                        :
                                                        <Select
                                                            disabled
                                                            className="text-dark"
                                                            defaultValue={'Pick Battleground'}
                                                            onChange={setAttackingFrom}
                                                            //needs to only display the adjacent territories to the selected battleground (part of the territory object)
                                                            options={territories}
                                                        />

                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="justify-content-center">
                                                    <Label>Defender</Label>
                                                    <Input></Input>
                                                </Col>
                                                <Col className="justify-content-center">
                                                    <Label>Attacker</Label>
                                                    <Input></Input>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className='justify-content-center col-6'>
                                                    {
                                                        battleground.bunker ?
                                                            <FontAwesomeIcon className='m-2 mt-3 fa-3x' color={'#F18F01'} icon={faFortAwesomeAlt} />
                                                            :
                                                            <FontAwesomeIcon className='m-2 mt-3 fa-3x' icon={faFortAwesomeAlt} />
                                                    }
                                                    {
                                                        battleground.ammoShortage ?
                                                            <FontAwesomeIcon className='m-2 mt-3 fa-3x' color={'red'} icon={faBan} />
                                                            :
                                                            <FontAwesomeIcon className='m-2 mt-3 fa-3x' icon={faBan} />
                                                    }
                                                </Col>
                                                <Col className='col-6'>
                                                </Col>
                                            </Row>
                                        </ModalBody>
                                        <ModalFooter className="justify-content-center">
                                            <Button color="primary" onClick={toggle}>Roll</Button>{' '}
                                            <Button color="secondary" onClick={toggle}>Retreat</Button>
                                        </ModalFooter>
                                    </Modal>
                                </>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Body;