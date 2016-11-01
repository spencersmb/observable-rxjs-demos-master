import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

console.clear();

//#region Example 1
let promise = new Promise(resolve => {
    setTimeout(() => {
        resolve('promise timeout');
    }, 2000)
});

promise.then(value => console.log(value));

//example 1 - basic observable = obsrevables end in a dollar sign
let stream1$ = new Observable(observer => {
    let timeout = setTimeout(() => {
        //emit the value
        observer.next('observable timeout');
    }, 2000);

    //this function is called when the observable is canceled
    return () => {
        clearTimeout(timeout);
    }
});

//this defines a variable that lets us unsusbribe in the future
let disposable = stream1$.subscribe(value => console.log(value));

//setTimeout(() => {
//    disposable.unsubscribe();
//}, 1000);
//#endregion

//#region Example 2
//emit a value every sec
let stream2$ = new Observable(observer => {
    let count = 0;
    let interval = setInterval(() => {
        observer.next(count++);
    }, 1000);

    //clean up and end interval
    return () => {
        clearInterval(interval);
    }
});

// stream2$
//   .filter(value => value % 2 == 0)
//   .subscribe(value => console.log(value));

// ----1----2----3----4--->
//          filter
// ---------2---------4--->

// stream2$
//   .map(value => value * value)
//   .subscribe(value => console.log(value));
  
// ----1----2----3----4--->
//      map => x * x
// ----1----4----9----16--->
//#endregion

//#region Example 3
let incrementBtn = document.getElementById('increment');
let decrementBtn = document.getElementById('decrement');
let counter = document.getElementById('counter');

let incrementClick$ = Observable.fromEvent(incrementBtn, 'click');
let decrementClick$ = Observable.fromEvent(decrementBtn, 'click');

let clicks$ = Observable
    .merge(incrementClick$, decrementClick$)
    .map((event: any) => {
        console.log(event);
        return parseInt(event.target.value, 10);
    });

// similar to reduce - emits a new value as they come in
//scan takes in one value and converts it to a total so we can continually add items in the return statement
let total$ = clicks$
    .scan((total, value) => total + value, 0);

//finally subscribe to the total event which is really the scan method applied to the click observable
total$.subscribe(total => {
    counter.innerText = total.toString();
});

// ----i------------------>
// -------d---------d----->
//          merge
// ----i--d---------d----->
//           map
// ----p--n---------n----->
//           scan
// 0---1--0-------(-1)---->
//#endregion