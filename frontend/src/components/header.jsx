import React from "react";
import { Link } from "react-router-dom";
function Header({ user }) {
  return (
    <div className="container position-relative">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="position-absolute top-0 start-0">
          {user ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link className="navbar-brand" to="/">
                  Haulier
                </Link>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/vehicles">
                    Vehicles
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <Link className="navbar-brand" to="/">
              Haulier
            </Link>
          )}
        </div>
        <div className="position-absolute top-0 end-0">
          <ul className="ms-auto navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-2">
              {user ? (
                <>
                  <ul className="list-group list-group-horizontal">
                    <Link to="/" className="list-group-item">
                      {user.name}
                    </Link>
                    <Link to="/logout" className="list-group-item">
                      Logout
                    </Link>
                  </ul>
                </>
              ) : (
                <Link className="nav-link" to="/login">
                  Login{" "}
                </Link>
              )}
            </li>
            <li className="nav-item">
              {user ? (
                <></>
              ) : (
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
