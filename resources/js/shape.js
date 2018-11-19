let decoratedRect = joint.shapes.standard.Rectangle.extend({

    markup: [{
        tagName: 'rect',
        selector: 'body',
    }, {
        tagName: 'text',
        selector: 'label'
    }, {
        tagName: 'image',
        selector: 'image'
    }],

    defaults: joint.util.deepSupplement({

        type: 'processmaker.connectors.DecoratedRect',
        size: { width: 100, height: 60 },
        attrs: {
            'image': { 'ref-x': 2, 'ref-y': 2, ref: 'rect', width: 16, height: 16 }
        }

    }, joint.shapes.standard.Rectangle.prototype.defaults)
}); 

export default decoratedRect;