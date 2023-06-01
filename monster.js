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
       