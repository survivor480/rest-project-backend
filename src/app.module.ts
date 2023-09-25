import { Module } from '@nestjs/common';
import { AppController } from '../controllers/user.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { Users } from 'models/user';
import { Primary_Folder } from 'models/primary_folder';
import { Secondary_Folder } from 'models/secondary_folder';
import { Tertiary_Folder } from 'models/tertiary_folder';
import { Request_Details } from 'models/request_details';

import { AuthService } from 'middleware/bcrypt_setup';
import { JwtMiddleWareService } from 'middleware/auth.service';
import { PrimaryFolderController } from 'controllers/primaryFolder.controller';
import { SecondaryFolderController } from 'controllers/secondaryFolder.controller';
import { TertiaryFolderController } from 'controllers/tertiaryFolder.controller';
import { RequestDetailsController } from 'controllers/requestDetails.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestBodySchema } from 'models/request_body';
import { RequestBodyService } from 'middleware/request_body.injectable';
import { WorkspaceController } from 'controllers/workspace.controller';
import { Workspace } from 'models/workspace';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.1',
      port: 3301,
      username: 'rest',
      password: 'qwerty78',
      database: 'rest',
      entities: [Users, Primary_Folder, Secondary_Folder, Tertiary_Folder, Request_Details, Workspace],
      synchronize: true
    }),
    JwtModule.register({
      global: true,
      secret: 'Just a testing server secret',
      signOptions: { expiresIn: '2592000s' }
    }),
    MongooseModule.forRoot('mongodb://rest:qwerty78@172.17.0.1:3302/rest'),
    MongooseModule.forFeature([{name: 'RequestBody', schema: RequestBodySchema}])
  ],
  controllers: [AppController, PrimaryFolderController, SecondaryFolderController, TertiaryFolderController, RequestDetailsController,
    WorkspaceController],
  providers: [AppService, AuthService, JwtMiddleWareService, RequestBodyService],
})
export class AppModule {}
