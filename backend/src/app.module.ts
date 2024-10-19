import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './user/user.module';
import { isExist } from './middlewares/isExist.middleware';
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TelegramModule,
    UserModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isExist)
      .forRoutes('user')
  }
}
