<div align="center">
	<a href="https://github.com/Compass/compass">
		<img width="200" height="200"
		  src="https://worldvectorlogo.com/logos/compass.svg">
	</a>
  	<a href="https://github.com/sass/sass">
    	<img width="200" height="200" vspace="" hspace="25"
      		src="https://worldvectorlogo.com/logos/sass.svg">
  	</a>
  	<h1>autoFBF</h1>
  	<p>Auto Generating The Code Of Frame-by-frame Animations via Compass and Sass<p>
</div>

<h2 align="center">前言</h2>

基于Compass+Sass实现函数式自动生成逐帧动画，先安装Compass和Sass
```bash
// gem安装依赖于ruby
gem install compass
gem install sass
```
<h2 align="center">教程</h2>

### 关键代码

#### 引入compass
```css
@import "compass";
```

#### sass混合函数，作用是计算并给每一帧动画赋值宽高及背景图坐标
```css
@mixin retinaSprite($sprite, $name){
  width: image-width(sprite-file($sprite, $name)) / 2;
  height: image-height(sprite-file($sprite, $name)) / 2;
  $xpos: round(nth(sprite-position($sprite, $name), 1) / 2);
  $ypos: round(nth(sprite-position($sprite, $name), 2) / 2);
  background-position: $xpos $ypos;
}
```

#### sass混合函数，作用是自动生成逐帧动画代码
```css
@mixin retinaAnimation($sprite, $delay:false){
  $list: sprite-names($sprite);
  $length: length($list);
  $progress: 0;
  $per: 0;
  @if $delay{
    $per: 50/$length;
    $progress: 50+$per;
  }@else{
    $per: 100/$length;
    $progress: $per;
  }
	
  @keyframes #{sprite-map-name($sprite)}{
    @each $name in $list{
      #{$progress}%{
        @include retinaSprite($sprite, $name);
      }
      $progress: $progress+$per;
    }
  }
	
}
```

#### 指定雪碧地图到指定变量

将一个逐帧动画的所有帧图片放到一个文件夹中，注意每一帧图片的宽高要保持一致，比如说要实现一个小狗的逐帧动画，咱们把所有的帧图片都放到一个`cat`文件夹里面
```css
$dog: sprite-map("dog/*.png");
```

#### 调用函数，生成逐帧代码
```css
.ani{
  background: $dog no-repeat;
  background-size: round(image-width(sprite-path($dog))) / 2 auto;
  @include retinaAnimation($dog, $delay:true);
  animation: #{sprite-map-name($dog)} 2s step-start infinite both;
}
```
### 举例

以今年618账单为例，首先`git clone`本项目，
```bash
cd autoFBF/
cnpm install
// 开启本地服务：npm start，命令的具体含义可以在package.json中查看
npm start
```
新建命令行窗口，开启compass监控
```bash
cd src/
compass watch
```
修改sprite.scss，将注释掉的部分代码取消注释
```css
.firstTime{
  .ani{
    background: $dog no-repeat;
    background-size: round(image-width(sprite-path($dog))) / 2 auto;
    @include retinaAnimation($dog, $delay:true);
    animation: #{sprite-map-name($dog)} 2s step-start infinite both;
  }
}
.manyTimes{
  .ani{
    background: $toothBrush no-repeat;
    background-size: round(image-width(sprite-path($toothBrush))) / 2 auto;
    @include retinaAnimation($toothBrush, $delay:true);
    animation: #{sprite-map-name($toothBrush)} 2s step-start infinite both;
  }
}
```
可以看到`compass`监控到了变化，并合成了雪碧图
<div align="center">
	<img src="./demo-img/compassResult.jpg" width="300">
</div>

在`img`文件夹中看到合成的图片
<div align="center"><img src="./demo-img/sprite1.jpg" width="200"></div>
<div align="center"><img src="./demo-img/sprite2.png" width="200"></div>

`sprite.css`被写入了逐帧动画
<div align="center"><img src="./demo-img/spriteResult.jpg" width="400"></div>

再查看 `http://localhost:8080` ，由于webpack的热更新，我们能够直接看到逐帧动画了
<div align="center"><img src="./demo-img/success.gif" width="250"></div>