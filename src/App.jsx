import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import AccountList from './pages/accounts/AccountList';
import AccountCreate from './pages/accounts/AccountCreate';

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Navigate to="/accounts" />} />
        <Route path="/accounts" element={<AccountList />} />
        <Route path="/accounts/create" element={<AccountCreate />} />
      </Routes>
    </>
  );
}

export default App;
