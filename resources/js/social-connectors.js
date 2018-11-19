// Our connector node types for our modeler

import twitterSend from './connectors/twitter/send/index'

let nodeTypes = [
    twitterSend
 ];

ProcessMaker.EventBus.$on('modeler-init', function(modeler) {
    for(var node of nodeTypes) {
        modeler.registerNode(node);
    }
});
