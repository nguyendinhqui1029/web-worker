import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedWorkerService } from '../../services/shared-worker.service';

@Component({
  selector: 'delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss']
})
export class DeleteTodoComponent implements OnInit {
  todoList: { id: number, value: string }[] = [];
  constructor(private sharedWorkerService: SharedWorkerService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sharedWorkerService.addTodoList('');
    this.sharedWorkerService.shareTodoList.subscribe(todoListFromShareWorker => {
      this.todoList = todoListFromShareWorker;
      this.changeDetectorRef.detectChanges();
    })
  }

  deleteTodo(id: number) {
    this.sharedWorkerService.deleteTodoList(id);
  }
}
