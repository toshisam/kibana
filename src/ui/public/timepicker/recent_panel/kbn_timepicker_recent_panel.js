import moment from 'moment';
import template from '../quick_panel/kbn_timepicker_quick_panel.html';
import { uiModules } from 'ui/modules';
import { timeHistory } from 'ui/timefilter/time_history';
import { TIME_MODES } from 'ui/timepicker/modes';

const module = uiModules.get('ui/timepicker');

module.directive('kbnTimepickerRecentPanel', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      setQuick: '&'
    },
    template,
    controller: function ($scope, config) {
      $scope.quickLists = [];
      const history = timeHistory.get().map(time => {
        if (time.mode === TIME_MODES.ABSOLUTE) {
          const from = moment(time.from).format(config.get('dateFormat'));
          const to = moment(time.to).format(config.get('dateFormat'));
          time.display = `${from} - ${to}`;
          return time;
        }

        time.display = `${time.from} to ${time.to}`;
        return time;
      });
      if (history.length > 5) {
        // Put history in two evenly sized sections.
        // When history.length is odd, make first list have extra item
        const halfIndex = Math.ceil(history.length / 2);
        $scope.quickLists.push(history.slice(0, halfIndex));
        $scope.quickLists.push(history.slice(halfIndex));
      } else {
        $scope.quickLists.push(history);
      }
    }
  };
});
