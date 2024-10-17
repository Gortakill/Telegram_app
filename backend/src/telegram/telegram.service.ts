import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext

@Update()
export class TelegramService extends Telegraf<Context> {
    @Start()
    onStart(@Ctx() ctx:Context) {
        ctx.reply(`Привіт ${ctx.from.username} це телеграм бот магазину Dumky Store`)
    }
    @On('text')
    onMessage(@Message('text') message: string, @Ctx() ctx: Context){
        ctx.replyWithHTML('<i>Hello</i>')
    }
}
