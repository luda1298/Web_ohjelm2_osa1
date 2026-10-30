import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import GlobalState from "./context/GlobalState";
import Header from "./components/Header";
import AthleteList from "./components/AthleteList";
import AddAthlete from "./components/AddAthlete";
import UpdateAthlete from "./components/UpdateAthlete";
import About from "./pages/About";

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <Header />

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<AthleteList />} />
            <Route path="/athletes/add" element={<AddAthlete />} />
            <Route path="/athletes/edit/:id" element={<UpdateAthlete />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
