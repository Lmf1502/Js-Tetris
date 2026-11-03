
class animator{
    constructor(fps, stepInterval,updateFunction){
        this.fps = fps;
        this.stepInterval = stepInterval;
        this.frameDuration = 1000 / fps;
        this.lastFrameTime = 0;
        this.lastStepTime = 0;
        this.running = false;
        this.updateFunction = updateFunction;
    }
    animate(currentTime){
        if(!this.running) return;
        let deltaTime = currentTime - this.lastFrameTime;
        let stepDeltaTime = currentTime - this.lastStepTime;
        if(deltaTime >= this.frameDuration){
            this.lastFrameTime = currentTime;
            if(stepDeltaTime >= this.stepInterval){
                this.lastStepTime = currentTime;
                this.updateFunction();  
            }  
        }
        requestAnimationFrame(this.animate.bind(this));
    }
    start(){
        this.running = true;
        requestAnimationFrame(this.animate.bind(this));
    }
    stop(){
        this.running = false;
    }
    speedUp(){
        this.fps += 1;
        this.frameDuration = 1000 / this.fps;
    }
    slowDown(){
        this.fps = Math.max(1,this.fps - 1);
        this.frameDuration = 1000 / this.fps;
    }
}