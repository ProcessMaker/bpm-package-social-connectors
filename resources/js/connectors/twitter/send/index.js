
import component from './component.vue';

const implementation = 'processmaker-social-twitter-send';
const nodeId = 'processmaker-connectors-social-twitter-send';

export default  {
    id: nodeId,
    component: component,
    bpmnType: 'bpmn:ServiceTask',
    control: true,
    category: 'Social',
    icon: require('@processmaker/modeler/src/assets/toolpanel/task.svg'),
    label: 'Send Tweet',
    definition: function (moddle) {
      return moddle.create('bpmn:ServiceTask', {
        name: 'Send Tweet',
        implementation,
      });
    },
    diagram: function (moddle) {
      return moddle.create('bpmndi:BPMNShape', {
        bounds: moddle.create('dc:Bounds', {
          height: 80,
          width: 100,
        }),
      });
    },
    inspectorHandler: function (value, definition, component) {
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
