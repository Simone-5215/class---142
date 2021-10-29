img = "";
noseX = 0;
noseY = 0;
marioX = 325;
marioY = 325;
GameStatus = "";
function preload()
{
	world_start = loadSound("world_start.wav");
	mario_gameover = loadSound("gameover.wav");
	mario_jump = loadSound("jump.wav");
	mario_coin = loadSound("coin.wav");
	mario_kick = loadSound("kick.wav");
	mario_die = loadSound("mariodie.wav");
	setSprites();
	MarioAnimation();
	img = loadImage("mario.jpg");
}

function setup() {
	canvas = createCanvas(1240,336);
	canvas.parent('canvas')
	instializeInSetup(mario);
	video = createCapture(VIDEO);
	video.size(800 , 400);
	video.parent('game_console');
	poseNet = ml5.poseNet(video , modelLoaded);
	poseNet.on('pose' , gotPoses);
}

function draw() 
{
	game();
}

function start_game()
{
	GameStatus = "start";
	document.getElementById("status").innerHTML = "Game is Loading";
}

function game()
{
  instializeInDraw();
  moveEnvironment(mario);
  drawSprites();
  console.log("noseX = " + noseX + "noseY = " + noseY);
}

function modelLoaded()
{
	console.log('modelLoaded');
}

function gotPoses(results)
{
	if(results.length > 0)
	{
		console.log(results);
		noseX = results[0].pose.nose.x;
		noseY = results[0].pose.nose.y;
	}
}

function manualControl(character)
{
   if(character.live)
   {
	   if(noseX < 300)
	   {
		   character.velocity.x -= gameConfig.moveSpeed;
		   character.changeAnimation('move');
		   character.mirrorX(-1);
	   }
	   if(noseX > 300)
	   {
		   character.velocity.x += gameConfig.moveSpeed;
		   character.changeAnimation('move');
		   character.mirrorX(1);
	   }
	   if(!keyDown(control.left)&&!keyDown(control.right)&&!keyDown(control.up))
	   {
		   character.changeAnimation('stand');
	   }
   }
}

function jumping(character)
{
	if((noseY < 200&& character.live)|| (touchisdown&&character.live))
	{
		character.velocity.y += gameConfig.jump;
	}
}

function changeGameStatus(character)
{
    if(GameStatus == "start"&& noseX !=""&&gameConfig.status == "start")
	{
		world_start.play();
	}
}