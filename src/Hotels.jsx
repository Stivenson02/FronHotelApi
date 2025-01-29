import { useEffect, useState } from 'react';
import api from './api/axios'; // Importa tu configuración de Axios

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [expandedHotelId, setExpandedHotelId] = useState(null); // Para controlar qué hotel tiene la información expandida
  const [hotelDetails, setHotelDetails] = useState({}); // Para almacenar detalles de cada hotel

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels'); // Solicitud GET a la API
        setHotels(response.data); // Guarda los datos en el estado
      } catch (error) {
        console.error('Error al obtener los hoteles:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleToggleDetails = async (hotelId) => {
    if (expandedHotelId === hotelId) {
      // Si el hotel ya está expandido, lo colapsamos
      setExpandedHotelId(null);
    } else {
      // Si no está expandido, mostramos los detalles del hotel
      setExpandedHotelId(hotelId);

      try {
        const hotelResponse = await api.get(`/hotels/${hotelId}`);
        const roomsResponse = await api.get(`/hotels/${hotelId}/rooms`);

        // Actualiza los detalles del hotel con los datos obtenidos
        setHotelDetails((prevDetails) => ({
          ...prevDetails,
          [hotelId]: {
            hotel: hotelResponse.data,
            rooms: roomsResponse.data,
          },
        }));
      } catch (error) {
        console.error('Error al obtener los detalles del hotel:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Hoteles</h2>
      <ul className="list-group">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <span>{hotel.name}</span>
              <button
                className="btn btn-info"
                onClick={() => handleToggleDetails(hotel.id)}
              >
                {expandedHotelId === hotel.id ? 'Ocultar' : 'Ver'}
              </button>
            </div>

            {expandedHotelId === hotel.id && hotelDetails[hotel.id] && (
              <div className="mt-3">
                <h5>Detalles del Hotel</h5>
                <p><strong>Dirección:</strong> {hotelDetails[hotel.id].hotel?.address}</p>
                <p><strong>Ciudad:</strong> {hotelDetails[hotel.id].hotel?.city}</p>
                <p><strong>NIT:</strong> {hotelDetails[hotel.id].hotel?.nit}</p>
                <p><strong>Total de habitaciones:</strong> {hotelDetails[hotel.id].hotel?.total_rooms}</p>

                <h5>Habitaciones</h5>
                <div className="row">
                  <div className="col-md-3"><strong>Tipo de Habitación</strong></div>
                  <div className="col-md-3"><strong>Acomodación</strong></div>
                  <div className="col-md-3"><strong>Cantidad</strong></div>
                </div>
                <div className="mb-3">
                  {hotelDetails[hotel.id].rooms?.map((room, index) => (
                    <div key={index} className="row">
                      <div className="col-md-3">{room.room_type}</div>
                      <div className="col-md-3">{room.accommodation}</div>
                      <div className="col-md-3">{room.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hotels;
