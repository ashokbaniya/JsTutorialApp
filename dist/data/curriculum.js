// The full table of contents for The JavaScript Book.
// Each chapter uses a roman numeral (matching the sidebar spec) and
// contains the granular topic list drawn from the learning curriculum.
// `slug` is used for routing: #/javascript/<slug>
// Topics without a written article yet render a graceful "stub" page.

export const CURRICULUM = [
  {
    num: 'I', title: 'The Language', slug: 'the-language',
    topics: [
      { title: 'What is JavaScript?', slug: 'what-is-javascript' },
      { title: 'How JavaScript Runs', slug: 'how-javascript-runs' },
      { title: 'JavaScript Engines', slug: 'javascript-engines' },
      { title: 'Writing Your First JavaScript', slug: 'first-javascript' },
      { title: 'Statements', slug: 'statements' },
      { title: 'Expressions', slug: 'expressions' },
      { title: 'Comments', slug: 'comments' },
    ],
  },
  {
    num: 'II', title: 'Variables & Values', slug: 'variables-values',
    topics: [
      { title: 'Variables', slug: 'variables' },
      { title: 'let', slug: 'let' },
      { title: 'const', slug: 'const' },
      { title: 'var', slug: 'var' },
      { title: 'Values', slug: 'values' },
      { title: 'Primitive Values', slug: 'primitive-values' },
    ],
  },
  {
    num: 'III', title: 'Data Types', slug: 'data-types',
    topics: [
      { title: 'Data Types', slug: 'data-types-overview' },
      { title: 'Strings', slug: 'strings' },
      { title: 'Numbers', slug: 'numbers' },
      { title: 'BigInt', slug: 'bigint' },
      { title: 'Boolean', slug: 'boolean' },
      { title: 'Undefined', slug: 'undefined' },
      { title: 'Null', slug: 'null' },
      { title: 'Symbol', slug: 'symbol' },
    ],
  },
  {
    num: 'IV', title: 'Operators & Expressions', slug: 'operators',
    topics: [
      { title: 'Arithmetic Operators', slug: 'arithmetic-operators' },
      { title: 'Assignment Operators', slug: 'assignment-operators' },
      { title: 'Comparison Operators', slug: 'comparison-operators' },
      { title: 'Logical Operators', slug: 'logical-operators' },
      { title: 'Equality', slug: 'equality' },
      { title: 'Strict Equality', slug: 'strict-equality' },
      { title: 'Type Coercion', slug: 'type-coercion' },
      { title: 'Truthy and Falsy Values', slug: 'truthy-falsy' },
      { title: 'Nullish Coalescing', slug: 'nullish-coalescing' },
      { title: 'Optional Chaining', slug: 'optional-chaining' },
      { title: 'Ternary Operator', slug: 'ternary-operator' },
    ],
  },
  {
    num: 'V', title: 'Control Flow', slug: 'control-flow',
    topics: [
      { title: 'if', slug: 'if' },
      { title: 'else', slug: 'else' },
      { title: 'else if', slug: 'else-if' },
      { title: 'switch', slug: 'switch' },
      { title: 'for', slug: 'for' },
      { title: 'while', slug: 'while' },
      { title: 'do while', slug: 'do-while' },
      { title: 'break', slug: 'break' },
      { title: 'continue', slug: 'continue' },
    ],
  },
  {
    num: 'VI', title: 'Functions', slug: 'functions',
    topics: [
      { title: 'What is a Function?', slug: 'what-is-a-function' },
      { title: 'Function Declaration', slug: 'function-declaration' },
      { title: 'Function Expression', slug: 'function-expression' },
      { title: 'Calling Functions', slug: 'calling-functions' },
      { title: 'Parameters', slug: 'parameters' },
      { title: 'Arguments', slug: 'arguments' },
      { title: 'Return Values', slug: 'return-values' },
      { title: 'Default Parameters', slug: 'default-parameters' },
      { title: 'Rest Parameters', slug: 'rest-parameters' },
      { title: 'Arrow Functions', slug: 'arrow-functions' },
      { title: 'Anonymous Functions', slug: 'anonymous-functions' },
      { title: 'Callback Functions', slug: 'callback-functions' },
      { title: 'Higher-Order Functions', slug: 'higher-order-functions' },
      { title: 'Pure Functions', slug: 'pure-functions' },
      { title: 'Recursion', slug: 'recursion' },
    ],
  },
  {
    num: 'VII', title: 'Objects', slug: 'objects',
    topics: [
      { title: 'What is an Object?', slug: 'what-is-an-object' },
      { title: 'Properties', slug: 'properties' },
      { title: 'Methods', slug: 'methods' },
      { title: 'Object References', slug: 'object-references' },
      { title: 'Object Destructuring', slug: 'object-destructuring' },
      { title: 'Spread Syntax', slug: 'spread-syntax' },
    ],
  },
  {
    num: 'VIII', title: 'Arrays', slug: 'arrays',
    topics: [
      { title: 'Arrays', slug: 'arrays-overview' },
      { title: 'Array Indexes', slug: 'array-indexes' },
      { title: 'Array Methods', slug: 'array-methods' },
      { title: 'map', slug: 'map' },
      { title: 'filter', slug: 'filter' },
      { title: 'reduce', slug: 'reduce' },
      { title: 'forEach', slug: 'foreach' },
      { title: 'Array Destructuring', slug: 'array-destructuring' },
      { title: 'Reference vs Value', slug: 'reference-vs-value' },
    ],
  },
  {
    num: 'IX', title: 'Scope', slug: 'scope',
    topics: [
      { title: 'What is Scope?', slug: 'what-is-scope' },
      { title: 'Global Scope', slug: 'global-scope' },
      { title: 'Function Scope', slug: 'function-scope' },
      { title: 'Block Scope', slug: 'block-scope' },
      { title: 'Lexical Scope', slug: 'lexical-scope' },
      { title: 'Scope Chain', slug: 'scope-chain' },
      { title: 'Lexical Environment', slug: 'lexical-environment' },
      { title: 'Hoisting', slug: 'hoisting' },
      { title: 'Temporal Dead Zone', slug: 'temporal-dead-zone' },
    ],
  },
  {
    num: 'X', title: 'Closures', slug: 'closures-chapter',
    topics: [
      { title: 'Closures', slug: 'closures' },
      { title: 'How Closures Remember Variables', slug: 'how-closures-remember-variables' },
      { title: 'Practical Uses of Closures', slug: 'practical-uses-of-closures' },
    ],
  },
  {
    num: 'XI', title: 'The JavaScript Runtime', slug: 'javascript-runtime-chapter',
    topics: [
      { title: 'What Happens When JavaScript Runs?', slug: 'what-happens-when-js-runs' },
      { title: 'JavaScript Runtime', slug: 'javascript-runtime' },
      { title: 'JavaScript Engine', slug: 'javascript-engine' },
    ],
  },
  {
    num: 'XII', title: 'Execution Context', slug: 'execution-context-chapter',
    topics: [
      { title: 'Execution Context', slug: 'execution-context' },
      { title: 'Global Execution Context', slug: 'global-execution-context' },
      { title: 'Function Execution Context', slug: 'function-execution-context' },
      { title: 'Creation Phase', slug: 'creation-phase' },
      { title: 'Execution Phase', slug: 'execution-phase' },
    ],
  },
  {
    num: 'XIII', title: 'Call Stack', slug: 'call-stack-chapter',
    topics: [
      { title: 'Call Stack', slug: 'call-stack' },
      { title: 'Stack Overflow', slug: 'stack-overflow' },
    ],
  },
  {
    num: 'XIV', title: 'Heap & Memory', slug: 'heap-memory-chapter',
    topics: [
      { title: 'Heap', slug: 'heap' },
      { title: 'Memory', slug: 'memory' },
      { title: 'Garbage Collection', slug: 'garbage-collection' },
    ],
  },
  {
    num: 'XV', title: 'The Event Loop', slug: 'event-loop-chapter',
    topics: [
      { title: 'Event Loop', slug: 'event-loop' },
      { title: 'How the Event Loop Works', slug: 'how-the-event-loop-works' },
    ],
  },
  {
    num: 'XVI', title: 'Asynchronous JavaScript', slug: 'async-javascript-chapter',
    topics: [
      { title: 'Synchronous JavaScript', slug: 'synchronous-javascript' },
      { title: 'Asynchronous JavaScript', slug: 'asynchronous-javascript' },
      { title: 'Blocking vs Non-Blocking', slug: 'blocking-vs-non-blocking' },
      { title: 'Web APIs', slug: 'web-apis' },
      { title: 'Callbacks', slug: 'callbacks' },
      { title: 'Callback Queue', slug: 'callback-queue' },
      { title: 'Microtask Queue', slug: 'microtask-queue' },
      { title: 'Macrotask Queue', slug: 'macrotask-queue' },
    ],
  },
  {
    num: 'XVII', title: 'Promises', slug: 'promises-chapter',
    topics: [
      { title: 'Promises', slug: 'promises' },
      { title: 'Promise States', slug: 'promise-states' },
      { title: 'Promise Chaining', slug: 'promise-chaining' },
    ],
  },
  {
    num: 'XVIII', title: 'Async / Await', slug: 'async-await-chapter',
    topics: [
      { title: 'async', slug: 'async' },
      { title: 'await', slug: 'await' },
    ],
  },
  {
    num: 'XIX', title: 'Prototypes', slug: 'prototypes-chapter',
    topics: [
      { title: 'Prototype', slug: 'prototype' },
      { title: 'Prototype Chain', slug: 'prototype-chain' },
      { title: 'Inheritance', slug: 'inheritance' },
      { title: 'Constructor Functions', slug: 'constructor-functions' },
    ],
  },
  {
    num: 'XX', title: 'Classes', slug: 'classes-chapter',
    topics: [
      { title: 'Classes', slug: 'classes' },
      { title: 'Class Methods', slug: 'class-methods' },
      { title: 'extends', slug: 'extends' },
      { title: 'super', slug: 'super' },
      { title: 'Private Fields', slug: 'private-fields' },
    ],
  },
  {
    num: 'XXI', title: 'The `this` Keyword', slug: 'this-chapter',
    topics: [
      { title: 'What is `this`?', slug: 'this' },
      { title: 'Global Context', slug: 'this-global-context' },
      { title: 'Object Method', slug: 'this-object-method' },
      { title: 'Constructor', slug: 'this-constructor' },
      { title: 'Explicit Binding', slug: 'explicit-binding' },
      { title: 'call', slug: 'call' },
      { title: 'apply', slug: 'apply' },
      { title: 'bind', slug: 'bind' },
      { title: 'Arrow Functions and `this`', slug: 'arrow-functions-and-this' },
    ],
  },
  {
    num: 'XXII', title: 'Modules', slug: 'modules-chapter',
    topics: [
      { title: 'Modules', slug: 'modules' },
      { title: 'import', slug: 'import' },
      { title: 'export', slug: 'export' },
      { title: 'ES Modules', slug: 'es-modules' },
      { title: 'CommonJS', slug: 'commonjs' },
    ],
  },
  {
    num: 'XXIII', title: 'Error Handling', slug: 'error-handling-chapter',
    topics: [
      { title: 'Strict Mode', slug: 'strict-mode' },
      { title: 'Error Handling', slug: 'error-handling' },
      { title: 'try', slug: 'try' },
      { title: 'catch', slug: 'catch' },
      { title: 'finally', slug: 'finally' },
      { title: 'Custom Errors', slug: 'custom-errors' },
    ],
  },
  {
    num: 'XXIV', title: 'Advanced Concepts', slug: 'advanced-concepts',
    topics: [
      { title: 'Iterators', slug: 'iterators' },
      { title: 'Generators', slug: 'generators' },
      { title: 'Symbols', slug: 'symbols' },
      { title: 'WeakMap', slug: 'weakmap' },
      { title: 'WeakSet', slug: 'weakset' },
      { title: 'Event Delegation', slug: 'event-delegation' },
      { title: 'Debouncing', slug: 'debouncing' },
      { title: 'Throttling', slug: 'throttling' },
    ],
  },
];

// Flat lookup: slug -> { title, chapter }
export const TOPIC_INDEX = {};
CURRICULUM.forEach((chapter) => {
  chapter.topics.forEach((topic) => {
    TOPIC_INDEX[topic.slug] = { ...topic, chapter };
  });
});

export function findAdjacent(slug) {
  const flat = [];
  CURRICULUM.forEach((chapter) => {
    chapter.topics.forEach((topic) => flat.push(topic));
  });
  const i = flat.findIndex((t) => t.slug === slug);
  return {
    prev: i > 0 ? flat[i - 1] : null,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null,
  };
}