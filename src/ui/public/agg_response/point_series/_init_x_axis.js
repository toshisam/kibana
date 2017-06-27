
export function PointSeriesInitXAxisProvider() {
  return function initXAxis(chart) {
    const x = chart.aspects.x;
    chart.xAxisFormatter = x.agg ? x.agg.fieldFormatter() : String;
    chart.xAxisLabel = x.agg ? x.agg.makeLabel.bind(x.agg) : () => '';

    if (!x.agg || !x.agg.type.ordered) return;

    chart.indexPattern = x.agg.vis.indexPattern;
    chart.xAxisField = x.agg.params.field;

    chart.ordered = {};
    const xAggOutput = x.agg.write();
    if (xAggOutput.params.interval) {
      chart.ordered.interval = xAggOutput.params.interval;
    }
  };
}
