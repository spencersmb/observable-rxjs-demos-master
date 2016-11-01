var Observable_1 = require('rxjs/Observable');
require('rxjs/Rx');
console.clear();
var promise = new Promise(function (resolve) {
    setTimeout(function () {
        resolve('promise timeout');
    }, 2000);
});
promise.then(function (value) { return console.log(value); });
var stream1$ = new Observable_1.Observable(function (observer) {
    var timeout = setTimeout(function () {
        observer.next('observable timeout');
    }, 2000);
    return function () {
        clearTimeout(timeout);
    };
});
var disposable = stream1$.subscribe(function (value) { return console.log(value); });
setTimeout(function () {
    disposable.unsubscribe();
}, 1000);
var stream2$ = new Observable_1.Observable(function (observer) {
    var count = 0;
    var interval = setInterval(function () {
        observer.next(count++);
    }, 1000);
    return function () {
        clearInterval(interval);
    };
});
var incrementBtn = document.getElementById('increment');
var decrementBtn = document.getElementById('decrement');
var counter = document.getElementById('counter');
var incrementClick$ = Observable_1.Observable.fromEvent(incrementBtn, 'click');
var decrementClick$ = Observable_1.Observable.fromEvent(decrementBtn, 'click');
var clicks$ = Observable_1.Observable
    .merge(incrementClick$, decrementClick$)
    .map(function (event) { return parseInt(event.target.value, 10); });
var total$ = clicks$
    .scan(function (total, value) { return total + value; }, 0);
total$.subscribe(function (total) {
    counter.innerText = total.toString();
});
