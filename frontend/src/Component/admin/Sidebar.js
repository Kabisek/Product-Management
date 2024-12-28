import React, { useEffect, useState } from 'react';

const SidebarAdmin = () => {
  const [selectedLink, setSelectedLink] = useState('');

  useEffect(() => {
    // Getting the pathname when component mounts
    setSelectedLink(window.location.pathname);
  }, []);

  const handleNavLinkClick = (path) => {
    setSelectedLink(path);
  };

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className={`nav-link ${selectedLink === '/logout' ? 'clicked' : ''}`} href="/logout" onClick={() => handleNavLinkClick('/logout')}>
              <b><i className="bi bi-box-arrow-right"></i> Logout</b>
            </a>
            <hr />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SidebarAdmin;
