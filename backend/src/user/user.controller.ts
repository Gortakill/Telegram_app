import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/userDto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    createUser(@Body() dto: UserDto){
        return this.userService.createUser(dto)
    }

    @Get(':id')
    getUserById(@Query('id') id: number){
        return  this.userService.GetUserById(Number(id))
    }

    @Patch('/update/:id')
    updateUserInfo(@Body() dto: UserDto, @Param('id') id: number){
        return this.userService.updateUserInfo(dto, Number(id))
    }
}
