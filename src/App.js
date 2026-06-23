import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BarcodeSummary
  from "./pages/BarcodeSummary";
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/summary"
          element={<BarcodeSummary />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;