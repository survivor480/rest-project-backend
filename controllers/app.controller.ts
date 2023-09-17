import { Controller, Get, Res, Req, Post, Put, Delete, Patch, Head } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConnectionPoint } from 'models/connection';
import { Users } from 'models/user';
import { AuthService } from 'middleware/bcrypt_setup';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async registerUser(@Req() req: Request, @Res() res: Response) {
    console.log("Register User Called", req)

    const body = req.body;


    const newUser = new Users();
    newUser.fullname = body.fullname;
    newUser.username = body.username;
    newUser.password = await this.authService.hashPassword(body.password);
    newUser.phone_number = body.phone_number;

    // Date Creation Logic
    const dateParts = body.date_of_birth.split('-');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are 0-based in JavaScript Date
    const year = parseInt(dateParts[2]);

    newUser.date_of_birth = new Date(year, month, day);

    await ConnectionPoint.manager.save(newUser);

    const data = { status: 'success', message: 'User Account Created Successfully'};
    res.status(200).json(data);
  }


  @Post('login')
  async loginUser(@Req() req: Request, @Res() res: Response) {
    const body = req.body;

    const loginUser = body.fullname;
    const password = body.password;

    
  }
}
