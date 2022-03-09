<style>
    body{
    color:rgb(255,255,255);
    background:#485578;
    }
    .markdown-body{
    /*
    border:1px,solid,#bfb8e1;*/
    background:#4C639B;
    }
    #page-ctn{
    background:#04004a;
    }
    li {
      list-style: none;
      position: relative;
      padding: 0 0 0 2em;
      margin: 0 0 .5em 10px;
      -webkit-transition: .12s;
      transition: .12s;
    }
    li:before{
     position: absolute;
      content: '\2022';
      font-family: Arial;
      color: rgb(240,255,255);
      top: 0;
      left: 0;
      text-align: center;
      font-size: 2em;
      opacity: .5;
      line-height: .75;
      -webkit-transition: .5s;
              transition: .5s;
    }
    li:hover{
    color:#FFF;
    }
    li:hover::before{
      -webkit-transform: scale(2);
          -ms-transform: scale(2);
              transform: scale(2);
      opacity: 1;
      text-shadow: 0 0 4px;
      -webkit-transition: .1s;
              transition: .1s;}
    }
    ol, ul {
      width: 28%;
      display: inline-block;
      text-align: left;
      vertical-align: top;
      background: rgba(0, 0, 0, 0.2);
      color: rgba(255, 255, 255, 0.5);
      border-radius: 5px;
      padding: 1.5em;
      margin: 2%;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
</style>

[TOC]

## opencv


### 函数

#### 图片知识
  - HSV

    - Hue 色调 Saturation 饱和度 Value 亮度
  - 灰度图片与彩色图片在RGB上的区别
    - 灰度的RGB 是 R=G=B
    - 这有一个比较为 纯白 为 `rgb(255,255,255)` 纯黑 为 `rgb(0,0,0)`
    - 而灰度就是在这两个之间，并且 R=G=B
  - img 属性
    - img.shape
      - 为图片的 高度 宽度 颜色深度
      - 如 彩色为 颜色深度为3 灰度 为没有
    - img.dtype
      - 图片的数据类型
    - imag.size
      - 图片的总像素点个数，通道数
  - 在灰色图片中因为R=G=B所以 图片像素的保存就可以使用一个值来表示，也就单通道
    - 访问某一个坐标的像素值 `gray[x,y]`

    -

#### 边缘检测
  - cv2.GaussianBlur()
    - 为什么要对图片使用高斯滤波
      - 首先高斯滤波是一种模糊图片的方法
      - [Opencv学习笔记2：图像模糊作用和方法](http://www.cnblogs.com/aiguona/p/9389001.html)
    - 使用高斯滤波来去除噪声(#GaussianBlur)
      - [简单易懂的高斯滤波](https://www.jianshu.com/p/73e6ccbd8f3f)


#### 轮廓检测
  - cv2.archLength(cnt,True)

    - 轮廓周长
  - cv2.approxPolyDP(cnt,周长的返回值，True
    -
  - cv2.threshold()
    > ret, dst = cv2.threshold(src, thresh, maxval, type)
    - Reference
      - [opencv: 阈值处理(cv2.threshold)](https://blog.csdn.net/JNingWei/article/details/77747959)
    - 二值化
      - 将当前的图片（仅灰度）转成当前的图片**只有二种像素**存在于图片中，便于处理

    - src 输入的图片，需要是单通道
    - dst 输出的图片
    - thresh 阈值
    - maxval 当像素超过或者低于阈值所赋的值
    - 二值化操作的类型
      - cv2.THRESH_BINARY
      - cv2.THRESH\_BINARG\_INV
      - cv2.THRESH\_TRUNC
      - cv2.THRESH\_TOZERO
      - cv2.THRESH\_TOZERO\_INV
  - cv2.findContours()
    - 参数一
      - 必须是二值化的图
## Reference
  - [Opencv+Python cv2.imshow 闪退](https://blog.csdn.net/qq_30336973/article/details/90579305)


### 技巧
  - 读取指定帧
    - [python-opencv 读取指定帧、获取总帧数等](https://www.lizenghai.com/archives/17610.html)
  - [Python OpenCV 获取视频文件的常用属性](https://blog.csdn.net/bbjg_001/article/details/104121381)


<script src="../lib/bootstrap.min.js"></script>
<script src="../lib/jquery.min.js"></script>
<script>
$(function(){
  $("<link>")
  .attr({ rel: "stylesheet",
  type: "text/css",
  href: "site.css"
  })
  .appendTo("head");
});
window.onload=function(){
console.log('1');
function loadCssCode(code){
    var style = document.createElement('style');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    //for Chrome Firefox Opera Safari
    style.appendChild(document.createTextNode(code));
    //for IE
    //style.styleSheet.cssText = code;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
}
console.log('2');
setimeout(()=> {
loadCssCode("

")
})
}
</script>
