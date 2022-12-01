import { concat,of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// Import the methods needed from the UiSdl component
import {updateDisplayDateAction,updateDataFilterAction} from '@c3/ui/UiSdlTimeseriesLineBarChart'

// Overrides the epic method
export function epic(actionStream, _stateStream) {
  return actionStream.pipe(
    mergeMap(function (action) {
      const payload = action.payload;
      // Change datetime by a specified number of days
      var dateSevenDaysBefore = DateTime(payload.dataItem.obj.start).plusDays(-7).toString();  
      var dateSevenDaysBefore = DateTime(payload.dataItem.obj.start).plusDays(7).toString();  
      return concat(
            of(updateDisplayDateAction(payload.chart, dateSevenDaysBefore, dateSevenDaysBefore, 'HOUR')),
            of(updateDataFilterAction(payload.chart, dateSevenDaysBefore, dateSevenDaysBefore, 'HOUR')));
      }
    )
  )
}