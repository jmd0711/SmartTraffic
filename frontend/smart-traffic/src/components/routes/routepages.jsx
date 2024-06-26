import React, { Component } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../dashboard/dashboard"
import CCTV from "../cctv/cctv"
import Drone from "../drone/drone"
import IoT from "../iot/iot"
import PrivateRoutes from "./privateroutes"
import Login from "../user/login"
import Register from "../user/signup"

class RoutePages extends Component {
  render () {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route element={<PrivateRoutes />}>
          <Route path="/cctv" element={<CCTV />}/>
          <Route path="/drone" element={<Drone />}/>
          <Route path="/iot" element={<IoT />}/>
        </Route>
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found etc</h2>
            </div>
          }
        />
      </Routes>
    );
  }
};

export default RoutePages;