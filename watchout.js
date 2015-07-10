// start slingin' some d3 here.

var enemyCircles = [1, 2, 3, 4, 5];

// Creating a conatiner
var svgContainer = d3.select('body').append('svg').attr("width", 600).attr("height", 600);

//Add enemies to svg container
var enemies = svgContainer.selectAll('circle').data(enemyCircles).enter().append('circle');
var enemiesStyle = enemies.attr('cx', function(d,i){ return 20+Math.random()*100*(i+1);})
                  .attr('cy', function(d, i){return 20+Math.random()*100*i;}).attr('r', 20).style('fill', 'green');
 
 setInterval(function(){ enemies.attr('cx', function(d,i){ return 20+Math.random()*100*(i+1);})
                  .attr('cy', function(d, i){return 20+Math.random()*100*i;}).attr('r', 20);},1000);
//setInterval(enemiesStyle, 1000);



