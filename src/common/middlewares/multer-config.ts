import { diskStorage } from 'multer';
export const MulterOptions = {
        limits: {
            fileSize: 10000000000000,
        },
        fileFilter: (req: string, file, cb) => {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                cb(null, true);
            } else {
                cb(null, false);
            }
        },
        storage: diskStorage({
            destination(req: string, file, cb) {
                cb(null, 'photos/');
            },
            filename(req: string, file, cb) {
                const timestamp = new Date().getTime().toString();
                cb(null, `photos${timestamp}.png`);
            },
        }),
};
