import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized, JWT token is required' });

  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, JWT token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.userId, email: decoded.email };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized, JWT token has expired' });
    }
    return res.status(401).json({ message: 'Unauthorized, JWT token is invalid' });

  }
};

export default ensureAuthenticated;
