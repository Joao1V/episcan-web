export function fakeApi(response, shouldFail = false, delay = 1000) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (shouldFail) {
            reject(new Error('Something went wrong!'));
         } else {
            resolve(response);
         }
      }, delay);
   });
}
