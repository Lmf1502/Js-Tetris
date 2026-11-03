class grid{
    constructor(Columns, Rows){
        this.columns = Columns;
        this.rows = Rows;
        this.grid=[];
        this.setup();
    }
    setup(){
        for(let i=0;i<this.columns;i++){
            let column=[];
            for(let j=0;j<this.rows;j++){
                column.push(new cell(i,j,cellSize));
            }
            this.grid.push(column);
        }
    }
    get(Column, Row){
        if(Column>=0&&Column<this.columns&&Row>=0&&Row<this.rows){
            return this.grid[Column][Row];
        }
        return undefined;
    }
}
 class cell{
    constructor(Column, Row, Size){
        this.column = Column;
        this.row = Row;
        this.size = Size;
        this.color = undefined;
        }
    setColor(Color){
        this.color = Color;
    }
}