// Default Stuff
    var myData = "date,GDP,Formation,Cessation,Unemployed\n\
        1561939200000,0.7,0.03,0.16,0.103,\n\
        1569888000000,1.0,0.08,0.01,0.067,\n\
        1577836800000,-0.3,-0.02,0.05,0.065,\n\
        1585699200000,-13.3,-0.12,-0.14,0.226,\n\
        1593561600000,-7,0.12,-0.13,0.469,\n";  
    var lineDesc = 
    "<h3>Covid-19 Impact to Jobs Significantly Muted when Compared with GDP</h3><p>When comparing the periods before and during the pandemic, the percentage changes in metrics relating to jobs are muted. The largest change relates to unemployment where Singapore saw an increase of <strong>0.47%</strong> compared with pre-pandemic times in the third quarter of 2019. This pales in comparison with the dip in GDP of <strong>-13.3%</strong> in the Q2 and <strong>-7.0%</strong> in Q3 this year.</p>";
      
    showGraph(myData);
    updateLineDesc(lineDesc);

    // selecting charts
    d3.select("#select").on("change", function(d) {
        var selectedOption = d3.select(this).property("value");
        update(selectedOption);
    });
      
 
  function update(selectedGroup) {
      switch(selectedGroup){
          case "all":
            var myData = "date,GDP,Formation,Cessation,Unemployed\n\
                1561939200000,0.7,0.03,0.16,0.103,\n\
                1569888000000,1.0,0.08,0.01,0.067,\n\
                1577836800000,-0.3,-0.02,0.05,0.065,\n\
                1585699200000,-13.3,-0.12,-0.14,0.226,\n\
                1593561600000,-7,0.12,-0.13,0.469,\n";
              
            var lineDesc = 
                "<h3>Covid-19 Impact to Jobs Significantly Muted when Compared with GDP</h3><p>When comparing the periods before and during the pandemic, the percentage changes in metrics relating to jobs are muted. The largest change relates to unemployment where Singapore saw an increase of <strong>0.47%</strong> compared with pre-pandemic times in the third quarter of 2019. This pales in comparison with the dip in GDP of <strong>-13.3%</strong> in the Q2 and <strong>-7.0%</strong> in Q3 this year.</p>";
              break;
              
          case "gdp":
            var myData = "date,GDP\n\
                1561939200000,0.7,\n\
                1569888000000,1.0,\n\
                1577836800000,-0.3,\n\
                1585699200000,-13.3,\n\
                1593561600000,-7,0.12,\n";
            
            var lineDesc = 
              "<h3>Economy Slowly Recovering</h3><p>On a quarter-on-quarter seasonally-adjusted basis, the economy had expanded in the third quarter, rebounding from the <strong>13.3%</strong> contraction in Q2. The Singapore economy registered its wortst performance ever in Q2 due to circuit breaker measures, before experiencing a growth rebound in the July to September period when most of the movement curbs were relaxed. The rebound in the third quarter had also been aided by the Government's budgetary support measures.</p>";
              
              break;
          case "nongdp":
            var myData = "date,Formation,Cessation,Unemployed\n\
                1561939200000,0.03,0.16,0.103,\n\
                1569888000000,0.08,0.01,0.067,\n\
                1577836800000,-0.02,0.05,0.065,\n\
                1585699200000,-0.12,-0.14,0.226,\n\
                1593561600000,0.12,-0.13,0.469,\n";
              
            var lineDesc =
                "<h3>A Closer Look at Jobs</h3><p><strong> Cessation of Businesses</strong> continue to trend lower, showing that the government budgets had been helpful in preventing businesses from closing.</p><p><strong>Formation of Businesses</strong> had seen an initial dip in Q2 due to the circuit breaker measures. As the budgets got progressively announced, the number of businesses incorporated had increased as well.</p><p><strong>Resident Unemployment</strong> rates had been slowly creeping up each quarter. However, the increase is hardly significant. The highest recorded rate of <strong>0.47%</strong> is considerably marginal.</p>";

              break;
              //      UNIX timestamp for reference
              //      3Q19    Jul 1561939200
              //      4Q19    Oct 1569888000
              //      1Q20    Jan 1577836800
              //      2Q20    Apr 1585699200
              //      3Q20    Jul 1593561600
      }
      showGraph(myData);
      updateLineDesc(lineDesc);
  };
      
function updateLineDesc(lineDesc) {
    var descElmnt=document.getElementById("lineDesc")
    descElmnt.innerHTML=lineDesc;    
}


function showGraph(myData) {

    var elmnt = document.getElementById("line-chart")
    elmnt.innerHTML='';
        
    var margin = {
        top: 10,
        right: 95,
        bottom: 40,
        left: 30
      },
      width = elmnt.offsetWidth,
      height = width;

//    var parseDate = d3.time.format("%Y%m%d").parse;

    var x = d3.scaleTime()
      .range([0, width]);

    var y = d3.scaleLinear()
      .range([height, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);
      
    var xAxis = d3.axisBottom()
      .scale(x);

    var yAxis = d3.axisLeft()
      .scale(y);
      
    var line = d3.line()
      .curve(d3.curveCatmullRom.alpha(0.5))
      .x(function(d) {return x(d.date);})
      .y(function(d) {return y(d.percentChange);});

    var svg = d3.select("#line-chart").append("svg")
      /*
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      */
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr(
      'viewBox',
      '0 0 ' +
        (width + margin.left + margin.right) +
        ' ' +
        (height + margin.top + margin.bottom)
     )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = d3.csvParse(myData);    
      
    color.domain(d3.keys(data[0]).filter(function(key) {
      return key !== "date";
    }));

    data.forEach(function(d) {
//        console.log(d.date);
//        d.date = d3.timeFormat("%Y%m%d")(d.date);
//        console.log(d.date);

    });

      
      
    var charts = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {
            date: d.date,
            percentChange: +d[name]
          };
        })
      };
    });

    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));

    y.domain([
      d3.min(charts, function(c) {
        return d3.min(c.values, function(v) {
          return v.percentChange;
        });
      }),
      d3.max(charts, function(c) {
        return d3.max(c.values, function(v) {
          return v.percentChange;
        });
      })
    ]);

//    var legend = svg.selectAll('g')
//      .data(charts)
//      .enter()
//      .append('g')
//      .attr('class', 'legend');
//
//    legend.append('rect')
//      .attr('x', width - 25)
//      .attr('y', function(d, i) {
//        return i * 20;
//      })
//      .attr('width', 10)
//      .attr('height', 10)
//      .style('fill', function(d) {
//        return color(d.name);
//      });
//
//    legend.append('text')
//      .attr('x', width - 8)
//      .attr('y', function(d, i) {
//        return (i * 20) + 9;
//      })
//      .text(function(d) {
//        return d.name;
//      });
//
//  
    // Add the X Axis

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
      

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("% Change");

    var chart = svg.selectAll(".chart")
      .data(charts)
      .enter().append("g")
      .attr("class", "chart");

      
    const path = chart.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return color(d.name);
      });

    chart.append("text")
      .datum(function(d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.percentChange) + ")";
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.name;
      });

    var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(charts)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
//            console.log(width/mouse[0])
            var xDate = x.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));
              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });
    

      // Codes to set transition path animation
      const transitionPath=d3.transition().ease(d3.easeSin).duration(1500); 

      const pathLength = path.node().getTotalLength();
        path
        .attr("stroke-dashoffset",pathLength)
        .attr("stroke-dasharray",pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset",0);
}