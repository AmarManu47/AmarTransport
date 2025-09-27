import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function QuoteForm(){
  const [form, setForm] = useState({
    customer_name:'', customer_email:'', pickup_location:'', drop_location:'', weight_estimate:'', preferred_date:''
  });

  const handle = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosClient.post('/quotes/request', form);
      alert('Quote requested! ID: ' + resp.data.id);
      setForm({ customer_name:'', customer_email:'', pickup_location:'', drop_location:'', weight_estimate:'', preferred_date:'' });
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth:600, margin:'30px auto' }}>
      <h2>Request a Quote</h2>
      <form onSubmit={submit}>
        <input name="customer_name" placeholder="Name" value={form.customer_name} onChange={handle} required /><br/>
        <input name="customer_email" placeholder="Email" type="email" value={form.customer_email} onChange={handle} required /><br/>
        <input name="pickup_location" placeholder="Pickup address" value={form.pickup_location} onChange={handle} required /><br/>
        <input name="drop_location" placeholder="Drop address" value={form.drop_location} onChange={handle} required /><br/>
        <input name="weight_estimate" placeholder="Weight e.g., 200kg" value={form.weight_estimate} onChange={handle} /><br/>
        <input name="preferred_date" type="date" value={form.preferred_date} onChange={handle} /><br/>
        <button type="submit">Request Quote</button>
      </form>
    </div>
  );
}
