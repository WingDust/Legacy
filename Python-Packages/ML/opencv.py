import os
import cv2 as cv
import numpy as np
import matplotlib.pyplot

img=cv.imread("C:/Users/Administrator/Desktop/1.png")
print(img)
w,h,c=img.shape

px=img[100,100]

for i in range(400):
    for j in range(400):
        img[i,j]=[240,255,255]
        
gray_img=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
cv.imshow("original",gray_img)
cv.waitKey(0)

lap=cv.Laplacian(gray_img,cv.CV_64F)
lap=np.uint8(np.absolute(lap))
cv.imshow('lap',lap)
cv.waitKey(0)



#for i in range(img.height):
#    for j in range(img.width):
#cv.imshow('11',img)
cv.imwrite("C:/Users/Administrator/Desktop/1.png",img)



cv.waitKey(0)
print(px)
print(h,w,c)

#os.system('Cmder.exe')


rand1=np.array([[120,40],[200,300]])
rand1=np.array([[170,40],[90,300]])

#label
label=np.array([[[0],[0],[0],[0],[0],[0],0]])
