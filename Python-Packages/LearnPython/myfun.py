#!/usr/bin/python
# -*- coding :UTF-8 -*-

#region
"""
@Author: your name
@Date: 2020-04-09 18:31:01
@LastEditTime: 2020-04-13 15:32:40
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
"""
#endregion
import cv2
import os # 检查文件是否存在
import numpy as np

import sys

def ForIn_Callback(items,callback):
    """

    :param items: 
    :param callback: 

    """

def SplitVideo(start,end,videopath,outpath):
    #print(start,end,videopath,outpath)
    #print(type(outpath))

    start = int(start)
    end = int(end)
    videopath = str(videopath)
    outpath = str(outpath)

   #  print(os.path.exists('./'+outpath))
   #  print(os.path.isdir(outpath))
   #  print(os.path.isfile(outpath))

   #  print(os.path.relpath(outpath))
    if os.path.exists(videopath):
        if not str(outpath):
            print('don\'t get output fileName ,So we use video Name')
            filepath,fullname=os.path.split(videopath)
            filename,ext=os.path.splitext(fullname)
            outpath = filename
        if not os.path.exists(outpath):

            cap = cv2.VideoCapture(videopath)
            isOpened = cap.isOpened()
            cap.set(cv2.CAP_PROP_POS_FRAMES,start)
            # fps=cap.get(cv2.CAP_PROP_FPS)
            framenum = int(cap.get(7)) #得到视频总帧数
            os.mkdir(str(outpath))
            if end == 0:
                end = framenum
            if end > framenum:
                end = framenum
                print('end point set too big , we will default set video frame nums')

            i=start
            while isOpened:
                if i == end:
                    break
                else:
                    i+=1
                    (flag,frame) = cap.read()
                    fileName ='./'+outpath+'/'+'image'+str(i)+'.jpg'
                    if flag:
                        cv2.imwrite(fileName,frame,[cv2.IMWRITE_JPEG_QUALITY,100])
            print('done')

        else:
            print('Output File already exists')
            return


    else :
        print('Video file don\'t exists' )


def ZoomImage(imgpath,overload):

    imgpath=str(imgpath)
    if overload not 0:
        print('')
    if os.path.exists(imgpath):



    img = cv2.imread(imgpath,1)
    imgInfo = img.shape
    width = imgInfo[0]
    height = imgInfo[1]


    matScale = np.float32([[0.5,0,0],[0,0.5,0]])
    dst = cv2.warpAffine(img,matScale,(int(width/2),(int(height/2))))
    # cv2.imshow('dst',dst)
    # cv2.waitKey(0)
    

def VartoStr():
    pass


def ClipVideo():
    print('参数个数',len(sys.argv))
    print('参数列表',str(sys.argv))
    print('脚本名',sys.argv[0])
    for i in len(sys.argv):
        print(sys.argv[i])


class callbackObject():
    
    def __init__(self):
        object.__setattr__(self,'__storage__',{})



