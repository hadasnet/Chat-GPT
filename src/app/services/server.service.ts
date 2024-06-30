import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private apiUrl = 'http://localhost:4300/messages'; 
  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) { 
    this.fetchMessages();
  }

  private fetchMessages(): void {
    this.http.get<Message[]>(this.apiUrl).subscribe(
      (messages: Message[]) => {
        this.messagesSubject.next(messages);
      },
      (error) => {
        console.error('Error while fetching messages ', error);
      }
    );
  }

  get messages$(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message).pipe(
      map((newMessage: Message) => {
        const currentMessages = this.messagesSubject.getValue();
        this.messagesSubject.next([...currentMessages, newMessage]);
        return newMessage;
      })
    );
  }

}