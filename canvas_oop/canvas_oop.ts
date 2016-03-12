

 /**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;
    width;
    height;
    x = 0;
    y = 0;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0,0,this.width, this.height);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100;

    height = 40;
    
    

    color = '#FFF000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(-80, -30, this.width, this.height);
    }
}

class TextField extends DisplayObject {

    render(context: CanvasRenderingContext2D) {
        context.font = "20px Arial";
        context.fillStyle = '#FFFFFF';
        context.fillText('Play', -80, -10);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


var rect = new Rect();
rect.width = 100;
rect.height = 40;
rect.x = 300;
rect.y = 300;
rect.color = '#681616'


var rect2 = new Rect();
rect2.width = 300;
rect2.height = 50;
rect2.x = 200;
rect2.y = 200;
rect2.rotation = Math.PI / 8;
rect2.color = '#00FFFF'

var text = new TextField();
text.x = 330;
text.y = 305;

var bitmap = new Bitmap();
bitmap.width = 550;
bitmap.height = 421;
bitmap.source = 'beijing.jpg';

var bitmap1 = new Bitmap();
bitmap1.width = 50;
bitmap1.height =50;
bitmap1.x = 470;
bitmap1.y = 333;
bitmap1.source = 'mogu.png'

var bitmap2 = new Bitmap();
bitmap2.width = 50;
bitmap2.height =50;
bitmap2.x = 220;
bitmap2.y = 333;
bitmap2.source = 'mogu.png'



//渲染队列
var renderQueue = [bitmap,bitmap1,bitmap2,rect, text];
//资源加载列表
var imageList = ['beijing.jpg','mogu.png'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})

 












