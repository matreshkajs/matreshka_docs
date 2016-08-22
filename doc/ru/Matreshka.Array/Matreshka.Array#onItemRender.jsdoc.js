/**
@method Matreshka.Array#onItemRender
@importance 2
@abstract
@since 1.1
@summary Функция, которая запускается перед событием ``render``.
@desc Виртуальный метод ``onItemRender`` можно использовать в качестве замены события ``render``.

При этом, у отрисованного элемента вызывается виртуальный метод ``onRender`` с единственным аргументом - объектом события.

@param {object} item - отрисованный элемент коллекции
@param {object} renderEvt - объект события ``render``

@example
class MyModel extends Matreshka.Object {
	constructor(data) {
		super(data);
	}
	onRender(renderEvt) {
		this.bindNode('isChecked', ':sandbox .my-checkbox');
		this.bindNode('text', ':sandbox .text', Matreshka.binders.html());
	}
});

class MyArray extends Matreshka.Array {
	get Model() {
		return MyModel;
	}
	itemRenderer() {
		return '<li>'
	}
	constructor() {
		this.bindNode('sandbox', '.my-form');
	}
	onItemRender(item, renderEvt) {
		// ...
	}
});

const app = new MyArray();
*/
