import { EventEmitter } from 'events';

export abstract class ForkClient extends EventEmitter {
  static ID: string;

  //   returns value for process.env.FORK
  get id() {
    return ForkClient.ID;
  }
  protected constructor() {
    super();
  }
}
