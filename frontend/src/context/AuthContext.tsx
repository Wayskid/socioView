import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const [currentUser, setCurrentUser] = useState<UserInfoType>(
    JSON.parse(localStorage.getItem("currentUser") || "false") || {}
  );

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
