import { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ModalEstaciones from './modal';

function Principal() {

    const [Networks, setNetworks] = useState([])
    const [modalShow, setModalShow] = useState(false);

    const consumirAPI = async () => {
        var url = "http://api.citybik.es/v2/networks"
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))

        setNetworks(response.networks)
    }

    console.log(Networks)

    useEffect(() => {
        consumirAPI()
    }, [])

    return (
        <div className="mapeo">
            <ModalEstaciones
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            {
                Networks.map(network => {
                    return (

                        <div key={network.id}>
                            <center>
                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>{network.name}</Accordion.Header>
                                        <Accordion.Body className="card__container">

                                            <div>
                                                <ListGroup className='card'>

                                                    <ListGroup.Item as="li">
                                                        <div>
                                                            <h5>{network.company}</h5>
                                                            <p>Compañía</p>
                                                        </div>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item as="li">
                                                        <div>
                                                            <h6>{network.location.country}</h6>
                                                            <p>Pais</p>
                                                        </div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                                <br></br>
                                                <Button classNamw="button" variant="outline-primary" onClick={() => setModalShow(true)}>
                                                    Ver estaciones
                                                </Button>
                                            </div>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </center>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Principal 