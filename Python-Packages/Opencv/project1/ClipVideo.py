#!/usr/bin/python
# -*- coding :UTF-8 -*-

import cv2

import sys
import os

def ClipVideo(argv):
    print('参数个数',len(argv))
    print('参数列表',str(argv))
    print('脚本名',argv[0])
    print(argv[1:])
    if len(argv)==1:
        print('请不要用我!')
    if len(argv)>=2:
        startFrame = int(argv[1])
        endFrame = int(argv[2])
        videoPath = argv[3]
        outputName = argv[4]
        if os.path.exists(videoPath):
            videoCapture = cv2.VideoCapture(videoPath)
            width = videoCapture.get(3)
            height = videoCapture.get(4)
            fps = videoCapture.get(5)
            frame_count = videoCapture.get(7)
            print (width,height,fps,frame_count)
            videoWriter = cv2.VideoWriter(outputName,cv2.VideoWriter_fourcc('X','V','I','D'),fps,(int(width),int(height)))
            i=startFrame

            while True:
                flag,frame = videoCapture.read()
                if i==endFrame:
                    break
                else:
                    i+=1
                    if flag:
                        videoWriter.write(frame)
            print('好吧，你是对的。')



        else:
            print('空东西，还敢来找ꭙ。')




if __name__=="__main__":
    ClipVideo(sys.argv)
