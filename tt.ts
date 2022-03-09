/*\
|*|
|*|
|*|
|*|
|*|
\*/

// import { doc } from "prettier";

// export interface IteratorDefinedResult<T> {
//   readonly done: false;
//   readonly value: T;
// }
// export interface IteratorUndefinedResult {
//   readonly done: true;
//   readonly value: undefined;
// }
// export const FIN: IteratorUndefinedResult = { done: true, value: undefined };
// export type IteratorResult<T> =
//   | IteratorDefinedResult<T>
//   | IteratorUndefinedResult;

// export interface Iterator<T> {
//   next(): IteratorResult<T>;
// }

// class Node<E> {
//   static readonly Undefined: Node<any> = new Node<any>(undefined);

//   element: E;

//   next: Node<E>;

//   prev: Node<E>;

//   constructor(element: E) {
//     this.element = element;
//     this.next = Node.Undefined;
//     this.prev = Node.Undefined;
//   }
// }

// export class LinkedList<E> {
//   private _first: Node<E> = Node.Undefined;

//   private _last: Node<E> = Node.Undefined;

//   private _size: number = 0;

//   get size(): number {
//     return this._size;
//   }

//   isEmpty(): boolean {
//     return this._first === Node.Undefined;
//   }

//   clear(): void {
//     this._first = Node.Undefined;
//     this._last = Node.Undefined;
//     this._size = 0;
//   }

//   unshift(element: E): () => void {
//     return this._insert(element, false);
//   }

//   push(element: E): () => void {
//     return this._insert(element, true);
//   }

//   shift(): E | undefined {
//     if (this._first === Node.Undefined) {
//       return undefined;
//     } else {
//       const res = this._first.element;
//       this._remove(this._first);
//       return res;
//     }
//   }

//   pop(): E | undefined {
//     if (this._last === Node.Undefined) {
//       return undefined;
//     } else {
//       const res = this._last.element;
//       this._remove(this._last);
//       return res;
//     }
//   }

//   iterator(): Iterator<E> {
//     let element: { done: false; value: E };
//     let node = this._first;
//     return {
//       next(): IteratorResult<E> {
//         if (node === Node.Undefined) {
//           return FIN;
//         }

//         if (!element) {
//           element = { done: false, value: node.element };
//         } else {
//           element.value = node.element;
//         }
//         node = node.next;
//         return element;
//       },
//     };
//   }

//   toArray(): E[] {
//     const result: E[] = [];
//     for (let node = this._first; node !== Node.Undefined; node = node.next) {
//       result.push(node.element);
//     }
//     return result;
//   }

//   private _insert(element: E, atTheEnd: boolean): () => void {
//     const newNode = new Node(element);
//     if (this._first === Node.Undefined) {
//       this._first = newNode;
//       this._last = newNode;
//     } else if (atTheEnd) {
//       // push
//       const oldLast = this._last;
//       this._last = newNode;
//       newNode.prev = oldLast;
//       oldLast.next = newNode;
//     } else {
//       // unshift
//       const oldFirst = this._first;
//       this._first = newNode;
//       newNode.next = oldFirst;
//       oldFirst.prev = newNode;
//     }
//     this._size += 1;

//     let didRemove = false;
//     return () => {
//       if (!didRemove) {
//         didRemove = true;
//         this._remove(newNode);
//       }
//     };
//   }

//   private _remove(node: Node<E>): void {
//     if (node.prev !== Node.Undefined && node.next !== Node.Undefined) {
//       // middle
//       const anchor = node.prev;
//       anchor.next = node.next;
//       node.next.prev = anchor;
//     } else if (node.prev === Node.Undefined && node.next === Node.Undefined) {
//       // only node
//       this._first = Node.Undefined;
//       this._last = Node.Undefined;
//     } else if (node.next === Node.Undefined) {
//       // last
//       this._last = this._last.prev;
//       this._last.next = Node.Undefined;
//     } else if (node.prev === Node.Undefined) {
//       // first
//       this._first = this._first.next;
//       this._first.prev = Node.Undefined;
//     }

//     // done
//     this._size -= 1;
//   }
// }

// export interface IDisposable{
//   dispose():void
// }

