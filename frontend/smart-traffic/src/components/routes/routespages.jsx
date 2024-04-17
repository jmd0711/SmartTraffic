import React, { Component } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../dashboard/dashboard"

class RoutePages extends Component {
  render () {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}/>
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