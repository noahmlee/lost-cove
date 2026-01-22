---
title: Variables and Mutability
draft:
tags:
  - notes
  - computer-science
  - programming-concepts
---

## Variables and Mutability

When a variable is immutable, the value bound to it cannot be changed. For example, if you ran the following program:

```Rust
fn main() {
	let x = 5;
	println!("The value of x is {x}");
	x = 6;
	println!("The value of x is {x}");
}
```

your console would end up reading:

```console
$ cargo run
   Compiling variables v0.1.0 (file:///projects/variables)
error[E0384]: cannot assign twice to immutable variable `x`
 --> src/main.rs:4:5
  |
2 |     let x = 5;
  |         - first assignment to `x`
3 |     println!("The value of x is: {x}");
4 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable
  |
help: consider making this binding mutable
  |
2 |     let mut x = 5;
  |         +++

For more information about this error, try `rustc --explain E0384`.
error: could not compile `variables` (bin "variables") due to 1 previous error
```

Importantly the error message `cannot assign twice to immutable variable 'x'` appears because we attempted to assign a second value to the immutable x variable.

Our program can be fixed by changing the variable initialization include the `mut` keyword, making it mutable:

```Rust
let mut x = 5;
```

languages like rust tend to be designed around making variables immutable by default to make programs more safely written. How does making variable bindings immutable by default lend itself to safer code? Well if you intend to change a variable in your program and accidentally leave it immutable, the error console will show you the exact problem. However, in an alternate scenario where a mutable variable is changed and you didn't intend it to be, the resulting error would likely be much less helpful.

Constants are like immutable variables in that they are not allowed to change, but there are a few key differences between the two. First of all, constants cannot be made mutable, they are... constant... Constants can also only be set to a constant expression, not the result of a value that can only be computed at runtime. 

Shadowing in Rust is when you declare a new variable with the same name as a previous variable. The compiler will see whichever variable was declared last when you use that variable name. This gives the variable any uses of the variable name to itself until its either shadowed again or the scope ends. Shadowed variables can also have different types assigned to them.

Example:
```Rust
fn main() {
	let x = 5;
	
	let x = x + 1;
	
	{
		let x = x * 2;
		println!("Value of x in the inner scope is: {x}");
	}
	
	println!("The value of x is: {x}");
}
```

Output:
```console
The value of x in the inner scope is: 12
The value of x is: 6
```