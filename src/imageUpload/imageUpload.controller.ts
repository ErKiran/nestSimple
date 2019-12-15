import { Post, UseInterceptors, UploadedFile, Controller, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { dynamicFileName, jpgFileFilter } from './utils/imageUpload.helper';

@Controller()
export class ImageUploadController {
    @Post('images')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: dynamicFileName,
        }),
        fileFilter: jpgFileFilter,
    }))
    async uploadFile(@UploadedFile() file) {
        try {
            return file;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
