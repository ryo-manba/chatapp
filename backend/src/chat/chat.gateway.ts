import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  Prisma
} from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ChatService } from './chat.service';
import { ChatRoom as ChatRoomModel} from '@prisma/client';

type Message = {
  message: string;
  userID: number;
  roomID: number;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat'
})
export class ChatGateway {
  constructor(
    // private prisma: PrismaService
    private readonly chatService: ChatService
    ) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');


  @SubscribeMessage('message')
  Echo(@MessageBody() data: any): void {
    this.logger.log(`get message: ${data}`);
    this.server.emit('receiveClient', data)
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() body: Message) {
    // const message = await this.chatService.
  }

  @SubscribeMessage('joinedRoom')
  JoinRoom(@MessageBody() data: any): void {
    this.logger.log(`get joinedRoom: ${data}`)
    // そのuserだけに対してデータすべてのデータを送り返す
  }

  @SubscribeMessage('createRoom')
  CreateRoom(@MessageBody() data: any):  Promise<ChatRoomModel>  {
    this.logger.log(`get createRoom: ${data}`)
    return this.chatService.createChatRoom(data)
  }
}
