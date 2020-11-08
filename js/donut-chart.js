$(function() {

        var donutData = genData();

        var donuts = new DonutCharts();
        donuts.create(donutData);
//        console.log(donutData);
//        $('#refresh-btn').on('click', function refresh() {
//            donuts.update(genData);
//        });

    });
    


    
        
    function DonutCharts() {
        
            var tooltip = d3v3.select("#donut-charts")
		.append('div')
		.attr('class', 'tooltip');

    tooltip.append('div')
		.attr('class', 'label');

        var charts = d3v3.select('#donut-charts');

        var chart_m,
            chart_r,
            //color = d3v3.scale.category20();
            color = d3v3.scale.ordinal()
            .range(["#8CB3FB", "#4182FA", "#3467C7" , "#20407A"]);

        var getCatNames = function(dataset) {
            var catNames = new Array();

            for (var i = 0; i < dataset[0].data.length; i++) {
                catNames.push(dataset[0].data[i].cat);
            }

            return catNames;
        };

        

//        var createLegend = function(catNames) {
//            var legends = charts.select('.legend')
//                            .selectAll('g')
//                                .data(catNames)
//                            .enter().append('g')
//                                .attr('transform', function(d, i) {
//                                    return 'translate(' + (i * 150 + 50) + ', 10)';
//                                });
//    
//            legends.append('circle')
//                .attr('class', 'legend-icon')
//                .attr('r', 6)
//                .style('fill', function(d, i) {
//                    return color(i);
//                });
//    
//            legends.append('text')
//                .attr('dx', '1em')
//                .attr('dy', '.3em')
//                .text(function(d) {
//                    return d;
//                });
//        }

        var createCenter = function(pie) {

            var eventObj = {
                'mouseover': function(d, i) {
                    d3v3.select(this)
                        .transition()
                        .attr("r", chart_r * 0.65);
                },

                'mouseout': function(d, i) {
                    d3v3.select(this)
                        .transition()
                        .duration(500)
                        .ease('elastic')
                        .attr("r", chart_r * 0.6);
                },

                'click': function(d, i) {
                    var paths = charts.selectAll('.clicked');
                    pathAnim(paths, 0);
                    paths.classed('clicked', false);
                    resetAllCenterText();
                }
            }

            var donuts = d3v3.selectAll('.donut');

            // The circle displaying total data.
            donuts.append("svg:circle")
                .attr("r", chart_r * 0.6)
                .style("fill", "#f6f6f6")
                .on(eventObj)
                .attr("onclick","defaultText()");
    
            donuts.append('text')
                    .attr('class', 'center-txt type')
                    .attr('y', chart_r * -0.16)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '1.5rem')
                    .style('font-weight', 'bold')
                    .text(function(d, i) {
                        return d.type;
                    });
            donuts.append('text')
                    .attr('class', 'center-txt value')
                    .attr('text-anchor', 'middle');
            
            donuts.append('text')
                    .attr('class', 'center-txt percentage')
                    .attr('y', chart_r * 0.16)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '1.5rem')
                    .style('font-weight', 'bold')
                    .style('fill', '#222');
        }

        var setCenterText = function(thisDonut) {
            var sum = d3v3.sum(thisDonut.selectAll('.clicked').data(), function(d) {
                return d.data.val;
            });

            thisDonut.select('.value')
                .text(function(d) {
                    return (sum)? sum.toFixed(1) + d.unit
                                : d.total.toFixed(1) + d.unit;
                });
            thisDonut.select('.percentage')
                .text(function(d) {
                    return (sum)? (sum/d.total*100).toFixed(2) + '%'
                                : '';
                });
        }

        var resetAllCenterText = function() {
            charts.selectAll('.value')
                .text(function(d) {
                    return 'Total: ' + d.total.toFixed(1) + d.unit;
                });
            charts.selectAll('.percentage')
                .text('');
        }

        var pathAnim = function(path, dir) {
            switch(dir) {
                case 0:
                    path.transition()
                        .duration(500)
                        .ease('elastic')
                        .attr('d', d3v3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(chart_r)
                        );
                    break;

                case 1:
                    path.transition()
                        .attr('d', d3v3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(chart_r * 1.08)
                        );
                    break;
            }
        }

        var updateDonut = function() {
            
            var eventObj = {
                
                'mousemove': function(d) {
                    tooltip.style('top', (d3v3.event.layerY + 8.327*window.innerHeight) + 'px')
			             .style('left', (d3v3.event.layerX - 20) + 'px');
                    console.log(d3v3.event.layerY + 9*window.innerHeight);
		          },
                
                'mouseover': function(d, i, j) {
                    pathAnim(d3v3.select(this), 1);
                    
                    tooltip.select('.label').html(d.data.cat.toUpperCase()).style('color','black');
                    tooltip.style('display', 'block');
			        tooltip.style('opacity',2);


//                    var thisDonut = charts.select('.type' + j);
//                    
//                    document.getElementById('budgetDesc').innerHTML = d.data.desc;
//
//                    thisDonut.select('.value').text(function(donut_d) {
//                        return d.data.cat + ': ' + d.data.val.toFixed(1) + donut_d.unit;
//                    });
//                    thisDonut.select('.percentage').text(function(donut_d) {
//                        return (d.data.val/donut_d.total*100).toFixed(2) + '%';
//                    });
                },
                
                'mouseout': function(d, i, j) {
                    
                    tooltip.style('display', 'none');
			        tooltip.style('opacity',0);
                    
                    var thisPath = d3v3.select(this);
                    if (!thisPath.classed('clicked')) {
                        pathAnim(thisPath, 0);
                    }
                    var thisDonut = charts.select('.type' + j);
                    
                    
//                    document.getElementById('budgetDesc').innerHTML = "";

//                    setCenterText(thisDonut);
                },

                'click': function(d, i, j) {
                    var thisDonut = charts.select('.type' + j);
                    
                    document.getElementById('budgetDesc').innerHTML = d.data.desc;

                    thisDonut.select('.value').text(function(donut_d) {
                        return d.data.cat + ': ' + d.data.val.toFixed(1) + donut_d.unit;
                    });
                    thisDonut.select('.percentage').text(function(donut_d) {
                        return (d.data.val/donut_d.total*100).toFixed(2) + '%';
                    });
                    
//                    if (0 === thisDonut.selectAll('.clicked')[0].length) {
//                        thisDonut.select('circle').on('click')();
//                    }
                                    

                    
                    var allPathClicked = d3v3.selectAll('.clicked');
                    
                    if (allPathClicked[0].length>0){
//                        console.log(allPathClicked[0].length);
                        var allPathUnclicked = allPathClicked.classed('');
                        pathAnim(allPathClicked, ~~(!allPathUnclicked));    
                        allPathClicked.classed('clicked', !allPathUnclicked);
                    };


                    var thisPath = d3v3.select(this);
                    var clicked = thisPath.classed('clicked');
                    
                    pathAnim(thisPath, ~~(!clicked));
                    thisPath.classed('clicked', !clicked);
                    
//                    setCenterText(thisDonut);           

                }
            };

            var pie = d3v3.layout.pie()
                            .sort(null)
                            .value(function(d) {
                                return d.val;
                            });

            var arc = d3v3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(function() {
                                return (d3v3.select(this).classed('clicked'))? chart_r * 1.08
                                                                           : chart_r;
                            });

            // Start joining data with paths
            var paths = charts.selectAll('.donut')
                            .selectAll('path')
                            .data(function(d, i) {
                                return pie(d.data);
                            });

            paths
                .transition()
                .duration(1000)
                .attr('d', arc);

            paths.enter()
                .append('svg:path')
                    .attr('d', arc)
                    .style('fill', function(d, i) {
                        return color(i);
                    })
                    .style('stroke', '#FFFFFF')
                    .on(eventObj)

            paths.exit().remove();

            resetAllCenterText();
        }

        this.create = function(dataset) {
            var $charts = $('#donut-charts');
            chart_m = $charts.innerWidth() / dataset.length / 2 * 0.14;
            chart_r = $charts.innerWidth() / dataset.length / 2 * 0.85;

//            charts.append('svg')
//                .attr('class', 'legend')
//                .attr('width', '100%')
//                .attr('height', 50)
//                .attr('transform', 'translate(0, 0)');

            var donut = charts.selectAll('.donut')
                            .data(dataset)
                        .enter().append('svg:svg')
                            .attr('width', (chart_r + chart_m) * 2)
                            .attr('height', (chart_r + chart_m) * 2)
                        .append('svg:g')
                            .attr('class', function(d, i) {
                                return 'donut type' + i;
                            })
                            .attr('transform', 'translate(' + (chart_r+chart_m) + ',' + (chart_r+chart_m) + ')');

//            createLegend(getCatNames(dataset));
            createCenter();

            updateDonut();
        }
    
        this.update = function(dataset) {
            // Assume no new categ of data enter
            var donut = charts.selectAll(".donut")
                        .data(dataset);

            updateDonut();
        }
    }

    function defaultText(){
        document.getElementById('budgetDesc').innerHTML=
            "<h3>Covid-19 <br>Relief Measures</h3><p>In less than four months since February 2020, the Singapore Government rolled out four fiscal packages to support workers and businesses here during the ongoing Covid-19 pandemic.</p><p>Through the Unity, Resilience, Solidarity and Fortitude Budgets, Singapore has put aside almost S$100 billion – or almost 20 per cent of its GDP – to counter the impact of the virus.</p><p>Select each segment on the donut chart to find out more about the budgets.</p>";
    };

    /*
     * Returns a json-like object.
     */
    function genData() {
        var type = ['Relief Measures'];
        var unit = [' B'];
        var cat = ['Unity', 'Resilience', 'Solidarity', 'Fortitude'];
        var amt = [6.4,48.4,5.1,33];
        var desc = [
            '<h3>Unity Budget</h3><p>Delivered on 18 February 2020</p><p>The <a href="https://www.mti.gov.sg/COS-2020/Stabilisation-and-Support-Package" target="_blank">Stabilisation and Support Package</a> was rolled out, including S$4 billion set aside to help workers and companies weather near-term economic uncertainties due to Covid-19. The new package will include job and cash-flow support to help firms retain and retrain workers.</p>',
            '<h3>Resilience Budget</h3><p>Delivered on 26 March 2020</p><p>A slew of measures were rolled out to support businesses, sectors most affected by Covid-19 – including aviation, tourism, food services and arts & cultural sector – and help workers stay employed. For instance, qualifying commercial properties badly affected by the virus outbreak, such as hotels and serviced apartments, will pay no property tax for 2020. Various financing schemes for companies such as the <a href="https://www.enterprisesg.gov.sg/financial-assistance/loans-and-insurance/loans-and-insurance/enterprise-financing-scheme/overview" target="_blank">Enterprise Financing Scheme</a> and the <a href="https://www.enterprisesg.gov.sg/financial-assistance/loans-and-insurance/loans-and-insurance/temporary-bridging-loan-programme/overview" target="_blank">Temporary Bridging Loan Programme</a>, will also be enhanced to ensure access to credit.</p>',
            '<h3>Solidarity Budget</h3><p>Delivered on 6 April 2020</p><p>Another S$5.1 billion was earmarked to help cushion the impact of Covid-19 on Singapore. This also marked the first time the Singapore Government has released three budgets in less than two months. Additional measures, such as enhancing the <a href="https://www.singaporebudget.gov.sg/docs/default-source/budget_2020/download/pdf/resilience-budget-enhanced-jobs-support-scheme.pdf" target="_blank">Job Support Scheme</a> to subsidise wages and help companies keep their employees, and increasing rental waivers, were introduced.</p>',
            '<h3>Fortitude Budget</h3><p>Delivered on 26 May 2020</p><p>The central focus of this Budget, announced as Singapore prepares to open its economy after a “circuit breaker” period of almost two months, is jobs. The Government launched a new <a href="https://www.wsg.gov.sg/SGUnited.html" target="_blank">SGUnited Jobs and Skills Package</a> that will create more than 40,000 jobs in the public and private sectors, 25,000 traineeships and 30,000 skills training opportunities. Support for businesses were also strengthened on three fronts: cash flow, costs and credit.</p>'        
        ];
        
        var dataset = new Array();

        for (var i = 0; i < type.length; i++) {
            var data = new Array();
            var total = 0;

            for (var j = 0; j < cat.length; j++) {
                var value = amt[j];
                total += value;
                data.push({
                    "cat": cat[j],
                    "val": value,
                    "desc": desc[j]
                });
            }

            dataset.push({
                "type": type[i],
                "unit": unit[i],
                "data": data,
                "total": total
            });
        }
        return dataset;
    }