// export type Event<T> = (
//   listener:(e:T)=>any,
//   thisArgs?:any,
//   disposable?:IDisposable[],
// )=>IDisposable

// namespace Event{

// }

// // 这是事件发射器的一些生命周期和设置
// export interface EmitterOptions {
//   onFirstListenerAdd: Function;
//   onFirstListenerDidAdd: Function;
//   onListenerDidAdd: Function;
//   onLastListenerRemove: Function;
//   leakWarningThreshold?: number;
// }
// type Listener<T> = [(e:T)=>void,any]|((e:T)=>void)

// // 事件发射器
// export class Emitter<T> {
//   private readonly _options?:EmitterOptions
//   private _disposed:boolean=false // 是否已被释放
//   private _event?:Event<T>
//   protected _listeners?:LinkedList<Listener<T>>
//   // 可传入生命周期方法和设置
//   constructor(options?: EmitterOptions) {
//     this._options=options
//   }
//   // 允许大家订阅此发射器的事件
//   get event():Event<T>{
//     // 此处会根据传入的生命周期相关设置，在对应的场景下调用相关的生命周期方法
//     if (!this._event) {
//       this._event = (listener:(e:T)=>any,thisArgs?:any)=>{
//         if (!this._listeners) {
//           this._listeners = new LinkedList()
//         }
//         const firstListener = this._listeners.isEmpty()

//         if (firstListener && this._options && this._options.onFirstListenerAdd) {
//           this._options.onFirstListenerAdd(this)
//         }

//         const remove = this._listeners.push(
//           !thisArgs ? listener : [listener,thisArgs]
//         )

//         if (firstListener && this._options && this._options.onFirstListenerAdd) {
//           this._options.onFirstListenerAdd(this)
//         }

//         if (this._options && this._options.onListenerDidAdd) {
//           this._options!.onListenerDidAdd(this,listener,thisArgs)
//         }

//         const result:IDisposable = {
//           dispose:() =>{
//             if (!this._disposed ) {
//               remove()
//               this._options!.onLastListenerRemove()
//               }
//             }
//           }
//         return result
//       }
//     }
//     return this._event
//   }

//   fire(event:T):void{
//     if (this._listeners) {
//       while (this._listeners.size>0) {
//         const listener = this._listeners.shift()!
//         try {
//           if (typeof listener === 'function') {
//             listener.call(undefined,event)
//           }
//           else{
//             listener[0].call(listener[1],event)
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }

//   }

//   // 向订阅者触发事件
//   // fire(event: T): void {}
//   // 清理相关的 listener 和队列等
//   dispose() {
//     if (this._listeners) {
//       this._listeners.clear()
//     }
//     this._disposed = true
//     this._options!.onLastListenerRemove()
//   }
// }

// let m = new Emitter(
//   {
//    onFirstListenerAdd:()=>console.log("onFirstListenerAdd"),
//   onFirstListenerDidAdd:()=>console.log("onFirstListenerDidAdd"),
//   onListenerDidAdd:()=>console.log("onListenerDidAdd"),
//   onLastListenerRemove:()=>console.log("onLastListenerRemove")}
// )
// const listener1 = m.event(() => console.log('这是我们的自己的监听回调-1')); // fire时候，则会执行回调
// const listener2 = m.event(() => console.trace('这是我们的自己的监听回调-2')); // fire时候，则会执行回调
// listener1.dispose(); // 移除监听1
// // emitter.dispoase(); 移除所有监听
// m.fire(()=>console.log('fire')); // 触发事

// const e = (e:any)=>{console.log('qweh',e);}

// e.call(null,[m,1])

// class Name {
//   #n:number
//   c :number =123
//   p:number
//   constructor(readonly sp:number) {
//     this.#n = 0
//     this.p = this.sp
//     // this.c = 0
//   }
//   get k():Function{
//     return (e: any)=>{console.log(e);
//     }
//   }
// }
// let name1 = new Name(4)
// name1.k('asdasd')

// type E<T> =(
//   listener:(e:T)=>any
// ) => any

// let event:E<string> = (e)=>{console.log(e);}
// let s = (e: any)=>{console.log(e)};

