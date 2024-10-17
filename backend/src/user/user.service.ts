import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/userDto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async createUser(dto: UserDto): Promise<User | {message: string}>{
        const candidate = await this.prisma.user.findUnique({where: {email: dto.email}})
        if(candidate){
            return {
                message: 'user with this email already exist!'
            }
        }
        const user = await this.prisma.user.create({data: dto})
        return user
    }

    async GetUserById(id: number): Promise<User | {message: string}> {
        const user = await this.prisma.user.findUnique({where: {id}})
        if(!user){
            return {
                message: 'User not found'
            }
        }
        return user
    }

    async updateUserInfo(dto: UserDto, id: number): Promise<{message: string}> {
        const user = await this.prisma.user.findUnique({where: {id}})
        if(!user){
            return {
                message: 'User not found'
            }
        }
        await this.prisma.user.update({where: {id}, data: {...dto}})
        return {
            message: 'User was updated'
        }
    }
}
