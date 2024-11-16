import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticated: false,
    user: null,
  });

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    const data = await registerService(signUpFormData);
    console.log(data);
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    const data = await loginService(signInFormData);
    console.log(data);
    if (data.success) {
      console.log(JSON.stringify(data.data.token));
      sessionStorage.setItem("accessToken", JSON.stringify(data.data.token));
      setAuth({
        authenticated: true,
        user: data.user,
      });
    } else {
      setAuth({
        authenticated: false,
        user: null,
      });
    }
  };

  const checkAuthUser = async () => {
    const data = await checkAuthService();
    console.log("checkAuthUser", data);
    if (data.success) {
      setAuth({
        authenticated: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticated: false,
        user: null,
      });
    }
  };

  useEffect(() => {
    console.log("use effect");
    checkAuthUser();
    console.log(auth);
  }, []);

  console.log(auth);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
