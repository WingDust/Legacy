import logging as log

class GlobalMap:
    # 拼装成字典构造全局变量  借鉴map  包含变量的增删改查
    map = {}

    def set_map(self, key, value):
        if(isinstance(value,dict)):
            value = json.dumps(value)
        self.map[key] = value


    def set(self, **keys): # ** 表示在将传入的这样的参数(a=1,b=2,c=3) 变成{'a':1,'b':2,'c':3}在这样的参数定义中它在必须定义在所有参数后面
        try:
            for key_, value_ in keys.items():
                self.map[key_] = str(value_)
                log.debug(key_+":"+str(value_))
        except BaseException as msg:
            log.error(msg)
            raise msg

    def del_map(self, key):
        try:
            del self.map[key]
            return self.map
        except KeyError:
            log.error("key:'" + str(key) + "'  不存在")


    def get(self,*args): # * 表示将传入的参数装在元组中,可与普通参数一样设置
        try:
            dic = {}
            for key in args:
                if len(args)==1:
                    dic = self.map[key]
                    log.debug(key+":"+str(dic))
                elif len(args)==1 and args[0]=='all':
                    dic = self.map
                else:
                    dic[key]=self.map[key]
            return dic
        except KeyError:
            log.warning("key:'" + str(key) + "'  不存在")
            return 'Null_'
