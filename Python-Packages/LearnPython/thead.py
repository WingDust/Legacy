import globalVar
import time , threading

a = 'num'
def sorry():
    print('1')
    time.sleep(1)

# 创建一把锁
mutex = threading.Lock()

class MyThread(threading.Thread):
    def run(self):
        global a
        for i in range(5):
            print(i)
            print(lambda i:i+1)
            msg= '这个线程是'+self.name+str(i)
            print(msg)





if __name__=='__main__':
    t =  MyThread()
    t.start()

  #  for i in range(5):
  #      t= threading.Thread(target=sorry)
  #      t.start()

