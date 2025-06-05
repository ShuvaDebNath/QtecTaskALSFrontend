import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function JournalEntryCreate() {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [lines, setLines] = useState([
    { transactionType: '', accountId: '', amount: 0 }
  ]);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load accounts
  useEffect(() => {
    api.get('/accounts')
      .then(res => setAccounts(res.data))
      .catch(err => console.error('Account load failed', err));
  }, []);

  const handleLineChange = (index, field, value) => {
    const updated = [...lines];
    updated[index][field] = field === 'accountId' ? parseInt(value) : value;
    setLines(updated);
  };

  const addLine = () => {
    const last = lines[lines.length - 1];
    let newType = 'Debit';
    let newAmount = 0;
  
    if (last?.transactionType === 'Debit') {
      newType = 'Credit';
      newAmount = getTotal('Debit');
    } else if (last?.transactionType === 'Credit') {
      newType = 'Debit';
      newAmount = getTotal('Credit');
    }
  
    setLines([
      ...lines,
      {
        transactionType: newType,
        accountId: '',
        amount: newAmount
      }
    ]);
  };

  const removeLine = (index) => {
    const updated = [...lines];
    updated.splice(index, 1);
    setLines(updated);
  };

  const getTotal = (type) => {
    return lines
      .filter(l => l.transactionType === type)
      .reduce((sum, l) => sum + (parseFloat(l.amount) || 0), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (lines.length === 0) return setError('At least one transaction line is required');

    const totalDebit = getTotal('Debit');
    const totalCredit = getTotal('Credit');

    if (totalDebit !== totalCredit) {
      return setError('Debits and Credits must be equal');
    }

    const payload = {
      date,
      description,
      lines: lines.map(l => ({
        accountId: l.accountId,
        debit: l.transactionType === 'Debit' ? parseFloat(l.amount) : 0,
        credit: l.transactionType === 'Credit' ? parseFloat(l.amount) : 0
      }))
    };

    try {
      await api.post('/journalentries', payload);
      navigate('/journalentries');
    } catch (err) {
      console.error(err);
      setError('Submission failed.');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Journal Entry</h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="border p-2 w-full" required />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)}
            className="border p-2 w-full" required />
        </div>

        <h4 className="font-semibold mb-2">Details</h4>
        <div className="grid grid-cols-4 gap-4 font-semibold border-b pb-2 mb-2">
        <div>Transaction Type</div>
        <div>Account Name</div>
        <div>Amount (BDT)</div>
        <div>Action</div>
      </div>

        {lines.map((line, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 items-center mb-2">
            {/* Transaction Type */}
            <select
              value={line.transactionType}
              onChange={e => handleLineChange(index, 'transactionType', e.target.value)}
              className="border p-2"
              required
            >
              <option value="">Select Type</option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>

            {/* Account */}
            <select
              value={line.accountId}
              onChange={e => handleLineChange(index, 'accountId', e.target.value)}
              className="border p-2"
              required
            >
              <option value="">Select Account</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name} ({acc.type})</option>
              ))}
            </select>

            {/* Amount */}
            <input
              type="number"
              value={line.amount}
              onChange={e => handleLineChange(index, 'amount', e.target.value)}
              className="border p-2"
              placeholder="Amount"
              required
            />

            {/* Remove */}
            <button type="button" onClick={() => removeLine(index)}
              className="text-red-600 font-bold">X</button>
          </div>
        ))}

        <button type="button" onClick={addLine}
          className="bg-gray-200 px-3 py-1 mb-4">+ Add Line</button>

        <div className="font-semibold mb-3">
          Total Debit: {getTotal('Debit')} | Total Credit: {getTotal('Credit')}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Entry
        </button>
      </form>
    </div>
  );
}

export default JournalEntryCreate;
