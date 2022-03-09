
import { join } from "path";

import { Lang,cnrelate } from "../../src/utils/Searcher/OriginalData";
import { command,mergetable,mergesubset ,relatesequence,movtionsequence,objectsequence,commandsequence} from "./DataTransform";
import { generator } from "../../src/utils/Searcher/Generator";


export const finishcn = ()=>{
  const cn =  command(Lang.zh_cn)
  const code = `
    export const cn = ${JSON.stringify(cn)}
  
  `
  generator(
    join(__dirname, "dist\\zh_cn.ts"),
    code
  )
}



/** 中文命令生成
 * 
 * @description: 
 * @param {*}
 * @return {*}
 */
export const zh_cn = () => {
  const cn = mergetable(Lang.zh_cn);

  const commandsqc = commandsequence(Lang.zh_cn)
  const relatesqc = relatesequence(Lang.zh_cn)
  const movtionsqc = movtionsequence(Lang.zh_cn)
  const objectsqc = objectsequence(Lang.zh_cn)

  const {unicn,cnchar} = allchar()
  const {unirelate,relatechar} = relatechinese()
  const {unimovtion,movtionchar} = movtionchinese()
  const {uniobject,objectchar} = objectchinese()
  const duplicate =  duplicatechar()
  const relatechar2sqc = relatechar2squence()
  const movtionchar2sqc = movtionchar2squence()
  const objectchar2sqc = objectchar2squence()


  const code = `
    export const cn = ${JSON.stringify(cn)}

    interface CnRelate{
        [i:string]:string
    }
    export const cnrelate:CnRelate = ${JSON.stringify(cnrelate)}

    export const commandsqc = ${JSON.stringify(commandsqc)}
    export const relatesqc = ${JSON.stringify(relatesqc)}
    export const movtionsqc = ${JSON.stringify(movtionsqc)}
    export const objectsqc = ${JSON.stringify(objectsqc)}

    export const duplicate = ${JSON.stringify(duplicate)}
    export const relatechar2sqc = ${JSON.stringify(relatechar2sqc)}
    export const movtionchar2sqc = ${JSON.stringify(movtionchar2sqc)}
    export const objectchar2sqc = ${JSON.stringify(objectchar2sqc)}

    export const cnchar = ${JSON.stringify({cnchar:cnchar,length:cnchar.length})}
    export const unicn = ${JSON.stringify(unicn)}

    export const relatechar = ${JSON.stringify({relatechar:relatechar,length:relatechar.length})}
    export const unirelate = ${JSON.stringify(unirelate)}

    export const movtionchar = ${JSON.stringify({movtionchar:movtionchar,length:relatechar.length})}
    export const unimovtion = ${JSON.stringify(unimovtion)}

    export const objectchar = ${JSON.stringify({objectchar:objectchar,length:objectchar.length})}
    export const uniobject = ${JSON.stringify(uniobject)}
  `
  generator(
    join(__dirname, "dist\\cn.ts"),
    code
  )
};


/** 获取组成中文命令的所有用到的中文字符
 * @description: 
 * @param {*}
 * @return {*}
 */
const allchar = ()=>{
  /**
   * 并要以动作，限定，对象，分类
   */

  const command  = mergetable(Lang.zh_cn)
  command.concat(Object.values(cnrelate))
  // [javaScript字符串去重](https://segmentfault.com/a/1190000014275743)
  // [JavaScript的字符串去空格](https://blog.csdn.net/hrgzhy/article/details/52074217)
  let cnchar = [...new Set(command.join('').replace(/\s+/g,''))].join('')
  cnchar = cnchar.split('').sort().join('')
  let unicn = []
  for (const i of cnchar) {
    unicn.push(i.charCodeAt(0))
  }
  unicn.sort()
  return {unicn,cnchar}
}


/*\ ## 将索引类型设置为字符串字面量
|*| > enum 与 联合类型为同一效果
|*| > 索引类型只能为 `string | number` 
|*| - [index signature parameter types](https://github.com/microsoft/TypeScript/issues/5683)
|*| - [Index signature parameter type should allow for enums](https://github.com/microsoft/TypeScript/issues/2491)
|*| - [String literal types as index signature parameter types?](https://github.com/microsoft/TypeScript/issues/5683)
\*/ 

