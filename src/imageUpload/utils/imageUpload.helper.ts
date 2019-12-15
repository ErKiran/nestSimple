import { extname } from 'path';

export const jpgFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg)$/)) {
        return callback(new Error('Only image files with .jpg exension are allowed!'), false);
    }
    callback(null, true);
};

export const dynamicFileName = (req, file, callback) => {
    const orginalName = file.originalname.split('.')[0];
    const fileExtension = extname(file.originalname);
    const dynamicString = Math.random().toString(36).substring(7);
    callback(null, `${orginalName}-${dynamicString}${fileExtension}`);
};
