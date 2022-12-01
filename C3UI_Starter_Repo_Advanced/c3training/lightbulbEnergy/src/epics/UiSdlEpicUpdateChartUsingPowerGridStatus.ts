import { concat,of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// Import the methods needed from the UiSdl component
import {updateDisplayDateAction,updateDataFilterAction} from '@c3/ui/UiSdlTimeseriesLineBarChart'

// Overrides the epic method
export function epic(actionStream, _stateStream) {
  return actionStream.pipe(
    mergeMap(function ({payload: {chart, dataItem: { obj }}}) {
      
      // Change datetime by a specified number of days
      var dateSevenDaysBefore = DateTime(obj.timestamp).plusDays(-7).toString();  
      var dateSevenDaysBefore = DateTime(obj.timestamp).plusDays(7).toString();  
      return concat(
            of(updateDisplayDateAction(chart, dateSevenDaysBefore, dateSevenDaysBefore, 'DAY')),
            of(updateDataFilterAction(chart, dateSevenDaysBefore, dateSevenDaysBefore, 'DAY')));
      }
    )
  )
}