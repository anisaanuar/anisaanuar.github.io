import { Link, Outlet } from 'react-router-dom';
import AnisaMark from './AnisaMark.jsx';
import Sky from './Sky.jsx';
import Cursor from './Cursor.jsx';

export default function Layout() {
  return (
    <>
      <Sky />
      <Cursor />
      <Outlet />
      <Link to="/" className="wordmark" aria-label="Anisa, home">
        <AnisaMark className="wordmark__mark" />
      </Link>
    </>
  );
}
