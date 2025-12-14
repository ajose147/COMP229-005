// Simple auth helper for frontend
export const authenticate = (data, cb) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
  }
  cb();
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  const jwt = localStorage.getItem('jwt');
  return jwt ? JSON.parse(jwt) : false;
};

export const signout = (cb) => {
  if (typeof window !== 'undefined') localStorage.removeItem('jwt');
  fetch('/auth/signout')
    .then(() => cb())
    .catch(() => cb());
};

export const getToken = () => {
  const jwt = isAuthenticated();
  return jwt ? jwt.token : null;
};

export default { authenticate, isAuthenticated, signout, getToken };
