import { useEffect, useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalEstaciones(props) {

    const data = props.data
    const estaciones = data.stations
    const [all_free_bikes, setAllFB] = useState()
    const [all_empty_slots, setAllES] = useState()

    const handleCount = useCallback(() => {
        var temp_stations = estaciones
        var all_empty_slots = 0
        var all_free_bikes = 0
        for (var i in temp_stations) {
            all_empty_slots = all_empty_slots + temp_stations[i].empty_slots
            all_free_bikes = all_free_bikes + temp_stations[i].free_bikes
        }
        setAllFB(all_free_bikes)
        setAllES(all_empty_slots)
    }, [estaciones]);

    useEffect(() => {
        handleCount()
    }, [handleCount])

    if(data.length === 0){
        return(
            <div></div>
        )
    }
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {data.name} ({data.location.city})
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Compañía: {data.company}</h4>
                    <h4>País: {data.location.country}</h4>
                    <hr></hr>
                    <h4>Estaciones || Total Bicicletas Libres: {all_free_bikes} || Total Espacios Libres: {all_empty_slots}</h4>
                    <hr></hr>
                    {
                        !estaciones ? 'No hay estaciones' : estaciones.map((estacion) => {
                            return(
                                <div key={estacion.id}>
                                <h5>Nombre de la Estación: {estacion.name}</h5>
                                <h5>Bicicletas Libres: {estacion.free_bikes ?? 'No hay Info'}</h5>
                                <h5>Espacios Libres: {estacion.empty_slots ?? 'No hay Info'}</h5>
                                <h5>Total de Espacios: {estacion.free_bikes + estacion.empty_slots}</h5>
                                <h5>Última Actualización: {estacion.timestamp}</h5>
                                <hr></hr>
                                </div>
                            )
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ModalEstaciones