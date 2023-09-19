import { Controller, Res, Req, Post} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConnectionPoint } from 'models/connection';
import { Users } from 'models/user';
import { AuthService } from 'middleware/bcrypt_setup';
import { JwtMiddleWareService } from 'middleware/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtMiddlewareService: JwtMiddleWareService
  ) {}

  @Post('/signup')
  async registerUser(@Req() req: Request, @Res() res: Response) {
    console.log("Register User function called");

    const body = req.body;

    const newUser = new Users();
    newUser.fullname = body.fullname;
    newUser.username = body.username;
    newUser.password = await this.authService.hashPassword(body.password);
    newUser.phone_number = body.phone_number;
    newUser.email = body.email;

    let user_instance = await ConnectionPoint.manager.findBy(Users, [{
      username: newUser.username
    }]);

    if(user_instance.length !== 0){
      return res.status(400).json({
        status: 'failed',
        message: 'Username already exists'
      })
    }

    user_instance = await ConnectionPoint.manager.findBy(Users, [{
      email: newUser.email
    }]);

    if(user_instance.length !== 0){
      return res.status(400).json({
        status: 'failed',
        message: 'Email already registered'
      })
    }

    // Date Creation Logic
    const dateParts = body.date_of_birth.split('-');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are 0-based in JavaScript Date
    const year = parseInt(dateParts[2]);

    newUser.date_of_birth = new Date(year, month, day);

    await ConnectionPoint.manager.save(newUser);

    res.status(200).json({
      status: 'success',
      message: 'Data Registration Successful'
    });
  }


  @Post('login')
  async loginUser(@Req() req: Request, @Res() res: Response) {
    const body = req.body;

    const loginUser = body.username;
    const password = body.password;

    let user_instance = await ConnectionPoint.manager.findBy(Users, [{
      username: loginUser
    }, {
      email: loginUser
    }]);

    if(user_instance.length === 0){
      return res.status(400).json({
        status: 'failed',
        message: 'No user with the given credentials exists. Please register first'
      })
    }

    if(await this.authService.comparePasswords(password, user_instance[0].password) === true){
      const access_token = await this.jwtMiddlewareService.signIn(user_instance[0].username);
      return res.status(200).json({
        status: 'success',
        data: user_instance,
        access_token: access_token.access_token
      })
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid username password combination'
      })
    }    
  }
}