// function ma<T>(emitter: string, eventName: string, map: (...args: any[]) => T = id => id) {
//   console.log(map('map:'+emitter));
//   console.log(eventName);
// }
// const hell0 =ma('asd','asdad')

// function aaa<T>(fn:(...args:any[])=>T) {
//   const fc = (...args: any[]) => console.log(...args);// 这个map函数
//   return fc
// }
// const fn1 = aaa((a,d)=>{console.log('return');})
// fn1()

// class N<E>{
//   un:N<any> = new N<any>(undefined)
//   n:E
//   constructor(e:E){
//     this.n=e
//   }
// }

// let qodj3 = new N({'asd':1,'ppp':'ppp'})
// let qodj1 = new N(undefined)
// let qodj2 = new N({})
// qodj2 = qodj1

// interface Y{
//   a:number
//   num?:number
// }
// let y:Y={a:1}

// Object.defineProperty(y,'num',{enumerable:false,configurable:false,writable:false,value:2})

//@ts-ignore
// var toString = Object.prototype.toString;

// function isFunction(obj) {
//     return toString.call(obj) === '[object Function]'
// }

// function eq(a, b, aStack?, bStack?) {

//     // === 结果为 true 的区别出 +0 和 -0
//     if (a === b) return a !== 0 || 1 / a === 1 / b;

//     // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
//     if (a == null || b == null) return false;

//     // 判断 NaN
//     if (a !== a) return b !== b;

//     // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
//     var type = typeof a;
//     if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;

//     // 更复杂的对象使用 deepEq 函数进行深度比较
//     return deepEq(a, b, aStack, bStack);
// };

// function deepEq(a, b, aStack, bStack) {

//     // a 和 b 的内部属性 [[class]] 相同时 返回 true
//     var className = toString.call(a);
//     if (className !== toString.call(b)) return false;

//     switch (className) {
//         case '[object RegExp]':
//         case '[object String]':
//             return '' + a === '' + b;
//         case '[object Number]':
//             if (+a !== +a) return +b !== +b;
//             return +a === 0 ? 1 / +a === 1 / b : +a === +b;
//         case '[object Date]':
//         case '[object Boolean]':
//             return +a === +b;
//     }

//     var areArrays = className === '[object Array]';
//     // 不是数组
//     if (!areArrays) {
//         // 过滤掉两个函数的情况
//         if (typeof a != 'object' || typeof b != 'object') return false;

//         var aCtor = a.constructor,
//             bCtor = b.constructor;
//         // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
//         if (aCtor !== bCtor
//         && !(isFunction(aCtor)
//         && aCtor instanceof aCtor
//         && isFunction(bCtor)
//         && bCtor instanceof bCtor)
//         && ('constructor' in a
//         && 'constructor' in b)) {
//             return false;
//         }
//     }

//     aStack = aStack || [];
//     bStack = bStack || [];
//     var length = aStack.length;

//     // 检查是否有循环引用的部分
//     while (length--) {
//         if (aStack[length] === a) {
//             return bStack[length] === b;
//         }
//     }

//     aStack.push(a);
//     bStack.push(b);

//     // 数组判断
//     if (areArrays) {

//         length = a.length;
//         if (length !== b.length) return false;

//         while (length--) {
//             if (!eq(a[length], b[length], aStack, bStack)) return false;
//         }
//     }
//     // 对象判断
//     else {

//         var keys = Object.keys(a),
//             key;
//         length = keys.length;

//         if (Object.keys(b).length !== length) return false;
//         while (length--) {

//             key = keys[length];
//             if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false;
//         }
//     }

//     aStack.pop();
//     bStack.pop();
//     return true;

// }

// console.log(eq(0, 0)) // true
// console.log(eq(0, -0)) // false

// console.log(eq(NaN, NaN)); // true
// console.log(eq(Number(NaN), Number(NaN))); // true

// console.log(eq('Curly', new String('Curly'))); // true

// console.log(eq([1], [1])); // true
// console.log(eq({ value: 1 }, { value: 1 })); // true

// var a, b;

// a = { foo: { b: { foo: { c: { foo: null } } } } };
// b = { foo: { b: { foo: { c: { foo: null } } } } };
// a.foo.b.foo.c.foo = a;
// b.foo.b.foo.c.foo = b;

