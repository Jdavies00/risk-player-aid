import React, { useState, useContext } from 'react'
import { Row, Card, CardHeader, Container, Col, CardBody, Button, Label, Input } from 'reactstrap';
import DataContext from '../utilities/DataContext';

const Setup = (props) => {
    const [draft, setDraft] = useState(false)

    const { players, setPlayers } = useContext(DataContext)
    const { factions, setFactions } = useContext(DataContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(5)
    const [playersLocked, setPlayersLocked] = useState(false)

    function addPlayer() {
        setNumberOfPlayers(numberOfPlayers + 1)
        let proxy = players
        proxy.push({ id: players.length, name: "", faction: {} })
        setPlayers(proxy)
    }
    
    function removePlayer() {
        setNumberOfPlayers(numberOfPlayers - 1)
        let proxy = players
        proxy.pop()
        setPlayers(proxy)
    }

    function submitPlayers(){
        //disable player name inputs and open drafting choices
        setPlayersLocked(true)
        //assign player names to context hook
        setPlayers()
    }

    return (
        <Container className='mt-3'>
            {/* # of Players */}
            <Row className='justify-content-center my-3'>
                <h3 className='mr-2'>Number of Players:</h3>
                {
                    numberOfPlayers > 3 ?
                        <Button onClick={() => removePlayer()} className='mx-2 p-2'>-</Button>
                        :
                        <Button disabled className='mx-2 p-2'>-</Button>
                }
                <h3 className='my-1'>{numberOfPlayers}</h3>
                {
                    numberOfPlayers < 5 ?
                        <Button onClick={() => addPlayer(numberOfPlayers + 1)} className='mx-2 p-2'>+</Button>
                        :
                        <Button disabled className='mx-2 p-2'>+</Button>
                }
            </Row>
            {/* Names of Players */}
            <Row>
                {
                    players.map((player, key) => {
                        return (
                            <Col key={key}>
                                <Label>Player Name</Label>
                                <Input required/>
                            </Col>
                        )
                    })
                }
            </Row>
            {
                !playersLocked ?
                    <>
                    {/* Submit button to lock in the player names */}
                    <Button className='my-3' onClick={() => submitPlayers()}>Submit</Button>
                    </>
                    :
                    <>
                    <Button className='my-3' onClick={() => setPlayersLocked(false)}>Go Back</Button>
                    {/* If draft has been unlocked (via founding all minor cities) then draft process commence, else pick in pre-determined order */}
                        {
                            draft ?
                                //show draft cards and snake draft for Faction, Turn Order, HQ Placement Order, Starting Troops, Coin Cards
                                <>
                                    <h3>Draft True</h3>
                                </>
                                :
                                <>
                                    <h3>Draft False</h3>
                                </>
                            //Pick Order to select Faction, Turn Order, HQ Placement Order
                        }
                        <Row>
                            {
                                factions.map((faction, key) => {
                                    return (
                                        <>
                                            {
                                                faction.unlocked &&
                                                <Col key={key} className='col-6 mb-3' >
                                                    <Card>
                                                        <CardHeader>{faction.name}</CardHeader>
                                                        <CardBody>
                                                            <ul>
                                                                {faction.bringerOfNuclearFire && <li className='mb-2'>Bringer of Nuclear Fire</li>}
                                                                {faction.startingPower && <li className='mb-2'>{faction.startingPower[0]}</li>}
                                                                {faction.startingPower && <li className='mb-2'>{faction.startingPower[1]}</li>}
                                                                {faction.comebackPower && <li className='mb-2'>{faction.comebackPower}</li>}
                                                                {faction.misslePower && <li className='mb-2'>{faction.misslePower}</li>}
                                                                {faction.weakness && <li className='mb-2'>{faction.weakness}</li>}
                                                                {faction.privateMission && <li className='mb-2'>{faction.privateMission}</li>}
                                                            </ul>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            }
                                        </>
                                    )
                                })
                            }
                        </Row>
                        <Row>
                            {

                            }
                        </Row>
                    </>
            }

        </Container >
    );
};

export default Setup;