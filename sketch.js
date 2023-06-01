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