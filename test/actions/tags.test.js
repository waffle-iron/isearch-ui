import {
  TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  TAG_ADD_SINGLE_TAG,
  RESET_TAGS,
  TILES_REMOVE_TILE
} from '../../src/constants/actionTypes';
import { expect } from 'chai';
import * as actions from '../../src/actions/tags';
import simple from 'simple-mock';
import thunk from 'redux-thunk';
import configureMockStore from './test-helpers';
const mockStore = configureMockStore([thunk]);
const initialState = {
  search: {
    tags: [],
    items: []
  },
  travelInfo: {
    numberOfChildren: '0',
    numberOfAdults: '2',
    childAge1: '0 years',
    childAge2: '0 years',
    childAge3: '0 years',
    childAge4: '0 years',
    departureDate: '2020-04-04',
    duration: '2 weeks',
    departureAirport: 'Copenhagen - CPH'
  }
};

describe('actions', () => {
  describe('tags', () => {
    it('should create an action to add tags', (done) => {
      const tags = ['a', 'b', 'c'];
      const expectedAction = {
        type: TAG_ADD_TAGS,
        tags: tags
      };

      expect(actions.addTags(tags)).to.deep.equal(expectedAction);
      done();
    });
    it('should create an action to remove a tag', (done) => {
      const displayName = 'sparta';
      const expectedAction = {
        type: TAG_REMOVE_TAG,
        displayName
      };
      expect(actions.deleteTag(displayName)).to.deep.equal(expectedAction);
      done();
    });
  });
  describe('addSingleTag', () => {
    it(`should create an action to add a single tag if the tag doesnt exist`, (done) => {
      const store = mockStore(initialState);
      const expectedAction = {
        type: TAG_ADD_SINGLE_TAG,
        tag: {
          displayName: 'test',
          id: 'test'
        },
        isInitialTag: false
      };
      store.dispatch(actions.addSingleTag('test', 'test'));
      expect(store.getActions()).to.deep.equal([expectedAction]);
      done();
    });
  });
  describe('resetToInitialTag', () => {
    it('should create an action to set the tags back to the single tag passed', (done) => {
      const expectedAction = {
        type: RESET_TAGS
      };
      expect(actions.resetToInitialTag()).to.deep.equal(expectedAction);
      done();
    });
  });
  describe('resetTags', () => {
    it('should dispatch actions to reset the tags and start a search', (done) => {
      const dispatch = simple.mock();
      actions.resetTags()(dispatch);
      expect(dispatch.callCount).to.equal(2);
      done();
    });
  });
  describe('removeTile', () => {
    it('should create an action that removes a tile from the list of displayed items', (done) => {
      const expectedAction = {
        type: TILES_REMOVE_TILE,
        id: 'test'
      };
      expect(actions.removeTile('test')).to.deep.equal(expectedAction);
      done();
    });
  });
});
