let industry_count_pie = document.getElementById('industry-pie-chart');
let tag_bar_chart = document.getElementById('tag-bar-chart');
let gai_table_chart = document.getElementById('gai-table-chart');
let year_line_chart = document.getElementById('year-line-chart');

let result_industry_count = JSON.parse(document.getElementById('industry_count').innerHTML);
let result_tag_count = JSON.parse(document.getElementById('tag_count').innerHTML);
let result_gai_list = JSON.parse(document.getElementById('gai_list').innerHTML);
let result_year_count = JSON.parse(document.getElementById('year_count').innerHTML);

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

let trace1 = {};
trace1.type = "pie";
trace1.labels = unpack(result_industry_count, "Industry");
trace1.values = unpack(result_industry_count, "Count");

let data = [];
data.push(trace1);

let layout = {
    title:"300個 AI 導入案例 - 產業比例"
};

let trace2 = {};
trace2.type = "bar";
// trace1.title = "產業比例";
trace2.x = unpack(result_tag_count, "Tag");
trace2.y = unpack(result_tag_count, "Count");

let data2 = [];
data2.push(trace2);

let layout2 = {
    title: "Top 10 - 應用面向"
};

let trace3 = {};
trace3.type = "table";
trace3.columnwidth = [8, 10, 10, 10, 10, 5, 35];

//header values
let headerValues = Object.keys(result_gai_list[0]);
//cell values
let cellValues = [];
for(i=0;i<headerValues.length;i++){
    let cellValue = unpack(result_gai_list, headerValues[i]);
    cellValues[i] = cellValue 
}

trace3.header = {
    values:headerValues,
    fill:{color:'yellow'},
};

trace3.cells = {
    values:cellValues
}


let data3 = [];
data3.push(trace3);

let layout3 = {
    title: "生成式AI應用案例"
};


let trace4 = {};

let frames = [];
let x = unpack(result_year_count,"Year");
let y = unpack(result_year_count, "Count");
var n = result_year_count.length;
for (var i = 0; i < n; i++) {
    frames[i] = { data: [{ x: [], y: [] }] }
    frames[i].data[0].x = x.slice(0, i + 1);
    frames[i].data[0].y = y.slice(0, i + 1);
}

trace4.type = "scatter";
trace4.mode = "lines";
// trace1.title = "產業比例";
trace4.x = frames[0].data[0].x;
trace4.y = frames[0].data[0].y;
trace4.fill = "tozeroy";
trace4.marker = {
    color:'red',
};
trace4.line = {
    color:'lightpink',
    width:5
};

let data4 = [];
data4.push(trace4);

let layout4 = {
    title: "AI應用案例數 2017 ~ 2023",
    xaxis: {
        type: 'date',
        range: [
            frames[n-1].data[0].x[0],
            frames[n-1].data[0].x[n-1]
        ]
    },
    yaxis: {
        range: [
            0,
            Math.max(...y)+5
        ]
    },
    updatemenus: [{
        x: 0.6,
        y: 0.2,
        yanchor: "top",
        xanchor: "right",
        showactive: false,
        direction: "left",
        type: "buttons",
        pad: { "t": 87, "r": 10 },
        buttons: [{
            method: "animate",
            args: [null, {
                fromcurrent: true,
                transition: {
                    duration: 0,
                },
                frame: {
                    duration: 500,
                    redraw: false
                }
            }],
            label: "Play"
        }, {
            method: "animate",
            args: [
                [null],
                {
                    mode: "immediate",
                    transition: {
                        duration: 0
                    },
                    frame: {
                        duration: 0,
                        redraw: false
                    }
                }
            ],
            label: "Pause"
        }]
    }]
};


Plotly.newPlot(industry_count_pie, data, layout);
Plotly.newPlot(tag_bar_chart, data2, layout2);
Plotly.newPlot(gai_table_chart, data3, layout3);
Plotly.newPlot(year_line_chart, data4, layout4).then(function(){
    Plotly.addFrames(year_line_chart, frames);
});
