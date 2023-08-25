export const dataStore = {
  "users": {},
  "userdetails": {}
}

export const addUser = (email, password) => {
  const emailList = dataStore["users"];
  if (email in emailList) {
    return false;
  }
  dataStore.users[email] = password; 
  return true;
}

export const logUser = (email, password) => {
  const emailList = dataStore["users"];
  if (email in emailList && password === emailList[email]) {
    return true;
  }
  return false;
}

export const addUserDetails = (email, details) => {
  dataStore.userdetails[email] = details;
}

export const getUserDetails = (email) => {
  return dataStore.userdetails[email];
}