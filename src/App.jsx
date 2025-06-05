import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import AccountList from './pages/accounts/AccountList';
import AccountCreate from './pages/accounts/AccountCreate';
import JournalEntryList from './pages/journalentries/JournalEntryList';
import JournalEntryCreate from './pages/journalentries/JournalEntryCreate';
function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Navigate to="/accounts" />} />
        <Route path="/accounts" element={<AccountList />} />
        <Route path="/accounts/create" element={<AccountCreate />} />
        <Route path="/journalentries" element={<JournalEntryList />} />
        <Route path="/journalentries/create" element={<JournalEntryCreate />} />
      </Routes>
    </>
  );
}

export default App;
