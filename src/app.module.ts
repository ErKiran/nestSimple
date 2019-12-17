import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './auth/config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ImageUploadModule } from './imageUpload/imageUpload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ImageUploadModule,
  ],
})
export class AppModule { }
