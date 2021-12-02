import React from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { addCar } from "../../api/adminCars";
import "./NewCar.scss";

const NewCar = ({ addModal, setAddModal, setCars }) => {
  const handleClose = () => setAddModal(false);

  const handleAddCar = async (event) => {
    event.preventDefault();

    const [carType, doors, seats, bags, price, image] = event.target;
    let imageName = "No Image";
    const file = image.files[0];

    if (file) {
      imageName = `${process.env.REACT_APP_URL_BASE}${carType.value}.${file.type.split("/")[1]}`;
    }

    const newCar = {
      carType: carType.value,
      doors: doors.value,
      seats: seats.value,
      bags: bags.value,
      price: parseInt(price.value) || 0,
      image: imageName.replace(/\s+/g, "").toLowerCase(),
      file: file || null,
    };

    const car = await addCar(newCar);
    setCars((prevState) => [...prevState, car.data]);
    handleClose();
  };

  return (
    <>
      <Modal show={addModal} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Carro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCar}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>
                Marca
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>
                Número de puertas
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>
                Número de sillas
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>
                Número de maletas
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>
                Precio
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>
                Subir imagen
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="file" />
              </Col>
            </Form.Group>
            <Modal.Footer>
              <Button type="submit">Agregar</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewCar;
