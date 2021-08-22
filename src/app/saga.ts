import { all, fork } from 'redux-saga/effects';
import { makersSaga } from 'features/makers/makersSagas';

export default function* rootSaga() {
  yield all([fork(makersSaga)]);
}
