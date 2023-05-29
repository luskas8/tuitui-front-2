export function retriveUserAuthToken() {
  const authToken = localStorage.getItem('X-Auth-Token');

  if (!authToken) {
    return "";
  }

  return authToken;
}

export function retriveUserAuthTokenExpiresIN() {
  const authTokenExpiresIn = localStorage.getItem('X-Auth-Token-Expires-In');
  if (!authTokenExpiresIn) {
    return -1;
  }

  return parseInt(authTokenExpiresIn);
}

export function retriveUserRefreshToken() {
  const refreshToken = localStorage.getItem('X-Auth-RefreshToken');

  if (!refreshToken) {
    return null;
  }

  return refreshToken;
}

export function saveUserAuthTokenV1(token: string) {
  localStorage.setItem('X-Auth-Token', token);
}

export function saveUserAuthTokenV2({ token, refreshToken, expiresIn }: { token: string, refreshToken: string, expiresIn: number}) {
  localStorage.setItem('X-Auth-Token', token);
  localStorage.setItem('X-Auth-Token-Expires-In', expiresIn.toString());
  localStorage.setItem('X-Auth-RefreshToken', refreshToken);
}

export function clearUserAuthTokenV1() {
  localStorage.removeItem('X-Auth-Token');
}

export function clearUserAuthTokenV2() {
  localStorage.removeItem('X-Auth-Token');
  localStorage.removeItem('X-Auth-Token-Expires-In');
  localStorage.removeItem('X-Auth-RefreshToken');
}

export function retriveUserID() {
  const userID = localStorage.getItem('X-User-ID');

  if (!userID) {
    return "";
  }

  return userID;
}

export function saveUserID(userID: string) {
  localStorage.setItem('X-User-ID', userID);
}

export function clearUserID() {
  localStorage.removeItem('X-User-ID');
}

export function expiresInChecker() {
  const expiresIn = retriveUserAuthTokenExpiresIN();
  const now = new Date().getTime();
  const expiresInDate = new Date(expiresIn);
  const expiresInTime = expiresInDate.getTime();

  if (now >= expiresInTime) {
    return true;
  }

  return false;
}
