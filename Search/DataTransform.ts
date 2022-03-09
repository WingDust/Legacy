/** 数据转化 datatransformation
 * 对原始数据进行整合，分化
 * 并着函数式写法，所以都是一个函数返回最终需要的数据
 * 根据唯一标识这里是 Lang 来抽取数据中的各类
 * */

import { Lang,Application,Setting,Video,cnrelate,langrelate} from "../../src/utils/Searcher/OriginalData";




/** 根据语种取出同语种所有的命令并对每一个命令
 * 添加上相关性前缀
 * @这里的相关性前缀需要手动维护
 * @description: 
 * @param {Lang} lang
 * @return {*} {string[]}
 */
export const command = (lang:Lang)=>{
  let app = [] 
  let setting = []
  let video = []

  for (const i of Application) {
    app.push(langrelate[0][lang] + ': ' + i[lang])
  }
  for (const i of Setting) {
    setting.push(langrelate[1][lang] + ': ' + i[lang])
  }
  for (const i of Video) {
    video.push(langrelate[2][lang] + ': ' + i[lang])
  }
  return app.concat(setting,video)
}





/** 将原始的命令依语种顺序取出同语种所有的命令并返回
 * @description: 
 * @param {Lang} lang
 * @return {*}
 */
export const mergetable = (lang:Lang):string[]=>{
  let langcommand = []

  const commands = [...Application, ...Setting, ...Video];
   commands.sort();
  for (const i of commands) {
    langcommand.push(i[lang])
  }
  return langcommand
}

interface sequence{
  relate:string
  movtion:string
  object:string
}
/** 根据语种将命令依 相关性-动作-对象 进行字符串分割
 * @description: 
 * @param {Lang} lang
 * @return {*}
 */
export const mergesubset = (lang:Lang):sequence[]=>{
  let modifiedapp = Application.map((v: any, i: number, array: string[][]) => {
    return (v = {
      relate: lang==Lang.en_us?"Application":cnrelate["Application"] ,
      movtion: v[lang].split(" ")[0],
      object: v[lang].split(" ")[1],
    });
  });
  let modifiedsetting = Setting.map((v: any, i: number, array: string[][]) => {
    // console.log(v.split(/ (.*)/));
    // [在第一个空白出现时分割字符串](https://qastack.cn/programming/10272773/split-string-on-the-first-white-space-occurrence)
    return (v = {
      relate: lang==Lang.en_us?"Setting":cnrelate["Setting"] ,
      movtion: v[lang].split(/ (.*)/)[0],
      object: v[lang].split(/ (.*)/)[1],
    });
  });
  let modifiedvideo = Video.map((v: any, i: number, array: string[][]) => {
    return (v = {
      relate: lang==Lang.en_us?"Video":cnrelate["Video"] ,
      movtion: v[lang].split(/ (.*)/)[0],
      object: v[lang].split(/ (.*)/)[1],
    });
  });
  // console.table(modifiedapp);
  // console.table(modifiedsetting);
  // console.table(modifiedvideo );
  const command = [...modifiedapp, ...modifiedsetting, ...modifiedvideo];
  // 
  command.sort((a, b): number => {
    return a.movtion+a.object > b.movtion+b.object ? 1 : -1;
  });
  // console.table(command);
  return command 
}

/** 根据语种将所有**相关性**字符串取出
 * @description: 
 * @param {Lang} lang
 * @return {*} {strin[]}
 */
export const relatesequence  = (lang:Lang):string[]=>{
  const command  = mergesubset(lang)
  let relatesqc:string[] = []
  for (const i of command) {
    relatesqc.push(i.relate)
  }
  return Array.from(new Set(relatesqc))
}

/** 根据语种将所有**动作**字符串取出
 * @description: 
 * @param {*}
 * @return {*}
 */
export const movtionsequence = (lang:Lang):string[]=>{
  const command  = mergesubset(lang)
  let movtionsqc = []
  for (const i of command) {
    movtionsqc.push(i.movtion)
  }
  return Array.from(new Set(movtionsqc))
}

/** 根据语种将所有**对象**字符串取出
 * @description: 
 * @param {*}
 * @return {*}
 */
export const objectsequence = (lang:Lang):string[]=>{
  const command  = mergesubset(lang)
  let objectsqc = []
  for (const i of command) {
    objectsqc.push(i.object)
  }
  return Array.from(new Set(objectsqc))
}

/** 将所有的命令组成结构**相关性 动作 对象**分割各其三个部分各一维字符串数组
 * 后合并成一维字符串数组
 * @description: 
 * @param {*}
 * @return {*}
 */
export const commandsequence = (lang:Lang)=>{
  const relatesqc = relatesequence(lang)
  const movtionsqc = movtionsequence(lang)
  const objectsqc = objectsequence(lang)
  return Array.from(new Set(relatesqc.concat(movtionsqc).concat(objectsqc))) 
}