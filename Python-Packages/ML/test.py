#!/usr/bin/python
# -*- coding :UTF-8 -*-

import cv2

cap=cv2.VideoCapture(r"当普通人忘记文件密码 VS 当程序猿忘记文件密码.flv")
isOpened=cap.isOpened()
print(isOpened)
fps=cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
print(fps,width,height)
cap.set(cv2.CAP_PROP_POS_FRAMES,20)
i=0
while isOpened:
    if i==10:
        break
    else:
        i+=1
    (flag,frame)=cap.read() # 读取每一帧 flag 表示是否读取成功 frame 表示图片的内容
    fileName ='image'+str(i)+'.jpg'
    print(fileName)
    if flag:
        cv2.imwrite(fileName,frame,[cv2.IMWRITE_JPEG_QUALITY,100])
print('end')

