/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint max-len: 0 */
/* eslint quotes: 0 */

export const webLogsSavedObjects = [
  {
    "id" : "workpad-5563cc40-5760-4afe-bf33-9da72fac53b7",
    "type": "canvas-workpad",
    "updated_at" : "2018-10-22T12:41:57.071Z",
    "version": 1,
    "attributes" : {
      "name" : "[Logs] Web Traffic",
      "id" : "workpad-5563cc40-5760-4afe-bf33-9da72fac53b7",
      "width" : 1280,
      "height" : 720,
      "page" : 0,
      "pages" : [
        {
          "id" : "page-e125ca0b-f6b2-437c-bc4c-918c468fbd9f",
          "style" : {
            "background" : "#000000"
          },
          "transition" : {
            "name" : ""
          },
          "elements" : [
            {
              "id" : "element-950e478d-39be-4630-9ebe-d46578951025",
              "position" : {
                "left" : 249,
                "top" : 574.3671875,
                "width" : 1013.5,
                "height" : 131.2578125,
                "angle" : 0
              },
              "expression" : `
shape "square" border="#CFD0D2" borderWidth=2 maintainAspect=false
| render
`
            },
            {
              "id" : "element-f6d67bd9-7edf-4a4c-944e-019eb2a89e46",
              "position" : {
                "left" : 249,
                "top" : 426.5,
                "width" : 1013.5,
                "height" : 131.2578125,
                "angle" : 0
              },
              "expression" : `
shape "square" border="#CFD0D2" borderWidth=2 maintainAspect=false
| render
`
            },
            {
              "id" : "element-fa296ebc-3ede-44f1-a027-f9aa0a8ba58b",
              "position" : {
                "left" : 249,
                "top" : 275.87109375,
                "width" : 1013.5,
                "height" : 131.2578125,
                "angle" : 0
              },
              "expression" : `
shape "square" border="#CFD0D2" borderWidth=2 maintainAspect=false
| render
`
            },
            {
              "id" : "element-21844047-2818-4071-bb9b-59cc68139c5f",
              "position" : {
                "left" : 589,
                "top" : 110.7578125,
                "width" : 318,
                "height" : 148.3046875,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#414143" border="rgba(255,255,255,0)" borderWidth=0 maintainAspect=false
| render
`
            },
            {
              "id" : "element-a2136689-36d7-4f61-a9c7-5e4e3c89f2ca",
              "position" : {
                "left" : 924.5,
                "top" : 109.28515625,
                "width" : 318,
                "height" : 148.3046875,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#414143" border="rgba(255,255,255,0)" borderWidth=0 maintainAspect=false
| render
`
            },
            {
              "id" : "element-2e02449b-433e-47c4-84ab-6f702619e21a",
              "position" : {
                "left" : 249,
                "top" : 109.6328125,
                "width" : 318,
                "height" : 148.3046875,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#414143" border="rgba(255,255,255,0)" borderWidth=0 maintainAspect=false
| render
`
            },
            {
              "id" : "element-0f10bedf-728c-4207-96b8-bbb3021a91f1",
              "position" : {
                "left" : 245,
                "top" : 12,
                "width" : 1017.5,
                "height" : 65.90625,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#221F20" border="#777777" borderWidth=0 maintainAspect=false
| render
`,
              "filter" : null
            },
            {
              "id" : "element-4130544d-054a-4600-928a-39f1423788c6",
              "position" : {
                "left" : 13.5,
                "top" : 12,
                "width" : 211,
                "height" : 693.625,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#221F20" border="#777777" borderWidth=0 maintainAspect=false
| render
`
            },
            {
              "id" : "element-57ffa8a7-f3f3-45bf-a35a-025a7647b8e7",
              "position" : {
                "left" : 19.25,
                "top" : 88.5625,
                "width" : 109,
                "height" : 7.25,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#CFD0D2" border="#CFD0D2" borderWidth=2 maintainAspect=false
| render
`
            },
            {
              "id" : "element-4562db88-edbe-45b2-86aa-c549f2e25c98",
              "position" : {
                "left" : 671.5,
                "top" : 303.2421875,
                "width" : 574,
                "height" : 89.13671875,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#221F20" border="rgba(255,255,255,0)" borderWidth=0 maintainAspect=false
| render
`
            },
            {
              "id" : "element-6556fa13-4557-47bc-bb9f-08a525604e13",
              "position" : {
                "left" : 56.25,
                "top" : 13.625,
                "width" : 168.25,
                "height" : 149,
                "angle" : 0
              },
              "expression" : `
shape "circle" fill="#221F20" border="#CFD0D2" borderWidth=2 maintainAspect=true
| render
`
            },
            {
              "id" : "element-671589a9-54b6-46a1-b5e7-363b9d539795",
              "position" : {
                "left" : 258,
                "top" : 24.8125,
                "width" : 28,
                "height" : 36,
                "angle" : 0
              },
              "expression" : `
image mode="contain" dataurl={
asset {
filters | essql
query="SELECT host,response
FROM kibana_sample_data_logs
WHERE host='artifacts.elastic.co'
ORDER BY timestamp DESC
LIMIT 1"|
alterColumn "response" type="number" |
getCell "response" |
if {compare lt to=400} then="asset-0a807073-d056-4c7b-9bf4-225b71e47243" else="asset-1343672d-7c02-4402-929e-0f8fef69cddd"
}
} | render
`
            },
            {
              "id" : "element-d98c4bb0-f9ae-4e4a-838d-572b6919a3a2",
              "position" : {
                "left" : 20.375,
                "top" : 68,
                "width" : 60.25,
                "height" : 27.8125,
                "angle" : 0
              },
              "expression" : `
filters
| demodata
| markdown "5XX"
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=18 align="left" color="#CFD0D2" weight="normal" underline=false italic=false}
| render
`
            },
            {
              "id" : "element-11de34da-7783-4d09-b22f-4ec1f8c957ea",
              "position" : {
                "left" : 573,
                "top" : 459.5,
                "width" : 79,
                "height" : 82,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT SUM(bytes) as total_bytes, host
FROM kibana_sample_data_logs
GROUP BY host"
| pointseries color="host" size="total_bytes"
| pie hole=60 labels=false legend=false palette={palette "#346822" "#57993F" "#C3F99C" "#6CBD38" gradient=true}
| render
`
            },
            {
              "id" : "element-a2e808f6-1b2e-4f84-931e-6c38424c5480",
              "position" : {
                "left" : 289.5,
                "top" : 29.4375,
                "width" : 165,
                "height" : 26.75,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT host
FROM kibana_sample_data_logs
WHERE host='artifacts.elastic.co'
ORDER BY timestamp DESC
LIMIT 1"
| markdown {getCell "host"}
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=12 align="left" color="#CFD0D2" size=18 weight="lighter" underline=false italic=false}
| render
`
            },
            {
              "id" : "element-bc35a3fe-c896-4898-a7f3-e5778958d6b0",
              "position" : {
                "left" : 263.25,
                "top" : 436.25,
                "width" : 302,
                "height" : 110,
                "angle" : 0
              },
              "expression" : `
filters
| essql query="SELECT SUM(bytes) as total_bytes
FROM kibana_sample_data_logs"
| math "total_bytes"
| formatNumber "0.00b"
| metric "BYTES TRANSFERRED"
metricFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=60 align="left" color="#FFFFFF" weight="normal" underline=false italic=false}
labelFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=30 align="left" color="#FFFFFF" weight="lighter" underline=false italic=false}
| render
`
            },
            {
              "id" : "element-a684991f-f179-4fcc-b474-5ed71b0a6f3e",
              "position" : {
                "left" : 264.5,
                "top" : 586.5,
                "width" : 290.5,
                "height" : 104,
                "angle" : 0
              },
              "expression" : `
filters
| essql query="SELECT COUNT(timestamp) as total_visitors
FROM kibana_sample_data_logs"
| math "total_visitors"
| metric "TOTAL VISITORS"
metricFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=60 align="left" color="#FFFFFF" weight="normal" underline=false italic=false}
labelFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=30 align="left" color="#FFFFFF" weight="lighter" underline=false italic=false}
| render
`
            },
            {
              "id" : "element-a8a8fa93-8e08-4e9f-b3e4-f4014543fe1f",
              "position" : {
                "left" : 515.5,
                "top" : 29.4375,
                "width" : 147,
                "height" : 25.75,
                "angle" : 0
              },
              "expression" : `
filters
| essql query="SELECT host
FROM kibana_sample_data_logs
WHERE host='www.elastic.co'"
| markdown {getCell "host"}
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=12 align="left" color="#CFD0D2" size=18 weight="lighter" underline=false italic=false}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-38b281b2-ab5e-41ee-aa3e-e48bc3f778df",
              "position" : {
                "left" : 719,
                "top" : 28.625,
                "width" : 247,
                "height" : 26.75,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT host
FROM kibana_sample_data_logs
WHERE host='cdn.elastic-elastic-elastic.org'"
| markdown {getCell "host"}
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=12 align="left" color="#CFD0D2" size=18 weight="lighter" underline=false italic=false}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-b481bf28-15d3-4f0b-b67b-e268c68bfe9c",
              "position" : {
                "left" : 1040.5,
                "top" : 28.8125,
                "width" : 209,
                "height" : 27.375,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT host
FROM kibana_sample_data_logs
WHERE host='elastic-elastic-elastic.org'"
| markdown {getCell "host"}
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=12 align="left" color="#CFD0D2" size=18 weight="lighter" underline=false italic=false}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-ebb18e7a-ec51-4072-8453-58fbb883584b",
              "position" : {
                "left" : 677.5,
                "top" : 451.77734375,
                "width" : 578,
                "height" : 90.5,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT SUM(bytes) as total_bytes, HOUR_OF_DAY(timestamp) as hour, host
FROM kibana_sample_data_logs
GROUP BY host, HOUR_OF_DAY(timestamp)
ORDER BY HOUR_OF_DAY(timestamp) DESC"
| pointseries x="hour" y="total_bytes" color="host"
| plot defaultStyle={seriesStyle bars=0 lines=3 points=0} legend=false xaxis=false yaxis=false palette={palette "#346822" "#57993F" "#C3F99C" "#6CBD38" gradient=true}
| render containerStyle={containerStyle backgroundColor="#221F20"}
`
            },
            {
              "id" : "element-05a065b5-5f01-4502-9f91-fdfc3de1b456",
              "position" : {
                "left" : 677.5,
                "top" : 594.875,
                "width" : 578,
                "height" : 87.25,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(timestamp) as total_visitors, HOUR_OF_DAY(timestamp) as hour, host
FROM kibana_sample_data_logs
GROUP BY host, HOUR_OF_DAY(timestamp)
ORDER BY HOUR_OF_DAY(timestamp) DESC"
| pointseries x="hour" y="total_visitors" color="host"
| plot defaultStyle={seriesStyle bars=0 lines=3 points=0} legend=false xaxis=false yaxis=false palette={palette "#C83C5C" "#D56F79" "#F6C4C5" "#F1A3A6" gradient=true}
| render containerStyle={containerStyle backgroundColor="#221F20"}
`
            },
            {
              "id" : "element-ce1da927-2d4f-413e-85e9-4fd1106b5207",
              "position" : {
                "left" : 573,
                "top" : 604.5,
                "width" : 79,
                "height" : 82,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(timestamp) as total_visitors, host
FROM kibana_sample_data_logs
GROUP BY host"
| pointseries color="host" size="total_visitors"
| pie hole=60 labels=false legend=false palette={palette "#C83C5C" "#D56F79" "#F6C4C5" "#F1A3A6" gradient=true}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-acccadaf-3ce8-4ca6-8205-4529d42c1eef",
              "position" : {
                "left" : 677,
                "top" : 290.62109375,
                "width" : 562,
                "height" : 101.7578125,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(timestamp) as total_errors, timestamp
FROM kibana_sample_data_logs
WHERE tags LIKE '%warning%'
GROUP BY timestamp
ORDER BY timestamp DESC"
| pointseries x="timestamp" y="total_errors"
| plot defaultStyle={seriesStyle bars="1" lines="0" points=0 color="#E9782F"} legend=false xaxis=false yaxis=false
| render
`
            },
            {
              "id" : "element-1ae8ea70-993a-4503-916a-ce98717054f6",
              "position" : {
                "left" : 680.5,
                "top" : 290.62109375,
                "width" : 562,
                "height" : 101.7578125,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(timestamp) as total_errors, timestamp
FROM kibana_sample_data_logs
WHERE tags LIKE '%error%'
GROUP BY timestamp
ORDER BY timestamp DESC"
| pointseries x="timestamp" y="total_errors"
| plot defaultStyle={seriesStyle bars="1" lines="0" points=0 color="#F2C242"} legend=false xaxis=false yaxis=false
| render
`
            },
            {
              "id" : "element-70a2bca6-de31-4bee-81b1-b18528820645",
              "position" : {
                "left" : 264.5,
                "top" : 287.4375,
                "width" : 215,
                "height" : 104.94140625,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(timestamp) as total_errors
FROM kibana_sample_data_logs
WHERE tags LIKE '%warning%' OR tags LIKE '%error%'"
| math "total_errors"
| metric "TOTAL ISSUES"
metricFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=60 align="left" color="#FFFFFF" weight="normal" underline=false italic=false}
labelFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=30 align="left" color="#FFFFFF" weight="lighter" underline=false italic=false}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-5b36cc1b-e0d6-4ddc-bf16-849fc41e1f16",
              "position" : {
                "left" : 562.5,
                "top" : 294.1953125,
                "width" : 100,
                "height" : 98.18359375,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(timestamp) as total_errors
FROM kibana_sample_data_logs
WHERE tags LIKE '%warning%' OR tags LIKE '%error%'"
| math "sum(total_errors / 100)"
| revealImage origin="bottom" image={asset "asset-a1e77720-eb0b-42a0-a1c0-a159035e4f26"} emptyImage={asset "asset-d2cca77f-ba40-4acb-beff-38fab19c7b65"}
| render
`
            },
            {
              "id" : "element-9d5e9c4b-a7f5-459b-ab15-cfcd1d1d00c9",
              "position" : {
                "left" : 319.5,
                "top" : 122.94140625,
                "width" : 239,
                "height" : 39.68359375,
                "angle" : 0
              },
              "expression" : `
filters
| demodata
| markdown "MACHINE"
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=27 align="left" color="#FFFFFF" weight="lighter" underline=false italic=false}
| render
`
            },
            {
              "id" : "element-d575ce4e-4aa5-4c54-993a-ca56890e434f",
              "position" : {
                "left" : 259.5,
                "top" : 171.69140625,
                "width" : 295.5,
                "height" : 80.12109375,
                "angle" : 0
              },
              "expression" : `
filters
| esdocs index="kibana_sample_data_logs" sort="timestamp, desc" fields="machine.os, machine.ram" count=1
| markdown "**OS:** " {getCell "machine.os"} "\\
 **RAM:** " {getCell "machine.ram" | formatNumber "00.0b"}
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=20 align="left" color="#FFFFFF" weight="lighter" underline=false italic=false}
| render containerStyle={containerStyle padding="5px"}
`
            },
            {
              "id" : "element-6f777a39-f934-4263-94ea-4f1d48f3849c",
              "position" : {
                "left" : 604.75,
                "top" : 171.69140625,
                "width" : 298,
                "height" : 83.74609375,
                "angle" : 0
              },
              "expression" : `
filters
| esdocs index="kibana_sample_data_logs" sort="timestamp, desc" fields="request" count=1
| markdown {getCell "request"}
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=20 align="left" color="#FFFFFF" weight="lighter" underline=false italic=false}
| render containerStyle={containerStyle padding="5px"}
`
            },
            {
              "id" : "element-7bfcdb0f-3533-4e50-a94a-f0487f374bff",
              "position" : {
                "left" : 941.5,
                "top" : 171.69140625,
                "width" : 284,
                "height" : 80.12109375,
                "angle" : 0
              },
              "expression" : `
filters
| esdocs index="kibana_sample_data_logs" sort="timestamp, desc" fields="geo.src, geo.dest" count=1
| markdown "**ORIGIN COUNTRY:** " {getCell "geo.src"} "\\
 **DESTINATION:** " {getCell "geo.dest"}
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=20 align="left" color="#FFFFFF" weight="lighter" underline=false italic=false}
| render containerStyle={containerStyle padding="5px"}
`
            },
            {
              "id" : "element-db2d0540-f734-421e-a9a5-7f6e9eef0bd7",
              "position" : {
                "left" : 986.5,
                "top" : -50.75,
                "width" : 285,
                "height" : 50,
                "angle" : 0
              },
              "expression" : `
timefilterControl compact=true column="timestamp"
| render
`,
              "filter" : `timefilter from="now-24h" to=now column=timestamp`
            },
            {
              "id" : "element-a29b5f31-3204-4174-a511-5869648ccae0",
              "position" : {
                "left" : 73.75,
                "top" : 34.2578125,
                "width" : 133.25,
                "height" : 108.609375,
                "angle" : 0
              },
              "expression" : `
shape "circle" fill="#C83C5B" border="rgba(255,255,255,0)" borderWidth=0 maintainAspect=true
| render
`
            },
            {
              "id" : "element-c509ce21-e729-4aa5-b892-f4be441cde26",
              "position" : {
                "left" : 94.875,
                "top" : 64,
                "width" : 91,
                "height" : 49.125,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(*) as response_code
FROM kibana_sample_data_logs
WHERE response >= 500"
| math "response_code"
| metric
metricFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=48 align="center" color="#FFFFFF" weight="bold" underline=false italic=false}
| render
`
            },
            {
              "id" : "element-d27ad090-4e58-4d9c-aef7-ccb8ca043758",
              "position" : {
                "left" : 20.375,
                "top" : 612.625,
                "width" : 109,
                "height" : 7.25,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#CFD0D2" border="#CFD0D2" borderWidth=2 maintainAspect=false
| render
`
            },
            {
              "id" : "element-99baa692-12dc-4d8d-9d78-05cb1aa7f7a8",
              "position" : {
                "left" : 21.1875,
                "top" : 436.25,
                "width" : 109,
                "height" : 7.25,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#CFD0D2" border="#CFD0D2" borderWidth=2 maintainAspect=false
| render
`
            },
            {
              "id" : "element-f0412810-61fb-4ab8-ba9f-a69ba344d4d7",
              "position" : {
                "left" : 20.25,
                "top" : 251.8125,
                "width" : 109,
                "height" : 7.25,
                "angle" : 0
              },
              "expression" : `
shape "square" fill="#CFD0D2" border="#CFD0D2" borderWidth=2 maintainAspect=false
| render
`
            },
            {
              "id" : "element-42587f38-4f6e-4a23-9ade-d0f23449efba",
              "position" : {
                "left" : 56.25,
                "top" : 183.4375,
                "width" : 168.25,
                "height" : 149,
                "angle" : 0
              },
              "expression" : `
shape "circle" fill="#221F20" border="#CFD0D2" borderWidth=2 maintainAspect=true
| render
`
            },
            {
              "id" : "element-40d243ea-088c-4e17-b797-c47c8b94e282",
              "position" : {
                "left" : 56.25,
                "top" : 369,
                "width" : 168.25,
                "height" : 149,
                "angle" : 0
              },
              "expression" : `
shape "circle" fill="#221F20" border="#CFD0D2" borderWidth=2 maintainAspect=true
| render
`
            },
            {
              "id" : "element-349aaa30-c164-4b95-b5aa-891a43e7b693",
              "position" : {
                "left" : 56.25,
                "top" : 541.5,
                "width" : 168.25,
                "height" : 149,
                "angle" : 0
              },
              "expression" : `
shape "circle" fill="#221F20" border="#CFD0D2" borderWidth=2 maintainAspect=true
| render
`
            },
            {
              "id" : "element-e92c89d9-4ddd-499c-8367-94271da02b3d",
              "position" : {
                "left" : 73.75,
                "top" : 203.6328125,
                "width" : 133.25,
                "height" : 108.609375,
                "angle" : 0
              },
              "expression" : `
shape "circle" fill="#E9782F" border="rgba(255,255,255,0)" borderWidth=0 maintainAspect=true
| render
`
            },
            {
              "id" : "element-f827824d-fc40-4905-937d-060e9748acce",
              "position" : {
                "left" : 74.75,
                "top" : 389.1953125,
                "width" : 133.25,
                "height" : 108.609375,
                "angle" : 0
              },
              "expression" : `
shape "circle" fill="#F2C242" border="rgba(255,255,255,0)" borderWidth=0 maintainAspect=true
| render
`
            },
            {
              "id" : "element-f7e459a0-613e-43f4-9ced-d5f4ae6f3c47",
              "position" : {
                "left" : 74.75,
                "top" : 561.9453125,
                "width" : 133.25,
                "height" : 108.609375,
                "angle" : 0
              },
              "expression" : `
shape "circle" fill="#6CBD38" border="rgba(255,255,255,0)" borderWidth=0 maintainAspect=true
| render
`
            },
            {
              "id" : "element-f5760f24-d9cb-42e8-ae60-13c60335f049",
              "position" : {
                "left" : 21.1875,
                "top" : 590.1875,
                "width" : 61.375,
                "height" : 25.8125,
                "angle" : 0
              },
              "expression" : `
filters
| demodata
| markdown "2XX"
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=18 align="left" color="#CFD0D2" weight="normal" underline=false italic=false}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-5e9998b3-7c27-4f4a-8f61-6b857339e07e",
              "position" : {
                "left" : 21.1875,
                "top" : 413.59375,
                "width" : 50.625,
                "height" : 26.28125,
                "angle" : 0
              },
              "expression" : `
filters
| demodata
| markdown "3XX"
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=18 align="left" color="#CFD0D2" weight="normal" underline=false italic=false}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-744e0e58-e1be-4919-a9fb-eaa46c5d8aaa",
              "position" : {
                "left" : 19.25,
                "top" : 228.4375,
                "width" : 54.5,
                "height" : 30.625,
                "angle" : 0
              },
              "expression" : `
filters
| demodata
| markdown "4XX"
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=18 align="left" color="#CFD0D2" weight="normal" underline=false italic=false}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-9f7bea99-8c0c-49b1-b8a3-9af26eb0466d",
              "position" : {
                "left" : 94.875,
                "top" : 228.4375,
                "width" : 91,
                "height" : 59,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(*) as response_code
FROM kibana_sample_data_logs
WHERE response >= 400 AND response < 500"
| math "unique(response_code)"
| metric
metricFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=48 align="center" color="#FFFFFF" weight="bold" underline=false italic=false}
| render
`
            },
            {
              "id" : "element-607512ac-3d83-4d36-87c1-d5f13502f084",
              "position" : {
                "left" : 97.5,
                "top" : 418.25,
                "width" : 88.375,
                "height" : 59,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(*) as response_code
FROM kibana_sample_data_logs
WHERE response >= 300 AND response < 400"
| math "response_code"
| metric
metricFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=48 align="center" color="#FFFFFF" weight="bold" underline=false italic=false}
| render
`
            },
            {
              "id" : "element-3cc56225-d739-4279-97f2-5c179fb013a5",
              "position" : {
                "left" : 94.875,
                "top" : 590.1875,
                "width" : 91,
                "height" : 59,
                "angle" : 0
              },
              "expression" : `
filters
| essql
query="SELECT COUNT(*) as response_code
FROM kibana_sample_data_logs
WHERE response >= 200 AND response < 300"
| math "response_code"
| formatNumber "0a"
| metric
metricFont={font family="'Open Sans', Helvetica, Arial, sans-serif" size=48 align="center" color="#FFFFFF" weight="bold" underline=false italic=false}
| render
`
            },
            {
              "id" : "element-f7d5956f-287d-4ac6-bcfb-fca6f8ebe63e",
              "position" : {
                "left" : 479.5,
                "top" : 24,
                "width" : 28,
                "height" : 36,
                "angle" : 0
              },
              "expression" : `
image mode="contain" dataurl={
asset {
filters | essql
query="SELECT host,response
FROM kibana_sample_data_logs
WHERE host='www.elastic.co'
ORDER BY timestamp DESC
LIMIT 1"|
alterColumn "response" type="number" |
getCell "response" |
if {compare lt to=400} then="asset-0a807073-d056-4c7b-9bf4-225b71e47243" else="asset-1343672d-7c02-4402-929e-0f8fef69cddd"
}
} | render
`,
              "filter" : null
            },
            {
              "id" : "element-254cc607-c924-49f4-a7f7-737480b4a056",
              "position" : {
                "left" : 682.5,
                "top" : 24.5,
                "width" : 28,
                "height" : 36,
                "angle" : 0
              },
              "expression" : `
image mode="contain" dataurl={
asset {
filters | essql
query="SELECT host,response
FROM kibana_sample_data_logs
WHERE host='cdn.elastic-elastic-elastic.org'
ORDER BY timestamp DESC
LIMIT 1"|
alterColumn "response" type="number" |
getCell "response" |
if {compare lt to=400} then="asset-0a807073-d056-4c7b-9bf4-225b71e47243" else="asset-1343672d-7c02-4402-929e-0f8fef69cddd"
}
} | render
`,
              "filter" : null
            },
            {
              "id" : "element-96aa263d-8222-4adc-94ff-2277a1f55dff",
              "position" : {
                "left" : 1001.5,
                "top" : 24,
                "width" : 28,
                "height" : 36,
                "angle" : 0
              },
              "expression" : `
image mode="contain" dataurl={
asset {
filters | essql
query="SELECT host,response
FROM kibana_sample_data_logs
WHERE host='elastic-elastic-elastic.org'
ORDER BY timestamp DESC
LIMIT 1"|
alterColumn "response" type="number" |
getCell "response" |
if {compare lt to=400} then="asset-0a807073-d056-4c7b-9bf4-225b71e47243" else="asset-1343672d-7c02-4402-929e-0f8fef69cddd"
}
} | render
`,
              "filter" : null
            },
            {
              "id" : "element-618ced11-d0da-4603-ae0b-77a5bb35e6c4",
              "position" : {
                "left" : 263.25,
                "top" : 128.658203125,
                "width" : 45,
                "height" : 28.25,
                "angle" : 0
              },
              "expression" : `
image mode="contain" dataurl={asset "asset-e9118351-dcc5-4a27-a7fc-f15eb308999b"}
| render
`
            },
            {
              "id" : "element-0f3c5e51-24b8-421e-b151-0c0229f80550",
              "position" : {
                "left" : 658.5,
                "top" : 120.17578125,
                "width" : 220,
                "height" : 37.3828125,
                "angle" : 0
              },
              "expression" : `
filters
| demodata
| markdown "REQUEST"
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=27 align="left" color="#FFFFFF" weight="lighter" underline=false italic=false}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-98d5f63a-ef33-415a-a1ec-44a5564c239f",
              "position" : {
                "left" : 996.5,
                "top" : 118.94140625,
                "width" : 220,
                "height" : 43.68359375,
                "angle" : 0
              },
              "expression" : `
filters
| demodata
| markdown "GEO"
font={font family="'Open Sans', Helvetica, Arial, sans-serif" size=27 align="left" color="#FFFFFF" weight="lighter" underline=false italic=false}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-88f2579a-50af-4330-baaf-e751092588a3",
              "position" : {
                "left" : 604.75,
                "top" : 129.30859375,
                "width" : 45,
                "height" : 28.25,
                "angle" : 0
              },
              "expression" : `
image mode="contain" dataurl={asset "asset-c2128a19-e5ba-450c-99c0-a68abbdfa684"}
| render
`,
              "filter" : null
            },
            {
              "id" : "element-eed60428-2b80-4558-8bcc-40b516fa63d4",
              "position" : {
                "left" : 942.5,
                "top" : 124.7421875,
                "width" : 45,
                "height" : 29.25,
                "angle" : 0
              },
              "expression" : `
image mode="contain" dataurl={asset "asset-86622ebc-32db-40fa-8310-262c85a10979"}
| render
`,
              "filter" : null
            }
          ]
        }
      ],
      "colors" : [
        "#37988d",
        "#c19628",
        "#b83c6f",
        "#3f9939",
        "#1785b0",
        "#ca5f35",
        "#45bdb0",
        "#f2bc33",
        "#e74b8b",
        "#4fbf48",
        "#1ea6dc",
        "#fd7643",
        "#72cec3",
        "#f5cc5d",
        "#ec77a8",
        "#7acf74",
        "#4cbce4",
        "#fd986f",
        "#a1ded7",
        "#f8dd91",
        "#f2a4c5",
        "#a6dfa2",
        "#86d2ed",
        "#fdba9f",
        "#000000",
        "#444444",
        "#777777",
        "#BBBBBB",
        "#FFFFFF",
        "rgba(255,255,255,0)"
      ],
      "@timestamp" : "2018-10-22T12:41:57.071Z",
      "@created" : "2018-10-22T12:41:57.071Z",
      "assets" : {
        "asset-a1e77720-eb0b-42a0-a1c0-a159035e4f26" : {
          "id" : "asset-a1e77720-eb0b-42a0-a1c0-a159035e4f26",
          "@created" : "2018-10-13T10:48:32.499Z",
          "type" : "dataurl",
          "value" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MS41MyA4Ny4yOSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNkOTI4NTk7fS5jbHMtMntmaWxsOiNmOTcxMDA7fS5jbHMtM3tmaWxsOiNmOWMxMDA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GaXJlIENvbG9yPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMi0yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMwLjc3LDBoMFM2MS41MywyNy43MSw2MS41Myw1Ni41M2MwLDE5LjI3LTEzLjc3LDMwLjc3LTMwLjc3LDMwLjc3aDBBMzAuOCwzMC44LDAsMCwxLDAsNTYuNTNDMCwyOC42OCwzMC43NywwLDMwLjc3LDBaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzAuNzcsMjBoMHMyMy43LDIxLjM0LDIzLjcsNDMuNTRjMCwxNC44NC0xMC42MSwyMy43LTIzLjcsMjMuN2gwYTIzLjczLDIzLjczLDAsMCwxLTIzLjctMjMuN0M3LjA3LDQyLjE0LDMwLjc3LDIwLDMwLjc3LDIwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTMwLjc3LDUyLjA3aDBTNDMuMTgsNjMuMjUsNDMuMTgsNzQuODhjMCw3Ljc3LTUuNTYsMTIuNDItMTIuNDIsMTIuNDJoMEExMi40MywxMi40MywwLDAsMSwxOC4zNSw3NC44OEMxOC4zNSw2My42NCwzMC43Nyw1Mi4wNywzMC43Nyw1Mi4wN1oiLz48L2c+PC9nPjwvc3ZnPg=="
        },
        "asset-d2cca77f-ba40-4acb-beff-38fab19c7b65" : {
          "id" : "asset-d2cca77f-ba40-4acb-beff-38fab19c7b65",
          "@created" : "2018-10-13T10:48:37.615Z",
          "type" : "dataurl",
          "value" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MS41MyA4Ny4yOSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM2ZDZlNzE7fS5jbHMtMntmaWxsOiM5Mzk1OTg7fS5jbHMtM3tmaWxsOiNiY2JlYzA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GaXJlIEdyYXk8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8yLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMzAuNzcsMGgwQTEyNi4yNSwxMjYuMjUsMCwwLDEsNDguMzIsMjAuNTNjNi45MSwxMC4xMywxMy4yMiwyMi45NSwxMy4yMiwzNiwwLDE5LjI3LTEzLjc3LDMwLjc3LTMwLjc3LDMwLjc3aDBBMzAuOCwzMC44LDAsMCwxLDAsNTYuNTNDMCwyOC42OCwzMC43NywwLDMwLjc3LDBaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzAuNzcsMjBoMHMyMy43LDIxLjM0LDIzLjcsNDMuNTRjMCwxNC44NC0xMC42MSwyMy43LTIzLjcsMjMuN2gwYTIzLjczLDIzLjczLDAsMCwxLTIzLjctMjMuN0M3LjA3LDQyLjE0LDMwLjc3LDIwLDMwLjc3LDIwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTMwLjc3LDUyLjA3aDBTNDMuMTgsNjMuMjUsNDMuMTgsNzQuODhjMCw3Ljc3LTUuNTYsMTIuNDItMTIuNDIsMTIuNDJoMEExMi40MywxMi40MywwLDAsMSwxOC4zNSw3NC44OEMxOC4zNSw2My42NCwzMC43Nyw1Mi4wNywzMC43Nyw1Mi4wN1oiLz48L2c+PC9nPjwvc3ZnPg=="
        },
        "asset-1343672d-7c02-4402-929e-0f8fef69cddd" : {
          "id" : "asset-1343672d-7c02-4402-929e-0f8fef69cddd",
          "@created" : "2018-10-13T14:50:42.520Z",
          "type" : "dataurl",
          "value" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNC44NiAyNC44NiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNkOTI4NTk7fS5jbHMtMntmaWxsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjNweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlBpbmsgWDwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzItMiIgZGF0YS1uYW1lPSJMYXllciAyIj48Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjEyLjQzIiBjeT0iMTIuNDMiIHI9IjEyLjQzIi8+PGxpbmUgY2xhc3M9ImNscy0yIiB4MT0iMTYuNzYiIHkxPSI4LjA5IiB4Mj0iOC4wOSIgeTI9IjE2Ljc2Ii8+PGxpbmUgY2xhc3M9ImNscy0yIiB4MT0iOC4wOSIgeTE9IjguMDkiIHgyPSIxNi43NiIgeTI9IjE2Ljc2Ii8+PC9nPjwvZz48L3N2Zz4="
        },
        "asset-0a807073-d056-4c7b-9bf4-225b71e47243" : {
          "id" : "asset-0a807073-d056-4c7b-9bf4-225b71e47243",
          "@created" : "2018-10-13T14:50:49.318Z",
          "type" : "dataurl",
          "value" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNC44NiAyNC44NiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM0OGMxMDA7fS5jbHMtMntmaWxsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjNweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkdyZWVuIGNoZWNrPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMi0yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iMTIuNDMiIGN5PSIxMi40MyIgcj0iMTIuNDMiLz48bGluZSBjbGFzcz0iY2xzLTIiIHgxPSIxOC43NCIgeTE9IjguNTMiIHgyPSIxMC4wNyIgeTI9IjE3LjIiLz48bGluZSBjbGFzcz0iY2xzLTIiIHgxPSI2LjgzIiB5MT0iMTIuMzUiIHgyPSIxMS45MyIgeTI9IjE3LjQ1Ii8+PC9nPjwvZz48L3N2Zz4="
        },
        "asset-86622ebc-32db-40fa-8310-262c85a10979" : {
          "id" : "asset-86622ebc-32db-40fa-8310-262c85a10979",
          "@created" : "2018-10-13T15:01:15.036Z",
          "type" : "dataurl",
          "value" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNy45NCAyOS43Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzQxNDA0MjtzdHJva2U6I2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+R2VvIEljb248L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8yLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PHJlY3QgY2xhc3M9ImNscy0xIiB4PSIxIiB5PSI3LjM1IiB3aWR0aD0iMzUuOTQiIGhlaWdodD0iMjEuMzYiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yMy41OCwxOS43aDBTMTcsMTMuNzYsMTcsNy41OUE2LjMsNi4zLDAsMCwxLDIzLjU4LDFoMGE2LjYsNi42LDAsMCwxLDYuNTksNi41OUMzMC4xOCwxMy41NiwyMy41OCwxOS43LDIzLjU4LDE5LjdaIi8+PC9nPjwvZz48L3N2Zz4="
        },
        "asset-c2128a19-e5ba-450c-99c0-a68abbdfa684" : {
          "id" : "asset-c2128a19-e5ba-450c-99c0-a68abbdfa684",
          "@created" : "2018-10-13T15:02:05.173Z",
          "type" : "dataurl",
          "value" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMS44MyAyNi4zOSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM0MTQwNDI7c3Ryb2tlOiNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlJlcXVlc3QgSWNvbjwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzItMiIgZGF0YS1uYW1lPSJMYXllciAyIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMC44MywxSDFWMjUuMjNhLjE2LjE2LDAsMCwwLC4yOC4xMkw3LjY2LDE5SDMwLjgzWiIvPjwvZz48L2c+PC9zdmc+"
        },
        "asset-e9118351-dcc5-4a27-a7fc-f15eb308999b" : {
          "id" : "asset-e9118351-dcc5-4a27-a7fc-f15eb308999b",
          "@created" : "2018-10-13T15:02:24.299Z",
          "type" : "dataurl",
          "value" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MC44MSAyNS4zMSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM0MTQwNDI7c3Ryb2tlOiNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPk1hY2hpbmUgSWNvbjwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzItMiIgZGF0YS1uYW1lPSJMYXllciAyIj48cmVjdCBjbGFzcz0iY2xzLTEiIHg9IjUuMTgiIHk9IjEiIHdpZHRoPSIyOS44MyIgaGVpZ2h0PSIxNy45NiIvPjxsaW5lIGNsYXNzPSJjbHMtMSIgeTE9IjI0LjMxIiB4Mj0iNDAuODEiIHkyPSIyNC4zMSIvPjwvZz48L2c+PC9zdmc+"
        }
      }
    }
  }
];
