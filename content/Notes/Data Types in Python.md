---
tit: Python Data Types
draft: false
tags:
  - computer-science
  - python
  - data-types
---
## Typing in Python
---
Python has **Strong**, **Dynamic**, and **Implicit** typing.
#### Strong Typing
Python is strongly typed in the sense that it enforces type compatibility in operations and does not implicitly convert the types for the operation. Trying to perform an operation on incompatible types will raise a **TypeError**. 

Despite Pythons strong typing, it will allow some operations between different data types due to explicit implementation, **NOT** automatic conversion.

```Python
# Strings and lists can be multiplied by a number
# This will result in a repeating sequence
print("Blah" * 3) # BlahBlahBlah
print([6, 7] * 2) # [6, 7, 6, 7]

# Floats and ints can operate together
print(9 + 3.1) # 12.1
print(1.6 * 4) # 6.4

# Bools and numeric types can also operate together
# `True` is treated as 1 and `False` is treated as 0
print(6 + True) # 7
print(2.5 * False) # 0

# and others...
```
#### Dynamic Typing
Python also has dynamic typing in the sense that data types of variables are determined at runtime, rather than compile-time. This assists in writing flexible cod and allows, for example, the creation of functions that work with various data types.

Consider the function `find`, which searches for an element `required_element` in a sequence `sequence`. In the language **C**, to implement the same logic, you would have to write several version of the function for different data types, while in Python, one is sufficient.

```Python
	def find(required_element, sequence):
		""Performs a search for an element within a sequence.""
		for index, element in enumerate(sequence):
			if element == required_element:
				return index
		return -1
		
	print(find(2, [1, 2, 3])) # Outputs: 1
	print(find("c", ("a", "b", "c", "d"))) # Outputs: 2
	
	Print(find(1, 1)) # Raises a TypeError exception
```

The double-edged sword of dynamic typing is that it can lead to unexpected runtime errors. For example, if we pass a non-iterable object to `sequence` (which cannot be traversed using **for**), we will get an error. But we will know about it when the program execution reaches the specific line with the for loop over this object.

Dynamic typing also allows you to overwrite a single variable with data of a different type.
#### Implicit Typing
Implicit typing means that it is not necessary to explicitly declare the type of a variable. The Python interpreter determines the type based on the value assigned to it. This leads to simpler and more readable code.

```Python
var = 5 # int
var = "some string" # now var is a str
```
#### Type Annotations
Python also supports annotating types allowing developers to explicitly indicate the types of variables and the values returned by functions. Its important to note that this does not change the interpreters decision on types but is important for making code easier to read.
## Numeric Data Types
#### Integers (int)
Properties:
- Used to express whole numbers without decimal points
- Can be positive negative or zero
- Unlimited precision (can be as small or large as your computer's memory allows)
- Other data types can easily be converted to int using `int()` function
- Since Python 3, division between two ints always returns a float
Best used for:
- User identification numbers
- Counting Inventory
- Array/list indexing and slicing
- Dates and times as timestamps
- HTTP Status codes in webapps
#### Floating-Point Numbers (float)
Properties:
- Represent real numbers with decimal points or numbers in scientific notation
- Essential for calculation requiring precision beyond whole numbers
- Can convert other data types to floats using the `float()` function
- Can be less precise than you would expect due to how computers represent decimal numbers in binary
- In instances where precise decimal arithmetic is required, it's best to use the decimal module
Best used for:
- Prices and financial calculations (with care)
- Scientific measurements and calculations
- Prob and stat values
- Coordinates in graphics or mapping
- Time measurements with fractional parts

## Sequence Data Types
#### Strings (str)
Properties:
- Strings are a sequence of characters
- Can be defined using single or double quotes
- Can be defined using triple quotes for multi-line strings
- Strings are immutable, any operation that appears to modify a string actually creates a new string
- You can access characters in a string using indexing
- Lots of powerful string methods to assist in text processing
Best used for:
- User data and input processing
- File content manipulation
- Web content
- Database queries
- Config settings
- Output formatting and display
- RegEx pattern matching
#### Lists
Properties:
- Lists are ordered, mutable collections that can contain items of any data type, including other lists
- Numerous ways to access or modify their content
- Nested lists can be used to create multi-dimensional data structures like matrices
- When working with large datasets, numpy arrays often provide better performance than standard Python lists, especially for numerical operations
Best used for:
- Managing collections of user data
- Storing API response data for processing
- Tracking product inventory and details
- Creating data pipelines where items are processed sequentially
- Building navigation menus and UI elements in applications
- Storing historical data like price changes or user activity
- Managing task queues and processing workflows
#### Boolean (bool)
Properties:
- Bools represent one of two values: True or False
- Can combine conditions to create multilayered complex decisions
- In Python, all objects have an implicit Boolean value:
	- Empty strings are false
	- Empty lists are false
	- Non-zero type numbers are true
- Other types can be converted to Boolean using `bool()` function
Best used for:
- User authentication logic
- Access control and permissions
- Form validation
- Feature flags and toggles
- Data filtering criteria
- Error handling and exception control
- Conditional UI rendering
- Testing assertions and conditions
#### Dictionary (dict)
Properties:
- Versatile key-value stores that allow you to create mappings between keys and their associated values
- Instead of being indexed by numbers dictionaries use keys (usually strings) to access values
- Dictionary methods provide powerful ways to work with this data structure
- Dictionaries can also be nested and values can be accessed by chaining keys
- Dictionaries are memory-efficient for lookups, with near-constant time complexity for access operations
Best used for:
- Configuration settings and application parameters
- Processing JSON data from APIs
- Database query results representation
- Form data management
- Caching frequently accessed data
- Implementing lookup tables and mappings
- Creating data transformations
- Building flexible data structures
#### Tuple (tuple)
Properties:
- Tuples are ordered sequences similar to lists but they are immutable
- Access tuple elements using indexes
- While tuples themselves are immutable, they can contain mutable objects
- Slightly more memory efficient and faster than lists
- Tuples can be used a dictionary keys since they are immutable
- Functions can easily return multiple values as tuples
Best used for:
- Longitude and Latitude coordinates
- RGB or RGBA color values
- Database records where values shouldn't change
- Configuration settings that should remain constant
- Function returns values with multiple components
- Keys in dictionary, when they key needs multiple components
#### Set (set)
Properties:
- Unordered collections or unique elements
- Automatically eliminate duplicate objects
- Extremely efficient for membership testing
- Supports subsets and supersets
- For immutable sets Python has the `frozenset` type
- Can do mathematical set operations like intersection, union, difference, and symmetric_difference
- Can only contain immutable elements - no lists or dictionaries
- Cannot be accessed by index
Best used for:
- Filtering duplicate records from databases or API responses
- Tracking unique values like user IDs, email addresses, or product codes
- Computing differences between data collections (What's in A but not in B)
- Implementing access control by checking if permissions exist in a user's permission set
- Finding common elements between collections
- Creating data pipelines where you need to ensure uniqueness
- Efficient membership testing in large collections.