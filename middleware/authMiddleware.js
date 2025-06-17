// Checks if request has valid admin token
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next(); // move to next middleware or route handler
};
