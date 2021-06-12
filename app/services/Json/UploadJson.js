import multer from 'multer';

const jsonFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("json") 
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'uploads/json');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var uploadJsonFile = multer({ storage: storage, fileFilter: jsonFilter });
export { uploadJsonFile };
