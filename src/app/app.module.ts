import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DedicatedWorkerComponent } from './pages/dedicated-worker/dedicated-worker.component';
import { DeleteTodoComponent } from './pages/delete-todo/delete-todo.component';
import { SharedWorkerComponent } from './pages/shared-worker/shared-worker.component';
import { SharedWorkerService } from './services/shared-worker.service';

@NgModule({
  declarations: [
    AppComponent,
    DedicatedWorkerComponent,
    SharedWorkerComponent,
    DeleteTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [SharedWorkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
