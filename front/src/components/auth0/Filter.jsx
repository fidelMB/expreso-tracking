//Filter.jsx

import React from 'react';

function Filter() {
    return (
      <div className="filter-container">
        <div className="filter">
          <label htmlFor="filter">Filtro</label>
          <select id="filter" name="filter">
            <option value="">Selecciona un filtro</option>
            <option value="1">Menor Trafico</option>
            <option value="2">Mejor Ruta</option>
          </select>
        </div>
      </div>
    );
  }
  
  export default Filter;