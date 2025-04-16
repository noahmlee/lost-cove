---
title: Abstraction
draft: 
tags:
  - notes
  - programming-concepts
---
## Abstraction (In Programming)
Abstraction is a simple concept with varying degrees of complexity in its execution. In programming, abstraction simplifies complex systems by hiding unnecessary details, focusing on essential functionality and making code easier to understand, maintain, and build upon.

---
### Why Write Abstract Code?
Code can get complex and messy, making it nearly impossible to read and understand. The further we abstract from the nitty-gritty details, and just focus on the actual functionality that is provided in the code, the easier the code will be to understand

### Examples of Abstraction in Code

#### 1. **Functions and Methods**

Instead of repeating logic over and over, we abstract it into a reusable function.
```js
function calculateArea(width, height) {
	return width * height;
}
```

We don't need to know how the area is calculated every time—we just use `calculateArea()`.

#### 2. **Classes and Objects**

Object-oriented programming allows you to model complex behavior and data in a simplified way.
```js
class Animal {
	makeSound() {
		console.log("Some sound");
	}
}

class Dog extends Animal {
	makeSound() {
		console.log("Bark!");
	}
}
```

We can interact with the object through `makeSound()` without needing to know the implementation details.

#### 3. **APIs and Libraries**

When you use a library or API, you're leveraging abstraction. You don’t need to know how it works internally—just how to use it.
```js
fetch("https://api.example.com/data")
	.then((res) => res.json())
	.then((data) => console.log(data));
```
We don’t know what’s happening inside `fetch()`, but we trust it to work.

---

### What Should Be Abstracted?

- **Complex Logic:** If a block of code does a lot, put it in a well-named function.
    
- **Repetitive Code:** Abstract repeated logic into reusable methods or components.
    
- **Third-Party Systems:** Wrap APIs or services behind an interface that simplifies their usage.
    
- **Domain Concepts:** Group related behavior and data into classes or modules (e.g., `User`, `Cart`, `Invoice`).
    
- **Implementation Details:** Hide “how” something works and expose only “what” it does.
    
