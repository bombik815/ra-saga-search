import { skillsSlice } from './skills';
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit';
import saga from '../sagas/index';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: skillsSlice,
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(saga);

export default store;
