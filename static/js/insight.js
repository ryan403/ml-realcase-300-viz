$("#industry-pie-chart-insight").text(
    "以這份資料而言，目前導入AI最多的產業是電商/零售、運輸與科技業。"
);

let tag_bar_chart_insight = "<h2>前10多的AI應用面向</h2>";
tag_bar_chart_insight += "<ol>";
tag_bar_chart_insight += "<li>推薦系統</li>";
tag_bar_chart_insight += "<li>搜尋系統</li>";
tag_bar_chart_insight += "<li>詐騙偵測</li>";
tag_bar_chart_insight += "<li>需求預測</li>";
tag_bar_chart_insight += "<li>營運流程管理</li>";
tag_bar_chart_insight += "<li>廣告排序</li>";
tag_bar_chart_insight += "<li>內容客製化</li>";
tag_bar_chart_insight += "<li>抵達時間預測</li>";
tag_bar_chart_insight += "<li>產品特色</li>";
tag_bar_chart_insight += "<li>生成式AI</li>";
tag_bar_chart_insight += "</ol>";

$("#tag-bar-chart-insight").html(
    tag_bar_chart_insight
);

$("#year-line-chart-insight").html(
    "在這份資料中，真實AI應用案例逐年增加。尤其是2021年，<br>是前一年的2.7倍。"
);
