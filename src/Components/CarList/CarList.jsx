import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { API_URL } from "../../constants";
import NewCar from "../NewCar";
import EditCar from "../EditCar";
import DeleteCar from "../DeleteCar";

import "./CarList.scss";

const CarList = ({ auth, setAuth }) => {
  const user = localStorage.authorized;
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState({
    showModal: false,
    carId: undefined,
    pos: undefined,
  });
  const [deleteModal, setDeleteModal] = useState({
    showModal: false,
    carId: undefined,
    pos: undefined,
  });

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    } else {
      const loadCars = async () => {
        const cars = await axios.get(`${API_URL}/cars`);
        setCars(cars.data);
      };

      loadCars();
    }
  }, [auth, navigate]);

  const handleModalAdd = () => {
    setAddModal(true);
  };

  const handleModalEdit = (carId, pos) => {
    setEditModal({ showModal: true, carId, pos });
  };

  const handleModalDelete = (carId, pos) => {
    setDeleteModal({ showModal: true, carId, pos });
  };

  const logOut = () => {
    localStorage.removeItem("authorized");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div className="car-list-container">
      <header className="car-list-header">
        <h1>BUGGY & BUMPER, INC</h1>
        <div className="user-info">
          <span>Usuario: {user}</span>
          <button
            onClick={() => {
              logOut();
            }}
          >
            Salir
          </button>
        </div>
      </header>
      <div className="list-car-title">
        <span>Lista de carros</span>
        <button onClick={handleModalAdd}>Nuevo</button>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Marcas</th>
              <th>Puertas</th>
              <th>Maletas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cars?.map(({ _id, carType, doors, bags }, i) => (
              <tr key={i}>
                <td>{_id}</td>
                <td>{carType}</td>
                <td>{doors}</td>
                <td>{bags}</td>
                <td>
                  <button onClick={() => handleModalEdit(_id, i)}>
                    Editar
                  </button>
                  <button onClick={() => handleModalDelete(_id, i)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <NewCar addModal={addModal} setAddModal={setAddModal} setCars={setCars} />
      <EditCar
        editModal={editModal}
        setEditModal={setEditModal}
        setCars={setCars}
        car={cars[editModal.pos]}
      />
      <DeleteCar
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        setCars={setCars}
      />
    </div>
  );
};

export default CarList;
