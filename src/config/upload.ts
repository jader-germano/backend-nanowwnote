import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const temFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: temFolder,
    storage: multer.diskStorage({
        destination: temFolder,
        filename(req, file, callback) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const fileHash = crypto.randomBytes(10).toString('HEX');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
