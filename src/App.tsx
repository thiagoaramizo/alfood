import { Routes, Route } from 'react-router-dom';
import BaseAdmin from './paginas/Administrativo/BaseAdmin';
import FormularioPrato from './paginas/Administrativo/PratosAdmin/FormularioPrato';
import PratosAdmin from './paginas/Administrativo/PratosAdmin/PratosAdmin';
import FormularioRestaurante from './paginas/Administrativo/RestaurantesAdmin/FormularioRestaurante';
import RestaurantesAdmin from './paginas/Administrativo/RestaurantesAdmin/RestaurantesAdmin';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<BaseAdmin />}> 
        
        <Route path="restaurantes" element={<RestaurantesAdmin />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        
        <Route path="pratos" element={<PratosAdmin />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
        <Route path="pratos/:id" element={<FormularioPrato />} />
      
      </Route>
      
    </Routes>
  );
}

export default App;
