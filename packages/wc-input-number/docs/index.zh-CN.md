---
title: wc-input-number
---

## 介绍

wc-input-number 是一个 React 数字输入框组件，同时也是 [willow-design](https://github.com/kavience/willow-design) 的基础组件.

## API

|       成员       |                说明                 |                            类型                            |     默认值      | 版本  |
| :--------------: | :---------------------------------: | :--------------------------------------------------------: | :-------------: | :---: |
|    prefixCls     |             class 前缀              |                           string                           | wc-input-number |   -   |
|     disabled     |                禁用                 |                          boolean                           |      false      |   -   |
|       step       |      每次改变步数，可以为小数       |                      string \| number                      |        1        |   -   |
|    precision     |                精度                 |                           number                           |        0        |   -   |
| decimalSeparator |             小数分割点              |                           string                           |        .        |   -   |
|     keyboard     |            禁用键盘输入             |                          boolean                           |      false      |   -   |
|   defaultValue   |               默认值                |                      string \| number                      |        -        |   -   | - |
|      value       |                 值                  |                      string \| number                      |        -        |   -   | - |
|      upNode      |         自定义向上操作节点          |                         ReactNode                          |        -        |   -   |
|     downNode     |         自定义向下操作节点          |                         ReactNode                          |        -        |   -   |
|       min        |               最小值                |                      string \| number                      |        -        |   -   |
|       max        |               最大值                |                      string \| number                      |        -        |   -   |
|    formatter     |        自定义格式化展示样式         |  (value: InputNumberValueType     \| undefined) => string  |        -        |   -   |
|      parser      | 反转真实值，常与 formatter 一起使用 |              (disPlayValue: string) => string              |        -        |   -   |
|      onStep      |          改变步数触发事件           | (value: InputNumberValueType,type: 'up' \| 'down') => void |        -        |   -   |
|     onChange     |           值改变触发事件            |           (value: InputNumberValueType) => void            |        -        |   -   |
|     onInput      |          手动输入触发事件           |           (value: InputNumberValueType) => void            |        -        |   -   |