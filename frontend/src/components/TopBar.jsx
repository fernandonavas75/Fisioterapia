import React from "react";

const TopBar = ({ usuario }) => (
  <div className="top-bar">
    <h4>Panel de Historias Clínicas</h4>
    <span className="text-muted">Usuario: {usuario}</span>
  </div>
);

export default TopBar;
