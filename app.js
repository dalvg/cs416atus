import timeData from "./data.js";

const width = 1200;
const height = 600;
const margin = { t: 20, r: 150, b: 40, l: 300 };

function handleClick(year) {
  d3.select("#chart").html("");

  d3.selectAll("button").classed("clicked", false);
  d3.select(`button[value="${year}"]`).classed("clicked", true);

  const yearData = timeData.slice().filter((el) => el.year === year);

  const xScale = d3
    .scaleLinear()
    .domain([0, Math.max(...yearData.map((el) => el.total))])
    .range([0, width - margin.l - margin.r]);

  const yScale = d3
    .scaleBand()
    .domain(yearData.map((el) => el.activity))
    .range([0, height - margin.t - margin.b])
    .padding(0.1);

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.l}, ${margin.t})`);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.t - margin.b})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .style("font-family", "Roboto Mono")
    .style("font-size", "14px");

  svg
    .append("text")
    .attr("x", (margin.r + margin.l) / 2)
    .attr("y", height - 25)
    .text("time spent on activity in hours")
    .style("font-family", "Roboto Mono")
    .style("font-size", "14px");

  const tooltip = d3
    .select("#chart > svg")
    .append("text")
    .attr("class", "tooltip")
    .attr("fill", "black");

  const current = svg.selectAll("rect").data(yearData);

  current
    .enter()
    .append("rect")
    .merge(current)
    .attr("x", 0)
    .attr("y", (d) => yScale(d.activity))
    .attr("height", yScale.bandwidth())
    .transition()
    .duration(1000)
    .attr("width", (d) => xScale(d.total))
    .attr("fill", "#FBC9B1");

  svg
    .selectAll("rect")
    .on("mousemove", function (event, d) {
      const [x, y] = d3.pointer(event);
      const total = d.total;
      const men = d.men;
      const women = d.women;

      const tooltipText = `Total: ${total} hrs\nMen: ${men} hrs\nWomen: ${women} hrs`;
      tooltip
        .attr("transform", `translate(${x + 325},${y})`)
        .selectAll("tspan")
        .data(tooltipText.split("\n"))
        .enter()
        .append("tspan")
        .attr("dy", "1em")
        .attr("x", "0px")
        .text((d) => d)
        .style("font-family", "Roboto Mono")
        .style("font-size", "12px");

      d3.select(this).attr("fill", "#bde6ef");
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "#FBC9B1");
      tooltip.text("");
    });

  svg
    .append("g")
    .selectAll("y-axis")
    .data(yearData)
    .enter()
    .append("text")
    .attr("x", -margin.r + margin.l / 2 - 5)
    .attr("y", (d) => yScale(d.activity) + yScale.bandwidth() / 2)
    .attr("text-anchor", "end")
    .text((d) => d.activity)
    .attr("font-family", "Roboto Mono")
    .attr("font-size", "14px");

  svg
    .append("text")
    .attr("x", -margin.r + margin.l / 2 - 5)
    .attr("y", 0)
    .attr("text-anchor", "end")
    .text("activities")
    .attr("font-family", "Roboto Mono")
    .attr("font-size", "18px")
    .attr("text-decoration", "underline");

  const annotationList = {
    2015: [
      {
        note: {
          label:
            "Women spent 2.67x the time on food preparation and cleanup compared to men",
        },
        x: xScale(yearData[6].total) + margin.l,
        y: yScale(yearData[6].activity) + yScale.bandwidth() / 2 + margin.t,
        dy: 100,
        dx: 400,
        connector: {
          end: "arrow",
        },
        color: ["#548745"],
      },
      {
        note: {
          label:
            "A total of about 41 min was spent socializing and communicating daily",
        },
        x: xScale(yearData[5].total) + margin.l,
        y: yScale(yearData[5].activity) + yScale.bandwidth() / 2 + margin.t,
        dy: 30,
        dx: 400,
        connector: {
          end: "arrow",
        },
        color: ["#7F1510"],
      },
    ],

    2018: [
      {
        note: {
          label:
            "Women spent about 3.35x the time on housework compared to men, similar to 2015",
          wrap: 200,
        },
        x: xScale(yearData[7].total) + margin.l,
        y: yScale(yearData[7].activity) + yScale.bandwidth() / 2 + margin.t,
        dy: 100,
        dx: 400,
        connector: {
          end: "arrow",
        },
        color: ["#3114A3"],
      },
      {
        note: {
          label:
            "Total time spent socializing has decreased 10% compared to 2015 ",
        },
        x: xScale(yearData[5].total) + margin.l,
        y: yScale(yearData[5].activity) + yScale.bandwidth() / 2 + margin.t,
        dy: 30,
        dx: 400,
        connector: {
          end: "arrow",
        },
        color: ["#7F1510"],
      },
    ],

    2021: [
      {
        note: {
          label:
            "There is an increase in time spent on food preparation by both men and women, with men spending 20% more time on the task compared to 2018",
          wrap: 200,
        },
        x: xScale(yearData[6].total) + margin.l,
        y: yScale(yearData[6].activity) + yScale.bandwidth() / 2 + margin.t,
        dy: 100,
        dx: 400,
        connector: {
          end: "arrow",
        },
        color: ["#548745"],
      },
      {
        note: {
          label:
            "Time spent socializing decreased again, by an additional 12.5% compared to 2018",
        },
        x: xScale(yearData[5].total) + margin.l,
        y: yScale(yearData[5].activity) + yScale.bandwidth() / 2 + margin.t,
        dy: 30,
        dx: 400,
        connector: {
          end: "arrow",
        },
        color: ["#7F1510"],
      },
    ],
    2024: [
      {
        note: {
          label: "",
          wrap: 200,
        },
        x: xScale(yearData[6].total) + margin.l,
        y: yScale(yearData[6].activity) + yScale.bandwidth() / 2 + margin.t,
        dy: 145,
        dx: 394,
        connector: {
          end: "arrow",
        },
        color: ["#466272"],
      },
      {
        note: {
          label:
            "Over the past decade (2015-2024), time spent socializing has dropped by almost 19% in total",
          wrap: 200,
        },
        x: xScale(yearData[5].total) + margin.l,
        y: yScale(yearData[5].activity) + yScale.bandwidth() / 2 + margin.t,
        dy: 30,
        dx: 400,
        connector: {
          end: "arrow",
        },
        color: ["#7F1510"],
      },
      {
        note: {
          label:
            "The gap between men and women is shrinking when it comes to both food prep and cleanup and housework. While women still spent 2x as much time on these two activities as men in 2024, this is down from 3x in 2015.",
          wrap: 300,
        },
        x: xScale(yearData[7].total) + margin.l,
        y: yScale(yearData[7].activity) + yScale.bandwidth() / 2 + margin.t,
        dy: 100,
        dx: 400,
        connector: {
          end: "arrow",
        },
        color: ["#466272"],
      },
    ],
  };

  const annotations = annotationList[year];

  const makeAnnotations = d3.annotation().annotations(annotations);

  document.fonts.ready.then(function () {
    d3.select("svg")
      .append("g")
      .attr("class", "annotation-group")
      .style("font-family", "Roboto Mono")
      .style("font-size", "12px")
      .call(makeAnnotations);
  });
}

d3.select(".intro").style("font-family", "Roboto Mono");

handleClick(2015);

window.handleClick = handleClick;
