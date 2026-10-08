export const captureClientInfo = (req, res, next) => {
  req.clientInfo = {
    ip:
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    device: req.headers["user-agent"],
  };
  next();
};
