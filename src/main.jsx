import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Hotels from './Hotels';
import CreateHotel from './CreateHotel'; // Importa el componente para crear hoteles
import CreateRoom from "./CreateRoom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/create-hotel" element={<CreateHotel />} /> {/* Nueva ruta para crear hotel */}
      <Route path="/hotels/:hotelId/create-room" element={<CreateRoom />} />
    </Routes>
  </Router>
);
