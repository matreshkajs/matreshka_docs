/**
@class Seemple.Array
@module seemple/array
@inherits Seemple
@importance 1
@classdesc Клас ``Seemple.Array`` служить колекцією в Seemple.js. Він успадковується від класу {@link Seemple} і включає всі його властивості та методи. Крім цього, ``Seemple.Array`` має всі методи, які є у звичайного масиву, тим самим спрощуючи вивчення його можливостей.

#### Всі методи, запозичені у вбудованого Array працюють аналогічно їх оригіналам

Програміст, знайомий з методами нативного `` Array`` відразу може зрозуміти, яким методом можна додати елемент (``push``, ``unshift``, ``splice``), яким видалити (``pop``, ``shift``, ``splice``), яким впорядкувати (``sort``, ``reverse``) тощо.

У зв'язку з тим, що методи працюють так само, як і оригінальні (з невеликими винятками), вони не приведені в цій документації окремо, а виведені в розділ {@link Seemple.Array#METHOD}.
```js
this.push(1, 2, 3);
this.pop();
```

#### Всі методи, запозичені у вбудованого Array, які модифікують масив можуть бути викликані з передачею об'єкта події

Для цього використовується синтаксис ``метод_``, де нижнє підкреслення в кінці імені методу означає, що останнім аргументом є об'єкт події. Такі методи не наведено в цій документації, так як потрібно запам'ятати тільки їх синтаксис. Див. {@link Seemple.Array#METHOD_}.
```js
this.push_(1, 2, 3, {
	silent: true
});

this.pop_({
	foo: 'bar'
});
```

#### Розробник має можливість відловлювати будь-які модифікації даних

__При використанні методів, запозичених у вбудованого ``Array`` генеруються події з відповідним ім'ям.__ Викликаючи метод ``push``, генерується подія ``push``, викликаючи метод ``shift`` генерується подія ``shift``, викликаючи метод ``sort``, генерується подія ``sort`` і так далі.
```js
this.on('push', evt => {
	console.log('push is called');
});

this.push(1, 2, 3);
```

__При додаванні елементів генеруються події ``add`` і ``addone``.__ Перше генерується один раз на додавання (наприклад, ви додали кілька елементів за допомогою ``push``, подія викликана лише один раз), друге генерується один раз на кожен доданий елемент.

При спрацьовуванні події ``add``, значенням властивості ``added`` об'єкта події передається масив доданих елементів, а при спрацьовуванні ``addone``, значенням властивості ``addedItem`` - кожен окремий доданий елемент.

```js
this.on('add', evt => {
	console.log(evt.added); // [1,2,3]
});

this.push(1, 2, 3);
```
```js
// Обробник запуститься тричі,
// так як в масив додали три нові елементи
this.on('addone', evt {
	console.log(evt.addedItem); // 1 ... 2 ... 3
});

this.push(1, 2, 3);
```


__При видаленні елементів діє та ж логіка__: ``remove`` спрацьовує один раз, навіть якщо видалено кілька елементів, а подія ``removeone`` спрацьовує для кожного віддаленого елемента індивідуально. При генерації події ``remove`` вилучені елементи містяться у властивості ``removed`` об'єкта події, а при генерації події ``removeone`` - кожен віддалений елемент міститься у властивості ``removedItem``.
```js
this.push(1, 2, 3, 4, 5);

this.on('remove', evt => {
	console.log(evt.removed); // [2, 3, 4]
});

this.splice(1, 3);
```
```js
this.push(1, 2, 3, 4, 5);

// Обробник запуститься тричі,
// так як з масиву видалили три елементи
this.on('removeone', evt => {
	console.log(evt.removedItem); // 2 ... 3 ... 4
});

this.splice(1, 3);
```

__Приі кожної модифікації масиву генерується подія ``modify``__, дозволяючи відловити всі без винятку зміни в масиві (додавання, видалення, пересортовування).
```js
this.on('modify', evt => {
	console.log(evt.added);
	console.log(evt.removed);
});
```

__``length`` - це звичайне свойство__ яке можна пов'язувати з HTML елементом або відловлювати зміни за допомогою події ``change:length``.

> Наприклад, при додаванні трьох елементів за допомогою методу ``push``, генеруються наступні події: ``push``, ``add``, ``addone`` (тричі), ``modify``, ``change:length``.

#### Model
Властивість {@link Seemple.Array#Model} визначає клас елементів, які буде містити колекція. Рекомендується наслідувати ``Model`` від класу {@link Seemple.Object} або {@link Seemple.Array} (на випадок, якщо потрібно отримати колекцію колекцій), щоб отримати можливість конвертації масиву в звичайний масив рекурсивно методом {@link Seemple.Array#toJSON}.

#### Автоматичний рендеринг
``Seemple.Array`` вміє автоматично відмальовувати елементи на сторінці при будь-яких модифікаціях масиву. За подробицями зверніться до документації {@link Seemple.Array#itemRenderer}.

@see {@link Seemple.Array#itemRenderer}
@see {@link Seemple.Array#Model}

@example <caption>Створення екземпляра з нульовою довжиною</caption>
new Seemple.Array();
@example <caption>Створення екземпляра із зазначенням довжини</caption>
new Seemple.Array(42);
@example <caption>Передача елементів при створенні</caption>
new Seemple.Array('Hi', { a: 'b' });
@example <caption>Спадкування</caption>
class MyClass extends Seemple.Array {
	constructor(items) {
		super(...items).sayHello();
	}
	sayHello() {
		alert("Hello World!");
	}
}

@example <caption>Спадкування, використовуючи функцію {@link Seemple.Class}</caption>
const MyClass = Seemple.Class({
	extends: Seemple.Array,
	constructor(items) {
		this.recreate(items).sayHello();
	},
	sayHello() {
		alert("Hello World!");
	}
});
*/