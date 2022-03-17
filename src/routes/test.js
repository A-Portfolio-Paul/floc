// JAVASCRIPT SCRATCHPAD (Import from API)
function doJob(x,sec) {
    return new Promise(resolve => {
    console.log('Start: ' + x);
      setTimeout(() => {
          console.log('End: ' + x);
        resolve(x);
      }, sec *1000);
    });
  }
  // 1. run in parralell
  doJob('parralell 1',1)
  doJob('parralell 2',1)
  
  // 2. run in sequence (After parralell run)
  async function runSeries(){
    await doJob(1,1);
    await doJob(2,1);
    await doJob(3,1);
  }
  setTimeout(() => console.log('_______________________'),2999)
  setTimeout(() => runSeries(),3000)
  
  // 3. run in sequence and use outputs
  async function runSeriesOutput(){
    let result1 = await doJob(1,1);
    let result2 = await doJob(2,1);
    let result3 = await doJob(3,1);
    let finalResult = result1+result2+result3;
    console.log('Sum of results:',finalResult);
  return finalResult;
  }
  setTimeout(() => console.log('_______________________'),5999)
  setTimeout(() => runSeriesOutput(),6000)
  