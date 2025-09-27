import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function FleetList(){
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    axiosClient.get('/vehicles')
      .then(r => setVehicles(r.data))
      .catch(e => console.error(e));
  }, []);
  return (
    <div>
      <h3>Fleet</h3>
      <ul>
        {vehicles.map(v => (
          <li key={v.id}>{v.name} - {v.vehicle_type} - {v.status}</li>
        ))}
      </ul>
    </div>
  );
}
