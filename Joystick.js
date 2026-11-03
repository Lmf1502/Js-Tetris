class joystick {
    constructor(tetris,animator){
        this.tetris = tetris;
        this.animator=animator;
        this.initControls();
    }
    initControls(){
        document.addEventListener("keydown",(event)=>{
            let direction = null;
            switch(event.key){
                case "a":
                case "ArrowLeft":
                    direction = "left";
                    break;
                case "d":
                case "ArrowRight":
                    direction = "right";
                    break;
                case "s":
                case "ArrowDown":
                    direction = "down";
                    break;
                case "w":
                case "ArrowUp":
                    this.tetris.rotateMino(true);
                    break;
                case "p":
                    this.animator.stop();
                    break;
                case "l":
                    this.animator.start();
            }
            if(direction){
                this.tetris.moveMino(direction);
            }
        });
    }
}