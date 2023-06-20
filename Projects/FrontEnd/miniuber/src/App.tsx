import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../src/shares/Header";
import Footer from "../src/shares/Footer";
import Login from "../src/shares/Login";
import Home from "../src/shares/Home";
import PrivateRoute from "../src/shares/PrivateRoute";
import UnAuthorized from "../src/shares/UnAuthorized";
import BookingTrips from "../src/features/trips/BookingTrips";
import "./App.css";
import { UserRole } from "./models/type";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route element={<PrivateRoute allowRoles={[UserRole.Admin]} />}>
          <Route path="/bookTrips" element={<BookingTrips />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
