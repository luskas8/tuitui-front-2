function retriveUserAuthToken() {
  const authToken = localStorage.getItem('X-Auth-Token');

  if (!authToken) {
    return null;
  }

  return authToken;
}

function retriveUserAuthTokenExpiresIN() {
  const authTokenExpiresIn = localStorage.getItem('X-Auth-Token-Expires-In');
  if (!authTokenExpiresIn) {
    return -1;
  }

  return parseInt(authTokenExpiresIn);
}

function retriveUserRefreshToken() {
  const refreshToken = localStorage.getItem('X-Auth-RefreshToken');

  if (!refreshToken) {
    return null;
  }

  return refreshToken;
}

function saveUserAuthTokenV1(token: string) {
  localStorage.setItem('X-Auth-Token', token);
}

function saveUserAuthTokenV2({ token, refreshToken, expiresIn }: { token: string, refreshToken: string, expiresIn: number}) {
  localStorage.setItem('X-Auth-Token', token);
  localStorage.setItem('X-Auth-Token-Expires-In', expiresIn.toString());
  localStorage.setItem('X-Auth-RefreshToken', refreshToken);
}

function clearUserAuthTokenV1() {
  localStorage.removeItem('X-Auth-Token');
}

function clearUserAuthTokenV2() {
  localStorage.removeItem('X-Auth-Token');
  localStorage.removeItem('X-Auth-Token-Expires-In');
  localStorage.removeItem('X-Auth-RefreshToken');
}

function retriveUserID() {
  const userID = localStorage.getItem('X-User-ID');

  if (!userID) {
    return null;
  }

  return userID;
}

function saveUserID(userID: string) {
  localStorage.setItem('X-User-ID', userID);
}

function clearUserID() {
  localStorage.removeItem('X-User-ID');
}

function expiresInChecker() {
  const expiresIn = retriveUserAuthTokenExpiresIN();
  const now = new Date().getTime();
  const expiresInDate = new Date(expiresIn);
  const expiresInTime = expiresInDate.getTime();

  if (now >= expiresInTime) {
    return true;
  }

  return false;
}
