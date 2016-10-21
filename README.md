# ShooterGame
homework using p5.js

![截图](https://github.com/Lxinyuelxy/ShooterGame/raw/master/assets/jietu.png)

###说明：
- 两种类型敌人，一种无规律运动，一种会跟踪玩家
- 玩家遇见敌人会失一条命，初始化有3条
- 玩家每吃一个蘑菇可增加一条生命
- 玩家可以向敌人发射子弹，子弹的方向根据右下角旋转的指针确定

###bug:
指针旋转由屏幕坐标x轴的正方向起顺时旋转，在旋转至y轴方向（正和负）附近时，子弹变化方向总是不能连续变化，即没有实现子弹竖直向上或向下发射
