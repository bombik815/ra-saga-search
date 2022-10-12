import { changeSearchField, searchSkillsClear, searchSkillsFailure, searchSkillsRequest, searchSkillsSuccess } from "../store/skills";
import { spawn, put, debounce, takeLatest, retry } from "redux-saga/effects";

async function serchSkills(search) {
  const params = new URLSearchParams({q: search});
  const response = await fetch(`${process.env.REACT_APP_SEARCH_URL}?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  };
  return await response.json();
}

function* handleChangeSearchSaga(action) {
  if (action.payload.trim() === '') {
    yield put(searchSkillsClear());
  } else {
    yield put(searchSkillsRequest(action.payload));
  };
};

function* watchChangeSearchSaga() {
  yield debounce(200, changeSearchField, handleChangeSearchSaga);
};

function* handleSearchSkillsSaga(action) {
  try {
    const data = yield retry(3, 1000, serchSkills, action.payload);
    yield put(searchSkillsSuccess(data));
  } catch (error) {
    yield put(searchSkillsFailure(error.message));
  };
};

function* watchSearchSkillsSaga() {
  yield takeLatest(searchSkillsRequest, handleSearchSkillsSaga);
};

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
};