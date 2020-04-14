4.14
matlab 新建mfile要在matlab/work下 文件名不能是纯数字

创建自定义函数
function语法：function [y1,...,yN] = myfun(x1,...,xM)，其中[y1,...,yN]为输出量，myfun为函数名，(x1,...,xM)为函数输入量。
有效的函数名称以字母字符开头，并且可以包含字母、数字或下划线。
以end结尾
可以将函数保存在以下位置：只包含函数定义的函数文件中。文件的名称应与文件中其函数的名称一致。

文件可以包含多个局部函数或嵌套函数。为提高可读性，可使用 end 关键字来表示文件中每个函数的末尾。以下情况下需要 end 关键字：
https://blog.csdn.net/qq_25018077/article/details/88998126
https://blog.csdn.net/LJKTWJJ/article/details/93538396

