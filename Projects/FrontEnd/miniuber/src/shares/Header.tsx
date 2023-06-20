/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../services";
import {
  logout,
  selectIsAuthenticated,
  selectLoggedUser,
} from "../services/slices/authSlice";

const Header = () => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const loggedUser = useTypedSelector(selectLoggedUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  useEffect(() => {}, []);

  return (
    <header id="header" className="header-area">
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-6">
              <div className="header-top-left">
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-google-plus" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-pinterest" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-soundcloud" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-6">
              <div className="header-top-right fix">
                <div className="header-links">
                  <ul>
                    <li>
                      <Link className="nav-link" to={"/login"}>
                        Log in
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="header-search">
                  <form action="#" method="post">
                    <button type="button" className="search-toggler">
                      <i className="fa fa-search" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /.header-top */}
      <div className="header-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="logo">
                <a href="index.html">
                  <img src="img/logo/logo.png" alt="Logo" />
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="main-menu">
                <nav>
                  <ul className="main-nav navbar-right">
                    <li className="active dropdown">
                      <Link className="nav-link" to={"/"}>
                        Home
                      </Link>
                      {isAuthenticated ? (
                        <div className="sub-menu">
                          <ul className="home-versions">
                            <li>
                              <Link
                                className="nav-link"
                                to={"/"}
                                onClick={clickLogout}
                              >
                                Logout
                              </Link>
                            </li>
                          </ul>
                        </div>
                      ) : null}
                    </li>
                    <li>
                      <Link className="nav-link" to={"/bookTrips"}>
                        Book Trips
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* /.main-menu */}
            </div>
          </div>
        </div>
        {/* mobile-menu-area start */}
        <div className="mobile-menu-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav id="dropdown" style={{ display: "block" }}>
                  <ul>
                    <li>
                      <a href="#">home</a>
                      <ul>
                        <li>
                          <a href="index.html">home 1</a>
                        </li>
                        <li>
                          <a href="index-2.html">home 2</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">pages</a>
                      <ul>
                        <li>
                          <a href="#">Blog</a>
                          <ul>
                            <li>
                              <a href="blog-column-3.html">Blog Column 3</a>
                            </li>
                            <li>
                              <a href="blog-column-2.html">Blog Column 2</a>
                            </li>
                            <li>
                              <a href="blog-fullwidth.html">Blog Fullwidth</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#">single blog</a>
                          <ul>
                            <li>
                              <a href="single-blog.html">Single Blog 1</a>
                            </li>
                            <li>
                              <a href="single-blog-2.html">Single Blog 2</a>
                            </li>
                            <li>
                              <a href="single-blog-3.html">Single Blog 3</a>
                            </li>
                            <li>
                              <a href="single-blog-4.html">Single Blog 4</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="404.html">404 Page</a>
                        </li>
                        <li>
                          <a href="contact-us.html">contact us</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">sport</a>
                    </li>
                    <li>
                      <a href="#">travel</a>
                    </li>
                    <li>
                      <a href="#">lifestyle</a>
                    </li>
                    <li>
                      <a href="#">tech</a>
                    </li>
                    <li>
                      <a href="contact-us.html">contact us</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* mobile-menu-area end */}
      </div>
      {/* /.header-bottom */}
    </header>
  );
};

export default Header;
