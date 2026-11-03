class tetris{
    constructor(grid,renderer){
        this.grid = grid;
        this.renderer = renderer;
        this.locations=[];
        this.currentMino = null;
        this.startX=3;
        this.startY=0;
        this.tetrominos = {
            L:[[0,0],[1,0],[2,0],[0,1]],
            J:[[0,0],[1,0],[2,0],[2,1]],
            T:[[0,0],[1,0],[2,0],[1,1]],
            S:[[2,0],[1,0],[1,1],[0,1]],
            Z:[[0,0],[1,0],[1,1],[2,1]],
            O:[[1,0],[1,1],[2,0],[2,1]],
            I:[[0,0],[1,0],[2,0],[3,0]]    
        }
        this.colors =[0,1,2,3,4,5,6];
        //["red","blue","yellow","purple","green","orange","cyan"];
    }
    getRandMino(){
        const types = Object.keys(this.tetrominos);
        const randomIndex = Math.floor(Math.random() * types.length);
        const type = types[randomIndex];
        return { shape: this.tetrominos[type],color:this.colors[randomIndex]};
    }
    deleteMino(){
        this.locations.forEach(({x,y})=>this.grid.get(x,y).setColor(undefined));
    }
    setMinoColor(){
        this.locations.forEach(({x,y})=> 
            this.grid.get(x,y).setColor(this.currentMino.color));
    }
    spawnMino(){
        this.currentMino = this.getRandMino();
        this.locations = this.currentMino.shape.map(([x,y])=>({
            x: this.startX+x,
            y: this.startY+y
        }));
        if(this.checkCollision(this.locations)){
            this.setMinoColor();
        }else{
            
        }
        
    }
    moveMino(direction){
        this.renderer.clearCanvas();
        this.deleteMino();
        let newLocations =this.locations.map(loc=>{
            if(direction == "left")return{x:loc.x-1,y:loc.y};
            if(direction == "right")return{x:loc.x+1,y:loc.y};
            if(direction == "down")return{x:loc.x,y:loc.y+1};
            return loc;
        });
        if(this.checkCollision(newLocations)){
            if(direction==="down"){
                this.setMinoColor();
                this.clearCompletedRows();
                this.spawnMino();
            }else{
                this.setMinoColor();
            }
        }else{
            this.locations = newLocations;
            this.setMinoColor();
        }
        this.renderer.drawGrid(Grid.grid);
        this.renderer.Frame();
    }
    checkCollision(newLocations){
        return newLocations.some(({x,y})=>{
            if(x<0||x>=this.grid.columns||y<0||y>=this.grid.rows){
                return true;
            }
            const cell=this.grid.get(x,y);
            return cell&&cell.color!==undefined;
        });
    }
    clearCompletedRows(){
        for(let y=0; y<this.grid.rows;y++){
            const isRowComplete = this.grid.grid.every(column=>column[y]&&column[y].color!==undefined);
            if(isRowComplete){
                for(let x=0;x<this.grid.columns;x++){
                    this.grid.get(x,y).setColor(undefined);
                }
                for(let i=y;i>0;i--){
                    for(let x=0;x<this.grid.columns;x++){
                        const aboveCell=this.grid.get(x,i-1);
                        const currentCell=this.grid.get(x,i);
                        currentCell.setColor(aboveCell.color);
                    }
                }
                y--;
            }
        }
    }
    greatestX(){
        let greatestX =0;
        for(let i=0;i<this.locations.length;i++){
            let value=this.locations[i];
            if(value[0]>greatestX){
                greatestX=value[0];
            }
        }
        return greatestX;
    }
    rotateMino(clockwise=true){
        let pivot = this.locations[1];
        let newLocations = this.locations.map(({x,y})=>{
            let relX=x-pivot.x;
            let relY=y-pivot.y;
            let rotatedX=clockwise?-relY:relY;
            let rotatedY=clockwise?relX:-relX;
            return{
                x:pivot.x+rotatedX,
                y:pivot.y+rotatedY
            };
        });
        if(this.checkCollision(newLocations)){
            this.deleteMino();
            this.locations=newLocations;
            this.setMinoColor();
            this.renderer.drawGrid(this.grid.grid);
        }
    }
}