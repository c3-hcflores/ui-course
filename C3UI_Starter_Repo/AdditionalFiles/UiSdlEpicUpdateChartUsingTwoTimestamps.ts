import { concat,of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {updateDisplayDateAction,updateDataFilterAction} from '@c3/ui/UiSdlTimeseriesLineBarChart'

export function epic(actionStream, _stateStream) {
  return actionStream.pipe(
    mergeMap(function (action) {
      const payload = action.payload;
        return concat(
            of(updateDisplayDateAction(payload.chart,payload.dataItem.obj.start,payload.dataItem.obj.end, 'HOUR')),
            of(updateDataFilterAction(payload.chart,payload.dataItem.obj.start,payload.dataItem.obj.end, 'HOUR')));
     })
  );
}