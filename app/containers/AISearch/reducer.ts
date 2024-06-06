import { fromJS } from 'immutable';
import {
  GET_CHUNK_SUCCESS,
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_ERROR,
  GET_SEARCH_RESULT_SUCCESS,
  START_OVER,
  STOP_GENERATION,
} from 'containers/AISearch/constants';

export const initialState = fromJS({
  questions: [],
  answers: [],
  chatStarted: false,
  searchResultLoading: false,
  searchResultError: '',
  generationStopped: false,
});

function aiSearchReducer(state = initialState, action: any) {
  const { type, error, answers, query } = action;

  switch (type) {
    case GET_SEARCH_RESULT:
      return state
        .set('searchResultLoading', true)
        .set('chatStarted', true)
        .set('generationStopped', false)
        .updateIn(['questions'], (arr: string[]) => arr.push(query));

    case GET_SEARCH_RESULT_SUCCESS:
      return state.set('searchResultLoading', false);
    case GET_CHUNK_SUCCESS:
      return state.get('generationStopped') ? state : state.set('answers', [...answers]);
    case STOP_GENERATION:
      return state.set('generationStopped', true);
    case START_OVER:
      return initialState.set('generationStopped', true);
    case GET_SEARCH_RESULT_ERROR:
      return state.set('searchResultLoading', false).set('searchResultError', error);
    default:
      return state;
  }
}

export default aiSearchReducer;
