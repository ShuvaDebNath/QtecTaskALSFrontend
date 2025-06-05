import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function JournalEntryList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    api.get('/journalentries')
      .then(res => setEntries(res.data))
      .catch(err => console.error('Failed to load journal entries', err));
  }, []);

  const getTotalDebit = (lines) => 
    lines.reduce((sum, l) => sum + l.debit, 0);

  const getTotalCredit = (lines) => 
    lines.reduce((sum, l) => sum + l.credit, 0);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Journal Entries</h2>
        <Link to="/journalentries/create" className="bg-blue-500 text-white px-3 py-1 rounded">+ Add</Link>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Total Debit</th>
            <th className="border px-2 py-1">Total Credit</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
             <td className="border px-2 py-1">
              {new Date(entry.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </td>
              <td className="border px-2 py-1 text-left">{entry.description}</td>
              <td className="border px-2 py-1 text-right">{getTotalDebit(entry.lines).toLocaleString()}</td>
              <td className="border px-2 py-1 text-right">{getTotalCredit(entry.lines).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JournalEntryList;
