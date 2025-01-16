import { NextFunction, Request, Response } from 'express';
import * as multer from 'multer';

export const Upload = (fileName: string) => {
  const storage = multer.diskStorage({
    destination: function (req, res, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      const unixSuffix = Date.now();
      callback(null, file.fieldname + '-' + unixSuffix + '.jpg');
    },
  });

  const uploadFile = multer({ storage: storage });
  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fileName)(req, res, function (err) {
      if (err) {
        return res.status(400).json({ error: err });
      }
      if (!req.file) {
        return next(); // Skip the upload and move to the next middleware
      }
      //res.locals.filename => filename ny bebas mw apa aja
      res.locals.filename = req.file.filename;
      next();
    });
  };
};