// type o  =  'relate'|'movtion'|'object'
enum o {
'relate' = 'relate',
'movtion' = 'movtion',
'object' = 'object'
}
type ele<T extends o> = `uni${T}`
type originalchar<T extends o> = `${T}char`
// type Len = {length:number}
type Original<T extends o> = {
  [key in originalchar<T>]:string
}
type Uni<T extends o>= {
  [key in ele<T> ]:number[]
}
type Char<T extends o>= Original<T> & Uni<T>

/** 获取中文的**相关性**被使用到的唯一字符
 * 并将这些字符转成 Unicode 码数组,与唯一字符拼成一个字符串
 * @description: 
 * @param {*}
 * @return {*}
 */
const relatechinese = ():Char<o.relate>=>{
/** distribution */
  let relatechar  = [...new Set(Object.values(cnrelate).join('').replace(/\s+/g,''))].join('')
  relatechar = relatechar.split('').sort().join('')
  let unirelate = []
  for (const i of relatechar  ) {
    unirelate .push(i.charCodeAt(0))
  }
  unirelate.sort()
  return {unirelate,relatechar}
}

/** 获取中文的**动作**被使用到的字符
 * 并将这些字符转成 Unicode 码数组,与唯一字符拼成一个字符串
 * @description: 
 * @param {*}
 * @return {*}
 */
const movtionchinese = ():Char<o.movtion>=>{
  /** distribution */
  const movtion   = movtionsequence(Lang.zh_cn)
  let movtionchar  = [...new Set(movtion.join('').replace(/\s+/g,''))].join('')
  movtionchar= movtionchar.split('').sort().join('')

  let unimovtion = []
  for (const i of movtionchar) {
      unimovtion.push(i.charCodeAt(0))
  }
  unimovtion.sort()
  return {unimovtion,movtionchar}
}

/** 获取中文的**对象**被使用到的字符
 * 并将这些字符转成 Unicode 码数组,与唯一字符拼成一个字符串
 * @description: 
 * @param {*}
 * @return {*}
 */
const objectchinese = ():Char<o.object>=>{
  /** distribution */
  const object  = objectsequence(Lang.zh_cn)
  let objectchar = [...new Set(object.join('').replace(/\s+/g,''))].join('')
  objectchar= objectchar.split('').sort().join('')
  let uniobject = []
  for (const i of objectchar) {
      uniobject.push(i.charCodeAt(0))
  }
  uniobject.sort()
  return {uniobject,objectchar}
}

/** 从**相关性 动作 对象**的各个的唯一字符中寻找到重复字符的次数
 * 并且根据是那一个部分有重复字符
 * @description: 
 * @param {*}
 * @return {*}
 */
export const duplicatechar  = ()=>{
  const {unirelate,relatechar} = relatechinese()
  const {unimovtion,movtionchar} = movtionchinese()
  const {uniobject,objectchar} = objectchinese()
  
  let all = (relatechar+movtionchar+objectchar)
  // [面试题：用js实现读取出字符串中每个字符重复出现的次数？](https://segmentfault.com/q/1010000005070166)
  let info = all.split('').reduce((p:any,k:any)=>(p[k]++||(p[k]=1),p),{})
  // 装重复出现2次的中文字符
  let duplicatecn:any[] = []
  for (const [k,v] of Object.entries(info)) {
    if (v == 2){
      duplicatecn.push(k)
    }
  }

  // 根据重复字符在所有唯一字符组成的唯一字符串位置排列来得到那些部分有重复字符
  let duplicate = Object.create(null)
  duplicatecn.map((v:string,i:number,a:any[])=>{
    let idx1 = all.indexOf(v)
    let idx2 = all.indexOf(v,idx1+1)
    // console.log(idx1);
    // console.log(idx2);
    if ((idx1>-1&&idx1<6)&&(idx2>5&&idx2<12)){
      // if (!duplicate[v])duplicate[v] = []
      duplicate[v] = (['relate','movtion'])
    } 
    if ((idx1>5&&idx1<12)&&(idx2>11&&idx2<22)){
      // if (!duplicate[v])duplicate[v] = []
      duplicate[v] = (['movtion','object'])
    }
    if ((idx1>-1&&idx1<6)&&(idx2>11&&idx2<22)){
      // if (!duplicate[v])duplicate[v] = []
     duplicate[v] = (['relate','object'])
    }
  })
  console.table(duplicate);
  return duplicate
}

