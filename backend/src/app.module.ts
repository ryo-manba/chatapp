import { Module } from '@nestjs/common';
// import { ChatGateway } from './chat/chat.gateway';
import { AppController } from './app.controller'
import { AppService } from './app.service';
// import { AlertGateway } from './alert/alert.gateway';
// import { AlertController } from './alert/alert.controller';
// import { WebsocketService } from './websocket/websocket.service';
import { EventsModule } from './events/events.module';


@Module({
  imports: [EventsModule],
  // controllers: [AppController],
  // providers: [ChatGateway, AppService, WebsocketService],
})
export class AppModule {}
