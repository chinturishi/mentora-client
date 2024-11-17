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
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    const data = await loginService(signInFormData);
    if (data.success) {
      sessionStorage.setItem("accessToken", JSON.stringify(data.data.token));
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

  const checkAuthUser = async () => {
    const data = await checkAuthService();
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
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
