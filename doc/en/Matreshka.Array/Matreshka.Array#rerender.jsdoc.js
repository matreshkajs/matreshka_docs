/**
@method Matreshka.Array#rerender
@importance 3
@since 0.3
@summary Rerenders DOM nodes of items which are included into an instance
@desc This method renders array items in an array container. If a node which is associated to an array item has already been created, the method reinserts it into container of the array instead of rerendering it all over again.

The method can be useful in case when items have been added to the array before declaring a sandbox or a container.

Чтоб заставить массив перерисоваться, независимо от наличия отрендеренных узлов (например, вы используете кастомный шаблонизатор в ``itemRenderer``), передайте в метод объект со свойством ``forceRerender`` равным ``true``.

To force items rerender (eg you use custom template engine) pass a property ``forceRerender`` with ``true`` value to an event object.

@param {eventOptions} [eventOptions] - An event options
@returns {matreshkaArray} self
@example
this.rerender({
	forceRerender: true
});
*/
