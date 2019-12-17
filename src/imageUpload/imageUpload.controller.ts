import { Post, UseInterceptors, UploadedFile, Controller, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { dynamicFileName, jpgFileFilter } from './utils/imageUpload.helper';

@Controller()
@UseGuards(AuthGuard())
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
            if (!file) {
                throw new InternalServerErrorException(`Cann't upload the file`);
            }
            return file;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
