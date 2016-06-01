import * as SearchResultActions from '../actions/search-results.js';
import * as TagActions from '../actions/tags.js';
import Primus from '../../src/services/primus.js';
const socketUrl = 'http://eb-ci.wmm63vqska.eu-west-1.elasticbeanstalk.com?auto_room=false';
/**
* Function that initialises a connection with the web socket server and saves
* the id to the redux store
* It also initialises the event listeners for data, reconnected and error events
* transmitted from the web socket channel
* @param {Function} - actionCreatorBinder - function that takes an action
* and binds it to dispatch
*/

export function initialise (actionCreatorBinder) {
  const primus = new Primus(socketUrl);
  const {
    saveSearchResult,
    saveSocketConnectionId,
    addSingleTag
  } = actionCreatorBinder({...SearchResultActions, ...TagActions});
  primus.on('data', function received (data) {
    console.log('incoming socket data', data);
    if (data.graphql) {
      saveSearchResult(data);
    }
  });

  primus.once('open', (data) => {
    primus.id((id) => {
      saveSocketConnectionId(id);
      join(id);
      primus.on('reconnected', () => { join(id); });
      // only launch the home page query after the socket connection has been
      // initialised
      addSingleTag('Top inspiration', 'marketing:homepage.dk.spies', true);
    });
  });

  primus.on('error', function error (err) {
    console.error('Something horrible has happened', err.stack);
  });

  function join (room) {
    primus.write({
      action: 'join',
      room: room
    });
  }

  return primus;
}
