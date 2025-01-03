import jwt from "jsonwebtoken"


export const generateToken = ({ payload={}, signature, options={} } = {}) => {
  const token = jwt.sign(payload, signature, options);
  return token;
};

export const verifyToken = ({ token={}, signature } = {}) => {
  const decodedToken = jwt.verify(token, signature);
  return decodedToken;
};