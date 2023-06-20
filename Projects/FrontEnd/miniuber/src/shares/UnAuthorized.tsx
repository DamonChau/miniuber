/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from "react";

const UnAuthorized = () => {
  useEffect(() => {}, []);

  return (
    <div className="d-flex justify-content-center p-5">
      <h2>You are unauthorized to visit this page</h2>
    </div>
  );
};

export default UnAuthorized;
