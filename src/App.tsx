import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewUser from "./pages/ViewUser";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout";
import FormUser from "./pages/FormUser";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<FormUser />} />
          <Route path="/view/:id" element={<ViewUser />} />
          <Route path="/edit/:id" element={<FormUser />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
