import { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ModalEstaciones from './modal';

function Principal() {

    const [dataEspecifica, setDataEspecifica] = useState([])
    const [Networks, setNetworks] = useState([])
    const [modalShow, setModalShow] = useState(false);

    const consumirAPI = async () => {
        var url = "http://api.citybik.es/v2/networks"
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))

        setNetworks(response.networks)
    }

    const consumirAPI2 = async (id) => {
        var url = `http://api.citybik.es/v2/networks/${id}`
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))

        setDataEspecifica(response.network)
        setModalShow(true)
    }

    useEffect(() => {
        consumirAPI()
    }, [])

    return (
        <div className="mapeo">
            <ModalEstaciones
                data={dataEspecifica}
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
                                        <Accordion.Header>{network.name} ({network.location.city})</Accordion.Header>
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
                                                <Button className="button" variant="outline-primary" onClick={() => consumirAPI2(network.id)}>
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