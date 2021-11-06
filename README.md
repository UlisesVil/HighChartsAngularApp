# HighCharts Angular PWA
## Angular Progressive Web App based on HighChart Library


This Progressive Web App (PWA) is fully Responsive and is available on the web, built-in Angular on the Frontend, and communicates with a Node JS REST API deployed on Heroku on the backend.

The database comes from Mongo DB Atlas.

Because it is a Progressive Web App (PWA), it can be installed as a desktop application or like an app on a mobile phone using the Chrome or Microsoft Edge browser. It will work while the user is not connected to the internet and saves the information in a local database in the browser, for later when the internet connection is re-established, all data stored in the local database will sync the online database.

The principal function of this application is to display information through charts to help the user make decisions or only show data in a presentation.

The main page of this application shows four sections.

The first section shows the main Chart of the Stacked Area style. The user will be able to edit the data of Chart Title, Chart Subtitle, Label X axis, Label Y axis, Tooltip, Categories, Series’s Name, Series’s Value, and Series’s Target.

The second section is related to the chart of the first section, and here the series of the main chart are shown individually. 

In each series, the user can see data about the missing or surplus Percentage of the current value of the series to the target value, Average, Actual Target, and Positive or Negative Trend will be displayed.

The third section shows a Pie style chart. The user can edit the chart Title, Value Suffix, Series Name, Piece Name, Piece Value. The user can add and delete individual values, and the sum of the values is at the bottom of the edit section.

In the fourth section, the user has an editable table with three headings and no limited values. Each inserted row is listed numerically. The user has available pagination to show 5, 10, or 20 rows of the table per page. The user can add or delete rows individually.

On the left, the user has available the sidebar with the links to the editing sections of each chart and data table.

Visit the site here: https://ulisesvil.github.io/HighChartsAngularApp
