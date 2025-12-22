---
title: Rust Data Types
draft:
tags:
  - computer-science
  - rust
  - data-types
---
## Data Types in Rust

Every value in Rust is of a certain data type that tells rust what kind of data is being specified so that it knows how to work with that data. Rust is a statically typed language, meaning that it must know the types of all variables at compile time. The compiler can usually infer what type we want to use based on the value and how we use it. In cases when many types are possible, such as converting a `string` to a numeric type using `parse`, we must add a type annotation like this:

```Rust
let guess: u32 = "42".parse().expect("Not a number!");
```

If we don't add the `: u32` type annotation shown in the preceding code, Rust will display the following error, which means the compiler needs more information from us to know which type we want to use: 

```console
$ cargo build
   Compiling no_type_annotations v0.1.0 (file:///projects/no_type_annotations)
error[E0284]: type annotations needed
 --> src/main.rs:2:9
  |
2 |     let guess = "42".parse().expect("Not a number!");
  |         ^^^^^        ----- type must be known at this point
  |
  = note: cannot satisfy `<_ as FromStr>::Err == _`
help: consider giving `guess` an explicit type
  |
2 |     let guess: /* Type */ = "42".parse().expect("Not a number!");
  |              ++++++++++++

For more information about this error, try `rustc --explain E0284`.
error: could not compile `no_type_annotations` (bin "no_type_annotations") due to 1 previous error
```

You'll see different type of annotations for other data types.

## Scalar Types

A scalar type represents a single value. Rust has four primary scalar types: **integers**, **floats**, **Booleans**, and **characters**. 

#### Integer Types

An integer is a number without a fractional component. The previously mentioned `u32` type is an integer type. This type declaration indicates that the value it's associated with should be an unsigned integer (with a `u`, as opposed to a signed integer with an `i`) that takes up  32 bits of space. 

| Length                 | Signed  | Unsigned |
| ---------------------- | ------- | -------- |
| 8-bit                  | `i8`    | `u8`     |
| 16-bit                 | `i16`   | `u16`    |
| 32-bit                 | `i32`   | `u32`    |
| 64-bit                 | `i64`   | `u64`    |
| 128-bit                | `i128`  | `u128`   |
| Architecture-dependent | `isize` | `usize`  |
This table shows the built-in integer types in Rust. We can use any of these variants to declare the type of an integer value.

Each variant can be either signed or unsigned and has an explicit size. *Signed* and *unsigned* refer to whether it's possible for the number to be negative. In other words, whether the number needs to have a sign with it (signed) or whether it will only ever be positive and can therefore be represented without a sign (unsigned). It's like writing numbers on paper: When the sign matters, a number is shown with a plus sign or a minus sign; however, when it's safe to assume the number is positive. it's shown with no sign. Signed numbers are stored using two's complement representation.

`isize` and `usize` types depend on the architecture of the computer in which the program is running on: 64 bits if you're on a 64-bit architecture and 32 bits if you're on a 32-bit architecture.

You can write integer literals in any of the forms shown below. Note that number literals that can be multiple numeric types allow a type suffix, such as `57u8`, to designate the type. Number literals can also use `_` as a visual separator to make the number easier to read, such as `1_000`, which will have the same value as `1000`.

| Number literals  | Example       |
| ---------------- | ------------- |
| Decimal          | `98_222`      |
| Hex              | `0xff`        |
| Octal            | `0o77`        |
| Binary           | `0b1111_0000` |
| Byte (`u8` only) | `b'A'`        |

##### Integer Overflow

Let's say you have a variable of type `u8` that can hold values between 0 and 255. If you try to change the variable to a value outside that range, such as 256, *integer overflow* will occur, which can result in one of two behaviors. When you're compiling in debug mode, Rust includes checks for integer overflow that cause your program to panic at runtime if this behavior occurs. Rust uses the term *panicking* when a program exits wit an error.

When you're compiling in release mode with the `--release` flag, Rust does not include checks for integer overflow that cause panics. Instead, if overflow occurs, Rust performs two's complement wrapping. In short, values greater than the maximum value the type can hold "wrap around" to the minimum of the values the type can hold. In the case of `u8`, the value 256 would become 0, the value 257 would become 1, and so on. The program won't panic, but the variable will have a value that probably isn't what you were expecting it to have. Relying on integer overflow's wrapping behavior is considered an error.

To explicitly handle the possibility of overflow, you can use these families of methods provided by the standard library for primitive numeric types:
- Wrap in all modes with the `wrapping_*` methods, such as `wrapping_add`.
- Return the `None` value if there is overflow with the `checked_*` methods.
- Return the value and a Boolean indicating whether there was overflow with the `overflowing_*` methods.
- Saturate at the value's minimum or maximum values with the `saturating_*` methods.

#### Floating-Point Types

Rust also has two primitive types for floats, `f32` and `f64`, which are 32 bit and 64 bit in size. The default type is `f64` because on modern CPUs, it's roughly the same speed as `f32` but is capable of more precision. All floating-point types are signed.

Here's an example that shows floats in action:

```Rust
fn main() {
	
	let x = 2.0; //f64
	
	let y: f32 = 3.0; //f32
}
```
Floating-point numbers are represented according to the IEEE-754 standard.

#### Numeric Operations

Rust supports the basic mathematical operations you'd expect for all the number types: addition, subtraction, multiplication, division, and remainder. Integer division truncates toward zero to the nearest integer. The following code shows how you'd use each numeric operation in a `let` statement:

```Rust
fn main() {
	// addition
	let sum = 5 + 10;
	
	// subtraction
	let difference = 95.5 - 4.3;
	
	// multiplication}
	let product = 4 * 30;
	
	// division
	let quotient = 56.7 / 32.2;
	let truncated = -5 / 3; // Results in -1
	
	// remainder
	let remainder = 43 % 5;
}
```

