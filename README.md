# 20230601final
# 第二個作業 - Class粒子系統與互動遊戲

## 宣告class

#### class的constructor定義內容
![](https://hackmd.io/_uploads/BJvx3qXUn.png)

```javascript=
let points = [[12,0],[12,-3],[11,-6],[10,-7],[8,-7],[4,-3],[2,-3],[-1,-5],[-4,-5],[-7,-2],[-7,3.5],[-6.5,4],[-9,4],[-9,5],[-7,7],[-6,7],[-5,6],[-5,-1],[-3,-3],[-1,-3],[2,-1],[4,-1],[8,-5],[9,-5.5],[10,-5],[11,-3],[11,-2]]
var fill_colors = "353535-eb5e28-f9f7f3-6a994e-284b63-9c6644".split("-").map(a=>"#"+a)
var line_colors = "ede0d4-540b0e-f2cc8f-240046-7f5539-e0e1dd".split("-").map(a=>"#"+a)

//class:類別，粒子
class Obj{  //宣告一個類別，針對一個畫的圖案
    constructor(args){  //預設值，基本資料(物件的顏色，移動的速度、大小、初始值顯示位置......)
      //this.p = args.p || {x: random(width),y:random(height)}//描述為該物件的初始位置，|| (or)，當產生一個物件時，有傳給位置參數，則使用該參數，如果沒有傳參數，就以||(or)後面設定產出
      this.p = args.p || createVector(random(width),random(height))  //把原本{x:......,y:......}改成"向量"方式
      //this.v = {x: random(-1,1),y:random(-1,1)} //設定一個物件的移動速度
      this.v = createVector(random(-1,1),random(-1,1))  //把原本{x:......,y:......}改成"向量"方式
      this.size = random(8,20)  //一個物件的放大倍率
      this.color = random(fill_colors)  //充滿顏色
      this.stroke = random(line_colors)  //線條外框顏色
    }
}

function setup() {
   createCanvas(windowWidth,windowHeight)
}
```
---

#### class的畫圖程式碼

```javascript=
draw(){  //畫出單一個物件形狀
      push()  //執行push()後，依照我的設定，設定原點(0,0)的位置
        translate(this.p.x,this.p.y)  //依該物件位置為原點
        scale(this.v.x<0?1:-1,-1)  //?為否則(<0=1否則=-1) //x軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1，y軸的-1為上下顛倒
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(3)  //線的粗細
        beginShape()
          for(var k=0;k<points.length;k=k+1){
            //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
            //vertex(points[k][0]*this.size,points[k][1]*this.size)  //只要設定一點，當指令到endShape()，會把所有的點連接再一起
            curveVertex(points[k][0]*this.size,points[k][1]*this.size)
          }
        endShape(CLOSE)  //close可以讓線連接起來
      pop()  //執行pop()後，原點(0,0)設定為回到整個視窗的左上角
    }
```
---

#### class的移動內容

```javascript=
update(){
      // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
      // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
      this.p.add(this.v)  //設定好向量後，使用add，就可以抵上面兩行指令
      //向量sub==> 減號
      //++++++++設定物件隨滑鼠移動++++++++
      //知道滑鼠的位置，並建立一個滑鼠的向量
      // let mouseV = createVector(mouseX,mouseY)  //把滑鼠的位置轉換成一個向量值
      // let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //sub計算出滑鼠所在位置的向量(mouseV)到物件向量(this.p)的距離，每次以3的距離
      // this.v.mag()代表該物件的速度大小(一個向量值有大小和方向)
      // this.p.add(delta)
      
      if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把x軸方向、速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
        this.v.y = -this.v.y  //把y軸方向、速度方向改變
      }
    }
```
---

## 產生25個相同class的元件
![](https://hackmd.io/_uploads/HkIwMj783.png)
```javascript=
//++++++設定畫points所有"點"的物件變數++++++
var ball  //目前要處理的物件，暫時放在snake(隨意取)變數內 
var balls = []  //把產生的"所有"的物件，為物件的倉庫，所有資料都在此
var score = 0  //計算加分
var score1 = 0  //計算扣分
var scoreall  //計算總分

function setup() {
  createCanvas(windowWidth,windowHeight);
  for(var i=0;i<25;i=i+1){  //i=0,1,2,3,4......,8,9
    ball = new Obj({})  //產生一個Obj class元件
    balls.push(ball)  //把snake的物件放入到snakes陣列內
  }

}

function draw() {
  background(220);
  for(var j=0;j<ball.length;j++){
    ball = balls[j]
    ball.draw()
    ball.update()
  }
}
```

## 滑鼠按下之後，消失不見 / 分數顯示
![](https://hackmd.io/_uploads/ByiTwdS8n.gif)

```javascript=
let points = [[12,0],[12,-3],[11,-6],[10,-7],[8,-7],[4,-3],[2,-3],[-1,-5],[-4,-5],[-7,-2],[-7,3.5],[-6.5,4],[-9,4],[-9,5],[-7,7],[-6,7],[-5,6],[-5,-1],[-3,-3],[-1,-3],[2,-1],[4,-1],[8,-5],[9,-5.5],[10,-5],[11,-3],[11,-2]]
var fill_colors = "353535-eb5e28-f9f7f3-6a994e-284b63-9c6644".split("-").map(a=>"#"+a)
var line_colors = "ede0d4-540b0e-f2cc8f-240046-7f5539-e0e1dd".split("-").map(a=>"#"+a)

//class:類別，粒子
class Obj{  //宣告一個類別，針對一個畫的圖案
    constructor(args){  //預設值，基本資料(物件的顏色，移動的速度、大小、初始值顯示位置......)
      //this.p = args.p || {x: random(width),y:random(height)}//描述為該物件的初始位置，|| (or)，當產生一個物件時，有傳給位置參數，則使用該參數，如果沒有傳參數，就以||(or)後面設定產出
      this.p = args.p || createVector(random(width),random(height))  //把原本{x:......,y:......}改成"向量"方式
      //this.v = {x: random(-1,1),y:random(-1,1)} //設定一個物件的移動速度
      this.v = createVector(random(-1,1),random(-1,1))  //把原本{x:......,y:......}改成"向量"方式
      this.size = random(8,20)  //一個物件的放大倍率
      this.color = random(fill_colors)  //充滿顏色
      this.stroke = random(line_colors)  //線條外框顏色
    }
     draw(){  //畫出單一個物件形狀
      push()  //執行push()後，依照我的設定，設定原點(0,0)的位置
        translate(this.p.x,this.p.y)  //依該物件位置為原點
        scale(this.v.x<0?1:-1,-1)  //?為否則(<0=1否則=-1) //x軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1，y軸的-1為上下顛倒
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(3)  //線的粗細
        beginShape()
          for(var k=0;k<points.length;k=k+1){
            //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
            //vertex(points[k][0]*this.size,points[k][1]*this.size)  //只要設定一點，當指令到endShape()，會把所有的點連接再一起
            curveVertex(points[k][0]*this.size,points[k][1]*this.size)
          }
        endShape(CLOSE)  //close可以讓線連接起來
      pop()  //執行pop()後，原點(0,0)設定為回到整個視窗的左上角
    }
update(){
      // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
      // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
      this.p.add(this.v)  //設定好向量後，使用add，就可以抵上面兩行指令
      //向量sub==> 減號
      //++++++++設定物件隨滑鼠移動++++++++
      //知道滑鼠的位置，並建立一個滑鼠的向量
      // let mouseV = createVector(mouseX,mouseY)  //把滑鼠的位置轉換成一個向量值
      // let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //sub計算出滑鼠所在位置的向量(mouseV)到物件向量(this.p)的距離，每次以3的距離
      // this.v.mag()代表該物件的速度大小(一個向量值有大小和方向)
      // this.p.add(delta)
      
      if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把x軸方向、速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
        this.v.y = -this.v.y  //把y軸方向、速度方向改變
      }
    }
        isBallinRanger(){  //功能：判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(mouseX,mouseY,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
      if(d<6*this.size){  
        return true  //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回ture的值(碰觸)
      }else{  
        return false  //滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
      }
    }
}

//++++++設定畫points所有"點"的物件變數++++++
var ball  //目前要處理的物件，暫時放在snake(隨意取)變數內 
var balls = []  //把產生的"所有"的物件，為物件的倉庫，所有資料都在此


function setup() {
  createCanvas(windowWidth,windowHeight);
  for(var i=0;i<25;i=i+1){  //i=0,1,2,3,4......,8,9
    ball = new Obj({})  //產生一個Obj class元件
    balls.push(ball)  //把snake的物件放入到snakes陣列內
  }
}

function draw() {
  background(220);
  // for(var j=0;j<snakes.length;j++){
  //   snake = snakes[j]
  //   snake.draw()
  //   snake.update()
  // }
  for(let ball of balls){
    ball.draw()
    ball.update()
  }
  fill(255)
  textSize(30)
  text(score,160,60)  //在座標為(50,50)上顯示score分數內容
  textSize(30)
  text("加分 :",70,60)

  textSize(30)
  text(score1,160,100)  //在座標為(50,50)上顯示score分數內容
  textSize(30)
  text("扣分 :",70,100)

}

function mousePressed(){
  //++++++++++++++++++產生一個物件++++++++++++++++++++++++
  // ball = new Obj({  //在滑鼠按下產生一個新的Obj class元件
  //   p:{x:mouseX,y:mouseY}
  // }) 
  // balls.push(ball)  //把ball的物件放入到balls陣列內
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //++++++在物件上按下滑鼠，物件消失不見，分數加一分+++++++
  for(let ball of balls){  //檢查每一個物件
    if(ball.isBallinRanger()){
      snakes.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
      score = score+1
    }
  }
```
---

#### 加分、扣分
---
```javascript=
fill(255)
  textSize(30)
  text(score,160,60)  //在座標為(50,50)上顯示score分數內容
  textSize(30)
  text("加分 :",70,60)

  textSize(30)
  text(score1,160,100)  //在座標為(50,50)上顯示score分數內容
  textSize(30)
  text("扣分 :",70,100)
```
---

## 設定砲台 
![](https://hackmd.io/_uploads/Byh5LpHU3.png)

```javascript=
//++++++++建立砲台++++++++
  push()  //重新規劃原點(0,0)
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)  //分子:dy 分母:dx
    translate(width/2,height/2)  //shipP.x,shipP.y
    noStroke()
    fill("#0077b6")
    rect(-25,-25,50,50)
    fill("#caf0f8")
    rotate(angle)
    triangle(50,0,-25,25,-25,-25) 
    //triangle(-25,25,25,25,0,-50)  //設定三個點，畫成一個三角形
    fill("#b8c0ff")
    ellipse(0,0,15)
  pop()  //恢復原本設定，原點(0,0)在視窗左上角
  //++++++++++++++++++++++++
```
---
---

## 建立新的class — 發射子彈 / 打中物件消失

![](https://hackmd.io/_uploads/BJwP1_HL2.gif)

```javascript=
var colors3 = "10002b-240046-3c096c-5a189a-7b2cbf-9d4edd-c77dff-e0aaff-590d22-800f2f-a4133c-c9184a-ff4d6d-ff758f-ff8fa3-ffb3c1-ffccd5-fff0f3".split("-").map(a=>"#"+a)

class Bullet{
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || 10  //設計的飛彈有大有小時。就傳參數，args
        this.p = args.p || createVector(width/2,height/2)  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)  //算出方向，limit-->每次移動5
        this.color = args.color || random(colors3)

      }
      draw(){  //繪出物件的程式碼
        push()
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)
        pop()
  
      }
      update(){  //計算出移動後的位置
        // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
        // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
        this.p.add(this.v)
      }
  }
```
---
### 設定鍵盤操作(可用鍵盤操作砲台移動)
```javascript=
if(keyIsPressed){
    if(key=="ArrowLeft" || key == "a"){  //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key == "d"){  //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key == "w"){  //按下鍵盤的往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key == "s"){  //按下鍵盤的往下鍵
      shipP.y = shipP.y+5
    }
  }
```
---
---

## 畫出第二個元件
![](https://hackmd.io/_uploads/Hys9eOSUn.png)
```javascript=
draw(){  //畫出元件
        if(this.dead == false ){
       push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color);
           noStroke();
           //++++++小雞圖形++++++
           // 身體
           ellipse(0, 0, this.r); 

        //    // 眼睛
        //    fill(255);
        //    ellipse(-this.r / 8, -this.r / 8, this.r / 3.5);
        //    //ellipse(this.r / 4, -this.r / 4, this.r / 4);
           
        //    //眼珠
        //    fill(0)
        //    ellipse(-this.r / 8, -this.r / 8, this.r / 5.5)

        //    //眼白
        //    fill(255)
        //    ellipse(-this.r / 9, -this.r / 7, this.r / 17)

           // 嘴巴
           fill(this.color1);
           triangle(-this.r / 1.3, -this.r / 4, -this.r / 2, -this.r / 28, -this.r / 3, -this.r / 3);
                   
           // 腳
           fill("#5e3023");
           rect(-this.r / 3, this.r / 3, this.r / 10, this.r / 3);
           rect(this.r / 4 - this.r / 6, this.r / 2.5, this.r / 10, this.r / 3);
           rotate(PI/4)
           rect(this.r / 13, this.r / 2, this.r /10 ,this.r /4)
           rect(this.r / 2.5, this.r / 4, this.r /10 ,this.r /4)
        }
```
---

---

## 被打擊後有變化
![](https://hackmd.io/_uploads/BJo4r_rUh.gif)
```javascript=
var colors1 = "ffff3f-fdc5f5-e4c1f9-ffa3a5-ffbf81-ffdc5e-FFB600".split("-").map(a=>"#"+a)
var colors2 = "ff4800-ff5400-ff6000-ff6d00-ff7900-ff8500-ff9100".split("-").map(a=>"#"+a)

class Monster{  //宣稱一個怪物類別。它稱為Monster
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || random(30,100)  //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有傳參數，就以100為主
        this.p = args.p || createVector(random(width),random(height))  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(random(-1,1),random(-1,1))  //移動的速度，如果沒有傳參數args，就會利用亂數(-1,1)，抽出x,y軸的移動速度
        this.color = args.color || random(colors1)
        this.color1 = args.color || random(colors2)
        this.mode = random(["happy","bad"])
        this.dead = false  //代表活著
        this.timenum = 0 //延長時間，讓大家看到他死
      }
    draw(){  //畫出元件
        if(this.dead == false ){
       push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color);
           noStroke();
           //++++++小雞圖形++++++
           // 身體
           ellipse(0, 0, this.r); 

        //    // 眼睛
        //    fill(255);
        //    ellipse(-this.r / 8, -this.r / 8, this.r / 3.5);
        //    //ellipse(this.r / 4, -this.r / 4, this.r / 4);
           
        //    //眼珠
        //    fill(0)
        //    ellipse(-this.r / 8, -this.r / 8, this.r / 5.5)

        //    //眼白
        //    fill(255)
        //    ellipse(-this.r / 9, -this.r / 7, this.r / 17)

           // 嘴巴
           fill(this.color1);
           triangle(-this.r / 1.3, -this.r / 4, -this.r / 2, -this.r / 28, -this.r / 3, -this.r / 3);
                   
           // 腳
           fill("#5e3023");
           rect(-this.r / 3, this.r / 3, this.r / 10, this.r / 3);
           rect(this.r / 4 - this.r / 6, this.r / 2.5, this.r / 10, this.r / 3);
           rotate(PI/4)
           rect(this.r / 13, this.r / 2, this.r /10 ,this.r /4)
           rect(this.r / 2.5, this.r / 4, this.r /10 ,this.r /4)
           //++++++++++++++++++++++++++++++++++++++++++++++
            if(this.mode=="happy"){
               fill(255);
               ellipse(-this.r / 8, -this.r / 8, this.r / 3.5);
               fill(0)
               ellipse(-this.r / 8, -this.r / 8, this.r / 5.5)
               fill(255)
               ellipse(-this.r / 9, -this.r / 7, this.r / 17)

           }else{
               fill(255)
               arc(-this.r / 8, -this.r / 8, this.r / 3.5,this.r / 3.5,0,PI)
               fill(0)
               arc(-this.r / 8, -this.r / 8, this.r / 5.5,this.r / 5.5,0,PI)
               fill(255)
               arc(-this.r / 9, -this.r / 7, this.r / 17,this.r / 17,0,PI)

            }
        
           pop();
         }
         else{  //怪物死亡
            this.timenum = this.timenum + 1
        push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)

           // 嘴巴
           fill(this.color1);
           triangle(-this.r / 1.3, -this.r / 4, -this.r / 2, -this.r / 28, -this.r / 3, -this.r / 3);

           // 腳
           fill("#5e3023");
           rect(-this.r / 3, this.r / 3, this.r / 10, this.r / 3);
           rect(this.r / 4 - this.r / 6, this.r / 2.5, this.r / 10, this.r / 3);
           rotate(PI/4)
           rect(this.r / 13, this.r / 2, this.r /10 ,this.r /4)
           rect(this.r / 2.5, this.r / 4, this.r /10 ,this.r /4)
        pop()
        }
    }
         update(){  //計算移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x  //把x軸方向、速度方向改變
          }
        if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
            this.v.y = -this.v.y  //把y軸方向、速度方向改變
          }
       }
       isBallInRanger(x,y){  //功能:判斷飛彈是否在怪物範圍內
        let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
        if(d<this.r/2){  
            return true  //飛彈(x,y)與物件的距離(this)
        }else{  
            return false  //飛彈(x,y)與物件的距離(this)，滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
        }
    }
    }       
       
```


---


## 計算得分 — 加分 / 扣分


### 打到蛇的圖案扣分
![](https://hackmd.io/_uploads/S1tycTSUh.gif)

```javascript=
for(let ball of balls){  //只要是陣列的方式，都可以利用此方式來做
    ball.draw()
    ball.update()
    for(let bullet of bullets){  //檢查每一個物件
      if(ball.isBallinRanger(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score-1
        snakes_sound.play()
      }
    }
  }

```
---
### 打到小雞的圖案加分
![](https://hackmd.io/_uploads/SkpBtpH82.gif)

```javascript=
  //++++++++++怪物的顯示++++++++
  for(let monster of monsters)  //只要是陣列的方式，都可以利用此方式來做
      {
        if(monster.dead == true  && monster.timenum>4 ){
          monsters.splice(monsters.indexOf(monster),1)  //從倉庫monster取出，只取一個
        }
        monster.draw()
        monster.update()
        for(let bullet of bullets){  //檢查每一個物件
          if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
            //monsters.splice(monsters.indexOf(monster),1)  //從倉庫monsters取出，只取1個
            bullets.splice(bullets.indexOf(bullet),1)
            score = score+1
            monster.dead = true //
            monster_sound.play()
        }
       }
    }
```


---
---
## 加入背景圖
![](https://hackmd.io/_uploads/H16m5aH82.png)
```javascript=
let img

function preload(){  //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  snakes_sound = loadSound("sound/RPT01.wav"); //蛇的聲音
  bullet_sound = loadSound("sound/Launching wire.wav");  //飛彈聲音
  monster_sound = loadSound("sound/BRDS75.wav");  //小雞的聲音
  //img = loadImage("1.jpg");  //背景圖
  img = loadImage("image/1.jpg"); 
}

function draw() {
  background(img)
}
```

---

## 加入音樂
```javascript=
let bgMusic //設定背景音樂

function preload(){  //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  snakes_sound = loadSound("Sound/RPT01.WAV"); //蛇的聲音
  bullet_sound = loadSound("Sound/Launching wire.wav");  //飛彈聲音
  monster_sound = loadSound("Sound/BRDS75.wav");  //小雞的聲音
  bgMusic = loadSound("Sound/bg.mp3");  // 載入音樂檔案
  sad_sound = loadSound("Sound/sad.mp3"); //通關失敗
  happy_sound = loadSound("Sound/clap.mp3"); //成功過關

  bgMusic.onloadedmetadata = function() {
  bgMusic.loop();
  }
  img = loadImage("image/1.jpg"); //背景圖
  // ima = loadImage('image/2.png');
} 
```
```javascript=
//++++++++++蛇的顯示++++++++
for(let ball of balls){  //只要是陣列的方式，都可以利用此方式來做
    ball.draw()
    ball.update()
    for(let bullet of bullets){  //檢查每一個物件
      if(ball.isBallinRanger(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score-1
        snakes_sound.play()
      }
    }
  }
//++++++++++小雞的顯示++++++++
  for(let monster of monsters)  //只要是陣列的方式，都可以利用此方式來做
      {
        if(monster.dead == true  && monster.timenum>4 ){
          monsters.splice(monsters.indexOf(monster),1)  //從倉庫monster取出，只取一個
        }
        monster.draw()
        monster.update()
        for(let bullet of bullets){  //檢查每一個物件
          if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
            //monsters.splice(monsters.indexOf(monster),1)  //從倉庫monsters取出，只取1個
            bullets.splice(bullets.indexOf(bullet),1)
            score = score+1
            monster.dead = true //
            monster_sound.play()
        }
       }
    }
```
#### 通關失敗
```javascript=
if(balls. length == 7){
    background ("#ffe1a8"); //顯示遊戲結束文字
    fill("#14213d");
    textSize (40);
    textAlign (CENTER, CENTER);
    text("小雞都被蛇吃掉啦！",width/2,height/2+100)
    textSize (30)
    text("Game Over",width/2,height/2 - 100)
    textSize(32)
    text("最終成績："+scoreall, width/2, height/2 - 200 ); //顯示分數
    
    bgMusic.stop()
    sad_sound.play()
    //禁用所有的按鍵和滑鼠事件
    noLoop (); noCursor ();
  }
}
```
#### 通關成功
```javascript=
if (monsters. length == 0){ //清空畫面，以便顯示遊戲結束畫面
            background ("#ffe1a8"); //顯示遊戲結束文字
            fill("#14213d");
            textSize (40);
            textAlign (CENTER, CENTER);
            text("恭喜你成功拯救小雞們！",width/2,height/2+100)
            textSize (30)
            text("遊戲結束",width/2,height/2 - 100)
            textSize(32)
            text("最終成績："+scoreall, width/2, height/2 - 200 ); //顯示分數
            
            bgMusic.stop()
            happy_sound.play()
            //禁用所有的按鍵和滑鼠事件
            noLoop (); noCursor ();
        }
```

---

## 結束後顯示畫面
![](https://hackmd.io/_uploads/r10iq6SUh.png)
```javascript=
if (monsters. length == 0){ //清空畫面，以便顯示遊戲結束畫面
            background ("#ffe1a8"); //顯示遊戲結束文字
            fill("#14213d");
            textSize (40);
            textAlign (CENTER, CENTER);
            text("恭喜你成功拯救小雞們！",width/2,height/2+100)
            textSize (30)
            text("遊戲結束",width/2,height/2 - 100)
            textSize(32)
            text("最終成績："+scoreall, width/2, height/2 - 200 ); //顯示分數
            
            //禁用所有的按鍵和滑鼠事件
            noLoop (); noCursor ();
        }
```
### 打到七隻蛇(含)以上
![](https://hackmd.io/_uploads/SkprENII2.png)

```javascript=
if(balls. length == 7){
    background ("#ffe1a8"); //顯示遊戲結束文字
    fill("#14213d");
    textSize (40);
    textAlign (CENTER, CENTER);
    text("小雞都被蛇吃掉啦！",width/2,height/2+100)
    textSize (30)
    text("Game Over",width/2,height/2 - 100)
    textSize(32)
    text("最終成績："+scoreall, width/2, height/2 - 200 ); //顯示分數
    
    //禁用所有的按鍵和滑鼠事件
    noLoop (); noCursor ();

}
```
---

---
## 全部程式碼
#### sketch.js
```javascript=
let points = [[12,0],[12,-3],[11,-6],[10,-7],[8,-7],[4,-3],[2,-3],[-1,-5],[-4,-5],[-7,-2],[-7,3.5],[-6.5,4],[-9,4],[-9,5],[-7,7],[-6,7],[-5,6],[-5,-1],[-3,-3],[-1,-3],[2,-1],[4,-1],[8,-5],[9,-5.5],[10,-5],[11,-3],[11,-2]]

var fill_colors = "353535-eb5e28-f9f7f3-6a994e-284b63-9c6644".split("-").map(a=>"#"+a)
var line_colors = "ede0d4-540b0e-f2cc8f-240046-7f5539-e0e1dd".split("-").map(a=>"#"+a)

//++++++設定畫points所有"點"的物件變數++++++
var ball  //目前要處理的物件，暫時放在ball(隨意取)變數內 
var balls = []  //把產生的"所有"的物件，為物件的倉庫，所有資料都在此

//++++++設定飛彈物件的變數++++++
var bullet  //"目前要處理"的物件，暫時放在bullet變數內
var bullets = []  //把產生"所有"的物件，為物件的倉庫，所有物件資料都在此

//++++++設定怪物物件的變數++++++
var monster  //"目前要處理"的物件，暫時放在monster變數內
var monsters = []  //把產生"所有"的物件，為物件的倉庫，所有物件資料都在此

//++++++設定砲台的位置++++++
var shipP

var score = 0  //計算加分
var score1 = 0  //計算扣分
var scoreall  //計算總分

let img  //設定背景

let bgMusic //設定背景音樂

function preload(){  //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  snakes_sound = loadSound("Sound/RPT01.WAV"); //蛇的聲音
  bullet_sound = loadSound("Sound/Launching wire.wav");  //飛彈聲音
  monster_sound = loadSound("Sound/BRDS75.wav");  //小雞的聲音
  bgMusic = loadSound("Sound/bg.mp3");  // 載入音樂檔案
  sad_sound = loadSound("Sound/sad.mp3");  //通關失敗
  happy_sound = loadSound("Sound/clap.mp3");  //成功過關

  bgMusic.onloadedmetadata = function() {
  bgMusic.loop();
  }
  img = loadImage("image/1.jpg"); //背景圖
  // ima = loadImage('image/2.png');
} 


function setup() {
  createCanvas(windowWidth,windowHeight);
  bgMusic.loop();  // 播放音樂，並設定為循環播放
  shipP = createVector(width/2,height/2)  //預設砲台的位置為(width/2,height/2)

  for(var i=0;i<15;i=i+1){  //i=0,1,2,3,4......,8,9
    ball = new Obj({})  //產生一個Obj class元件
    balls.push(ball)  //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4......,8,9
    monster = new Monster({})  //產生一個Monster class元件
    monsters.push(monster)  //把ball的物件放入到monsters陣列內
  }

}

function draw() {
  background(img)
  // for(var j=0;j<balls.length;j++){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }

  if(keyIsPressed){
    if(key=="ArrowLeft" || key == "a"){  //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key == "d"){  //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key == "w"){  //按下鍵盤的往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key == "s"){  //按下鍵盤的往下鍵
      shipP.y = shipP.y+5
    }
  }
  //++++++++++蛇的顯示++++++++
  for(let ball of balls){  //只要是陣列的方式，都可以利用此方式來做
    ball.draw()
    ball.update()
    for(let bullet of bullets){  //檢查每一個物件
      if(ball.isBallinRanger(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score1 = score1 - 6
        scoreall = score + score1
        snakes_sound.play()
      }
    }
  }
        

  //++++++++++飛彈的顯示+++++++++
  for(let bullet of bullets){  //只要是陣列的方式，都可使用此方式處理
    bullet.draw()
    bullet.update()
  }

  //++++++++++小雞的顯示++++++++
  for(let monster of monsters)  //只要是陣列的方式，都可以利用此方式來做
      {
        if(monster.dead == true  && monster.timenum>4 ){
          monsters.splice(monsters.indexOf(monster),1)  //從倉庫monster取出，只取一個
        }
        monster.draw()
        monster.update()
        for(let bullet of bullets){  //檢查每一個物件
          if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
            //monsters.splice(monsters.indexOf(monster),1)  //從倉庫monsters取出，只取1個
            bullets.splice(bullets.indexOf(bullet),1)
            score = score + 5
            scoreall = score + score1
            monster.dead = true //
            monster_sound.play()
        }
       }
    }
  fill(255)
  textSize(30)
  text(score,160,60)  //在座標為(50,50)上顯示score分數內容
  textSize(30)
  text("加分 :",70,60)

  textSize(30)
  text(score1,160,100)  //在座標為(50,50)上顯示score分數內容
  textSize(30)
  text("扣分 :",70,100)
  
  
  //++++++++建立砲台++++++++
  push()  //重新規劃原點(0,0)
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)  //分子:dy 分母:dx
    translate(shipP.x,shipP.y)  //shipP.x,shipP.y
    noStroke()
    fill("#0077b6")
    rect(-25,-25,50,50)
    fill("#caf0f8")
    rotate(angle)
    triangle(50,0,-25,25,-25,-25) 
    //triangle(-25,25,25,25,0,-50)  //設定三個點，畫成一個三角形
    fill("#b8c0ff")
    ellipse(0,0,15)
  pop()  //恢復原本設定，原點(0,0)在視窗左上角
  //++++++++++++++++++++++++

  if(balls. length == 7){
    background ("#ffe1a8"); //顯示遊戲結束文字
    fill("#14213d");
    textSize (40);
    textAlign (CENTER, CENTER);
    text("小雞都被蛇吃掉啦！",width/2,height/2+100)
    textSize (30)
    text("Game Over",width/2,height/2 - 100)
    textSize(32)
    text("最終成績："+scoreall, width/2, height/2 - 200 ); //顯示分數
    
    bgMusic.stop()
    sad_sound.play()
    //禁用所有的按鍵和滑鼠事件
    noLoop (); noCursor ();
  }
}



function mousePressed(){
  //++++++++++++++++++產生一個物件++++++++++++++++++++++++
  // ball = new Obj({  //在滑鼠按下產生一個新的Obj class元件
  //   p:{x:mouseX,y:mouseY}
  // }) 
  // balls.push(ball)  //把ball的物件放入到balls陣列內
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++


  //++++++在物件上按下滑鼠，物件消失不見，分數加一分+++++++
  //   for(let ball of balls){  //檢查每一個物件
  //     if(ball.isBallinRanger(mouseX,mouseY)){
  //       balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
  //       score = score+1
  //     }
  //   }

 //++++++按一下產生一個飛彈+++++++
 bullet = new Bullet({r:25})  //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)  //大括號內可以加上參數
 bullets.push(bullet)  //把bullet的物件放入bullets陣列內(放入倉庫)
 bullet_sound.play()
}
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++

function keyPressed(){
  if(key==" "){  //按下空白鍵，發射飛彈，其實跟按下滑鼠的功能一樣
    bullet = new Bullet({r:25})  //在滑鼠按下的地方，產生一個新的Bullet class
    bullets.push(bullet)  //把bullet的物件放入到bullets陣列內(丟到倉庫)
    bullet_sound.play()
  }  
  
}
```
#### obj.js
```javascript=
//class:類別，粒子
class Obj{  //宣告一個類別，針對一個畫的圖案
    constructor(args){  //預設值，基本資料(物件的顏色，移動的速度、大小、初始值顯示位置......)
      //this.p = args.p || {x: random(width),y:random(height)}//描述為該物件的初始位置，|| (or)，當產生一個物件時，有傳給位置參數，則使用該參數，如果沒有傳參數，就以||(or)後面設定產出
      this.p = args.p || createVector(random(width),random(height))  //把原本{x:......,y:......}改成"向量"方式
      //this.v = {x: random(-1,1),y:random(-1,1)} //設定一個物件的移動速度
      this.v = createVector(random(-1,1),random(-1,1))  //把原本{x:......,y:......}改成"向量"方式
      this.size = random(5,15)  //一個物件的放大倍率
      this.color = random(fill_colors)  //充滿顏色
      this.stroke = random(line_colors)  //線條外框顏色
    }
    draw(){  //畫出單一個物件形狀
      push()  //執行push()後，依照我的設定，設定原點(0,0)的位置
        translate(this.p.x,this.p.y)  //依該物件位置為原點
        scale(this.v.x<0?1:-1,-1)  //?為否則(<0=1否則=-1) //x軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1，y軸的-1為上下顛倒
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(3)  //線的粗細
        beginShape()
          for(var k=0;k<points.length;k=k+1){
            //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
            //vertex(points[k][0]*this.size,points[k][1]*this.size)  //只要設定一點，當指令到endShape()，會把所有的點連接再一起
            curveVertex(points[k][0]*this.size,points[k][1]*this.size)
          }
          endShape(CLOSE)  //close可以讓線連接起來
      pop()  //執行pop()後，原點(0,0)設定為回到整個視窗的左上角
    }
    update(){
      // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
      // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
      this.p.add(this.v)  //設定好向量後，使用add，就可以抵上面兩行指令
      //向量sub==> 減號
      //知道滑鼠的位置，並建立一個滑鼠的向量
      // let mouseV = createVector(mouseX,mouseY)  //把滑鼠的位置轉換成一個向量值
      // let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //sub計算出滑鼠所在位置的向量(mouseV)到物件向量(this.p)的距離，每次以3的距離
      // //this.v.mag()代表該物件的速度大小(一個向量值有大小和方向)
      // this.p.add(delta)
      
      if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把x軸方向、速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
        this.v.y = -this.v.y  //把y軸方向、速度方向改變
      }
    }
    isBallinRanger(x,y){  //功能：判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
      if(d<6*this.size){  
        return true  //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回ture的值(碰觸)
      }else{  
        return false  //滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
      }

    }
}


```
#### Bullet.js
```javascript=
var colors3 = "10002b-240046-3c096c-5a189a-7b2cbf-9d4edd-c77dff-e0aaff-590d22-800f2f-a4133c-c9184a-ff4d6d-ff758f-ff8fa3-ffb3c1-ffccd5-fff0f3".split("-").map(a=>"#"+a)

class Bullet{
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || 10  //設計的飛彈有大有小時。就傳參數，args
        this.p = args.p || shipP.copy() //createVector(width/2,height/2)  建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)  //算出方向，limit-->每次移動5
        this.color = args.color || random(colors3)
      }
      draw(){  //繪出物件的程式碼
        push()
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)  
        pop()
  
      }
      update(){  //計算出移動後的位置
        // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
        // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
        this.p.add(this.v)
      }
  }
```
#### monster.js
```javascript=
var colors1 = "ffff3f-fdc5f5-e4c1f9-ffa3a5-ffbf81-ffdc5e-FFB600".split("-").map(a=>"#"+a)
var colors2 = "ff4800-ff5400-ff6000-ff6d00-ff7900-ff8500-ff9100".split("-").map(a=>"#"+a)

class Monster{  //宣稱一個怪物類別。它稱為Monster
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || random(30,100)  //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有傳參數，就以100為主
        this.p = args.p || createVector(random(width),random(height))  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(random(-1,1),random(-1,1))  //移動的速度，如果沒有傳參數args，就會利用亂數(-1,1)，抽出x,y軸的移動速度
        this.color = args.color || random(colors1)
        this.color1 = args.color || random(colors2)
        this.mode = random(["happy","bad"])
        this.dead = false  //代表活著
        this.timenum = 0 //延長時間，讓大家看到他死
      }
    draw(){  //畫出元件
        if(this.dead == false ){
       push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color);
           noStroke();
           //++++++小雞圖形++++++
           // 身體
           ellipse(0, 0, this.r); 

        //    // 眼睛
        //    fill(255);
        //    ellipse(-this.r / 8, -this.r / 8, this.r / 3.5);
        //    //ellipse(this.r / 4, -this.r / 4, this.r / 4);
           
        //    //眼珠
        //    fill(0)
        //    ellipse(-this.r / 8, -this.r / 8, this.r / 5.5)

        //    //眼白
        //    fill(255)
        //    ellipse(-this.r / 9, -this.r / 7, this.r / 17)

           // 嘴巴
           fill(this.color1);
           triangle(-this.r / 1.3, -this.r / 4, -this.r / 2, -this.r / 28, -this.r / 3, -this.r / 3);
                   
           // 腳
           fill("#5e3023");
           rect(-this.r / 3, this.r / 3, this.r / 10, this.r / 3);
           rect(this.r / 4 - this.r / 6, this.r / 2.5, this.r / 10, this.r / 3);
           rotate(PI/4)
           rect(this.r / 13, this.r / 2, this.r /10 ,this.r /4)
           rect(this.r / 2.5, this.r / 4, this.r /10 ,this.r /4)
           //++++++++++++++++++++++++++++++++++++++++++++++
            if(this.mode=="happy"){
               fill(255);
               ellipse(-this.r / 8, -this.r / 8, this.r / 3.5);
               fill(0)
               ellipse(-this.r / 8, -this.r / 8, this.r / 5.5)
               fill(255)
               ellipse(-this.r / 9, -this.r / 7, this.r / 17)

           }else{
               fill(255)
               arc(-this.r / 8, -this.r / 8, this.r / 3.5,this.r / 3.5,0,PI)
               fill(0)
               arc(-this.r / 8, -this.r / 8, this.r / 5.5,this.r / 5.5,0,PI)
               fill(255)
               arc(-this.r / 9, -this.r / 7, this.r / 17,this.r / 17,0,PI)

            }
        
           pop();
         }
         else{  //怪物死亡
            this.timenum = this.timenum + 1
        push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)

           // 嘴巴
           fill(this.color1);
           triangle(-this.r / 1.3, -this.r / 4, -this.r / 2, -this.r / 28, -this.r / 3, -this.r / 3);

           // 腳
           fill("#5e3023");
           rect(-this.r / 3, this.r / 3, this.r / 10, this.r / 3);
           rect(this.r / 4 - this.r / 6, this.r / 2.5, this.r / 10, this.r / 3);
           rotate(PI/4)
           rect(this.r / 13, this.r / 2, this.r /10 ,this.r /4)
           rect(this.r / 2.5, this.r / 4, this.r /10 ,this.r /4)

           stroke(this.color)
           strokeWeight(3)
           noFill()
           //line(this.r/2,0,this.r,0)
        for(var j=0;j<3;j++){
           rotate(PI/-6)
           beginShape()
           for(var i=0;i<(this.r/2);i++){
            vertex(this.r/2+i,sin(i/7+frameCount/10)*5)

           }
           endShape()
        }
        pop()
        }
        if (monsters. length == 0){ //清空畫面，以便顯示遊戲結束畫面
            background ("#ffe1a8"); //顯示遊戲結束文字
            fill("#14213d");
            textSize (40);
            textAlign (CENTER, CENTER);
            text("恭喜你成功拯救小雞們！",width/2,height/2+100)
            textSize (30)
            text("遊戲結束",width/2,height/2 - 100)
            textSize(32)
            text("最終成績："+scoreall, width/2, height/2 - 200 ); //顯示分數
            
            bgMusic.stop()
            happy_sound.play()
            //禁用所有的按鍵和滑鼠事件
            noLoop (); noCursor ();
        }
    }
         update(){  //計算移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x  //把x軸方向、速度方向改變
          }
        if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
            this.v.y = -this.v.y  //把y軸方向、速度方向改變
          }
       }
       isBallInRanger(x,y){  //功能:判斷飛彈是否在怪物範圍內
        let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
        if(d<this.r/2){  
            return true  //飛彈(x,y)與物件的距離(this)
        }else{  
            return false  //飛彈(x,y)與物件的距離(this)，滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
        }
    }
    }       
       
```

---
