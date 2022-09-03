const Canvas=document.getElementById('canvas1');
const ctx=Canvas.getContext('2d');
Canvas.width=window.innerWidth;
Canvas.height=window.innerHeight;
const particles=[];


window.addEventListener('resize',()=>
{
    Canvas.width=window.innerWidth;
    Canvas.height=window.innerHeight;
// ctx.fillStyle="rgb(250,250,250)";
// //The First Two Argument are Position x and y, the two argumens are Width and height
// ctx.fillRect(10,10,50,50);

});

const mouse={
    x:undefined,
    y:undefined,
};

Canvas.addEventListener('click',(e)=>{
    mouse.x=e.x;
    mouse.y=e.y;
});

Canvas.addEventListener('mousemove',(e)=>{
    mouse.x=e.x;
    mouse.y=e.y;
});

class Particle
{
    constructor()
    {
        // this.x=mouse,x;
        // this.y=mouse.y;
        this.x=Math.random()*Canvas.width;
        this.y=Math.random()*Canvas.height;
        this.size=Math.floor(Math.random*5)+1;
        this.speedX=Math.random()*3-1.5;
        this.speedY=Math.random()*3-1.5;
    }
    
    update()
    {
        this.x+=this.speedX;
        this.y+=this.speedY;  
    }

    draw()
    {
       ctx.fillStyle='lightgreen';
       ctx.beginPath();
       ctx.arc(this.x,this.y,30,0,Math.PI*2);
       ctx.fill();
    }

}


function ParticleCreater()
{
    for(let i=0;i<100;i++)
    {
        particles.push(new Particle());
    }
    console.log(particles);
}

ParticleCreater();
function HandleParticles()
{
    for(let i=0;i<particles.length;i++)
    {
        particles[i].update();
        particles[i].draw();
    }
}

const animate=()=>
{
   ctx.clearRect(0,0,Canvas.width,Canvas.height);
   HandleParticles();
   requestAnimationFrame(animate);
}

animate();

