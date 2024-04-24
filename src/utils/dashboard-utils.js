import { Link, useLocation } from 'react-router-dom';

const location = useLocation;

function getItem(label, key, icon, children) {
  // const isActive = location.pathname === `/${key}`;
  // const linkProps = isActive ? { className: "active" } : { to: `/${key}` };
  return {
    key: key,
    icon: icon,
    children: children,
    label: key.includes('sub') ? label : <Link to={`/${key}`}>{label}</Link>,
  };
}

export { getItem };
