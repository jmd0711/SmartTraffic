import { BrowserRouter } from "react-router-dom"
import NavBar from './components/navbar'
import RoutePages from './components/routes/routepages'

function App() {
  
  return (
    <BrowserRouter>
        <NavBar />
        <RoutePages />
    </BrowserRouter>
  );
}

export default App;
