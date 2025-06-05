import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="flex space-x-4 bg-gray-200 p-4">
      <Link to="/accounts" className="font-semibold">Accounts</Link>
      <Link to="/journalentries" className="font-semibold">Journal Entries</Link>
    </div>
  );
}

export default Menu;
