import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import api from "./api/axios"; // Importa la instancia de Axios que configuraste

const CreateHotel = () => {
  const [hotelData, setHotelData] = useState({
    name: "",
    address: "",
    city: "",
    nit: "",
    total_rooms: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/hotels", hotelData); // Usar la instancia api aquí

      console.log("Hotel creado:", response.data);
      alert("Hotel creado con éxito");

      // Redirigir al formulario para crear habitaciones usando el hotelId
      navigate(`/hotels/${response.data.id}/create-room`);
    } catch (err) {
      console.error("Error al crear el hotel:", err);
      setError("Error al crear el hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Crear Hotel</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre del Hotel
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={hotelData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={hotelData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={hotelData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nit" className="form-label">
            NIT
          </label>
          <input
            type="text"
            id="nit"
            name="nit"
            className="form-control"
            value={hotelData.nit}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="total_rooms" className="form-label">
            Número de Habitaciones
          </label>
          <input
            type="number"
            id="total_rooms"
            name="total_rooms"
            className="form-control"
            value={hotelData.total_rooms}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Hotel"}
        </button>
      </form>

      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  );
};

export default CreateHotel;
