import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { DedicatedWorkerComponent } from "./pages/dedicated-worker/dedicated-worker.component";
import { DeleteTodoComponent } from "./pages/delete-todo/delete-todo.component";
import { SharedWorkerComponent } from "./pages/shared-worker/shared-worker.component";

const routes: Routes = [
  {
    path: '',
    component: DedicatedWorkerComponent
  },
  {
    path: 'shared-worker',
    component: SharedWorkerComponent
  }, 
  {
    path: 'delete-todo',
    component: DeleteTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
