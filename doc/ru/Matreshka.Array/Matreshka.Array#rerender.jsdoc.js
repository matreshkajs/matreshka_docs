/**
@method Seemple.Array#rerender
@importance 3
@since 0.3
@summary Перерисовывает DOM узлы элементов, входящих в массив
@desc Этот метод заново рендерит элементы массива в контейнере массива. Если узел, который ассоциирован с элеменом масива уже создан, метод, вместо перерисовки с нуля, "перевставляет" его в контейнер или песочницу массива.

Метод может быть полезным на случай, когда элементы добавлены в массив перед объявлением песочницы или контейнера.

Чтоб заставить массив перерисоваться, независимо от наличия отрендеренных узлов (например, вы используете кастомный шаблонизатор в ``itemRenderer``), передайте в метод объект со свойством ``forceRerender`` равным ``true``.
@param {eventOptions} [eventOptions] - Объект события
@returns {seempleArray} self
@example
this.rerender({
	forceRerender: true
});
*/
