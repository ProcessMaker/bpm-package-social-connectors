import BpmnModdle from 'bpmn-moddle';

let moddle = new BpmnModdle();

import component from './component.vue';

export default {
  id: 'processmaker-connectors-social-twitter-send',
  component: component,
  bpmnType: 'bpmn:ScriptTask',
  control: true,
  category: 'Social',
  icon: require('../icon.png'),
  label: 'Send Tweet',
  definition: function() {
    return moddle.create('bpmn:ScriptTask', {
      name: 'Send Tweet',
      implementation: 'processmaker-social-twitter-send'
    });
  },
  diagram: function() {
    return moddle.create('bpmndi:BPMNShape', {
      bounds: moddle.create('dc:Bounds', {
        height: 80,
        width: 100,
      }),
    });
  },
  inspectorHandler: function(value, definition, component) {
    // Go through each property and rebind it to our data
    for (var key in value) {
      // Only change if the value is different
      if (definition[key] != value[key]) {
        definition[key] = value[key];
      }
    }
    component.updateShape();
  },
  inspectorConfig: [
    {
      name: 'Send Tweet',
      items: [
        {
          component: 'FormText',
          config: {
            label: 'Send Tweet',
            fontSize: '2em',
          },
        },
        {
          component: 'FormInput',
          config: {
            label: 'Identifier',
            helper: 'The id field should be unique across all elements in the diagram',
            name: 'id',
          },
        },
        {
          component: 'FormTextArea',
          config: {
            label: 'Tweet Body',
            helper: 'The Body Of The Tweet to Send',
            name: 'tweet',
          },
        },
      ],
    },
  ],
};