// start slingin' some d3 here.

//If distance<radius*2, we have a collision!
var collision = function(p1){
  var x1 = this.attributes.cx.value;//get cx attr;
  var x2 = d3.selectAll(".user")[0][0].attributes.cx.value;
  var y1 = this.attributes.cy.value;
  var y2 = d3.selectAll(".user")[0][0].attributes.cy.value;
  var distance = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  if (distance<40){
    console.log("COLLISION!!!");
  }
};

var enemyData = [1,2,3,4,5];

var drag = d3.behavior.drag().on(
          'drag', function(){
              user.attr('cx', d3.event.x)
                  .attr('cy', d3.event.y);
              });

// Creating a conatiner
var svgContainer = d3.select('body').append('svg').attr("width", 600).attr("height", 600);

//Add enemies to svg container
var enemies = svgContainer.selectAll('circle').data(enemyData).enter().append('circle');

enemies.classed('enemy',true);

var enemiesStyle = enemies.attr('cx', function(d,i){ return d.x;})
                  .attr('cy', function(d, i){return d.y;}).attr('r', 20).style('fill', 'green');
 
//Make a tween function
setInterval(function(){ enemies.transition()
                      .tween('.enemy',function(){
                        return collision;
                      })
                      .ease('elastic')
                      .duration(1000)
                      .attr('cx', function(d,i){ 
                        return 20+Math.random()*550;})
                      .attr('cy', function(d,i){
                        return 20+Math.random()*550;
                      })
                      .attr('r', 20);
                      },1000);

var userData = [{x:300, y:300, r:20}];

var user = svgContainer.selectAll('circle.a').data(userData).enter().append('circle');
user.classed('user',true);
var userStyle = user.attr('cx', function(d){ return d.x;})
                  .attr('cy', function(d){return d.y;})
                  .attr('r', function(d){ return d.r;})
                  .style('fill', 'red')
                  .call(drag);
 
//.tween('circle',function(d,i){
                      // return collision(d);})