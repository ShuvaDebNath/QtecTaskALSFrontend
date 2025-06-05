import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function AccountCreate() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/accounts', { name, type });
      navigate('/accounts');
    } catch (err) {
      console.error('Error creating account', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Account Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Account Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border px-3 py-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}

export default AccountCreate;
