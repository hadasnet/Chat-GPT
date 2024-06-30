import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.interface';
import { ServerService } from '../services/server.service';


@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {
  messages: Message[] = [];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }


}