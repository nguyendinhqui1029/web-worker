import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedWorkerService {
  worker: SharedWorker;
  public shareTodoList = new Subject<{ id: number, value: string }[]>();

  constructor() {
    this.worker = new SharedWorker(
      new URL('../worker-shared.worker', import.meta.url)
    );

    this.worker.port.onmessage = ({ data }) => {
      this.shareTodoList.next(data);
    };
  }

  addTodoList(value: string) {
    this.worker.port.postMessage({type:'addTodo', value});
  }

  deleteTodoList(id: number) {
    this.worker.port.postMessage({type:'deleteTodo', value: id});
  }
}