export const duplicatesquence = ()=>{
  const commandsqc = commandsequence(Lang.zh_cn)
  const relatesqc = relatesequence(Lang.zh_cn)
  const movtionsqc = movtionsequence(Lang.zh_cn)
  const objectsqc = objectsequence(Lang.zh_cn)
  let duplicatesqc:any[] = []

  for (const i of movtionsqc) {
    i
  }
  

}

/**
 * @description: 
 * @param {*}
 * @return {*}
 */
export const relatechar2squence = ()=>{
  const relatesqc = relatesequence(Lang.zh_cn)
  const {unirelate,relatechar} = relatechinese()
  let relatechar2sqc = Object.create(null)

  for (const i of relatechar.split('')) {
    relatechar2sqc[i] = []
    for (const j of relatesqc) {
      if (j.indexOf(i)!==-1)  relatechar2sqc[i].push(j)
    }
  }
  return relatechar2sqc
}

export const movtionchar2squence = ()=>{
  const movtionsqc = movtionsequence(Lang.zh_cn)
  const {unimovtion,movtionchar} = movtionchinese()
  let movtionchar2sqc = Object.create(null)
  for (const i of movtionchar.split('')) {
    movtionchar2sqc[i] = []
    for (const j of movtionsqc) {
      if (j.indexOf(i)!==-1) movtionchar2sqc[i].push(j)
    }
  }
  return movtionchar2sqc
}

export const objectchar2squence = ()=>{
  const objectsqc = objectsequence(Lang.zh_cn)
  const {uniobject,objectchar} = objectchinese()
  let objectchar2sqc = Object.create(null)
  for (const i of objectchar.split('')) {
    objectchar2sqc[i] = []
    for (const j of objectsqc) {
      if (j.indexOf(i)!==-1) objectchar2sqc[i].push(j)
    }
  }
  return objectchar2sqc
}

export const more4char = ()=>{
  const commandsqc = commandsequence(Lang.zh_cn)
  const relatesqc = relatesequence(Lang.zh_cn)
  const movtionsqc = movtionsequence(Lang.zh_cn)
  const objectsqc = objectsequence(Lang.zh_cn)

  const relatechar2sqc = relatechar2squence()
  const movtionchar2sqc = movtionchar2squence()
  const objectchar2sqc = objectchar2squence()

  let relateneedcheckconcat = []
  let movtionneedcheckconcat = []
  let objectneedcheckconcat = []
  for (const i of relatesqc  as string[]) {
    if (i.length>2){
      relateneedcheckconcat.push(i.substring(0,i.length-1))
    }
  }
  for (const i of movtionsqc  as string[]) {
    if (i.length>2){
      movtionneedcheckconcat.push(i.substring(0,i.length-1))
    }
  }
  for (const i of objectsqc  as string[]) {
    if (i.length>2){
      objectneedcheckconcat.push(i.substring(0,i.length-1))
    }
  }
  // Object.assign(relatechar2sqc,movtionchar2sqc,objectchar2sqc)
  if (relateneedcheckconcat.length>0) {
    for (const i of relateneedcheckconcat.join()) {

      
    }
    
  }
  if (movtionneedcheckconcat.length>0) {
    
  }
  if (objectneedcheckconcat.length>0) {
    
  }
}




export const zh_cnrelate = ()=>{
  /**
   * 将英文转成中文，只能手写中英文对应的数据
   * 再通过对这个手写的数据使用工具进行验证，与人力检验翻译，以保存数据正确
   */
  // [Jest: SyntaxError：与TypeScript和ES模块一起使用时，无法在模块外部使用import语句](https://bleepcoder.com/cn/jest/604668461/syntaxerror-cannot-use-import-statement-outside-a-module_9860)
  // [Meta: Native support for ES Modules](https://github.com/facebook/jest/issues/9430)
  // if (_.isEqual(Object.keys(relatedistribution),Object.keys(cnrelate))){
  //   console.log('中英文属性是相等的');
  // }

}