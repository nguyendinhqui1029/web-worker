import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedWorkerService } from '../../services/shared-worker.service';

@Component({
  selector: 'shared-worker',
  templateUrl: './shared-worker.component.html',
  styleUrls: ['./shared-worker.component.scss']
})
export class SharedWorkerComponent implements OnInit {
  task: string = '';
  todoList: { id: number, value: string }[] = [];
  constructor(private sharedWorkerService: SharedWorkerService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sharedWorkerService.shareTodoList.subscribe(todoListFromShareWorker => {
      this.todoList = todoListFromShareWorker;
      this.changeDetectorRef.detectChanges();
    })
  }

  addTodo() {
    this.sharedWorkerService.addTodoList(this.task);
  }

  navigateToDeletePage() {
    window.open('/delete-todo','_blank');
  }
}
