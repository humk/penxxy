import { InputProps } from "@tarojs/components/types/input";

type menuConfig = {
  key: string;
  class?: string;
  type?: string;
  options?: string[];
  dataType?: keyof InputProps.Type;
  range?: Function;
  step?: number;
}[];

export const Authorization =
  "Bearer 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";
export const model = "gpt-3.5-turbo";

export const defaultConfig = {
  model: "gpt-3.5-turbo",
  // suffix: "",
  max_tokens: 2000,
  temperature: 1,
  top_p: 1,
  n: 1,
  stream: false,
};
export const modalDiscriptions = {
  "gpt-3.5-turbo":
    "功能最强大的 GPT-3.5 模型，并针对聊天进行了优化，成本仅为text-davinci-003. 将使用我们最新的模型迭代进行更新。最大tokens为：4,096，数据截至时间：2021.09",
  "gpt-3.5-turbo-0301":
    "2023 年 3 月 1 日的快照gpt-3.5-turbo。与 不同的是gpt-3.5-turbo，此模型不会收到更新，并且只会在 2023 年 6 月 1 日结束的三个月内提供支持。最大tokens为：4,096，数据截至时间：2021.09",
  // "text-davinci-003":
  //   "text-davinci-003：功能最强大的 GPT-3 模型。可以完成其他模型可以完成的任何任务，通常具有更高的质量、更长的输出和更好的指令遵循。还支持在文本中插入补全。最大tokens为：4,000，数据截至时间：2021.06",
  // "text-curie-001":
  //   "text-curie-001：非常有能力，但比text-davinci-003更快，成本更低。最大tokens为：2048，数据截至时间：2019.10",
  // "text-babbage-001":
  //   "text-babbage-001：能够执行简单的任务，速度非常快，成本更低。最大tokens为：2048，数据截至时间：2019.10",
  // "text-ada-001":
  //   "text-ada-001：能够执行非常简单的任务，通常是 GPT-3 系列中最快的型号，而且成本最低。最大tokens为：2048，数据截至时间：2019.10",
};
export const maxTokens = {
  "gpt-3.5-turbo": [1, 4096],
  "gpt-3.5-turbo-0301": [1, 4096],
  // "text-davinci-003": [1, 4000],
  // "text-curie-001": [1, 2048],
  // "text-babbage-001": [1, 2048],
  // "text-ada-001": [1, 2048],
};

export const menuConfig: menuConfig = [
  {
    key: "model",
    class: "row",
    type: "option",
    options: [
      "gpt-3.5-turbo",
      "gpt-3.5-turbo-0301",
      // "text-davinci-003",
      // "text-curie-001",
      // "text-babbage-001",
      // "text-ada-001",
    ],
  },
  // {
  //   key: "suffix",
  //   class: "row",
  //   type: "input",
  //   dataType: "text",
  // },
  {
    key: "max_tokens",
    class: "column",
    type: "range",
    range: (key) => maxTokens[key],
    step: 1,
  },
  {
    key: "temperature",
    class: "column",
    type: "range",
    range: () => [0.1, 2],
    step: 0.1,
  },
  {
    key: "top_p",
    class: "column",
    type: "range",
    range: () => [0.1, 1],
    step: 0.1,
  },
  {
    key: "n",
    type: "range",
    class: "column",
    range: () => [1, 5],
    step: 1,
  },
  {
    key: "stream",
    class: "row",
    type: "switch",
  },
];
