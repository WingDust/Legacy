'''
@Author: your name
@Date: 2020-04-27 01:20:49
@LastEditTime: 2020-04-27 01:55:45
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''

'''
在使用窗口的显示方面使用 Tooltip 可能会比使用直接在窗口上显示文字显得舒适

'''


import cv2
import pyautogui
import numpy as np

width = 1920
height = 1080

img = pyautogui.screenshot()
# img = cv2.cvtColor(np.asarray(img1),cv2.COLOR_RGB2BGR)

img = np.array(img)
img = img[:,:,::-1].copy()

# cv2.imshow('screenshot',op)
# cv2.waitKey(0)

'''

解决opencv 在窗口显示中文标题乱码的问题
'''
def zh_CN(string):
    return string.encode("gbk").decode(errors="ignore")

def is_contour_bad(cnt):
    perx = cv2.arcLength(cnt,True)
    approx = cv2.approxPolyDP(cnt,perx*0.02,True)

    return not len(approx) == 4

# img = cv2.imread('2.png',1)
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY) # 图像转灰度



# hsv = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
imgg = cv2.GaussianBlur(gray,(3,3),0) #高斯滤波
dst = cv2.Canny(imgg,50,50) # Canny 边缘检测算法

#cv2.imshow(zh_CN('灰度图'),gray)
cv2.imshow('gray',gray)


cv2.imshow('Canny',dst)



ret ,binary = cv2.threshold(gray,127,255,cv2.THRESH_BINARY) # 二值化 一般多用来将灰度图片中的 像素值是否达到设定的阈值，而将这个像素赋值

contours,hierarchy = cv2.findContours(binary,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

img1 = cv2.drawContours(img,contours,1,(255,0,255),3)
imag =  cv2.drawContours(img,contours,-1,(0,255,0),3)

# contours = imutils.grab_contours(contours)
# mask = np.ones(img.shape[:2],dtype="uint8")*255


for c in contours:
    if is_contour_bad(c):
        print(c)
        cv2.drawContours(img,c,-1,(255,0,0),1)


print("数量：",len(contours))


cv2.imshow('c',img)
#cv2.imshow('hsv',hsv)
cv2.imshow('coutour',img1)
cv2.imshow('coutoux',imag)

cv2.waitKey(0)
