// import React, { createContext, useState } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [jwtToken, setToken] = useState(sessionStorage.getItem('jwtToken') || '');
//   const [userId, setUserId] = useState(sessionStorage.getItem('userId') || '');
//   const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
//   const [branchId, setBranchId] = useState(sessionStorage.getItem('branchId') || '');
//   const [companyid, setCompanyId] = useState(sessionStorage.getItem('companyid') || '');
//   const [role, setRole] = useState(sessionStorage.getItem('role') || '');
//   const [companyname, setCompanyname] = useState(sessionStorage.getItem('companyname') || '');
//   const [branchname, setBranchname] = useState(sessionStorage.getItem('branchname') || '');
//   const [logintype, setLogintype] = useState(sessionStorage.getItem('logintype') || '');
//   const [logintypeid, setLogintypeid] = useState(sessionStorage.getItem('logintypeid') || '');
//   const [userType, setUserType] = useState(sessionStorage.getItem('userType') || '');

//   const isAuthenticated = jwtToken !== '';

//   const login = (newToken, newUserId, newUsername, newBranchId, newCompanyId, newRole, newCompanyname, newBranchname, newLogintype,newLogintypeid, newUsertype) => {
//     sessionStorage.setItem('jwtToken', newToken);
//     sessionStorage.setItem('userId', newUserId);
//     sessionStorage.setItem('username', newUsername);
//     sessionStorage.setItem('branchId', newBranchId);
//     sessionStorage.setItem('companyid', newCompanyId);
//     sessionStorage.setItem('role', newRole);
//     sessionStorage.setItem('companyname', newCompanyname);
//     sessionStorage.setItem('branchname', newBranchname);
//     sessionStorage.setItem('logintype', newLogintype);
//     sessionStorage.setItem('logintypeid', newLogintypeid);
//     sessionStorage.setItem('userType', newUsertype);

//     setToken(newToken);
//     setUserId(newUserId);
//     setUsername(newUsername);
//     setBranchId(newBranchId);
//     setCompanyId(newCompanyId);
//     setRole(newRole);
//     setCompanyname(newCompanyname);
//     setBranchname(newBranchname);
//     setLogintype(newLogintype);
//     setLogintypeid(newLogintypeid);
//     setUserType(newUsertype);
//   };

//   const logout = () => {
//     sessionStorage.removeItem('jwtToken');
//     sessionStorage.removeItem('userId');
//     sessionStorage.removeItem('username');
//     sessionStorage.removeItem('branchId');
//     sessionStorage.removeItem('companyid');
//     sessionStorage.removeItem('role');
//     sessionStorage.removeItem('companyname');
//     sessionStorage.removeItem('branchname');
//     sessionStorage.removeItem('logintype');
//     sessionStorage.removeItem('logintypeid');
//     sessionStorage.removeItem('userType');

//     setToken('');
//     setUserId('');
//     setUsername('');
//     setBranchId('');
//     setCompanyId('');
//     setRole('');
//     setCompanyname('');
//     setBranchname('');
//     setLogintype('');
//     setLogintypeid('');
//     setUserType('');
//   };

//   // const timeoutInMilliseconds = 3600000; // 5 seconds
//   // setTimeout(() => {
//   //   // Remove the item from sessionStorage after the timeout
//   //   sessionStorage.removeItem('jwtToken');
//   //   sessionStorage.removeItem('userId');
//   //   sessionStorage.removeItem('username');
//   //   sessionStorage.removeItem('branchId');
//   //   sessionStorage.removeItem('companyid');
//   //   sessionStorage.removeItem('role');
//   //   sessionStorage.removeItem('companyname');
//   //   sessionStorage.removeItem('branchname');

//   //   setToken('');
//   //   setUserId('');
//   //   setUsername('');
//   //   setBranchId('');
//   //   setCompanyId('');
//   //   setRole('');
//   //   setCompanyname('');
//   //   setBranchname('');
//   //   console.log('Item removed from sessionStorage after 5 seconds.');
//   // }, timeoutInMilliseconds);

//   const authContextValue = {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     logintype,
//     logintypeid,
//     userType,
//     isAuthenticated,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
//   );
// }

// export default AuthContext;


