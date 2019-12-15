import { Module } from '@nestjs/common';
import { ImageUploadController } from './imageUpload.controller';

@Module({
    imports: [],
    controllers: [ImageUploadController],
})
export class ImageUploadModule { }
