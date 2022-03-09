export const cn = ["探测 场景", "打开 配置文件", "打开 视频", "重启 凝石"];

interface CnRelate {
  [i: string]: string;
}
export const cnrelate: CnRelate = {
  Application: "应用",
  Setting: "设置",
  Video: "视频",
};

export const commandsqc = [
  "视频",
  "设置",
  "应用",
  "打开",
  "探测",
  "重启",
  "配置文件",
  "场景",
  "凝石",
];
export const relatesqc = ["视频", "设置", "应用"];
export const movtionsqc = ["打开", "探测", "重启"];
export const objectsqc = ["视频", "配置文件", "场景", "凝石"];

export const duplicate = {
  置: ["relate", "object"],
  视: ["relate", "object"],
  频: ["relate", "object"],
};
export const relatechar2sqc = {
  应: ["应用"],
  用: ["应用"],
  置: ["设置"],
  视: ["视频"],
  设: ["设置"],
  频: ["视频"],
};
export const movtionchar2sqc = {
  启: ["重启"],
  开: ["打开"],
  打: ["打开"],
  探: ["探测"],
  测: ["探测"],
  重: ["重启"],
};
export const objectchar2sqc = {
  件: ["配置文件"],
  凝: ["凝石"],
  场: ["场景"],
  文: ["配置文件"],
  景: ["场景"],
  石: ["凝石"],
  置: ["配置文件"],
  视: ["视频"],
  配: ["配置文件"],
  频: ["视频"],
};

export const cnchar = {
  cnchar: "件凝启场应开打探文景测用石置视设配重频",
  length: 19,
};
export const unicn = [
  20214, 20957, 21551, 22330, 24212, 24320, 25171, 25506, 25991, 26223, 27979,
  29992, 30707, 32622, 35270, 35774, 37197, 37325, 39057,
];

export const relatechar = { relatechar: "应用置视设频", length: 6 };
export const unirelate = [24212, 29992, 32622, 35270, 35774, 39057];

export const movtionchar = { movtionchar: "启开打探测重", length: 6 };
export const unimovtion = [21551, 24320, 25171, 25506, 27979, 37325];

export const objectchar = { objectchar: "件凝场文景石置视配频", length: 10 };
export const uniobject = [
  20214, 20957, 22330, 25991, 26223, 30707, 32622, 35270, 37197, 39057,
];
