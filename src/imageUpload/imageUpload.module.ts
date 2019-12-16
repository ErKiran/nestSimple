import { Module } from '@nestjs/common';
import { ImageUploadController } from './imageUpload.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule,
    ],
    controllers: [ImageUploadController],
})
export class ImageUploadModule { }
