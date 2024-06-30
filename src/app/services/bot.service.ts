import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  private responses = [
    "I'm not sure how to respond to that.",
    "Can you please clarify?",
    "Sorry, I didn't get that. Can you rephrase?",
    "I'm here to help, but I need more information.",
    "Could you provide more details, please?"
  ];

  constructor() { }

  getFallbackResponse(): string {
    let index = Math.floor(Math.random() * this.responses.length);
    return this.responses[index];
  }

}
