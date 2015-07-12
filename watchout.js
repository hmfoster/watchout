//style
//get rid of setTimeout--> write helper function with 
//".each('end',function(){helper(d3.select(this))})"
//call with 'enemies'

//Initial Settings
var initialSettings = {
  boardHeight: window.innerHeight,
  boardWidth: window.innerWidth,
  numberEnemies: 5,
  radius: 20,
  score: 0,
  highScore: 0,
  collisions: 0,
};

var randomizerX = function(){
  return Math.random()*initialSettings.boardWidth;
};
var randomizerY = function(){
  return Math.random()*initialSettings.boardHeight;
};

/////////SCORE FUNCTION
setInterval(function(){
  initialSettings.score++;
  d3.select('.current').text("Current Score " + initialSettings.score);
  }, 100);

/////COLLISION & DRAG FUNCTIONS



var collision = function(p1){
  var x1 = this.attributes.cx.value;//get cx attr;
  var x2 = d3.selectAll(".user")[0][0].attributes.cx.value;
  var y1 = this.attributes.cy.value;
  var y2 = d3.selectAll(".user")[0][0].attributes.cy.value;
  var distance = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  
  if (distance<40){ 
      initialSettings.collisions++;
      d3.select('.collisions').text("Atomic Collisions "+initialSettings.collisions);
    
    if(initialSettings.score>initialSettings.highScore){
      initialSettings.highScore = initialSettings.score;
      d3.select('.high').text("High Score "+ initialSettings.highScore);
    }
    initialSettings.score = 0;
  } 
};

var drag = d3.behavior.drag().on(
          'drag', function(){
              user.attr('cx', d3.event.x)
                  .attr('cy', d3.event.y);
              });




// Creating a conatiner
var svgContainer = d3.select('body')
                    .append('svg')
                    .attr("width", initialSettings.boardWidth)
                    .attr("height", initialSettings.boardHeight);



//Add enemies and user to svg container
var enemies = svgContainer.selectAll('circle')  
                          .data(d3.range(initialSettings.numberEnemies))
                          .enter()
                          .append('circle')
                          .classed('enemy',true)
                          .attr('r', initialSettings.radius)
                          .attr('cx', randomizerX)
                          .attr('cy', randomizerY)
                          .style('fill', 'green');
 
var user = svgContainer.selectAll('circle.a')
                      .data([1])
                      .enter()
                      .append('circle')
                      .classed('user',true)
                      .attr('cx', initialSettings.boardWidth/2)
                      .attr('cy', initialSettings.boardHeight/2)
                      .attr('r', initialSettings.radius)
                      .style('fill', 'red')
                      .call(drag);

var move = function(){
                  enemies.transition()
                  .tween('.enemy',function(){return collision;})
                  .ease('elastic')
                  .duration(1000)
                  .attr('cx', randomizerX)
                  .attr('cy', randomizerY)
                  .each('end', function(){move(d3.select(this));
                  });  
                };

 move(enemies);
