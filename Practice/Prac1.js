const Canvas=document.getElementById('canvas1');
const ctx=Canvas.getContext('2d');
Canvas.width=window.innerWidth;
Canvas.height=window.innerHeight;
const particles=[];
let hue=0;

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
    for(let i=0;i<10;i++)
    {
        particles.push(new Particle());
    }
});

Canvas.addEventListener('mousemove',(e)=>{
    mouse.x=e.x;
    mouse.y=e.y;
    for(let i=0;i<10;i++)
    {
        particles.push(new Particle());
    }
});

class Particle
{
    constructor()
    {
        this.x=mouse.x;
        this.y=mouse.y;
        this.size=Math.random()*15+1;
        this.speedX=Math.random()*3-1.5;
        this.speedY=Math.random()*3-1.5;
        this.color=`hsl(${hue},100%,50%`;
    }
    
    update()
    {
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.size>0.9)this.size-=0.1;
    }

    draw()
    {
       ctx.fillStyle=this.color;
       ctx.beginPath();
       ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
       ctx.fill();
    }

}


function HandleParticles()
{
    for(let i=0;i<particles.length;i++)
    {
        particles[i].update();
        particles[i].draw();
        for(let j=i;j<particles.length;j++)
        {
            const dx=particles[i].x-particles[j].x;
            const dy=particles[i].y-particles[j].y;
            const distance=Math.sqrt(dx*dx+dy*dy);
            if(distance<100)
            {
                ctx.beginPath();
                ctx.strokeStyle=particles[i].color;
                ctx.lineWidth=particles[i].size/10;
                ctx.moveTo(particles[i].x,particles[i].y);
                ctx.lineTo(particles[j].x,particles[j].y);
                ctx.stroke();
            }
        }

        if(particles[i].size<=0.3)
        {
            particles.splice(i,1);
            i--;
        }
    }
}

const animate=()=>
{
   ctx.clearRect(0,0,Canvas.width,Canvas.height);
   HandleParticles();
   hue+=2;
   if(hue>360){hue=0;}
   requestAnimationFrame(animate);
}

animate();

