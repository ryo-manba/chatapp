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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat'
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  Echo(@MessageBody() data: any): void {
    console.log(`Get event: ${data}`);
    this.server.emit('eventsClient', data)
  }
}
