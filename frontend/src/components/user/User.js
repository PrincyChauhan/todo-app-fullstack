import React, { useEffect, useState } from "react";
import Login from "./login/login";
import Register from "./register/Register";

const User = () => {
  const [userStep, setUserStep] = useState(1);

  useEffect(() => {}, [userStep]);

  return (
    <>
      {userStep === 1 ? (
        <Login setUserStep={setUserStep} />
      ) : (
        <Register setUserStep={setUserStep} />
      )}
    </>
  );
};

export default User;
