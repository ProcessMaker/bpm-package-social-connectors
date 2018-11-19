<template>
  <div>
  </div>
</template>

<script>
//import connectIcon from '@/assets/connect-elements.svg';
//import crownConfig from '@/mixins/crownConfig';

import decoratedShape from '../../../shape.js'

let taskHeight = 80;

const labelPadding = 15;
export default {
  props: ['graph', 'node', 'nodes', 'id'],
  //mixins: [crownConfig],
  data() {
    return {
      shape: null,
      definition: null,
      crownConfig: [
        {
          icon: connectIcon,
          clickHandler: this.addSequence,
        },
      ],
    };
  },
  methods: {
    getShape() {
      return this.shape;
    },
    updateShape() {
      let bounds = this.node.diagram.bounds;
      this.shape.position(bounds.x, bounds.y);
      this.shape.resize(bounds.width, bounds.height);
      this.shape.attr({
        body: {},
        label: {
          text: joint.util.breakText(this.node.definition.get('name'), {
            width: bounds.width,
          }),
          fill: 'black',
        },
        image: { 'xlink:href': 'http://placehold.it/16x16' }
      });
      const name = this.node.definition.get('name');
      let labelText = joint.util.breakText(name, { width: bounds.width });
      /* Update shape height if label text overflows */
      this.shape.attr('label/text', labelText);
      const shapeView = this.shape.findView(this.paper);
      const labelHeight = shapeView.selectors.label.getBBox().height;
      const { height } = this.shape.size();
      if (labelHeight + labelPadding !== height) {
        bounds.height = Math.max(labelHeight + 15, taskHeight);
        this.shape.resize(bounds.width, bounds.height);
      }
      // Alert anyone that we have moved
    },
    handleClick() {
      this.$parent.loadInspector('processmaker-connectors-social-twitter-send', this.node.definition, this);
    },
  },
  mounted() {
    this.shape = new decoratedShape();
    let bounds = this.node.diagram.bounds;
    this.shape.position(bounds.x, bounds.y);
    this.shape.resize(bounds.width, bounds.height);
    this.shape.attr({
      body: {
        rx: 8,
        ry: 8,
      },
      label: {
        text: joint.util.breakText(this.node.definition.get('name'), { width: bounds.width }),
        fill: 'black',
      },

      image: { 'xlink:href': require('../icon.png') }
    });
    this.shape.on('change:position', (element, position) => {
      this.node.diagram.bounds.x = position.x;
      this.node.diagram.bounds.y = position.y;
      // This is done so any flows pointing to this task are updated
      this.$emit(
        'move',
        {
          x: bounds.x,
          y: bounds.y,
        },
        element
      );
    });
    this.shape.addTo(this.graph);
    this.shape.component = this;
    this.$parent.nodes[this.id].component = this;
  },
};
</script>