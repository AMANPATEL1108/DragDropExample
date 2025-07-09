import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface TaskList {
  name: string;
  tasks: string[];
}

interface TaskJson {
  taskLists: TaskList[];
}

/* ------------------------------------------------------------------ */
/*  Hard‑coded fallback shown only if JSON fails to load              */
/* ------------------------------------------------------------------ */

const FALLBACK_TASKS: TaskList[] = [
  {
    name: 'Task Menu',
    tasks: ['Example task 1', 'Example task 2', 'Example task 3'],
  },
  {
    name: 'In Progress',
    tasks: ['Drag me somewhere!'],
  },
  {
    name: 'Done',
    tasks: ['This is a fallback board'],
  },
];

/* ------------------------------------------------------------------ */
/*  Service                                                           */
/* ------------------------------------------------------------------ */

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  /**
   * Loads the board from assets/tasks.json.
   * If the file is missing or invalid, console‑logs the error
   * and returns a small in‑memory board so the UI never goes blank.
   */
  load(): Observable<TaskList[]> {
    return this.http.get<TaskJson>('assets/tasks.json').pipe(
      map((res) => res.taskLists),
      catchError((err) => {
        console.error('[TaskService] Could not load assets/tasks.json:', err);
        return of(FALLBACK_TASKS);
      })
    );
  }
}