// console.log(eq(a, b)) // true


// const over = Symbol()

// const isOver = function (_over) {
//     return _over=over
// }

// const range = function* (from, to) {
//   for(let i = from; i < to; i++) {
//     console.log('range\t', i);
//     yield i;
//   }
// }

// const map = function* (flow, transform) {
//   for(const data of flow) {
//     console.log('map\t', data);
//     yield(transform(data));
//   }
// }

// const filter = function* (flow, condition) {
//   for(const data of flow) {
//     console.log('filter\t', data);
//     if (condition(data)) {
//       yield data;
//     }
//   }
// }
// //@ts-ignore
// const stops = function*(flow, condition) {
//   for(const data of flow) {
//     yield data;
//     if (condition(data)) {
//       break;
//     }
//   }
// }

// const take = function (flow, number) {
//   let count = 0;
//   const _filter = function (data) {
//     count ++
//     return count >= number;
//   }
//   return stops(flow, _filter);
// }

// class _Lazy{
//   iterator: any;
//   constructor() {
//     this.iterator = null;
//   }

//   range(...args) {
//     this.iterator = range(...args);
//     return this;
//   }

//   map(...args) {
//     this.iterator = map(this.iterator, ...args);
//     return this;
//   }

//   filter(...args) {
//     this.iterator = filter(this.iterator, ...args);
//     return this;
//   }

//   take(...args) {
//     this.iterator = take(this.iterator, ...args);
//     return this;
//   }

//   [Symbol.iterator]() {
//     return this.iterator;
//   }

// }

// function lazy () {
//   return new _Lazy();
// }

// console.time();
// console.timeEnd();

// const tem = ()=>{
//   let start = window.performance.now()
//   for (let i = 0; i < 100; i++) {
//     `${'qweqwe'}${'qweqwewq'}${'qweqw'}`;
//   }
//   let end = window.performance.now();
//   // console.log('tem: ',end-start);
//   let t  = end-start
//   return t
// }
// const comp = ()=>{
//   let start = window.performance.now()
//   for (let i = 0; i < 100; i++) {
//     'qweqwe'+'qweqwewq'+'qweqw';
//   }
//   let end = window.performance.now();
//   // console.log('tem: ',end-start);
//   let t  = end-start
//   return t
// }
// const compare = ()=>{
//   let record = []
//   for (let i = 0; i < 10; i++) {
//     record.push(tem())
//     record.push(comp())
//   }
//   console.log(record);
// }

//  const test = (arg:string)=>{
//   // console.log(arg);
//   return arg
// }
// let exec = [test,test]

// let re = []
// for (const i of exec) {
//   re.push(i.apply(i,['qweqw']))
// }
// console.log(re);

// test.apply(test,['22'])

type tee = {
  a: string;
  b: string;
};
// 所有的显示图成看不见的

/* Analyzed bindings: {} */

// import { ref,h,defineComponent } from 'vue'
//   const __sfc__ = defineComponent({
//   setup(props,ctx){

//     return () => h('div',null,'qqqq')
//   }
// })

// // @ts-ignore
// function render(_ctx, _cache, $props, $setup, $data, $options) {
//   return null
// }
// __sfc__.render = render
// __sfc__.__file = "App.vue"
// export default __sfc__

function partial(fn: Function, ...presetArgs: any[]) {
  return function partiallyApplied(...laterArgs: any[]) {
    return fn(...laterArgs, ...presetArgs);
  };
}
// setTimeout(() => {
//   console.log('Do x task');
// }, 10);
// setTimeout(() => {
//   console.log('Do y task');
// }, 10);

const partialA = partial(setTimeout, 10);

partialA(() => {
  console.log("Do x task");
});
partialA(() => {
  console.log("Do y task");
});

function aaa() {
  console.log(22);
}

let tesss = { a: "aaa" };

let ma = new Map();
ma.set("C-x", aaa);

console.log(aaa.toString());

console.log(ma.get("C-x")());

interface Key {
  fun: Function;
  key: string;
}
// type fn =

// interface Function {
//   key:string
// }

