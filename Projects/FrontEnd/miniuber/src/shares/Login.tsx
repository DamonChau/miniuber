/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/users/usersApi";
import { Users } from "../models/type";
import { useAppDispatch } from "../services";
import { selectIsAuthenticated, setLoggedSession } from "../services/slices/authSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const [login] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const postLogin = async (event: any) => {
    event.preventDefault();
    try {
      const u = {} as Users;
      u.userName = userName;
      u.password = password;
      const response = await login(u).unwrap();
      dispatch(setLoggedSession(response));
    } catch (err) {
     console.log(err)
    }
  };

  return (
    <div>
      <div id="contact-heading" className="heading-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Login</h2>
            </div>
          </div>
        </div>
      </div>
      {/* heading-area end */}
      {/* contact-content-area start */}
      <div id="contact-content" className="contact-content-area">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-2">
              <div className="contact-form-area">
                <form onSubmit={postLogin}>
                  <div className="input-fields fix">
                    <div className="single-field">
                      <input
                        type="text"
                        placeholder="User Name"
                        className="name"
                        value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="single-field">
                      <input
                        type="password"
                        placeholder="Password"
                        className="name"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="submit-btn clear">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
