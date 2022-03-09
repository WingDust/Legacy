'''
@Author: your name
@Date: 2020-04-11 00:38:21
@LastEditTime: 2020-04-14 13:25:32
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
@FilePath: \ML\ML.py
'''
import cv2
import imutils
import numpy as np

#region

#region opencv 将视频分解成一个图片并保存写入下来
cap=cv2.VideoCapture("当普通人忘记文件密码 VS 当程序猿忘记文件密码.flv")
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
#endregion
'''
#region 将图片转成视频
img = cv2.imread('image1.jpg')
imgInfo = img.shape
size = (imgInfo[1],imgInfo[0])
print(size)
videoWrite = cv2.VideoWriter('2.mp4',-1,5,size) #写入对象的方法 参数 1 文件名称 参数 2 编码器 参数 3 每秒钟的帧数 帧率 参数 4 视频的大小
for i in range(1,11):
    fileName = 'image'+str(i)+'.jpg'
    img = cv2.imread(fileName)
    videoWrite.write(img)
print('end')



#endregion
'''
#endregion


#region
'''
def is_contour_bad(cnt):
    perx = cv2.arcLength(cnt,True)
    approx = cv2.approxPolyDP(cnt,perx*0.02,True)

    return not len(approx) == 4

img = cv2.imread('2.png',1)
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
# hsv = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
imgg = cv2.GaussianBlur(gray,(3,3),0)
dst = cv2.Canny(imgg,50,50)

cv2.imshow('s',gray)
cv2.imshow('sdsd',dst)



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
'''
#endgion

#region SVM 所有的数据必须要有标签
'''
# 样本需要有正负两种情况，它们的个数并不一定要相同，一定要一个数据标签
rand1 = np.array([[155,48],[159,50],[164,53],[168,56],[172,60]]) # 正
rand2 = np.array([[152,53],[156,55],[160,56],[172,64],[176,65]]) # 负

label = np.array([[0],[0],[0],[0],[0],[1],[1],[1],[1],[1]])

data = np.vstack((rand1,rand2)) #将两个数组各分一行合并成一个数组阵
data = np.array(data,dtype='float32')



# 训练

svm = cv2.ml.SVM_create()
# 属性设置

svm.setType(cv2.ml.SVM_C_SVC)  # C_SVC 是 n 类分组
svm.setKernel(cv2.ml.SVM_LINEAR) #设置它的核 为线性

svm.setC(0.01)  #来设置线性的容差，

result = svm.train(data,cv2.ml.ROW_SAMPLE,label) #

pt_data = np.vstack([[167,55],[162,57]])
pt_data = np.array(pt_data,dtype='float32')
print(pt_data)
print('\n')
(par1,par2)=svm.predict(pt_data)
print(par1)
print(par2)
print('\n')
print(par1,par2)
'''

#endregion

#region
#'''
# Hog 特征  Harr 特征为基于模版算计而产生的 而 Hog 特征是对
# 1. 先完成 Hog 特征模块的划分
# 2. 根据模版计算，梯度和 方向
# 3. 形成一个 bin 的投影
# 4. 计算每一个模块的 Hog 特征

# image » win » block » cell » bin

# win
## win 大小一般为 50*100 20*50  官方 64*128

# block
## block 默认小于 win 在一般的情况下，block 应该是 win 的整数倍 block step 为 每次向左或者右 滑动多少个单位像素
# 计算 block 数量
###  假设当前的 win 为 64*218 block 为 16*16 block step 为 8*8
# blocks = (( 64 -16 ) / 8 +1) * (( 128-16 ) / 8)  所以 = 105 个
# blocks 水平 (( 64 -16 ) / 8 +1)
# blocks 垂直 (( 128-16 ) / 8)

# cell size 的大小 在之前的假设的block win 大小 情况下 cell 的大小推荐为 8*8
# cell 的 数量 
## 






'''


#endregion

