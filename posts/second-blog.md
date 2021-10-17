---
title: 'Some things about js promises'
date: '2021-10-01'
---

# promises

## what is promis

a declaration or assurance that one will do something or that a particular thing will happen.

## promise in the programming world

* a declaration or assurance that one will do something or that a particular thing will happen.

* Promises are objects that represent the outcome of an event that may not yet have occurred. They store information about whether the event has occurred yet, and if so, what its outcome was.

* Promises are created and then returned by the function that initiated the asynchronous operation. When a relevant event occurs, the operation will store its result on the promise, which in turn can notify any success or failure handlers.

* Promises don’t handle anything by default, but success and failure handlers are attached later.

* Promises can only represent one event - they are either successful once or failed once.

## making promises

``` javascript 
let promise = new Promise(() => {});
```

* When you call new Promise, the browser will immediately call the function that you passed in — sometimes called the executor function. This function’s purpose is to start some asynchronous operation, like a timer or HTTP request, and then to notify the browser once the operation has resolved (aka successfully completed), or been rejected (aka failed).

* In order to notify the browser, the executor function receives two arguments. These arguments are themselves callable functions, typically named resolve and reject. Here’s how they work:

  * Calling resolve(value) will mark the promise as resolved and cause any success handlers to be run.

  * Calling reject(error) will cause any failure handler to be run.


## Promis states

* pending: initial state, neither fulfilled nor rejected.

* fulfilled: meaning that the operation was completed successfully.

* rejected: meaning that the operation failed.

## Delay promises

One of the most useful types of promises that you can create is what I call a **delay** promise: a promise that resolves after a certain time has passed. To create a delay promise, you’ll need to call the executor function’s `resolve` argument after the desired delay. One way to do this is with `setTimeout()`:


``` javascript
 function delay(interval) {return new Promise(resolve => { setTimeout(resolve, interval)})}
 ```

Let’s say that you need to run some function in 1000ms from now. While you **could** pass a callback to `setTimeout()`, another approach is to create and use a delay promise:

``` javascript
let promiseThatResolvesInOneSecond = delay(1000)
```

## The then method

JavaScript promises are objects that represent the outcome of an event that may not yet have occured. Because of this, you can’t just access the event’s outcome through a property like promise.outcome. Instead, you’ll need to register a callback to handle the outcome once it becomes available, using the promise’s then() method.

There are three different ways that you can use promise.then().

```javascript
 promise.then(value => {console.log(value)});
  ```

``` javascript
 promise.then(null, error => {console.log(error)});
  ```

``` javascript
 promise.then(value,error => { console.log(value) },error => { console.log(error) })
  ```


## Rejecting 

```javascript
 Promise.reject(value)
  ```

This function is like Promise.resolve(value), but instead of returning a resolved promise, it returns a rejected one.

Here’s how you’d implement it with new Promise()

``` javascript
function reject(value) {return new Promise((resolve, reject) => reject(value))}
```

## The .catch() Promise Handler

You can use this handler method to handle errors (rejections) from promises. As we discussed already, it is a much better syntax to handle the error situation than handling it using the .then() method.

``` javascript

let promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
      reject(new Error('error happened'));
  }, 2000);
});

const promise1 = () => {
  promise.catch(function(error) {
    console.error(`OMG ${error.message}`);
  });
}
```

* We use the reject method in the above code to reject the promise.

* You can pass any type of argument to the reject method like the resolve method. However, it is recommended to use the Error objects. We will discuss it in detail in the future article on error handling with promise.

* We use the .catch() handler to handle the rejection. In the real world, you will have both .then() and .catch() methods to handle the resolve and reject scenarios.


## The .finally() Promise Handler

The .finally() handler method performs cleanups like stopping a loader, closing a live connection, and so on. Irrespective of whether a promise resolves or rejects, the .finally() method will be called.

``` javascript 
let loading = true;
loading && console.log('Loading...');

promise = getPromise();

promise.finally(() => {
    loading = false;
    console.log(`Promise Settled and loading is ${loading}`);
}).then((result) => {
    console.log({result});
});

```
the .finally() method passes through the result or error to the next handler, which can call a .then() or .catch() again.


