
test('distributeCharLang',()=>{
  /*\ ## 判断字符为英文、中文
  |*| - 大写字母 A~Z[65~90] 或 小写字母 a~z[97~122] 之间
  |*| - [GBK\UTF8\UNICODE...怎么判断一个字符是不是汉字？](https://zhuanlan.zhihu.com/p/358597081)
  \*/ 
const charcode = '工人'.charCodeAt(0)
// 大写字母 A~Z 或 小写字母 a~z 之间
if ((charcode>=65||charcode<=90)&&(charcode>=97||charcode<=122)){
}
// 基本汉字
// [GBK\UTF8\UNICODE...怎么判断一个字符是不是汉字？](https://zhuanlan.zhihu.com/p/358597081)
else if (charcode>=19968||charcode<=40869) {
}
})