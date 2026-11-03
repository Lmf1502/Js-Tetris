class renderer{
    constructor(ctx,cellSize,gridWidth,gridHeight){
        this.ctx = ctx;
        this.cellSize = cellSize;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.SpriteSheet = new Image();
        this.SpriteSheet.src = "TetrisSpriteSheet.png";
        this.frame = 0;
    }
    clearCanvas(){
        this.ctx.clearRect(0,0,this.gridWidth,this.gridHeight);
    }
    Frame(){
        this.frame++;
        if( this.frame >= 3){
            this.frame = 0;
           }
    }
    drawCell(X,Y,color){
        if(color == undefined){
            this.ctx.strokeStyle = "grey";
            this.ctx.strokeRect(X,Y,this.cellSize,this.cellSize);
        } else{
            this.ctx.fillStyle = color;
            this.ctx.fillRect(X,Y,this.cellSize,this.cellSize);
            this.ctx.strokeStyle = "white";
            this.ctx.strokeRect(X,Y,this.cellSize,this.cellSize);
        }
    }
    drawGrid(grid){
        this.clearCanvas();
        for(let col of grid){
            for(let cell of col){
                let x = cell.column * this.cellSize;
                let y = cell.row * this.cellSize;
                this.drawSprite(x,y,cell.color);
            }
        }
    }
    drawSprite(X,Y,color){
        if(color == undefined){
            this.ctx.strokeStyle = "grey";
            this.ctx.strokeRect(X,Y,this.cellSize,this.cellSize);
        } else{
            
            this.ctx.drawImage(this.SpriteSheet,color*this.cellSize,this.frame*this.cellSize,this.cellSize,this.cellSize,X,Y,this.cellSize,this.cellSize);
           
        }
    }
}