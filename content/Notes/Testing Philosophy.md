---
title: Testing Philosophy
draft:
tags:
  - notes
  - programming-concepts
  - computer-science
---
## Testing Philosophy

Developers are notoriously kind to the software they create. This is human nature, we’re close to our code and tend to use it as we intended it to be used. However, real users often take unexpected paths or run into edge cases that weren't accounted for during development. That’s where testing becomes essential.

### Verification and Validation

Software testing involves two main goals: **Verification** and **Validation**.

- **Verification** is about ensuring that you are building the software _correctly_. It answers the question: _Are we implementing this the right way, according to design and specifications?_
    
- **Validation** ensures that you are building the _correct_ software. It answers the question: _Does this software solve the right problem for the user or client?_
    

Both are essential for delivering high-quality, functional software.

### The Role of a Tester

Testers are the defenders of the user experience. They serve as advocates for real users, identifying gaps between user expectations and the actual behavior of the system. Good testers think critically, test thoroughly, and anticipate user behavior beyond the obvious flows.

### Defects vs. Enhancements

- A **defect** is an issue that either breaks existing functionality or fails to meet stated or implied requirements.
    
- An **enhancement** is a suggested or requested improvement that falls outside of the current project requirements. Enhancements aren't necessarily bugs, but they can often become future feature requests.
    

### The Myth of Exhaustive Testing

**Exhaustive testing**, or the idea of testing every possible input and scenario, is not feasible in real-world applications. There are simply too many combinations of inputs, environments, and user behaviors. Instead, testers rely on risk-based testing, coverage strategies, exploratory testing, and automation where possible to find the most impactful issues in the most efficient way.

### Key Takeaways

- Don’t trust your own code too much, test it like someone else wrote it.
    
- Focus on both what the software _does_ and what it _should do_.
    
- Prioritize test cases based on risk, likelihood of use, and potential impact.
    
- Think like a user, but also like a mischievous one who’s trying to break things.