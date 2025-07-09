import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ⬅️ NEW
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskList, TaskService } from '../../service/task';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, DragDropModule], // ⬅️ include CommonModule
  templateUrl: './task-board.html',
  styleUrls: ['./task-board.css'],
})
export class TaskBoardComponent implements OnInit {
  lists: TaskList[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.load().subscribe((data) => (this.lists = data));
  }

  connectedTo(index: number): string[] {
    return this.lists
      .map((_, idx) => `list-${idx}`)
      .filter((_, idx) => idx !== index);
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
