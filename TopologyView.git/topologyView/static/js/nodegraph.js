
queue()
    .defer(d3.json, "/topologyview")
    .await(makeGraphs);

function makeGraphs(error, projectsJson) {

    var topologyjson = projectsJson;
    var datanodes = [
      { name: "deployments", type: "Deployments" },
      { name: "zones" , type: "Zones"    },
      { name: "services", type: "Services"  },
      { name: "providers", type: "Providers"  },
      { name: "projects" , type: "Projects" },
      { name: "users",  type: "Users" },
      { name: "clusters", type: "Clusters" }
    ];
    //var hosts = [
    //  { name: "host1", type: "host" },
    //  { name: "host2", type: "host" },
    //  { name: "host3", type: "host" },
    //  { name: "host4", type: "host" }
    //];

    //var datalinks = [
    //  { source: "deployments", target: "zones" },
    //  { source: "deployments", target: "services" },
    //  { source: "zones", target: "providers" },
    //  { source: "zones", target: "clusters" },
    //  { source: "users", target: "projects" },
    //  { source: "projects", target: "deployments" }
    //];

    var datalinks = [
      { source: datanodes[0], target: datanodes[1] },
      { source: datanodes[0], target: datanodes[2] },
      { source: datanodes[1], target: datanodes[3] },
      { source: datanodes[1], target: datanodes[6] },
      { source: datanodes[5], target: datanodes[4] },
      { source: datanodes[4], target: datanodes[0] }
    ];

    //var nodes = [root].concat(datanodes);
    //var nodes = datanodes;
    //var links = [];
    //datalinks.forEach(function(datalink) {
    //   datanodes.forEach(function(datanode) {
    //       if (datalink.target == datanode.name) {
    //           links.push( {
    //              source: datalink.source,
    //              target: datanode
    //           })
    //       }
    //    })
    //});
    var nodes = datanodes;
    var links = datalinks;
//    datanodes.forEach(function(datanode) {
//      var datanodeNum = datanode.name;
//      for(var i = 0; i <= 5; i++) {
//        var vm = {
//            name: "vm-" + datanodeNum + "-" + i,
//          type: 'vm'
//        }
//        nodes.push(vm);
//        links.push({
//            source: datanode,
//          target: vm
//        })
//      }
//    });


   datanodes.forEach(function(datanode) {
       //if (datanode.name == "deployments") {
           var tjsonarray = topologyjson[datanode.name];
           for ( var d in tjsonarray) {
               var namenode = {
                  name:  tjsonarray[d].name,
                  type: 'namenode'
               }
               nodes.push(namenode);
               links.push({
                  source: datanode,
                  target: namenode
               })
           }
       //}
   });


    var force = d3.layout.force()
      .size([window.innerWidth, window.innerHeight])
      .nodes(nodes)
      .links(links)
      .charge(-500)
      .gravity(0.1)
      .on('tick', update)
      .start();

    var svg = d3.select('body')
      .append('svg')
      .attr({
        width:  window.innerWidth,
        height: window.innerHeight
      })

    var circles = svg.selectAll('circle')
      .data(force.nodes())
    circles.enter()
      .append('circle')
      .attr({
        r: function(d) { return d.type == 'namenode' ? 5 : 25; },
        fill: function(d) { return d.type == 'namenode' ? '#3CB371' : '#1661FE'; }
      })
      .call(force.drag);

    var lines = svg.selectAll('line')
        .data(force.links())
    lines.enter()
        .append('line')
      .attr({
        fill: 'none',
        stroke: '#1661FE',
        'stroke-width': 3
      });

    var texts = svg.selectAll('text')
      .data(force.nodes())
    texts.enter()
      .append('text')
      .text(function(d) { return d.name; })
      .attr({
        fill: 'black',
        'text-anchor': 'middle',
        dy: '30'
      })
      .style({
        'font-family': "Verdana, Helvetica, Sans-Serif",
        'font-size': function(d) { return d.type == 'namenode' ? 12 : 25},
        'pointer-events': 'none'
      });

    function update() {
        circles.attr({
        cx: function(d) { return d.x; },
        cy: function(d) { return d.y; }
      });

      texts.attr({
        x: function(d) { return d.x; },
        y: function(d) { return d.y; }
      })

      lines.attr({
        x1: function(d) { return d.source.x},
        y1: function(d) { return d.source.y},
        x2: function(d) { return d.target.x},
        y2: function(d) { return d.target.y},
      })
    }
}