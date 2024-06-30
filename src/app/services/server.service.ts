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

  /* BehaviorSubject is is a type of subject provided by RxJS library.
  A Subject in RxJS is a special type of observable that allows values to be multicasted to multiple observers.
  This means you can use a Subject to emit values and subscribe to them, enabling communication between different parts of your application.

  A BehaviorSubject is a specific type of Subject.
  When you create a BehaviorSubject, you need to provide an initial value. This value will be emitted immediately to any new subscribers.
  A BehaviorSubject keeps track of the current value. This means that you can always get the last emitted value by accessing the value property of the BehaviorSubject.
  When a new observer subscribes to a BehaviorSubject, it will immediately receive the current value as the first emitted item. This is different from a regular Subject, 
  which only emits values that are emitted after the subscription is made.

  In summary, BehaviorSubject is a powerful tool in RxJS for managing state and ensuring that subscribers always have the latest value.
  It is particularly useful in scenarios where you want to maintain and share state across different parts of an application.
  */ 

  constructor(private http: HttpClient) { 
    this.fetchMessages();
  }

  private fetchMessages(): void {
    this.http.get<Message[]>(this.apiUrl).subscribe(
      (messages: Message[]) => {
        //The next method emits the value to all current subscribers of the BehaviorSubject. 
        //This means that any observers that have subscribed to the BehaviorSubject will receive this new value.
        this.messagesSubject.next(messages);
      },
      (error) => {
        console.error('Error while fetching messages ', error);
      }
    );
  }

  // defines a getter method named messages$ that returns an Observable of an array of Message objects.
  //a getter is a special type of method that allows you to access the value of a property as if it were a simple property, 
  //even though it might involve more complex operations behind the scenes.

  //Return Type : Observable<Message[]>: This specifies the return type of the getter method. In this case, the method returns an Observable that emits arrays of Message objects.
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