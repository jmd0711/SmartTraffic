import React, { useState, useEffect } from "react";
import { Component } from "react";
import { withRouter } from "../withrouter";

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
   return (
     <div className="page-container">
       <h3 className="page-header"> DASHBOARD PAGE </h3>
      </div>
   );
  }
}

export default withRouter(Dashboard);