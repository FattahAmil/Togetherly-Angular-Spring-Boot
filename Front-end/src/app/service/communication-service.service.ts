import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceService {
  private triggerFunctionSource = new Subject<void>();
  private triggerFunctionSource2 = new Subject<void>();
  private triggerFunctionSource3 = new Subject<void>();

  triggerFunction$ = this.triggerFunctionSource.asObservable();
  triggerFunction2$=this.triggerFunctionSource2.asObservable();
  triggerFunction3$=this.triggerFunctionSource3.asObservable();
  triggerFunction2(){
    this.triggerFunctionSource2.next();
  }
  triggerFunction3(){
    this.triggerFunctionSource3.next();
  }
  triggerFunction() {
    this.triggerFunctionSource.next();

  }
}
