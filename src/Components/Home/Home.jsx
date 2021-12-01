import React, { useEffect, useRef, useState } from "react";
import homeCircleImage from "../../assets/circle.png";
import axios from "axios";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import Pay from "../Pay";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState();
  const [rentalDates, setRentalDates] = useState({
    from: 0,
    to: 0,
  });
  const [price, setPrice] = useState(0);
  const [payModal, setPayModal] = useState({
    showModal: false,
    rentalData: undefined,
  });
  const scrollRef = useRef(null);

  const handleAdmin = () => {
    navigate("/login");
  };

  const getTotalRental = () => {
    const { from, to } = rentalDates;
    const days = to - from + 1;
    const total = days * selectedCar.price;
    if (total < 0) {
      setPrice(0);
    } else {
      setPrice(total);
    }
  };

  const handleSelect = (i) => {
    setSelectedCar(cars[i]);
    scrollRef.current.scrollIntoView();
  };

  const handleDates = (tag, event) => {
    setRentalDates((prevState) => ({
      ...prevState,
      [tag]: Date.parse(event.target.value) / (1000 * 60 * 60 * 24),
    }));
  };

  const handlePay = (event) => {
    event.preventDefault();
    const [email, name, phone, from, to] = event.target;
    const rentalData = {
      email: email.value,
      name: name.value,
      phone: phone.value,
      from: from.value,
      to: to.value,
      total: price,
      idCar: selectedCar._id,
    };
    setPayModal({ showModal: true, rentalData });
  };

  useEffect(() => {
    if (selectedCar && rentalDates) {
      getTotalRental();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCar, rentalDates]);

  useEffect(() => {
    const loadCars = async () => {
      const cars = await axios.get(`${API_URL}/cars`);
      setCars(cars.data);
      setSelectedCar(cars.data[0]);
    };
    loadCars();
  }, []);

  return (
    <>
      <div className="login-container">
        <section className="login-titles">
          <h1>
            BUGGY &<br /> BUMPER, INC
          </h1>
          <h2>LA MEJOR RED DE ALQUILER DE AUTOS</h2>
          <button onClick={handleAdmin} className="admin-login">
            Entrar como admin
          </button>
        </section>
        <img src={homeCircleImage} alt="Buggy Bumper Home car" />
      </div>
      <div className="cars">
        <h1>Alquila facilmente nuestros autos</h1>
        <section className="cars-container">
          {cars.map(({ carType, doors, bags, seats, price, image }, i) => (
            <Card style={{ width: "25rem" }} key={i}>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>{carType}</Card.Title>
                <ul>
                  <li>{doors}</li>
                  <li>{seats}</li>
                  <li>{bags}</li>
                </ul>
                <h5>
                  $
                  {price.toLocaleString(navigator.language, {
                    minimumFractionDigits: 0,
                  })}
                </h5>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleSelect(i);
                  }}
                >
                  Alquilar
                </Button>
              </Card.Body>
            </Card>
          ))}
        </section>
        <section className="commercial-info">
          <p>
            Mejor Agencia de alquiler y renta de carros y autos en Medellín y
            Antioquia, en todas las gamas que van desde autos Económicos, Gama
            Baja, Gama Alta, Sedan, Alquiler de Camionetas, Blindados y Vans
          </p>
          <img src={homeCircleImage} alt="Buggy Bumper Home car" />
          <div className="commercial-info-bg"></div>
        </section>
        <section className="rent-car">
          <h1 ref={scrollRef}>Alquilar un auto</h1>
          <p>{`${selectedCar?.carType}, ${selectedCar?.doors}, ${selectedCar?.seats}, ${selectedCar?.bags}`}</p>
          <div className="rent-selected-car">
            <Card style={{ width: "25rem" }}>
              <Card.Img variant="top" src={selectedCar?.image} />
              <Card.Body>
                <Card.Title>{selectedCar?.carType}</Card.Title>
                <ul>
                  <li>{selectedCar?.doors}</li>
                  <li>{selectedCar?.seats}</li>
                  <li>{selectedCar?.bags}</li>
                </ul>
                <h5>
                  $
                  {selectedCar?.price.toLocaleString(navigator.language, {
                    minimumFractionDigits: 0,
                  })}
                </h5>
                <Button>Alquilar</Button>
              </Card.Body>
            </Card>
            <Form onSubmit={handlePay}>
              <Form.Group as={Row} className="mb-5">
                <Form.Label column sm={2}>
                  Email:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="email" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-5">
                <Form.Label column sm={3}>
                  Nombre:
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-5">
                <Form.Label column sm={3}>
                  Teléfono:
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="tel" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-5">
                <Form.Label column sm={2}>
                  Desde:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="date"
                    onChange={(event) => handleDates("from", event)}
                  />
                </Col>
                <Form.Label column sm={2}>
                  Hasta:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="date"
                    onChange={(event) => handleDates("to", event)}
                  />
                </Col>
              </Form.Group>
              <h5 className="total-rental">
                TOTAL: $
                {price.toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </h5>
              <div className="rent-button">
                <Button type="submit">PAGAR</Button>
              </div>
            </Form>
            <Pay payModal={payModal} setPayModal={setPayModal} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
