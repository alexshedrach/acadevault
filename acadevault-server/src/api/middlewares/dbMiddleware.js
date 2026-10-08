import mongoose from 'mongoose';

const isDBConnected = () => mongoose.connection.readyState === 1;

export const checkConnection = (req, res, next) => {
  if (!isDBConnected) {
    return res.status(501).json({
      error: 'Service Unavailable: Database is currently offline.',
    });
  }
  next();
};
