'use strict'

function createInput(length){
  let input = [];
  for(let i = 0; i < length; i ++){
    input.push(-100+i);
  }
  
  return input;
}

function search(input,target){
  let low = 0;
  let high = input.length-1;
  let mid;
  while(low<=high){
    mid = Math.floor((low+high)/2);
    if(input[mid]==target){
      return mid;
    }else if(input[mid]<target){
      low = mid + 1;
    }else{
      high = mid -1;
    }
  }
  return -1;
}

function generate(testLengthArray){
  let arrayObject = [];
  for (let i = 0; i < testLengthArray.length; i++) {// độ dài input 
    let array = createInput(testLengthArray[i]);
    let target;
    switch(i % 3){
      case 0:
        target = array[array.length - 1];
        break;
      case 1:
        target = 0;
        break;
      case 2:
        target = array[0];
        break;
    }
    
    let result = search(array,target);
    let object = {
      input:array,
      target: target,
      output: result
    }
    arrayObject.push(object);
  }
  return arrayObject;
}

module.exports = generate
