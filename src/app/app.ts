import { Component } from '@angular/core';
import { TaskBoardComponent } from './components/task-board/task-board';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskBoardComponent],
  template: `<app-task-board></app-task-board>`,
})
export class AppComponent {}
