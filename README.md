# Olympic Participation: Exploratory Data Analysis

This notebook examines athlete records, participation over time, physical measurements, and recorded medals across Summer and Winter Olympic events. It checks data quality and explores the data through grouped summaries and charts.

**Start here:** [Olympics analysis notebook](Olympics_EDA.ipynb) · [Included athlete records](dataset_olympics.csv)

## Questions explored

* How do age, height, and weight vary across records of athletes in individual events?
* How does the number of distinct athlete IDs change by year?
* How do age distributions compare between Summer and Winter events?
* How do participation and recorded medals vary by NOC and year?
* Which sports have the most distinct events in the available data?

## What is included

| File | Role |
| --- | --- |
| [Olympics_EDA.ipynb](Olympics_EDA.ipynb) | Data inspection, duplicate removal, grouped summaries, and charts |
| [dataset_olympics.csv](dataset_olympics.csv) | 70,000 rows and 15 columns, with years ranging from 1896 to 2016 |

The main CSV includes `ID`, `Name`, `Sex`, `Age`, `Height`, `Weight`, `Team`, `NOC`, `Games`, `Year`, `Season`, `City`, `Sport`, `Event`, and `Medal`. Each row records an athlete taking part in an event, so one athlete can appear more than once.

The saved notebook reports **383 exact duplicate rows**, leaving **69,617 records** after removal. It includes distribution plots, counts by sex and medal, average age by year, summaries by sport, a line chart of distinct athlete counts, and a heatmap of medal counts. These are saved outputs, not newly reproduced results.

## Run locally

Use Python 3 from the repository root. The notebook metadata records Python 3.12.7; dependency versions are not locked.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install numpy pandas matplotlib seaborn jupyterlab
python -m jupyterlab Olympics_EDA.ipynb
```

On Windows, use `.venv\Scripts\Activate.ps1` to activate the environment in PowerShell.

**Data prerequisite:** the first cell also reads `noc_region.csv`, which is missing from this repository. Its saved preview contains the columns `noc_region`, `reg`, and `notes`. To run the notebook unchanged, supply that file beside the notebook. Alternatively, in a local copy, omit the `tf = pd.read_csv(...)` line and its following `tf` display cell: later analyses use `df` and do not join the regional lookup. Without one of these steps, running all cells stops at the missing file.

## Interpretation and data provenance

* The repository does not document the original dataset provider, the selection of these 70,000 records, or data licensing. Treat it as the available sample, not a verified complete Olympic archive.
* Counts of rows that record medals include separate athletes in team events and repeated appearances. They are not equivalent to an official national medal table.
* The cell that prints the country with the most medals uses `df["NOC"].value_counts()` without filtering medals. Its output identifies the most frequent NOC in the records, not the country with the most medals.
* Age, height, weight, and medal fields contain missing values. Numeric summaries and plotted subsets can therefore describe different groups of records.
* Summaries by year combine both seasons when they share a year. Distinct athlete counts use `ID`; other participation summaries count rows.

## Reproducibility status

This documentation reflects the existing code, CSV, and saved outputs. The notebook has not been rerun during this update. The missing regional CSV remains unresolved, and a saved Seaborn warning flags a plotting call whose `palette` use is deprecated.

## Author

Ashish.
