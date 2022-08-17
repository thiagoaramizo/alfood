import { Routes, Route } from 'react-router-dom';
import FormularioRestaurante from './paginas/Administrativo/RestaurantesAdmin/FormularioRestaurante';
import RestaurantesAdmin from './paginas/Administrativo/RestaurantesAdmin/RestaurantesAdmin';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<RestaurantesAdmin />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormularioRestaurante />} />
    </Routes>
  );
}

export default App;