type No = {
  [key: string]: Function;
};

function k() {
  console.log("k");
}

const key = "C-x";
aaa.key = key;
let no: No = {
  [key]: aaa,
  [k.name]: k,
};

if ("C-a" in no) console.log(2);
if ("C-x" in no) console.log(3);
if ("k" in no) console.log(k.toString());
// console.log(no["C-x"].key);

export const gen = (name: string, value: string) => {
  let all: any[] = [];
  let template1 = `const ${name} = '${value}'`;
  return function (fnName: string, fnValue: Function) {
    let template2 = `const ${fnName} = ${fnValue.toString()}`;
    return function () {
      all.push(template1);
      all.push(template2);
      let template3 = `${fnName}.key = ${name}`;
      all.push(template3);
      all.push(`[${name}]:${fnName},`);
      return all;
    };
  };
};

console.log(gen("J", "j")("nextline", () => {})());
(5).toString(6);

enum A {
  asdad,
  aa,
}

enum B {
  aqq,
  qqq,
}

const C = { ...A, ...B };

type Mu = {
  c(): void;
};
type M = {
  a(): void;
};

type muc = Mu & M;

// import { RelunchSheer } from "./t1";
// RelunchSheer()
// console.log(RelunchSheer.relate);
// console.log(RelunchSheer.toString());


export interface ExposedFunction {
  key?:string
  relate:string
  /**
   * Returns the name of the function. Function names are read-only and can not be changed.
   */
  readonly name: string;
  /**
   * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
   * @param thisArg The object to be used as the this object.
   * @param argArray A set of arguments to be passed to the function.
   */
  apply(this: Function, thisArg: any, argArray?: any): any;

  /**
   * Calls a method of an object, substituting another object for the current object.
   * @param thisArg The object to be used as the current object.
   * @param argArray A list of arguments to be passed to the method.
   */
  call(this: Function, thisArg: any, ...argArray: any[]): any;

  /**
   * For a given function, creates a bound function that has the same body as the original function.
   * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
   * @param thisArg An object to which the this keyword can refer inside the new function.
   * @param argArray A list of arguments to be passed to the new function.
   */
  bind(this: Function, thisArg: any, ...argArray: any[]): any;

  /** Returns a string representation of a function. */
  toString(): string;

  prototype: any;
  readonly length: number;

  // Non-standard extensions
  arguments: any;
  caller: Function;
}

type  mu ={
  NextLine:ExposedFunction
}
function NextLine(this:any,name:any){
  this
  console.log(this);
  console.log(name);

}
NextLine(2)
NextLine.relate = 'qwe'

let mu:mu = {
  // NextLine() {
  //   console.log("nue");
  // },
  NextLine:NextLine
};
mu.NextLine.relate = "asd"
export const enum MutationTypes {
  CancelRename = "CancelRename", // 内部自动调用
  ToggleTagbar = "ToggleTagbar", // 按键调用
  ToggleCommandPanel = "ToggleCommandPanel", // 按键调用
  Undo = "Undo", // 按键调用
  Redo = "Redo", // 按键调用
  OpenCurrentVideo = "OpenCurrentVideo",
  NextLine = "NextLine",
  PreviousLine = "PreviousLine",
  ForwardColumn = "ForwardColumn",
  BackColumn = "BackColumn",
}

[{
  h:"BackColumn",
  relate:'cursor',
},]
// [{zh_cn:'',en_us:''}]


{
  h:"BackColumn";
  j:MutationTypes.NextLine
  k:MutationTypes.PreviousLine
  l:MutationTypes.ForwardColumn
  Controlx:MutationTypes.ToggleCommandPanel
  Enter:MutationTypes.OpenCurrentVideo
  ContextMenu:MutationTypes.OpenCurrentVideo
}

console.log(mu.NextLine.name);
console.log(mu.NextLine.toString());

function doSomething(name: string) {
  console.log("Hello, " + name);
}

function loggingDecorator(wrapped: Function) {
  return function d() {
    console.log("Starting");
    const result = wrapped.apply(null, arguments);
    console.log("Finished");
    return result;
  };
}

const wrapped = loggingDecorator(doSomething);
console.log(wrapped());


