/* ************************ PROMISE IN JS ********************* */
// A Promise is an object that represents the future result of an asynchronous operation
// Normally a JS code is executed synchronously (sequentially), i.e, one after another. Promise is used to make a js code asynchronous
// A promise in js is an object representing the eventual completion or failure of an asynchronous operation
// Used in API calls, file loading, long running tasks scenarios etc. These take time. Promises help handle them cleanly
/* You can create a promise in js using the Promise constructor. It takes a function as an argument, 
which in turn takes two parameters: resolve and reject. Inside this function, you perform your asynchronous operation and call 
resolve() when it's successful or reject() when it's not */

// *****PROMISE IN ACTION*****
var p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("Data from promise")  // either resolve or reject will be printed. Cannot uncomment both together. Try running this line of code after commenting the below line
        reject("Network failed")  // inside resolve or reject, any datatype can be added, not only strings
    }, 3000);
});

// *****CONSUMING A PROMISE*****
// then, catch can be used for this
// In the definition, there will be 2 functions - 1st function will be of success & 2nd function will be of failure
// Below one is a consumer
p.then((data) => {  // resolve will be passed into data (for success case) & reject will go to error (for failure case)
    console.log("Successfully received:", data);
}, (error) => {
    console.log("Received error:", error);
});

// another promise example with object datatype
var y = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: "Dua",
            age: 2
        })
        // reject("Network failed")
    }, 3000);
});

y.then((data) => {
    console.log("Received successfully:", data);
}, (error) => {
    console.log("Error received:", error);
});

// another promise example where 1st function is null as we don't need to know if the promise is succeeded. Success can be ignored. We just want to know whether it got failed
var q = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(5)
        reject(10)
    }, 3000);
});

q.then(null, (error) => {
    console.log("Error received:", error);
});

// instead of using null, we can use below approach to handle errors only
q.catch((error) => {
    console.log("Failed", error);
});

// another example for promise with then, catch & finally
// usually then -> runs when a promise is fulfilled (resolved)
// usually catch -> runs when a promise is rejected
let promise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Data received");
  } else {
    reject("Error occurred");
  }
});

promise
  .then(result => {
    console.log(result); // Data received
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {  // 'finally' will be executed even if it's a success or failure
    console.log("Finally executing");
  });

// another example for promise. There could be 3 scenarios in a promise - pending, success, failed
var r = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     name: "Lora",
        //     company: "JLR"
        // })
        reject("rejected")
    }, 3000);
});
console.log("Promise:", r)  // pending


// below is 1 subsriber
r.then((data) => {
    console.log("Received by consumer 1:", data);
    console.log("Promise success consumer 1:", r);  // success
}, (error) => {
    console.log("Error from consumer 1:", error);
    console.log("Promise failed consumer 1:", r);  // failed
});

// below is another 1 subsriber
r.then((response) => {
    console.log("Consumer 2 response:", response)
}, (err) => {
    console.log("Consumer 2 error:", err)
});

// more details added in practice5_promise.html