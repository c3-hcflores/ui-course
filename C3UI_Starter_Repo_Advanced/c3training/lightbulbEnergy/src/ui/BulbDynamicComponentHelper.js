function getDynamicChartConfig(bulbId) {
    var bulb = SmartBulb.fetch({"filter": Filter.eq("id", bulbId)});
    var manufacturer = bulb.objs[0].manufacturer.id;
    switch (manufacturer) {
        case 'GE':
            return {
                children: [generateChartConfig('AverageTemperature', 'lightbulbEnergy.BulbDynamicChartOne')]
            };
        default: 
            return {
                children: [generateChartConfig('AverageVoltage', 'lightbulbEnergy.BulbDynamicChartTwo')]
            };
    }
}

function generateChartConfig(dataItem, metadataId) {
    return {
        type: "UiSdlConnected<UiSdlTimeseriesLineBarChart>",
        id: metadataId,
        component: {
          header: {
            title: "Should display Average Temperature if GE BUlb, AverageVoltage for all others"
          },
          zoomEnabled: true,
          dataZoom: true,
          dataSelection: true,
          xAxis: {
            name: "",
            interval: "DAY",
            startDate: "LAST_MONTH"
          },
          yAxis: {
            name: dataItem,
            units: true
          },
          dataSpec: {
            dataType: {
              typeName: "SmartBulb"
            },
            contextVars: {
              id: {
                type: "UiSdlPageParam",
                path: "myid"
              }
            },
            yAxisFields: [
              {
                visualizationType: {
                  type: "UiSdlLineBarChartLineVisualization",
                  lineStyle: "Solid",
                  itemStyle: "Circle"
                },
                legendLabel: dataItem,
                entityId: "${id}",
                metricName: dataItem,
                bindings: {
                  value: {
                    origin: 0,
                    bound: 100
                  }
                }
              }
            ]
          }
        }
      };
}