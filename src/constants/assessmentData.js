export const assessmentQuestions = {
  javascript: [
    {
      id: "js_1",
      topic: "Closures",
      question: "Which of the following best describes a closure in JavaScript?",
      options: [
        "A function that returns another function",
        "A function bound to its lexical environment",
        "A function that is executed immediately",
        "A function that accepts callbacks"
      ],
      correctAnswer: "A function bound to its lexical environment",
      explanation: "A closure is the combination of a function and the lexical environment within which that function was declared."
    },
    {
      id: "js_2",
      topic: "Event Loop",
      question: "In what order does the Event Loop process tasks?",
      options: [
        "Microtasks first, then Macrotasks",
        "Macrotasks first, then Microtasks",
        "Simultaneously using multiple threads",
        "Alphabetically by function name"
      ],
      correctAnswer: "Microtasks first, then Macrotasks",
      explanation: "The event loop empties the entire microtask queue before picking up the next macrotask."
    },
    {
      id: "js_3",
      topic: "Scope",
      question: "Which keyword creates block-scoped variables in JavaScript?",
      options: ["var", "let", "function", "global"],
      correctAnswer: "let",
      explanation: "Both 'let' and 'const' create block-scoped variables, unlike 'var' which is function-scoped."
    },
    {
      id: "js_4",
      topic: "Promises",
      question: "What is the return type of an async function?",
      options: ["String", "Object", "Promise", "Boolean"],
      correctAnswer: "Promise",
      explanation: "An async function always implicitly returns a Promise."
    },
    {
      id: "js_5",
      topic: "Array Methods",
      question: "Which array method creates a new array with all elements that pass a test?",
      options: ["map()", "filter()", "reduce()", "forEach()"],
      correctAnswer: "filter()",
      explanation: "The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function."
    },
    {
      id: "js_6",
      topic: "Hoisting",
      question: "Which of these are hoisted but NOT initialized, resulting in a ReferenceError if accessed early?",
      options: ["var", "let and const", "function declarations", "import statements"],
      correctAnswer: "let and const",
      explanation: "Variables declared with let and const are hoisted but remain in the Temporal Dead Zone (TDZ) until their definition is evaluated."
    },
    {
      id: "js_7",
      topic: "Objects/Prototypes",
      question: "How do you correctly create an object that has no prototype?",
      options: ["Object.create(null)", "{}", "new Object()", "Object.create(undefined)"],
      correctAnswer: "Object.create(null)",
      explanation: "Object.create(null) creates an object that doesn't inherit from Object.prototype."
    },
    {
      id: "js_8",
      topic: "DOM/Events",
      question: "What is event bubbling?",
      options: [
        "When an event triggers on the outermost element first",
        "When an event triggers on the innermost element and propagates outward",
        "When an event is captured by the browser",
        "When multiple events fire simultaneously"
      ],
      correctAnswer: "When an event triggers on the innermost element and propagates outward",
      explanation: "Event bubbling is a type of event propagation where the event first triggers on the innermost target element, and then successively triggers on the ancestors."
    },
    {
      id: "js_9",
      topic: "Async/Await",
      question: "What happens if you omit the 'await' keyword before a Promise in an async function?",
      options: [
        "A SyntaxError is thrown",
        "The function pauses until the Promise resolves",
        "The function continues executing and the variable receives the pending Promise object",
        "The Promise is automatically canceled"
      ],
      correctAnswer: "The function continues executing and the variable receives the pending Promise object",
      explanation: "Without 'await', the code does not pause, and the Promise object itself (in a pending state) is assigned to the variable."
    },
    {
      id: "js_10",
      topic: "ES6+",
      question: "Which syntax is used to unpack properties from objects into distinct variables?",
      options: ["Spread operator", "Rest parameter", "Destructuring assignment", "Template literals"],
      correctAnswer: "Destructuring assignment",
      explanation: "Destructuring assignment is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables."
    }
  ],
  react: [
    {
      id: "react_1",
      topic: "Components",
      question: "What is the primary difference between a functional and class component?",
      options: [
        "Functional components cannot use state",
        "Class components are faster",
        "Functional components use hooks for state and lifecycle features",
        "Only class components can accept props"
      ],
      correctAnswer: "Functional components use hooks for state and lifecycle features",
      explanation: "Since React 16.8, functional components can use state and lifecycle features via hooks, effectively replacing class components for most use cases."
    },
    {
      id: "react_2",
      topic: "useEffect",
      question: "If a useEffect hook has an empty dependency array [], when does it run?",
      options: [
        "After every render",
        "Only after the initial render (mount)",
        "Right before the component unmounts",
        "Whenever props change"
      ],
      correctAnswer: "Only after the initial render (mount)",
      explanation: "An empty dependency array means the effect doesn't depend on any values from props or state, so it never needs to re-run."
    },
    {
      id: "react_3",
      topic: "Keys",
      question: "Why are keys important in React lists?",
      options: [
        "They style the list items",
        "They help React identify which items have changed, are added, or are removed",
        "They prevent XSS attacks",
        "They are required to make the list clickable"
      ],
      correctAnswer: "They help React identify which items have changed, are added, or are removed",
      explanation: "Keys give elements a stable identity, which helps React optimize rendering by reusing existing DOM elements."
    },
    {
      id: "react_4",
      topic: "State vs Props",
      question: "Which of the following is true regarding State and Props?",
      options: [
        "Props are mutable, State is immutable",
        "Props are passed down, State is managed internally",
        "Both can be updated directly without setter functions",
        "State is passed from parent to child"
      ],
      correctAnswer: "Props are passed down, State is managed internally",
      explanation: "Props are arguments passed into React components, whereas state is data managed within the component itself."
    },
    {
      id: "react_5",
      topic: "Hooks",
      question: "Which hook should you use to access the DOM node directly?",
      options: ["useNode", "useEffect", "useRef", "useState"],
      correctAnswer: "useRef",
      explanation: "The useRef hook can be used to hold a mutable value in its .current property, commonly used to access DOM nodes."
    },
    {
      id: "react_6",
      topic: "useMemo",
      question: "What is the primary purpose of the useMemo hook?",
      options: [
        "To memorize the previous state",
        "To cache the result of a calculation between renders",
        "To prevent a component from re-rendering",
        "To fetch data from an API"
      ],
      correctAnswer: "To cache the result of a calculation between renders",
      explanation: "useMemo returns a memoized value, preventing expensive calculations from running on every render unless dependencies change."
    },
    {
      id: "react_7",
      topic: "Controlled Components",
      question: "In a controlled component, form data is handled by:",
      options: ["The DOM", "React state", "Redux", "The browser's local storage"],
      correctAnswer: "React state",
      explanation: "A controlled component derives its input value from React state and updates that state via an onChange handler."
    },
    {
      id: "react_8",
      topic: "Context API",
      question: "What problem does the Context API primarily solve?",
      options: ["Slow rendering", "Prop drilling", "State mutation", "CSS scoping"],
      correctAnswer: "Prop drilling",
      explanation: "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
    },
    {
      id: "react_9",
      topic: "Rendering",
      question: "What does React use to optimize DOM updates?",
      options: ["Shadow DOM", "Virtual DOM", "Document Fragment", "Direct DOM manipulation"],
      correctAnswer: "Virtual DOM",
      explanation: "React creates an in-memory data-structure cache (Virtual DOM), computes the resulting differences, and then updates the browser's displayed DOM efficiently."
    },
    {
      id: "react_10",
      topic: "Performance",
      question: "How can you prevent a functional component from re-rendering when its props haven't changed?",
      options: ["React.memo", "useCallback", "useMemo", "shouldComponentUpdate"],
      correctAnswer: "React.memo",
      explanation: "React.memo is a higher order component that memoizes the rendered output of a component, preventing unnecessary re-renders."
    }
  ],
  nodejs: [
    {
      id: "node_1",
      topic: "Event Loop",
      question: "Which module in Node.js allows you to listen for and emit events?",
      options: ["events", "http", "fs", "path"],
      correctAnswer: "events",
      explanation: "The 'events' module provides the EventEmitter class, which is fundamental to Node.js's event-driven architecture."
    },
    {
      id: "node_2",
      topic: "Modules",
      question: "What is the default module system used in Node.js?",
      options: ["ES Modules", "CommonJS", "AMD", "UMD"],
      correctAnswer: "CommonJS",
      explanation: "Node.js traditionally uses CommonJS (require/module.exports), though it now also supports ES Modules."
    },
    {
      id: "node_3",
      topic: "Express",
      question: "In Express.js, what is middleware?",
      options: [
        "A database driver",
        "Functions that have access to the request, response, and next function",
        "A templating engine",
        "A built-in error handler"
      ],
      correctAnswer: "Functions that have access to the request, response, and next function",
      explanation: "Middleware functions can execute code, make changes to the request and response objects, end the cycle, and call the next middleware."
    },
    {
      id: "node_4",
      topic: "Streams",
      question: "Which type of stream is best for reading a large file in chunks?",
      options: ["Writable", "Readable", "Duplex", "Transform"],
      correctAnswer: "Readable",
      explanation: "A Readable stream allows you to read data from a source sequentially, which is ideal for large files."
    },
    {
      id: "node_5",
      topic: "Async Programming",
      question: "Why should you avoid synchronous functions (like readFileSync) in a Node.js server?",
      options: [
        "They are deprecated",
        "They block the event loop, preventing other requests from being processed",
        "They consume too much memory",
        "They return Promises which are hard to chain"
      ],
      correctAnswer: "They block the event loop, preventing other requests from being processed",
      explanation: "Node.js is single-threaded; blocking the event loop means no other client can be served until the synchronous operation finishes."
    },
    {
      id: "node_6",
      topic: "npm",
      question: "What does the package.json file do?",
      options: [
        "Stores database credentials",
        "Contains metadata about the project and its dependencies",
        "Compiles the Node.js application",
        "Serves static files"
      ],
      correctAnswer: "Contains metadata about the project and its dependencies",
      explanation: "package.json holds essential information like project name, scripts, and the lists of dependencies (npm packages)."
    },
    {
      id: "node_7",
      topic: "REST APIs",
      question: "Which HTTP method is conventionally used to completely replace an existing resource?",
      options: ["POST", "PATCH", "PUT", "DELETE"],
      correctAnswer: "PUT",
      explanation: "PUT is used to replace the entire resource, whereas PATCH is used for partial updates."
    },
    {
      id: "node_8",
      topic: "Error Handling",
      question: "How do you catch unhandled exceptions globally in Node.js?",
      options: [
        "process.on('uncaughtException')",
        "window.onerror",
        "try/catch block in main()",
        "app.use(errorHandler)"
      ],
      correctAnswer: "process.on('uncaughtException')",
      explanation: "The process object emits an 'uncaughtException' event when an exception bubbles all the way back to the event loop."
    },
    {
      id: "node_9",
      topic: "Authentication",
      question: "What is typically stored in the payload of a JWT (JSON Web Token)?",
      options: ["User password", "Database connection string", "User claims and expiration data", "Server IP address"],
      correctAnswer: "User claims and expiration data",
      explanation: "The payload contains claims, which are statements about an entity (typically, the user) and additional data."
    },
    {
      id: "node_10",
      topic: "Globals",
      question: "Which of the following is NOT a global object in Node.js?",
      options: ["process", "Buffer", "window", "console"],
      correctAnswer: "window",
      explanation: "The 'window' object exists in the browser environment, not in Node.js. Node uses 'global'."
    }
  ],
  java: [
    {
      id: "java_1",
      topic: "OOP",
      question: "What is encapsulation in Java?",
      options: [
        "Inheriting properties from a parent class",
        "Hiding internal state and requiring all interaction to be performed through an object's methods",
        "Having multiple methods with the same name",
        "Converting an object to a byte stream"
      ],
      correctAnswer: "Hiding internal state and requiring all interaction to be performed through an object's methods",
      explanation: "Encapsulation bundles data and methods that operate on that data within one unit, hiding the internal representation."
    },
    {
      id: "java_2",
      topic: "Inheritance",
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implements", "extends", "inherits", "super"],
      correctAnswer: "extends",
      explanation: "The 'extends' keyword is used to indicate that a class is derived from another class."
    },
    {
      id: "java_3",
      topic: "Polymorphism",
      question: "Method overriding is an example of:",
      options: ["Compile-time polymorphism", "Run-time polymorphism", "Encapsulation", "Abstraction"],
      correctAnswer: "Run-time polymorphism",
      explanation: "Method overriding is resolved at runtime based on the actual object type, making it run-time (dynamic) polymorphism."
    },
    {
      id: "java_4",
      topic: "Interfaces",
      question: "Can an interface in Java 8+ contain implemented methods?",
      options: [
        "No, all methods must be abstract",
        "Yes, using the 'default' or 'static' keywords",
        "Yes, but only if they are private",
        "Yes, but they cannot return a value"
      ],
      correctAnswer: "Yes, using the 'default' or 'static' keywords",
      explanation: "Java 8 introduced default and static methods in interfaces, allowing them to have a body."
    },
    {
      id: "java_5",
      topic: "Collections",
      question: "Which collection type does NOT allow duplicate elements?",
      options: ["List", "Queue", "Set", "Array"],
      correctAnswer: "Set",
      explanation: "A Set is a collection that contains no duplicate elements (e.g., HashSet)."
    },
    {
      id: "java_6",
      topic: "Exceptions",
      question: "What is the difference between checked and unchecked exceptions?",
      options: [
        "Checked exceptions must be caught or declared, unchecked exceptions do not",
        "Unchecked exceptions must be caught or declared, checked exceptions do not",
        "Checked exceptions extend RuntimeException",
        "There is no difference"
      ],
      correctAnswer: "Checked exceptions must be caught or declared, unchecked exceptions do not",
      explanation: "Checked exceptions are checked at compile-time. Unchecked exceptions (subclasses of RuntimeException) are not."
    },
    {
      id: "java_7",
      topic: "Strings",
      question: "Why are String objects immutable in Java?",
      options: [
        "To save memory via the String Pool and provide security/thread-safety",
        "Because they are primitive types",
        "Because they are stored in the heap",
        "To allow them to be extended by other classes"
      ],
      correctAnswer: "To save memory via the String Pool and provide security/thread-safety",
      explanation: "Immutability allows Strings to be cached in the String pool, and makes them inherently thread-safe."
    },
    {
      id: "java_8",
      topic: "JVM Basics",
      question: "What component is responsible for converting bytecode into machine code?",
      options: ["Java Compiler (javac)", "Just-In-Time (JIT) Compiler", "Garbage Collector", "Classloader"],
      correctAnswer: "Just-In-Time (JIT) Compiler",
      explanation: "The JIT compiler is part of the JVM and compiles bytecode into native machine code at runtime."
    },
    {
      id: "java_9",
      topic: "Generics",
      question: "What is type erasure in Java Generics?",
      options: [
        "The removal of generic type information at compile time",
        "A way to delete objects from memory",
        "Converting generic types to primitive types",
        "A feature that allows casting without warnings"
      ],
      correctAnswer: "The removal of generic type information at compile time",
      explanation: "To ensure backward compatibility, the Java compiler removes all generic type parameters during compilation."
    },
    {
      id: "java_10",
      topic: "Multithreading",
      question: "Which method must be implemented when implementing the Runnable interface?",
      options: ["start()", "execute()", "run()", "thread()"],
      correctAnswer: "run()",
      explanation: "The Runnable interface specifies only one method: run()."
    }
  ],
  python: [
    {
      id: "py_1",
      topic: "Data Types",
      question: "Which of the following is an immutable data type in Python?",
      options: ["List", "Dictionary", "Set", "Tuple"],
      correctAnswer: "Tuple",
      explanation: "Tuples are immutable, meaning their elements cannot be changed after they are created."
    },
    {
      id: "py_2",
      topic: "Lists/Dictionaries",
      question: "What does the dict.get(key, default) method do?",
      options: [
        "Throws a KeyError if the key is not found",
        "Returns the value for the key, or the default value if the key is not found",
        "Adds the key to the dictionary",
        "Removes the key from the dictionary"
      ],
      correctAnswer: "Returns the value for the key, or the default value if the key is not found",
      explanation: "The get() method is a safe way to access dictionary values without risking a KeyError."
    },
    {
      id: "py_3",
      topic: "Functions",
      question: "What does the *args syntax allow in a function definition?",
      options: [
        "Passing keyword arguments",
        "Passing a variable number of positional arguments",
        "Passing a dictionary",
        "Type hinting"
      ],
      correctAnswer: "Passing a variable number of positional arguments",
      explanation: "*args allows you to pass an arbitrary number of non-keyword arguments to a function."
    },
    {
      id: "py_4",
      topic: "Comprehensions",
      question: "Which is the correct syntax for a list comprehension that squares numbers from 1 to 5?",
      options: [
        "[x*x for x in range(1, 6)]",
        "(x*x for x in range(1, 5))",
        "list(x^2 in range(5))",
        "{x**2 for x in range(1, 6)}"
      ],
      correctAnswer: "[x*x for x in range(1, 6)]",
      explanation: "List comprehensions are enclosed in brackets. range(1, 6) generates numbers 1 through 5."
    },
    {
      id: "py_5",
      topic: "OOP",
      question: "What is the purpose of the __init__ method in a Python class?",
      options: [
        "To destroy an object",
        "To initialize the attributes of a new object",
        "To inherit from a parent class",
        "To define class-level variables"
      ],
      correctAnswer: "To initialize the attributes of a new object",
      explanation: "__init__ is the constructor method, called automatically when a new instance of a class is created."
    },
    {
      id: "py_6",
      topic: "Exceptions",
      question: "Which block of code always executes, regardless of whether an exception occurred?",
      options: ["try", "except", "else", "finally"],
      correctAnswer: "finally",
      explanation: "The 'finally' block is used for cleanup actions and will always execute."
    },
    {
      id: "py_7",
      topic: "Decorators",
      question: "What is a decorator in Python?",
      options: [
        "A tool to format strings",
        "A function that takes another function and extends its behavior without modifying it",
        "A class property",
        "A UI element in tkinter"
      ],
      correctAnswer: "A function that takes another function and extends its behavior without modifying it",
      explanation: "Decorators provide a flexible way to modify or enhance functions/methods using the @decorator_name syntax."
    },
    {
      id: "py_8",
      topic: "Modules",
      question: "What is the purpose of the if __name__ == '__main__': statement?",
      options: [
        "To check if the Python version is correct",
        "To prevent code from running when the script is imported as a module",
        "To define the main entry point for a GUI",
        "To declare global variables"
      ],
      correctAnswer: "To prevent code from running when the script is imported as a module",
      explanation: "Code inside this block only runs if the script is executed directly, not if it's imported elsewhere."
    },
    {
      id: "py_9",
      topic: "Python-specific behavior",
      question: "What is the result of type([]) in Python?",
      options: ["<class 'list'>", "<class 'array'>", "<class 'object'>", "list"],
      correctAnswer: "<class 'list'>",
      explanation: "In Python, [] creates a list, so its type is the built-in list class."
    },
    {
      id: "py_10",
      topic: "Iterators",
      question: "Which two methods must an object implement to be considered an iterator?",
      options: ["__iter__ and __next__", "__start__ and __stop__", "__loop__ and __end__", "next and stop"],
      correctAnswer: "__iter__ and __next__",
      explanation: "The iterator protocol in Python requires the implementation of the __iter__() and __next__() dunder methods."
    }
  ],
  sql: [
    {
      id: "sql_1",
      topic: "SELECT",
      question: "Which keyword is used to remove duplicate rows from a result set?",
      options: ["UNIQUE", "DISTINCT", "NO DUPLICATES", "DIFFERENT"],
      correctAnswer: "DISTINCT",
      explanation: "The DISTINCT keyword is used immediately after SELECT to return only distinct (different) values."
    },
    {
      id: "sql_2",
      topic: "JOIN",
      question: "Which type of JOIN returns all records when there is a match in either left or right table?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      correctAnswer: "FULL OUTER JOIN",
      explanation: "FULL OUTER JOIN returns all matching records from both tables whether the other table matches or not."
    },
    {
      id: "sql_3",
      topic: "GROUP BY",
      question: "Which clause is used to filter the results of a GROUP BY clause?",
      options: ["WHERE", "HAVING", "FILTER", "ORDER BY"],
      correctAnswer: "HAVING",
      explanation: "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions."
    },
    {
      id: "sql_4",
      topic: "Aggregate Functions",
      question: "Which aggregate function returns the total sum of a numeric column?",
      options: ["COUNT()", "TOTAL()", "SUM()", "MAX()"],
      correctAnswer: "SUM()",
      explanation: "SUM() calculates the sum of all values in the specified column."
    },
    {
      id: "sql_5",
      topic: "WHERE",
      question: "How do you select all records where the 'FirstName' starts with an 'a'?",
      options: ["WHERE FirstName LIKE 'a%'", "WHERE FirstName LIKE '%a'", "WHERE FirstName = 'a'", "WHERE FirstName = '%a%'"],
      correctAnswer: "WHERE FirstName LIKE 'a%'",
      explanation: "The '%' wildcard represents zero, one, or multiple characters. 'a%' means starting with 'a'."
    },
    {
      id: "sql_6",
      topic: "Subqueries",
      question: "A subquery must be enclosed in:",
      options: ["Single quotes", "Double quotes", "Parentheses ()", "Brackets []"],
      correctAnswer: "Parentheses ()",
      explanation: "A subquery (inner query) is a query nested inside another query and must always be enclosed within parentheses."
    },
    {
      id: "sql_7",
      topic: "Indexes",
      question: "What is the primary purpose of an index in a database?",
      options: [
        "To enforce data constraints",
        "To speed up data retrieval operations",
        "To compress data",
        "To encrypt data"
      ],
      correctAnswer: "To speed up data retrieval operations",
      explanation: "Indexes are used to retrieve data from the database more quickly than otherwise."
    },
    {
      id: "sql_8",
      topic: "Transactions",
      question: "Which command is used to save changes made by a transaction to the database permanently?",
      options: ["SAVE", "ROLLBACK", "COMMIT", "UPDATE"],
      correctAnswer: "COMMIT",
      explanation: "The COMMIT command saves all transactions to the database since the last COMMIT or ROLLBACK command."
    },
    {
      id: "sql_9",
      topic: "Normalization",
      question: "What is the main goal of database normalization?",
      options: [
        "To increase data redundancy",
        "To reduce data redundancy and improve data integrity",
        "To make queries faster",
        "To store data in a single table"
      ],
      correctAnswer: "To reduce data redundancy and improve data integrity",
      explanation: "Normalization organizes columns and tables of a relational database to minimize data redundancy."
    },
    {
      id: "sql_10",
      topic: "Data Manipulation",
      question: "Which statement is used to modify existing records in a table?",
      options: ["ALTER", "MODIFY", "UPDATE", "CHANGE"],
      correctAnswer: "UPDATE",
      explanation: "The UPDATE statement is used to modify the existing records in a table."
    }
  ],
  htmlcss: [
    {
      id: "hc_1",
      topic: "Semantic HTML",
      question: "Which HTML5 element should be used to define a navigation block?",
      options: ["<nav>", "<navigation>", "<menu>", "<header>"],
      correctAnswer: "<nav>",
      explanation: "The <nav> semantic element represents a section of a page whose purpose is to provide navigation links."
    },
    {
      id: "hc_2",
      topic: "Forms",
      question: "Which attribute specifies that an input field must be filled out before submitting the form?",
      options: ["validate", "required", "placeholder", "important"],
      correctAnswer: "required",
      explanation: "The 'required' attribute is a boolean attribute that specifies that an input field must be filled out."
    },
    {
      id: "hc_3",
      topic: "Accessibility",
      question: "What is the primary purpose of the 'alt' attribute on an image tag?",
      options: [
        "To provide a tooltip when hovering",
        "To style the image",
        "To provide alternative text for screen readers and when the image fails to load",
        "To link the image to another page"
      ],
      correctAnswer: "To provide alternative text for screen readers and when the image fails to load",
      explanation: "The alt attribute provides alternative text for screen readers and is displayed if the image cannot be loaded."
    },
    {
      id: "hc_4",
      topic: "CSS Selectors",
      question: "How do you select an element with id 'demo' in CSS?",
      options: [".demo", "#demo", "demo", "*demo"],
      correctAnswer: "#demo",
      explanation: "The '#' symbol is used in CSS to select an element by its ID."
    },
    {
      id: "hc_5",
      topic: "Box Model",
      question: "In the standard CSS box model, what is the space outside the border called?",
      options: ["Padding", "Margin", "Content", "Spacing"],
      correctAnswer: "Margin",
      explanation: "Margin creates space around an element's border, pushing other elements away."
    },
    {
      id: "hc_6",
      topic: "Flexbox",
      question: "Which property is used to center flex items horizontally along the main axis?",
      options: ["align-items", "justify-content", "align-content", "text-align"],
      correctAnswer: "justify-content",
      explanation: "In a row flex container, 'justify-content: center' centers items horizontally (along the main axis)."
    },
    {
      id: "hc_7",
      topic: "Grid",
      question: "How do you define a 3-column CSS Grid layout with equal width columns?",
      options: [
        "grid-template-columns: 1fr 1fr 1fr;",
        "display-columns: 3;",
        "grid-columns: repeat(3, auto);",
        "flex-direction: row;"
      ],
      correctAnswer: "grid-template-columns: 1fr 1fr 1fr;",
      explanation: "The 'fr' unit represents a fraction of the available space in the grid container."
    },
    {
      id: "hc_8",
      topic: "Positioning",
      question: "Which CSS position value positions an element relative to the viewport, meaning it always stays in the same place even if the page is scrolled?",
      options: ["relative", "absolute", "fixed", "sticky"],
      correctAnswer: "fixed",
      explanation: "An element with position: fixed; is positioned relative to the viewport."
    },
    {
      id: "hc_9",
      topic: "Responsive Design",
      question: "Which rule is used to apply different CSS styles for different media types/devices?",
      options: ["@media", "@responsive", "@viewport", "@device"],
      correctAnswer: "@media",
      explanation: "Media queries (@media) allow you to apply CSS rules conditionally based on device properties like width."
    },
    {
      id: "hc_10",
      topic: "Specificity",
      question: "Which of the following selectors has the highest specificity?",
      options: [".class-name", "tag-name", "#id-name", "element.class-name"],
      correctAnswer: "#id-name",
      explanation: "ID selectors (#) have a higher specificity weight than class selectors (.) or element tags."
    }
  ]
};
