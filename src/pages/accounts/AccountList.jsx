import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    api.get('/accounts')
       .then(res => setAccounts(res.data))
       .catch(err => console.error('Failed to load accounts', err));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Account List</h2>
        <Link to="/accounts/create" className="bg-blue-500 text-white px-3 py-1 rounded">+ Add</Link>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Type</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td className="border px-2 py-1 text-center">{account.id}</td>
              <td className="border px-2 py-1 text-center">{account.name}</td>
              <td className="border px-2 py-1 text-center">{account.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountList;
