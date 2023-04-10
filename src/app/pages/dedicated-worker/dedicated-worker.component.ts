import { CalculateHelper } from './../../helper/calculate.helper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dedicated-worker',
  templateUrl: './dedicated-worker.component.html',
  styleUrls: ['./dedicated-worker.component.scss'],
})
export class DedicatedWorkerComponent implements OnInit {
  worker!: Worker;
  dedicatedWorkerResult: { taskName: string; value: any }[] = [];
  noneDedicatedWorkerResult: { taskName: string; value: any }[] = [];
  number!: number;
  constructor() {}
  ngOnInit(): void {
    this.dedicatedWorkerInit();
  }

  dedicatedWorkerInit() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../../app.worker', import.meta.url));
      this.worker.addEventListener('message', ({ data }) => {
        this.dedicatedWorkerResult.push({
          taskName: 'Calculate number dedicated worker:',
          value: data,
        });
      });

      this.worker.onerror = (error) => {
        this.dedicatedWorkerResult.push({
          taskName: 'Task From Dedicated Worker:',
          value: error,
        });
      };
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  runTask() {
    this.dedicatedWorkerResult = [];
    this.noneDedicatedWorkerResult = [];
    this.renderFormOneToNumber(this.number, `Render from 1 to ${this.number}: `);
    this.renderFormOneToNumberUseDedicatedWorker(
      this.number,
      `Render from 1 to ${this.number}`
    );
  }

  async renderFormOneToNumberUseDedicatedWorker(
    number: number,
    taskName: string
  ) {
    this.worker.postMessage({ eventName: 'calculate', number });
    for (let index = 1; index <= number; index++) {
      await CalculateHelper.customDelay(1000);
      this.dedicatedWorkerResult.push({ taskName: taskName, value: index });
    }
  }

  async renderFormOneToNumber(number: number, taskName: string) {
    this.noneDedicatedWorkerResult.push({
      taskName: 'Calculate number none dedicated worker: ',
      value: await CalculateHelper.doubleNumber(number),
    });
    for (let index = 1; index <= number; index++) {
      await CalculateHelper.customDelay(1000);
      this.noneDedicatedWorkerResult.push({ taskName: taskName, value: index });
    }
  }
}