import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const getSessionStorageItem = (key, defaultValue) => {
    const item = sessionStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error parsing ${key} from sessionStorage`, e);
      return defaultValue;
    }
  };

  const [jwtToken, setToken] = useState(sessionStorage.getItem('jwtToken') || '');
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || '');
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
  const [branchId, setBranchId] = useState(sessionStorage.getItem('branchId') || '');
  const [companyid, setCompanyId] = useState(sessionStorage.getItem('companyid') || '');
  const [role, setRole] = useState(sessionStorage.getItem('role') || '');
  const [companyname, setCompanyname] = useState(sessionStorage.getItem('companyname') || '');
  const [branchname, setBranchname] = useState(sessionStorage.getItem('branchname') || '');
  const [logintype, setLogintype] = useState(sessionStorage.getItem('logintype') || '');
  const [logintypeid, setLogintypeid] = useState(sessionStorage.getItem('logintypeid') || '');
  const [userType, setUserType] = useState(sessionStorage.getItem('userType') || '');
  const [userRights, setUserRights] = useState(getSessionStorageItem('userRights', []));
  const [parentMenus, setParentMenus] = useState(getSessionStorageItem('parentMenus', []));
  const [childMenus, setChildMenus] = useState(getSessionStorageItem('childMenus', []));
  const [tabMenus, setTabMenus] = useState(getSessionStorageItem('tabMenus', []));

  const isAuthenticated = jwtToken !== '';

  const login = (
    newToken,
    newUserId,
    newUsername,
    newBranchId,
    newCompanyId,
    newRole,
    newCompanyname,
    newBranchname,
    newLogintype,
    newLogintypeid,
    newUsertype,
    newUserRights,
    newParentMenus,
    newChildMenus,
    newTabMenus
  ) => {
    sessionStorage.setItem('jwtToken', newToken);
    sessionStorage.setItem('userId', newUserId);
    sessionStorage.setItem('username', newUsername);
    sessionStorage.setItem('branchId', newBranchId);
    sessionStorage.setItem('companyid', newCompanyId);
    sessionStorage.setItem('role', newRole);
    sessionStorage.setItem('companyname', newCompanyname);
    sessionStorage.setItem('branchname', newBranchname);
    sessionStorage.setItem('logintype', newLogintype);
    sessionStorage.setItem('logintypeid', newLogintypeid);
    sessionStorage.setItem('userType', newUsertype);
    sessionStorage.setItem('userRights', JSON.stringify(newUserRights));
    sessionStorage.setItem('parentMenus', JSON.stringify(newParentMenus));
    sessionStorage.setItem('childMenus', JSON.stringify(newChildMenus));
    sessionStorage.setItem('tabMenus', JSON.stringify(newTabMenus));

    setToken(newToken);
    setUserId(newUserId);
    setUsername(newUsername);
    setBranchId(newBranchId);
    setCompanyId(newCompanyId);
    setRole(newRole);
    setCompanyname(newCompanyname);
    setBranchname(newBranchname);
    setLogintype(newLogintype);
    setLogintypeid(newLogintypeid);
    setUserType(newUsertype);
    setUserRights(newUserRights);
    setParentMenus(newParentMenus);
    setChildMenus(newChildMenus);
    setTabMenus(newTabMenus);
  };

  const logout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('branchId');
    sessionStorage.removeItem('companyid');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('companyname');
    sessionStorage.removeItem('branchname');
    sessionStorage.removeItem('logintype');
    sessionStorage.removeItem('logintypeid');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userRights');
    sessionStorage.removeItem('parentMenus');
    sessionStorage.removeItem('childMenus');
    sessionStorage.removeItem('tabMenus');

    setToken('');
    setUserId('');
    setUsername('');
    setBranchId('');
    setCompanyId('');
    setRole('');
    setCompanyname('');
    setBranchname('');
    setLogintype('');
    setLogintypeid('');
    setUserType('');
    setUserRights([]);
    setParentMenus([]);
    setChildMenus([]);
    setTabMenus([]);
  };

  const authContextValue = {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    logintype,
    logintypeid,
    userType,
    isAuthenticated,
    login,
    logout,
    userRights,
    parentMenus,
    childMenus,
    tabMenus,
  };

  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;

