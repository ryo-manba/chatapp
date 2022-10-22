import { Module } from '@nestjs/common';
import { AppController } from './app.controller'
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { PrismaService } from './prisma.service';


@Module({
  imports: [ChatModule],
  // controllers: [AppController],
  // providers: [AppService],
  providers: [PrismaService]
})
export class AppModule {}
