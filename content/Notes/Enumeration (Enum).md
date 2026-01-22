---
title: Enumeration (Enum)
draft: false
tags:
  - notes
  - computer-science
  - data-types
---

## Enumeration (Enum)

An enumeration (or enum) in programming is a special data type that is used to represent a group of unchangeable values (constants).

To create an enum:
```C
enum Size {
	SMALL,
	MEDIUM,
	LARGE
};
```

To access an enum, a variable must be created for it:
```C
enum Size mySize;
```

Once an enum variable has been created, it can be assigned a value. The value must be one of the items inside the enum:
```C
enum Level mySize = MEDIUM;
```

By default, the value of the first item in an enum is 0, and is incremented by 1 for each following value. If you were to try:
```C
printf("%d", mySize);
```
the output would be:
```
1 
```
which represents "MEDIUM".

The default values of items in an enum can easily be changed:
```C
enum Size {
	SMALL = 28,
	MEDIUM = 32,
	LARGE = 36
};
```

Also if you assign a value to one specific item, the following items will be incremented by 1 as usual.

Enums are commonly used in switch statements to check for corresponding values:
```C
enum Size {
	SMALL = 28,
	MEDIUM = 32,
	LARGE = 36
};

int main() {
	enum Size mySize = MEDIUM;
	
	switch (mySize) {
		case 28:
			printf("Small size");
			break;
		case 32:
			printf("Medium size");
			break;
		case 36:
			printf("Large size");
			break;
	}
	return 0;
}
```

Enums can also be used to typedef, making it easier to declare enum variables without having to write enum every time.

```C
#include <stdio.h>

typedef enum {MON, TUE, WED, THU, FRI, SAT, SUN} Day;

int main() {
	Day today = WED;
	if (today == WED){
		printf("Its Wednesday my dudes!\n");
	}
	return 0;
}
```