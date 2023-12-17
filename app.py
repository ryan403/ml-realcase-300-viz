import pandas as pd

# df = pd.read_csv("ml-cases-20231202.csv")
# df.head()
# industry_count = df["Industry"].value_counts()
# pd_industry_count = pd.DataFrame(
#     {"Industry": industry_count.index, "Count": industry_count.values}
# )
# result_industry_count = pd_industry_count.to_json(orient="records")

# tag_count = df["Tag"].value_counts()
# tag_count_top10 = tag_count.head(n=10)
# pd_tag_count_top10 = pd.DataFrame(
#     {"Application": tag_count_top10.index, "Count": tag_count_top10.values}
# )
# result_tag_count_top10 = pd_tag_count_top10.to_json(orient="records")

# df_gai = df[df["Tag"] == "generative AI"]
# result_gai = df_gai.to_json(orient="records")

# year_count = df["Year"].value_counts().sort_index()
# pd_year_count = pd.DataFrame(
#     {"Year": pd.to_datetime(year_count.index, format="%Y"), "Count": year_count.values}
# )
# pd_year_count["Year"] = pd_year_count["Year"].astype(str)
# result_year_count = pd_year_count.to_json(orient="records")

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def formPage():
    df = pd.read_csv("ml-cases-20231202.csv")
    df.head()
    # Industry
    industry_count = df["Industry"].value_counts()
    pd_industry_count = pd.DataFrame(
        {"Industry": industry_count.index, "Count": industry_count.values}
    )
    result_industry_count = pd_industry_count.to_json(orient="records")
    # Tag
    tag_count = df["Tag"].value_counts()
    tag_count_top10 = tag_count.head(n=10)
    pd_tag_count_top10 = pd.DataFrame(
        {"Tag": tag_count_top10.index, "Count": tag_count_top10.values}
    )
    result_tag_count_top10 = pd_tag_count_top10.to_json(orient="records")
    # GAI
    df_gai = df[df["Tag"] == "generative AI"]
    result_gai = df_gai.to_json(orient="records")

    # Year Count
    year_count = df["Year"].value_counts().sort_index()
    pd_year_count = pd.DataFrame(
        {
            "Year": pd.to_datetime(year_count.index, format="%Y"),
            "Count": year_count.values,
        }
    )
    pd_year_count["Year"] = pd_year_count["Year"].astype(str)
    result_year_count = pd_year_count.to_json(orient="records")

    return render_template(
        "index.html",
        industry_count=result_industry_count,
        tag_count=result_tag_count_top10,
        gai_list=result_gai,
        year_count=result_year_count,
    )

if __name__ == "__main__":
    app.run()