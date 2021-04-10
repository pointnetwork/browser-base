import { EventEmitter } from 'events';

export abstract class ForkClient extends EventEmitter {
  protected constructor() {
    super();
  }
}
