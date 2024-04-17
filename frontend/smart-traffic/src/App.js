import './App.css';
import { BrowserRouter } from "react-router-dom"
import NavBar from './components/navbar'
import RoutePages from './components/routes/routespages'

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <RoutePages />
      </div>
    </BrowserRouter>
  );
}

export default App;
