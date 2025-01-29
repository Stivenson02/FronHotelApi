import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api/axios";

const CreateRoom = () => {
  const { hotelId } = useParams(); // Obtener el ID del hotel desde la URL
  const navigate = useNavigate(); // Usar el hook de navegación

  const [roomTypes, setRoomTypes] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [roomData, setRoomData] = useState({
    room_type_id: "",
    accommodation: "",
    quantity: "",
  });
  const [rooms, setRooms] = useState([]); // Estado para almacenar las habitaciones
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState(null); // Cantidad de habitaciones disponibles
  const [showNotice, setShowNotice] = useState(false); // Estado para mostrar el mensaje de éxito

  // Obtener los tipos de habitaciones y las habitaciones desde el backend
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await api.get("/room-types");
        setRoomTypes(response.data);
      } catch (err) {
        console.error("Error al obtener los tipos de habitación", err);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await api.get(`/hotels/${hotelId}/rooms`);
        setRooms(response.data); // Cargar las habitaciones en el estado

        // Calcular la cantidad de habitaciones ocupadas
        const quantitySum = response.data.reduce((sum, room) => sum + room.quantity, 0);

        // Obtener la información del hotel
        const hotelResponse = await api.get(`/hotels/${hotelId}`);
        const totalRooms = hotelResponse.data.total_rooms;

        // Calcular las habitaciones disponibles
        setAvailableRooms(totalRooms - quantitySum);
      } catch (err) {
        console.error("Error al obtener las habitaciones", err);
      }
    };

    fetchRoomTypes();
    fetchRooms(); // Obtener las habitaciones al cargar el componente
  }, [hotelId]);

  // Si las habitaciones disponibles son 0, redirigir a /hotels
  useEffect(() => {
    if (availableRooms === 0) {
      navigate("/hotels");
    }
  }, [availableRooms, navigate]);

  // Cuando el tipo de habitación cambie, actualizar las opciones de acomodación
  const handleRoomTypeChange = (e) => {
    const selectedRoomType = e.target.value;
    setRoomData({
      ...roomData,
      room_type_id: selectedRoomType,
      accommodation: "", // Resetear acomodación
    });

    const selectedType = roomTypes.find((type) => type.id === parseInt(selectedRoomType));
    if (selectedType) {
      setAccommodations(selectedType.accommodations);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validar si la cantidad de habitaciones supera las disponibles
    if (parseInt(roomData.quantity) > availableRooms) {
      setError("Supera el máximo de habitaciones disponibles");
      setLoading(false);
      return;
    }

    try {
      // Crear la nueva habitación
      const response = await api.post(`/hotels/${hotelId}/rooms`, roomData);
      console.log("Habitación creada:", response.data);

      // Actualizar las habitaciones
      const updatedRoomsResponse = await api.get(`/hotels/${hotelId}/rooms`);
      setRooms(updatedRoomsResponse.data);

      // Recalcular las habitaciones ocupadas y las disponibles
      const quantitySum = updatedRoomsResponse.data.reduce((sum, room) => sum + room.quantity, 0);
      const hotelResponse = await api.get(`/hotels/${hotelId}`);
      const totalRooms = hotelResponse.data.total_rooms;
      setAvailableRooms(totalRooms - quantitySum);  // Actualizar la cantidad disponible

      // Mostrar un mensaje de éxito (Notice)
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 2000);  // Ocultar el mensaje después de 2 segundos

    } catch (err) {
      console.error("Error al crear la habitación:", err);
      setError("Error al crear la habitación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Crear Habitación</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <div className="mb-3">
          <label htmlFor="room_type_id" className="form-label">
            Tipo de Habitación
          </label>
          <select
            id="room_type_id"
            name="room_type_id"
            className="form-control"
            value={roomData.room_type_id}
            onChange={handleRoomTypeChange}
            required
          >
            <option value="">Selecciona un tipo de habitación</option>
            {roomTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="accommodation" className="form-label">
            Acomodación
          </label>
          <select
            id="accommodation"
            name="accommodation"
            className="form-control"
            value={roomData.accommodation}
            onChange={handleChange}
            required
            disabled={accommodations.length === 0}
          >
            <option value="">Selecciona una acomodación</option>
            {accommodations.map((accommodation) => (
              <option key={accommodation.id} value={accommodation.type}>
                {accommodation.type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Cantidad de Habitaciones
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="form-control"
            value={roomData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
          {availableRooms !== null && (
            <small className="form-text text-muted">
              Cantidad de habitaciones disponibles: {availableRooms}
            </small>
          )}
        </div>

        {/* Ocultar el botón si no hay habitaciones disponibles */}
        {availableRooms !== 0 && (
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Habitación"}
          </button>
        )}
      </form>

      {error && <p className="text-danger text-center mt-3">{error}</p>}

      {/* Mostrar el Notice si se creó la habitación */}
      {showNotice && (
        <div className="alert alert-success mt-3" role="alert">
          Habitación creada con éxito
        </div>
      )}

      {/* Mostrar las habitaciones creadas */}
      <div className="mt-5">
        <h3>Habitaciones creadas:</h3>
        <ul className="list-group">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <li key={room.id} className="list-group-item">
                {`Tipo: ${room.accommodation}, Cantidad: ${room.quantity}`}
              </li>
            ))
          ) : (
            <li className="list-group-item">No hay habitaciones creadas aún.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CreateRoom;
