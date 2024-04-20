import React, { Component } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../dashboard/dashboard"
import CCTV from "../cctv/cctv"
import PrivateRoutes from "./privateroutes"

class RoutePages extends Component {
  render () {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route element={<PrivateRoutes />}>
          <Route path="/cctv" element={<CCTV />}/>
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