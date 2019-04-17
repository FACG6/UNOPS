# CSS Naming Convention: BEM

#### BEM: BLOCK, ELEMENT, MODIFIER.
```BEM``` is one of the most popular conventions to name CSS classes.

A block, and it means a meaningful chunk of HTML, that can be functional on its own.

> For Example: A Navbar, a Form, or a Slider are all components that function on their own, and therefore can be called blocks.
>
> **The block class name is separated by hyphens**
```HTML
<form class="my-form">
```

An element is a component that needs context in which to function. 
> For example, an input field inside a form.
> 
> **The element class name is attached to the parent (block) with two underscores.**

```HTML
 <form class="my-form">
   <input class="my-form__input-field"
 </form>
```

Finally, a modifier is something that changes the properties of an element.
> For example, a button with different color, or an input with different type.
> **The modifier className is attached to the element with two dashes**
```HTML
 <form class="my-form">
   <input class="my-form__input-field"
   <input class="my-form__input-field--submit"
   <input class="my-form__input-field--red"
 </form>
 ```

