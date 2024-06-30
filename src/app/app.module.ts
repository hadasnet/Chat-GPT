import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { ServerService } from './services/server.service';
import { BotService } from './services/bot.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatBoxComponent,
    ChatAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [ServerService, BotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
