import { join } from "path";

import { Lang,cnrelate } from "../../src/utils/Searcher/OriginalData";
import {command,mergetable,mergesubset,relatesequence } from "./DataTransform";
import { generator } from "../../src/utils/Searcher/Generator";


// 中文与英文排列顺序应保持着相同顺序
// 使用多个有序数组拼接成一个大数组来保证单独的稳定
// 对于动词与主体也要做区分与信息提取，动词与主体使用空格分割
// movtion + object = Command
// 一个索引能同用在三个数据中，

/**
 * 现在的数据分配是，原始的数据以一个中英文储存在一个二维数组中，也就是一个表的形式。
 * 有两个数据探索方向，一个是英文，一个中文
 * 所以分别有这两个方向下的各自的数据
 */


/**
 * 1. 记录所有各个相关的分布位置
 * 2. 记录所有开头字母序分布位置，也就是动作的分布位置
 * 3. 记录每个命令与之相应位置的相关的位置
 */

// featurextraction 最后要导出的数据


export const finishus = ()=>{
  const us =  command(Lang.en_us)
  const code = `
    export const us = ${JSON.stringify(us)}
  
  `
  generator(
    join(__dirname, "dist\\en_us.ts"),
    code
  )
}



/**
 * @description: 
 * @param {*}
 * @return {*}
 */
export const en_us = () => {

  const en = mergetable(Lang.en_us)
  const relate = relatesequence(Lang.en_us)
  const relatedsb = relatedistribution()
  const movtiondsb = movtiondistribution()
  const objectdsb = objectdistribution()

  const code = `
    export const en = ${JSON.stringify(en)}
    export const relate = ${JSON.stringify(relate)}
    export const relatedistribution = ${JSON.stringify(relatedsb)}
    export const movtiondistribution = ${JSON.stringify(movtiondsb)}
    export const objectdistribution = ${JSON.stringify(objectdsb)}
  `
  generator(
    join(__dirname, "en.ts"),
    code
  );
};

export const relatedistribution = ()=>{
  /** 整个命令字符串数组相关性分布图 */
  let relatedistribution = Object.create(null);
  for (const i of Object.keys(cnrelate)) {
    relatedistribution[i] = [];
  }
  const command = mergesubset(Lang.en_us)
  for (let i = 0; i < command.length; i++) {
    // 1.
    relatedistribution[command[i].relate].push(i);
  }
  return relatedistribution
}

/** 所有命令相同动作（以字母序）分布图 */
export const movtiondistribution = ()=>{

  const command = mergesubset(Lang.en_us)
  let movtiondsb :any[] = []
  let movtion = Object.create(null);

  for (let i = 0; i < command.length; i++) {

    let n = command[i].movtion;
    if (movtion[n]) {
      movtion[n] += 1;
    }
    // 不存在，第一次添加
    else {
      if (Object.keys(movtion).length != 0) {
        movtiondsb.push(movtion);
        movtiondsb[movtiondsb.length - 1].end = i - 1;
        movtion = Object.create(null);
      }
      movtion[n] = 1;
      // console.log(movtion);
      movtion.start = i;
    }
    if (i + 1 > command.length - 1) {
      // console.log(movtion);
      movtiondsb.push(movtion);
      movtiondsb[movtiondsb.length - 1].end = i;
      break;
    }
  }
  return movtiondsb
}

/** 所有对象相同动作（以字母序）分布图 */
export const objectdistribution = ()=>{
  const command = mergesubset(Lang.en_us)
  let objectarry :any[] = []
  
  for (let i = 0; i < command.length; i++) {
    objectarry.push(command[i].object) 
  }
    // 先判断有没有重复项
  if (objectarry.length===Array.from(new Set(objectarry)).length){
    let objectdsb = Object.create(null)
    for (let i = 0; i < objectarry.length; i++) {
      if (!objectdsb[objectarry[i]]) objectdsb[objectarry[i]] = []
      objectdsb[objectarry[i]].push(i)
    }
    return objectdsb
  }
  // 
  else{
  // [js 数组交集，差集，并集](https://juejin.cn/post/6844903895886462983)
   let duplicateobjectarr = objectarry.filter((v:any,i:number)=>Array.from(new Set(objectarry)).indexOf(v)==-1)
    let objectdsb  = Object.create(null)
    let duplicateobjectdsb = Object.create(null)
    for (const i of duplicateobjectarr) {
      let times = 0
      while (true) {
        times = objectarry.indexOf(i,times)
        if (times==-1) return
        if (!duplicateobjectdsb[i]) duplicateobjectdsb[i] = []
        duplicateobjectdsb[i].push(times)
      }
    }
    objectarry.map((v:any,i:number)=>{
      if (duplicateobjectarr.includes(v)) return
      if (!objectdsb[v]) objectdsb[v] = []
      objectdsb[v].push(i)
    })
    return {...objectdsb,...duplicateobjectdsb}
  }
}