import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from 'models/user';
import { Primary_Folder } from 'models/primary_folder';
import { Secondary_Folder } from 'models/secondary_folder';
import { Tertiary_Folder } from 'models/tertiary_folder';
import { Request_Details } from 'models/request_details';

import { AuthService } from 'middleware/bcrypt_setup';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 1501,
      username: 'postgres',
      password: 'qwerty78',
      database: 'rest',
      entities: [Users, Primary_Folder, Secondary_Folder, Tertiary_Folder, Request_Details],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
