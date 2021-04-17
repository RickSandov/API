module.exports = (err, req, res, next) => {
  if (req.headersSent) return next(err);

  console.log(err);

  if (err.name === 'MongoError') {
    return res.status(500).json({
      status: 'DATABASE_ERROR',
      message: err.message || 'ERROR IN DATABASE',
      err,
    });
  }

  return res.status(500).json({
    status: 'SERVER_ERROR',
    message: err.message || 'ERROR IN SERVER',
    err,
  });
};
