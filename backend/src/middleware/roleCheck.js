exports.isTrainer = (req, res, next) => {
  if (req.user.role !== 'trainer') {
    return res.status(403).json({ message: 'Access denied. Trainers only.' });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

exports.isClient = (req, res, next) => {
  if (req.user.role !== 'client') {
    return res.status(403).json({ message: 'Access denied. Clients only.' });
  }
  next();
}; 