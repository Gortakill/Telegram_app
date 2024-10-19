import { BadRequestException, HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express'
import { PrismaService } from "src/prisma.service";

@Injectable()
export class isExist implements NestMiddleware{
    constructor(private prisma: PrismaService){}

    async use(req: Request, res: Response, next: NextFunction) {
        try{
            if(req.baseUrl === '/user'){
                const userId = Number(req.query.id)

                if(Number.isNaN(userId)){
                    throw new BadRequestException('Invalid user ID')
                }
                const user = await this.prisma.user.findUnique({where: {id: userId}})
                if(!user){
                    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
                }
                next()
            }else{
                next()
            }
        }catch(err){
            console.log(err)
        }
    }
}