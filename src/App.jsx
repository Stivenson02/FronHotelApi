import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const navigate = useNavigate(); // Usa useNavigate para la navegación

  const handleRedirectHotels = () => {
    navigate('/hotels'); // Redirige a la lista de hoteles
  };

  const handleRedirectCreateHotel = () => {
    navigate('/create-hotel'); // Redirige al formulario para crear un nuevo hotel
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 d-flex flex-column align-items-center">
          <img
            src="https://st.depositphotos.com/2288675/2454/i/450/depositphotos_24543787-stock-photo-hotel.jpg"
            alt="Imagen izquierda"
            className="img-fluid mb-3"
            style={{ width: '400px', height: '300px', objectFit: 'cover' }} // Ajustamos el tamaño
          />
          <Button variant="primary" onClick={handleRedirectHotels}>
            Ver Hoteles
          </Button>
        </div>

        <div className="col-md-5 d-flex flex-column align-items-center">
          <img
            src="https://st.depositphotos.com/1000291/4566/i/450/depositphotos_45666935-stock-photo-hotel-reception-with-bell.jpg"
            alt="Imagen derecha"
            className="img-fluid mb-3"
            style={{ width: '400px', height: '300px', objectFit: 'cover' }} // Ajustamos el tamaño
          />
          <Button variant="success" onClick={handleRedirectCreateHotel}>
            Crear Hotel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
