import { Component } from '@angular/core';
import { Message } from '../models/message.interface';
import { ServerService } from '../services/server.service';
import { BotService } from '../services/bot.service';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {
  newMessage: string = '';

  constructor(private serverService: ServerService, private botService: BotService) {}
  
  sendMessage() {
    if (this.newMessage.trim() === '') {
      return; 
    }
    const message: Message = {
      sender: 'User',
      content: this.newMessage.trim(),
      timestamp: new Date()
    };
    this.serverService.sendMessage(message).subscribe(() => {
      this.newMessage = '';
      this.addBotResponse();
    });
  }

  
  addBotResponse() {
    const botResponse = this.botService.getFallbackResponse();
    const botMessage: Message = {
      sender: 'Bot',
      content: botResponse,
      timestamp: new Date()
    };

    setTimeout(() => {
      this.serverService.sendMessage(botMessage).subscribe(() => {
      });
    }, 2000); 
  }
  

}
