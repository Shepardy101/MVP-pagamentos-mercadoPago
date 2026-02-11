export default (err, req, res, next) => {
  res.status(err.response?.status || 500).json({
    error: err.message,
    details: err.response?.data || null
  });
};
