// start slingin' some d3 here.
var enemyData = [1, 2, 3, 4, 5];

var drag = d3.behavior.drag().on('drag', function(){
  user.attr('cx', d3.event.x).attr('cy', d3.event.y);
});

// Creating a conatiner
var svgContainer = d3.select('body').append('svg').attr("width", 600).attr("height", 600);

//Add enemies to svg container
var enemies = svgContainer.selectAll('circle').data(enemyData).enter().append('circle');

enemies.classed('enemy',true);

var enemiesStyle = enemies.attr('cx', function(d,i){ return 20+Math.random()*100*(i+1);})
                  .attr('cy', function(d, i){return 20+Math.random()*100*i;}).attr('r', 20).style('fill', 'green');
 
setInterval(function(){ enemies.transition().attr('cx', function(d,i){ return 20+Math.random()*100*(i+1);})
                  .attr('cy', function(d, i){return 20+Math.random()*100*i;}).attr('r', 20);},1000);

var userData = [{x:300, y:300}];

var user = svgContainer.selectAll('circle.a').data(userData).enter().append('circle');
user.classed('user',true);
var userStyle = user.attr('cx', function(userData){ return userData.x;})
                  .attr('cy', function(userData){return userData.y;})
                  .attr('r', 20)
                  .style('fill', 'red')
                  .call(drag);
 

//