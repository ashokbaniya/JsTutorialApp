import {
  callStackDiagram, stackOfPlatesDiagram, closureDiagram, eventLoopDiagram,
  scopeChainDiagram, executionContextDiagram, heapDiagram, promiseStatesDiagram,
  promiseChainDiagram, prototypeChainDiagram, thisQuadrantDiagram,
  variableBindingDiagram, blockScopeDiagram, primitiveValueDiagram,
  scopeRelationshipDiagram, hoistingDiagram, temporalDeadZoneDiagram,
  operatorPrecedenceDiagram, typeCoercionDiagram, shortCircuitDiagram,
} from './diagrams.js';

// Each article follows the same eight-part structure used throughout
// the book: intro, concept, example, diagram, steps, mental model,
// key takeaway, related concepts. `related` holds topic slugs.

export const ARTICLES = {

  // ---------------------------------------------------------------
  // CHAPTER I: The Language & Fundamentals
  // ---------------------------------------------------------------

  'what-is-javascript': {
    title: 'What is JavaScript?',
    intro: 'JavaScript is the language that makes web pages do things — respond to clicks, update themselves, talk to servers — without asking the page to reload.',
    sections: [
      {
        heading: 'What is JavaScript?',
        body: `
          <p>JavaScript is a <em class="term">programming language</em> — a precise, written way of telling a computer what to do. It was built for the web, and every modern browser understands it natively, which means it runs the moment a page loads, with no separate installation.</p>
          <p>Two other languages usually sit alongside it: HTML describes the structure of a page, and CSS describes its appearance. JavaScript adds <strong>behavior</strong> — the part that reacts, calculates, and changes things over time.</p>
          <p>It has also grown well beyond the browser. The same language now runs on servers, in command-line tools, and inside mobile apps, using engines that execute JavaScript outside of a web page entirely.</p>
          <p><strong>Why does this matter?</strong> Before JavaScript existed, web pages were static documents — you could read them, but the page itself couldn't respond to anything you did. JavaScript was created in 1995 (by Brendan Eich, in about ten days, for Netscape Navigator) specifically to close that gap. Every interactive thing you take for granted on the modern web — a form that validates itself as you type, a map you can drag, a feed that loads more posts without reloading the page — exists because JavaScript can run <em class="term">after</em> the page has loaded, in direct response to what the user does.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Here is a small piece of JavaScript reacting to a moment in time — the click of a button.</p>`,
        code: {
          label: 'script.js',
          code: `const button = document.querySelector("button");\n\nbutton.addEventListener("click", () => {\n  console.log("The button was clicked.");\n});`,
        },
        after: `<p>Nothing happens until the click occurs. JavaScript is comfortable waiting for the world to do something — that reactive quality is central to how it works, and it's a theme this book returns to often.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>When a browser loads a page, it hands any JavaScript to a <em class="term">JavaScript engine</em> built into the browser. The engine reads the code, converts it into a form the machine can run, and executes it — line by line, top to bottom, unless it's told to wait or repeat.</p>`,
        diagram: `
          <svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect x="20" y="60" width="160" height="60" rx="2" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="100" y="95" text-anchor="middle" font-size="13" fill="#20262D" font-family="'JetBrains Mono',monospace">Your Code</text>
            <rect x="240" y="60" width="160" height="60" rx="2" fill="#F7FAFC" stroke="#315F86" stroke-width="1.3"/>
            <text x="320" y="90" text-anchor="middle" font-size="13" fill="#20262D" font-family="'JetBrains Mono',monospace">JS Engine</text>
            <text x="320" y="106" text-anchor="middle" font-size="10.5" fill="#6B6D69">reads &amp; runs it</text>
            <rect x="460" y="60" width="160" height="60" rx="2" fill="none" stroke="#8FA6B8" stroke-width="1.3"/>
            <text x="540" y="95" text-anchor="middle" font-size="13" fill="#20262D" font-family="'JetBrains Mono',monospace">Page Updates</text>
            <defs><marker id="wjarr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#315F86"/></marker></defs>
            <line x1="180" y1="90" x2="238" y2="90" stroke="#315F86" stroke-width="1.3" marker-end="url(#wjarr)"/>
            <line x1="400" y1="90" x2="458" y2="90" stroke="#315F86" stroke-width="1.3" marker-end="url(#wjarr)"/>
          </svg>
        `,
        diagramCaption: 'The engine is the bridge between the code you write and what the page actually does.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'The browser downloads the HTML page.',
          'It finds a &lt;script&gt; tag or linked .js file and hands the code to the JavaScript engine.',
          'The engine parses the code, checking that it\'s written correctly.',
          'The engine executes the code from top to bottom.',
          'Any part of the code that listens for events — clicks, typing, timers — stays ready to run later, in response to those events.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"JavaScript is the stage crew of a web page — invisible until something needs to move."',
        body: `<p>HTML builds the set, CSS lights and dresses it, and JavaScript is the crew making things move on cue: opening a menu, validating a form, refreshing a feed.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Confusing JavaScript with Java.</strong> Beyond a shared marketing-era name, the two languages have nothing in common — different creators, different syntax, different type systems, and different runtimes. Saying "I know Java" tells an interviewer nothing about your JavaScript skills, and vice versa.</p>
          </div>
          <div class="callout callout-warning">
            <p><strong>Thinking JavaScript only runs in browsers.</strong> Many beginners are surprised the first time they see JavaScript power a backend API, a build tool, or a mobile app. The language itself doesn't know or care what environment it's running in — that's determined entirely by which engine and which host APIs (browser DOM vs. Node.js file system, for example) are available.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Is JavaScript the same as Java?</strong></p>
              <p class="interview-a">No — they share a name for marketing reasons from 1995, but they're unrelated languages with different syntax, type systems, and runtimes.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Where does JavaScript run besides the browser?</strong></p>
              <p class="interview-a">On servers (Node.js, Deno, Bun), in CLI tools, and inside mobile/desktop apps via embedded engines — the language itself is host-independent.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'JavaScript is a language built to add behavior to web pages — and it now runs almost anywhere, not only in browsers. Everything else in this book builds outward from that one idea.',
    related: ['how-javascript-runs', 'javascript-engines', 'first-javascript'],
  },

  'how-javascript-runs': {
    title: 'How JavaScript Runs',
    intro: 'JavaScript code goes through parsing, compilation into bytecode, and execution inside an engine before any instruction takes effect.',
    sections: [
      {
        heading: 'How JavaScript Runs',
        body: `
          <p>Unlike languages that require an explicit compilation step before running on your machine, JavaScript is executed dynamically by a <em class="term">JavaScript engine</em>. However, modern engines do not just interpret text line-by-line; they utilize sophisticated JIT (Just-In-Time) compilation to achieve high performance.</p>
          <p>When an engine encounters a script, it first parses the source text into an Abstract Syntax Tree (AST), translates that tree into bytecode, and then begins executing it while simultaneously optimizing hot code paths in the background.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>A simple loop runs through execution stages inside the engine seamlessly.</p>`,
        code: {
          label: 'run.js',
          code: `let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total += i;\n}\nconsole.log(total); // 6`,
        },
        after: `<p>Though written as simple text, the engine transforms this loop into optimized executable sequences under the hood.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>The engine handles execution via distinct processing stages: parsing the source code into a syntactic tree, compiling it into bytecode via an interpreter, and optimizing frequently executed sections into native machine code.</p>`,
        diagram: `
          <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect x="20" y="50" width="130" height="60" rx="2" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="85" y="85" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">Source Code</text>
            <rect x="185" y="50" width="130" height="60" rx="2" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="250" y="78" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">Parser / AST</text>
            <rect x="350" y="50" width="130" height="60" rx="2" fill="#F7FAFC" stroke="#315F86" stroke-width="1.3"/>
            <text x="415" y="78" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">Interpreter</text>
            <text x="415" y="94" text-anchor="middle" font-size="10" fill="#6B6D69">Bytecode</text>
            <rect x="515" y="50" width="105" height="60" rx="2" fill="none" stroke="#8FA6B8" stroke-width="1.3"/>
            <text x="567" y="85" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">Machine Code</text>
            <defs><marker id="hjarr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#315F86"/></marker></defs>
            <line x1="150" y1="80" x2="183" y2="80" stroke="#315F86" stroke-width="1.3" marker-end="url(#hjarr)"/>
            <line x1="315" y1="80" x2="348" y2="80" stroke="#315F86" stroke-width="1.3" marker-end="url(#hjarr)"/>
            <line x1="480" y1="80" x2="513" y2="80" stroke="#315F86" stroke-width="1.3" marker-end="url(#hjarr)"/>
          </svg>
        `,
        diagramCaption: 'JavaScript moves from source code to AST, bytecode interpretation, and machine optimization.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'The engine loads the raw script source text.',
          'The parser analyzes the syntax, converting it into an Abstract Syntax Tree (AST).',
          'The interpreter translates the AST into lightweight bytecode and begins execution immediately.',
          'As portions of code run repeatedly ("hot code"), the optimizing compiler compiles them into fast native machine code.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A translator reading a script aloud first, then memorizing fast scenes to perform them at full speed."',
        body: `<p>Execution starts instantly with interpretation, while frequent tasks are streamlined dynamically behind the scenes for peak efficiency.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Calling JavaScript "purely interpreted."</strong> That description was accurate in the 1990s, but every major engine today (V8, SpiderMonkey, JavaScriptCore) blends interpretation with JIT compilation. Saying "interpreted" alone undersells how the language actually performs.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> you rarely need to think about parsing or bytecode day-to-day — but understanding that "hot" code gets optimized explains why a function can run slowly the first few times and speed up afterward, which matters when benchmarking code.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What are the main phases a JavaScript engine goes through?</strong></p>
              <p class="interview-a">Parsing the source into an AST, compiling to bytecode (and later optimized machine code via a JIT), then executing it.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Is JavaScript compiled or interpreted?</strong></p>
              <p class="interview-a">Both, in modern engines — it starts interpreted for fast startup, then hot code paths get compiled to optimized machine code by a JIT compiler.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'JavaScript runs via an engine that parses text, interprets bytecode instantly, and optimizes frequent routines using Just-In-Time compilation.',
    related: ['what-is-javascript', 'javascript-engines', 'execution-context'],
  },

  'javascript-engines': {
    title: 'JavaScript Engines',
    intro: 'A JavaScript engine is the core runtime program that converts human-readable JavaScript into hardware-level machine instructions.',
    sections: [
      {
        heading: 'What is a JavaScript Engine?',
        body: `
          <p>Every major web browser and server platform embeds a specialized <em class="term">JavaScript engine</em> to execute scripts. Prominent engines include Google's V8 (powering Chrome and Node.js), Mozilla's SpiderMonkey (Firefox), and Apple's JavaScriptCore (Safari).</p>
          <p>These engines adhere to the ECMAScript specification, ensuring standard compliance across different environments while implementing distinct internal architectures (such as interpreters and multi-tiered optimizing compilers) to maximize execution speed.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Any standard JavaScript operation relies entirely on the underlying engine to process expressions and allocate values.</p>`,
        code: {
          label: 'engine.js',
          code: `const greeting = "Hello, Engine!";\nconsole.log(greeting.length);`,
        },
        after: `<p>The engine handles memory allocation, string length evaluation, and standard output printing natively.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Engines combine fast startup interpreters (like V8's Ignition) with advanced optimizing compilers (like TurboFan) to profile runtime behavior and compile hot functions directly to machine code.</p>`,
        diagram: heapDiagram(),
        diagramCaption: 'Engines manage memory stacks and heaps while executing compiled instructions.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Source code is fed into the engine environment.',
          'The interpreter executes bytecode quickly for immediate startup.',
          'Profiling monitors execution frequency to identify hot code blocks.',
          'Optimizing compilers generate high-performance machine code for those hot blocks.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"An engine is a high-speed factory turning raw source blueprints into active machine performance."',
        body: `<p>It balances immediate execution speed with deep runtime optimizations to make dynamic scripting run at lightning speed.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Assuming behavior is identical everywhere.</strong> The ECMAScript spec guarantees the same language semantics across engines, but timing details (garbage collection pauses, exact stack size limits, some console formatting) can differ between V8, SpiderMonkey, and JavaScriptCore. Never write code that depends on those unspecified details.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> if you want to know whether a feature is safe to use, check its support against actual engines (e.g. via MDN's compatibility tables) rather than assuming "if it works in Chrome it works everywhere."</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Name a few JavaScript engines and where they're used.</strong></p>
              <p class="interview-a">V8 (Chrome, Node.js, Edge), SpiderMonkey (Firefox), and JavaScriptCore (Safari) are the major ones.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why do different engines sometimes behave slightly differently?</strong></p>
              <p class="interview-a">The ECMAScript spec defines required behavior, but performance characteristics, some edge cases, and non-standard extensions can differ between implementations.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'JavaScript engines parse, interpret, and optimize code execution behind the scenes, providing consistent behavior across diverse host platforms.',
    related: ['what-is-javascript', 'how-javascript-runs', 'heap'],
  },

  'first-javascript': {
    title: 'Writing Your First JavaScript',
    intro: 'Writing your first script involves embedding executable logic into web documents or running it directly within developer environments.',
    sections: [
      {
        heading: 'Writing Your First JavaScript',
        body: `
          <p>JavaScript code can be executed directly inside browser developer consoles or included inside HTML files using the <code class="code-inline">&lt;script&gt;</code> element.</p>
          <p>When the browser encounters script tags during document loading, it pauses or async-loads the instructions, handing them directly to the resident JavaScript engine for immediate execution.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>A basic script that writes output to the debugging console.</p>`,
        code: {
          label: 'index.html',
          code: `<script>\n  console.log("Welcome to JavaScript!");\n</script>`,
        },
        after: `<p>Opening your browser's developer console displays this message immediately upon document evaluation.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>The hosting environment exposes standard utility objects like <code class="code-inline">console</code>, allowing scripts to communicate output back to developer interfaces.</p>`,
        diagram: `
          <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect x="40" y="50" width="160" height="60" rx="2" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="120" y="85" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">&lt;script&gt; Tag</text>
            <rect x="240" y="50" width="160" height="60" rx="2" fill="#F7FAFC" stroke="#315F86" stroke-width="1.3"/>
            <text x="320" y="78" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">Browser Engine</text>
            <text x="320" y="94" text-anchor="middle" font-size="10" fill="#6B6D69">Executes Code</text>
            <rect x="440" y="50" width="160" height="60" rx="2" fill="none" stroke="#8FA6B8" stroke-width="1.3"/>
            <text x="520" y="85" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">Console Output</text>
            <defs><marker id="fjar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#315F86"/></marker></defs>
            <line x1="200" y1="80" x2="238" y2="80" stroke="#315F86" stroke-width="1.3" marker-end="url(#fjar)"/>
            <line x1="400" y1="80" x2="438" y2="80" stroke="#315F86" stroke-width="1.3" marker-end="url(#fjar)"/>
          </svg>
        `,
        diagramCaption: 'Scripts embedded in HTML are passed straight to the browser engine for execution.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Create an HTML container with a script block or reference an external file.',
          'Load the document inside a web browser or JavaScript runtime.',
          'The engine parses and evaluates code instructions sequentially.',
          'Functions like <code class="code-inline">console.log</code> output results to the developer console.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"Writing a script is like giving a set of direct choreography notes to an eager performer."',
        body: `<p>Every line executes precisely as written when the page environment cues the run sequence.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Putting a &lt;script&gt; tag in &lt;head&gt; with no defer/async.</strong> The browser will stop parsing the HTML, download the script, and run it before it continues building the page — which is why old-school JavaScript delayed page rendering. Modern code avoids this with the <code class="code-inline">defer</code> attribute (runs after parsing, in order) or <code class="code-inline">async</code> (runs as soon as it's downloaded, order not guaranteed).</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Modern best practice:</strong> for new projects, use <code class="code-inline">&lt;script type="module" src="app.js"&gt;&lt;/script&gt;</code>. ES modules are deferred by default, support <code class="code-inline">import</code>/<code class="code-inline">export</code>, and automatically run in strict mode.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What are the two ways to attach JavaScript to an HTML page?</strong></p>
              <p class="interview-a">Inline via a <script> tag with code inside it, or externally via <script src="file.js"></script> referencing a separate file.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why is placing <script> at the end of <body> (or using defer) a common practice?</strong></p>
              <p class="interview-a">It lets the HTML parse and render first, so the page doesn't block on script loading before anything is visible.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Writing and running JavaScript requires a host container or browser tag to load source instructions into an active engine.',
    related: ['what-is-javascript', 'statements', 'expressions'],
  },

  'statements': {
    title: 'Statements',
    intro: 'A statement is a complete instruction or command that tells the JavaScript engine to perform an action.',
    sections: [
      {
        heading: 'What is a Statement?',
        body: `
          <p>Programs are built out of <em class="term">statements</em> — syntactic units that command the engine to carry out specific actions, such as declaring variables, executing loops, or branching conditions.</p>
          <p>Unlike expressions, which compute and return values, statements perform actions. They are often terminated with semicolons, though JavaScript's Automatic Semicolon Insertion (ASI) can handle missing punctuation in many common scenarios.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>A variable declaration statement followed by an assignment command.</p>`,
        code: {
          label: 'statement.js',
          code: `let status = "active";\nif (status === "active") {\n  console.log("System is running.");\n}`,
        },
        after: `<p>Each line or block command instructs the engine on how control flow should proceed.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>The engine parses statements sequentially to build the structural execution flow of your program.</p>`,
        diagram: blockScopeDiagram(),
        diagramCaption: 'Statements establish structural blocks and control commands across execution scopes.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'The engine encounters a statement declaration.',
          'It validates syntax rules against the ECMAScript specification.',
          'The command action is executed within the current execution context.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A statement is a complete sentence or command in a recipe."',
        body: `<p>It tells the program precisely what action to take before moving on to the next instruction.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Relying on ASI in risky spots.</strong> Automatic Semicolon Insertion can silently change meaning — for example, a <code class="code-inline">return</code> followed by a newline and then a value on the next line gets treated as <code class="code-inline">return;</code> (returning <code class="code-inline">undefined</code>), because ASI inserts a semicolon right after <code class="code-inline">return</code>.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> write semicolons explicitly at the end of statements. It costs nothing and removes an entire category of ASI-related bugs, especially around lines starting with <code class="code-inline">(</code>, <code class="code-inline">[</code>, or backticks.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's the difference between a statement and an expression?</strong></p>
              <p class="interview-a">A statement performs an action (like a for loop or an if block); an expression produces a value. Expressions can be part of statements, but not vice versa.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Are semicolons required in JavaScript?</strong></p>
              <p class="interview-a">Not strictly — Automatic Semicolon Insertion inserts them for you in most cases — but omitting them intentionally requires knowing ASI's edge cases well, so most style guides recommend writing them explicitly.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Statements are the foundational commands that direct program execution flow and actions.',
    related: ['expressions', 'comments', 'if'],
  },

  'expressions': {
    title: 'Expressions',
    intro: 'An expression is any valid unit of code that resolves to a value.',
    sections: [
      {
        heading: 'What is an Expression?',
        body: `
          <p>An <em class="term">expression</em> is a combination of literals, variables, operators, and function calls that evaluates down to a single value.</p>
          <p>Wherever JavaScript expects a value, you can supply an expression. They can be nested, combined, and evaluated inside larger statements throughout your code.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Math and string combination expressions evaluating into concrete values.</p>`,
        code: {
          label: 'expression.js',
          code: `let sum = 10 + 5;\nlet greeting = "Hello " + "World";\nconsole.log(sum); // 15`,
        },
        after: `<p><code class="code-inline">10 + 5</code> and <code class="code-inline">"Hello " + "World"</code> are expressions that compute new values.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>The engine computes expressions by resolving variables and applying operator precedence rules until a final value remains.</p>`,
        diagram: variableBindingDiagram(),
        diagramCaption: 'Expressions resolve down to single values that bind to identifiers or pass into statements.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'The engine identifies operand values and operators within the expression.',
          'Precedence rules determine evaluation order.',
          'The expression reduces to a single evaluated value.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"An expression is a math problem or calculation that yields an answer."',
        body: `<p>It takes inputs, computes them, and leaves behind a final resulting value ready for use.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Mixing types in "+" without meaning to.</strong> <code class="code-inline">"5" + 3</code> produces the string <code class="code-inline">"53"</code>, not the number 8, because <code class="code-inline">+</code> favors string concatenation when either operand is a string. This is a frequent source of unexpected UI bugs when a value from an input field (always a string) gets added to a number.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> convert explicitly with <code class="code-inline">Number(value)</code> before doing arithmetic on data that might be a string, so intent is clear at a glance.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Give an example of an expression that is also a valid statement.</strong></p>
              <p class="interview-a">A function call like doSomething(); — it's an expression (produces a return value) used here as a statement (its value is discarded).</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Is an assignment like x = 5 an expression or a statement?</strong></p>
              <p class="interview-a">It's an expression — it evaluates to the assigned value, which is why you can chain assignments like a = b = 5.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Expressions are code fragments that resolve to values, forming the building blocks of computations within statements.',
    related: ['statements', 'arithmetic-operators', 'values'],
  },

  'comments': {
    title: 'Comments',
    intro: 'Comments are human-readable notes ignored by the JavaScript engine, used to explain code intent and document logic.',
    sections: [
      {
        heading: 'What are Comments?',
        body: `
          <p><em class="term">Comments</em> are explanatory notes written directly inside source code. The JavaScript engine completely ignores them during parsing and execution.</p>
          <p>They can be written as single-line comments using <code class="code-inline">//</code> or multi-line block comments using <code class="code-inline">/* ... */</code>.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Documenting code logic with descriptive comments.</p>`,
        code: {
          label: 'comments.js',
          code: `// Initialize user score counter\nlet score = 100;\n\n/* \n  Calculate final multiplier bonus\n  applied at stage end\n*/\nlet bonus = score * 2;`,
        },
        after: `<p>The engine executes the variable assignments cleanly while completely bypassing the text notes.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>During the parsing phase, lexical analyzers strip out comment tokens so they never reach the Abstract Syntax Tree or execution bytecode.</p>`,
        diagram: `
          <svg viewBox="0 0 640 140" xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect x="40" y="40" width="180" height="60" rx="2" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="130" y="75" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">Source with Comments</text>
            <rect x="270" y="40" width="100" height="60" rx="2" fill="#F7FAFC" stroke="#8FA6B8" stroke-width="1.3"/>
            <text x="320" y="75" text-anchor="middle" font-size="12" fill="#6B6D69" font-family="'JetBrains Mono',monospace">Parser Strip</text>
            <rect x="420" y="40" width="180" height="60" rx="2" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="510" y="75" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">Clean Executable Code</text>
            <defs><marker id="cmarr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#315F86"/></marker></defs>
            <line x1="220" y1="70" x2="268" y2="70" stroke="#315F86" stroke-width="1.3" marker-end="url(#cmarr)"/>
            <line x1="370" y1="70" x2="418" y2="70" stroke="#315F86" stroke-width="1.3" marker-end="url(#cmarr)"/>
          </svg>
        `,
        diagramCaption: 'Comments are filtered out during parsing, leaving only executable instructions.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'The developer writes comments to document intent or temporarily disable code.',
          'The engine lexer identifies comment markers and discards the text content.',
          'Execution proceeds normally with zero performance or runtime footprint.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"Margin notes left in a textbook for human readers while the machine reads strictly core text."',
        body: `<p>They help developers communicate context to one another without interfering with code behavior.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Nesting block comments.</strong> <code class="code-inline">/* ... /* ... */ ... */</code> doesn't work the way you'd expect — the first <code class="code-inline">*/</code> closes the whole comment, and anything after it is treated as live code, often causing a syntax error.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> write comments that explain <em>why</em> code exists, not <em>what</em> it does — the code itself already shows what it does. "Retry 3 times because the payment API is occasionally flaky under load" is far more useful than "// loop 3 times".</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Do comments affect performance?</strong></p>
              <p class="interview-a">No — they're stripped during parsing and have zero runtime cost, though very large comment blocks can marginally affect download size before minification removes them.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's the difference between // and /* */?</strong></p>
              <p class="interview-a">// comments out to the end of the line; /* */ can span multiple lines and is also used for JSDoc-style documentation comments.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Comments provide vital human documentation while being completely ignored by the JavaScript engine during execution.',
    related: ['what-is-javascript', 'statements', 'first-javascript'],
  },

  // ---------------------------------------------------------------
  // CHAPTER II: Variables & Values
  // ---------------------------------------------------------------

  'variables': {
    title: 'Variables',
    intro: 'A variable is a named container in memory used to store, retrieve, and update data throughout your program.',
    sections: [
      {
        heading: 'What is a Variable?',
        body: `
          <p>Programs need a way to hold onto data while they run — user names, calculated scores, settings states. A <em class="term">variable</em> is a named identifier that points to a specific value stored in memory.</p>
          <p>Instead of remembering raw memory addresses, your code uses the variable name to fetch or modify the stored value whenever needed.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Declaring a variable and storing a value inside it.</p>`,
        code: {
          label: 'variables.js',
          code: `let score = 42;\nconsole.log(score); // 42\nscore = 50;\nconsole.log(score); // 50`,
        },
        after: `<p>The variable <code class="code-inline">score</code> points initially to <code class="code-inline">42</code> and is later updated to point to <code class="code-inline">50</code>.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>When you declare a variable, the JavaScript engine allocates space in memory and creates a binding between the identifier name and that memory reference.</p>`,
        diagram: variableBindingDiagram(),
        diagramCaption: 'Variables act as labeled boxes or references pointing to values stored in engine memory.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'The engine parses the variable declaration statement.',
          'An identifier binding is created in the current lexical environment.',
          'The assigned expression is evaluated to a value.',
          'The identifier is bound to reference that value in memory.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A variable is a labeled storage box on a shelf."',
        body: `<p>You can look inside the box, replace its contents with something new, or use its label to reference it anywhere in your scope.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Thinking a variable "is" its value.</strong> It's more accurate to say a variable <em>holds a reference to</em> a value. This distinction barely matters for primitives like numbers and strings, but it becomes critical with objects and arrays — see "Object References" and "Reference vs. Value" later in this book.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> name variables for what they represent, not their type (<code class="code-inline">userAge</code>, not <code class="code-inline">numVar</code>). Types can change during refactors; meaning shouldn't.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's the difference between declaring and initializing a variable?</strong></p>
              <p class="interview-a">Declaring creates the binding (let x;); initializing assigns it a first value (x = 5). They can happen together or separately.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What happens if you use a variable before declaring it?</strong></p>
              <p class="interview-a">Depends on the keyword — var gives you undefined (hoisted), while let/const throw a ReferenceError due to the temporal dead zone.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Variables are named identifiers bound to memory locations, allowing programs to store and manipulate dynamic values.',
    related: ['let', 'const', 'var', 'values'],
  },

  'let': {
    title: 'The let Keyword',
    intro: 'Introduced in ES6, let allows you to declare block-scoped variables that can be reassigned later.',
    sections: [
      {
        heading: 'What is let?',
        body: `
          <p>The <code class="code-inline">let</code> keyword declares a variable that is <em class="term">block-scoped</em> and mutable (reassignable). Unlike older mechanisms, <code class="code-inline">let</code> prevents accidental variable leakage outside of loops, conditionals, and code blocks.</p>
          <p>Variables declared with <code class="code-inline">let</code> exist in a Temporal Dead Zone (TDZ) from the start of their enclosing block until their declaration statement is evaluated.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Using let inside a conditional code block.</p>`,
        code: {
          label: 'let.js',
          code: `let count = 10;\nif (true) {\n  let count = 20; // Different variable inside this block\n  console.log(count); // 20\n}\nconsole.log(count); // 10`,
        },
        after: `<p>The inner <code class="code-inline">let count</code> is isolated to the <code class="code-inline">if</code> block, leaving the outer variable untouched.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Block scoping ensures that identifiers declared with <code class="code-inline">let</code> are bound strictly to their enclosing curly braces <code class="code-inline">{}</code> rather than the entire function or global scope.</p>`,
        diagram: blockScopeDiagram(),
        diagramCaption: 'Block scoping confines let variables to their immediate enclosing code block.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Execution enters a block containing a <code class="code-inline">let</code> declaration.',
          'The variable enters the Temporal Dead Zone; accessing it throws a ReferenceError.',
          'The declaration statement is evaluated, and the variable is initialized.',
          'The variable can now be read or reassigned within that block.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A sticky note on a desk that only people inside that specific room can read and modify."',
        body: `<p>It stays contained where it was placed and cannot bleed out into surrounding rooms.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Assuming let hoists like var.</strong> <code class="code-inline">let</code> declarations are technically hoisted (the engine knows about them at the top of the block), but they stay uninitialized inside the Temporal Dead Zone. Reading them before the declaration line throws <code class="code-inline">ReferenceError: Cannot access 'x' before initialization</code> — a much safer failure than var's silent <code class="code-inline">undefined</code>.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> default to <code class="code-inline">const</code> everywhere, and reach for <code class="code-inline">let</code> only when you know a binding must be reassigned (loop counters, accumulators). This makes reassignment visually obvious wherever it happens.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Can a let variable be redeclared in the same scope?</strong></p>
              <p class="interview-a">No — redeclaring a let in the same block throws a SyntaxError, unlike var which allows it silently.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why was let introduced when var already existed?</strong></p>
              <p class="interview-a">To fix var's function-scoping and hoisting quirks — let is block-scoped, which matches how most other languages scope variables and avoids common bugs like loop-variable capture.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'The let keyword provides block-scoped, reassignable variables while preventing hoisting confusion and scope leakage.',
    related: ['variables', 'const', 'var', 'what-is-scope'],
  },

  'const': {
    title: 'The const Keyword',
    intro: 'The const keyword declares variables whose bindings cannot be reassigned after their initial creation.',
    sections: [
      {
        heading: 'What is const?',
        body: `
          <p><code class="code-inline">const</code> stands for constant. It declares a block-scoped identifier whose reference cannot be reassigned once set. Crucially, <code class="code-inline">const</code> protects the <strong>binding</strong>, not necessarily the underlying value if that value is mutable (like an object or array).</p>
          <p>Like <code class="code-inline">let</code>, <code class="code-inline">const</code> variables are subject to the Temporal Dead Zone and must be initialized immediately upon declaration.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Declaring a constant value and attempting reassignments.</p>`,
        code: {
          label: 'const.js',
          code: `const API_URL = "https://api.example.com";\n// API_URL = "https://new.com"; -> TypeError!\n\nconst user = { name: "Alice" };\nuser.name = "Bob"; // Allowed! Mutating object properties\nconsole.log(user.name); // "Bob"`,
        },
        after: `<p>Reassigning <code class="code-inline">API_URL</code> throws an error, but mutating properties inside a <code class="code-inline">const</code> object is fully permitted.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>The engine enforces immutability on the pointer reference itself, throwing a <code class="code-inline">TypeError</code> if any subsequent assignment operator targets the constant identifier.</p>`,
        diagram: variableBindingDiagram(),
        diagramCaption: 'Const locks the variable identifier to its initial memory reference permanently.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'The engine encounters a <code class="code-inline">const</code> declaration.',
          'An initial value must be supplied immediately or a SyntaxError occurs.',
          'The identifier is bound permanently to that memory reference.',
          'Any attempt to reassign the identifier later triggers a TypeError.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A locked mailbox where you can drop something in once, but can never replace the box itself."',
        body: `<p>The connection is permanent, even if items inside a container box can still be rearranged.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Believing const makes objects immutable.</strong> It doesn't — <code class="code-inline">const user = { name: "Alice" }; user.name = "Bob";</code> works fine. If you need a truly frozen object, use <code class="code-inline">Object.freeze(user)</code> (shallow) in addition to <code class="code-inline">const</code>.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> use <code class="code-inline">const</code> for array and object bindings too, even though you'll still push/mutate their contents — it communicates "this variable will always refer to the same array/object," which is usually what you mean.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Can you mutate an object declared with const?</strong></p>
              <p class="interview-a">Yes — const only prevents reassigning the variable binding itself; the object's properties can still be changed. Only the reference is frozen, not the value.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Should you always default to const?</strong></p>
              <p class="interview-a">Most style guides recommend it — reach for let only when a variable genuinely needs reassignment, since it signals intent and prevents accidental overwrites.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'The const keyword creates read-only variable bindings that prevent accidental reassignments throughout your codebase.',
    related: ['variables', 'let', 'var'],
  },

  'var': {
    title: 'The var Keyword',
    intro: 'The var keyword is JavaScript’s legacy variable declaration mechanism, scoped to functions rather than blocks.',
    sections: [
      {
        heading: 'What is var?',
        body: `
          <p><code class="code-inline">var</code> is the original way variables were declared in JavaScript before ES6. Unlike <code class="code-inline">let</code> and <code class="code-inline">const</code>, <code class="code-inline">var</code> is <em class="term">function-scoped</em> (or globally scoped if declared outside a function) and ignores block boundaries entirely.</p>
          <p>Variables declared with <code class="code-inline">var</code> are <em class="term">hoisted</em> to the top of their execution scope and initialized automatically with <code class="code-inline">undefined</code>.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Demonstrating function scoping and block leakage with var.</p>`,
        code: {
          label: 'var.js',
          code: `function test() {\n  if (true) {\n    var leaked = "I leak out!";\n  }\n  console.log(leaked); // "I leak out!" because var ignores blocks\n}\ntest();`,
        },
        after: `<p>Because <code class="code-inline">var</code> ignores <code class="code-inline">if</code> blocks, <code class="code-inline">leaked</code> is accessible anywhere inside the surrounding function.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>During the creation phase of an execution context, <code class="code-inline">var</code> declarations are registered on the variable environment and initialized with <code class="code-inline">undefined</code>.</p>`,
        diagram: executionContextDiagram(),
        diagramCaption: 'Var declarations attach to function or global variable environments during context creation.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'The engine enters an execution context.',
          'All <code class="code-inline">var</code> declarations are hoisted and initialized to <code class="code-inline">undefined</code>.',
          'Code execution reaches the line where the <code class="code-inline">var</code> statement appears.',
          'The variable is updated with its assigned value.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A megaphone announcement that echoes across the entire room, ignoring walls and closed doors."',
        body: `<p>It spreads across the entire function scope rather than staying confined to local code blocks.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>The classic var-in-a-loop bug:</strong></p>
            <pre class="code-block"><code>for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs 4, 4, 4 — every callback shares the same "i"

for (let j = 1; j <= 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// Logs 1, 2, 3 — "let" creates a fresh binding each iteration</code></pre>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> there's essentially no reason to write <code class="code-inline">var</code> in new code. Modern style guides (Airbnb, StandardJS, ESLint's <code class="code-inline">no-var</code> rule) all recommend <code class="code-inline">let</code>/<code class="code-inline">const</code> exclusively; you'll mostly encounter <code class="code-inline">var</code> when reading older codebases.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why is var considered legacy in modern code?</strong></p>
              <p class="interview-a">It's function-scoped rather than block-scoped, gets hoisted with an undefined default (masking bugs), and can be redeclared silently — all sources of subtle errors that let/const fix.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's a classic var bug in loops?</strong></p>
              <p class="interview-a">Using var i in a for loop with an async callback — all callbacks share the same i, so they all see its final value, unlike let which creates a fresh binding per iteration.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'The var keyword is legacy syntax with function scope and hoisting quirks; modern JavaScript heavily prefers let and const.',
    related: ['variables', 'let', 'const'],
  },

  'values': {
    title: 'Values',
    intro: 'Values are the fundamental pieces of data that JavaScript programs store, evaluate, and manipulate.',
    sections: [
      {
        heading: 'What are Values?',
        body: `
          <p>At its core, a computer program is a machine designed to manipulate <em class="term">values</em>. A value can be a number representing currency, a string of text in a chat message, a boolean switch, or a complex object.</p>
          <p>Values exist independently of the variables that reference them. Variables simply act as pointers pointing to these values in memory.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Assigning different types of values to variables.</p>`,
        code: {
          label: 'values.js',
          code: `let userName = "Alice"; // String value\nlet userAge = 30;    // Number value\nlet isLoggedIn = true; // Boolean value`,
        },
        after: `<p>The variables <code class="code-inline">userName</code>, <code class="code-inline">userAge</code>, and <code class="code-inline">isLoggedIn</code> point to distinct value types in memory.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>The JavaScript engine allocates memory for every value, tagging it with metadata describing its data type so operations can be performed correctly.</p>`,
        diagram: primitiveValueDiagram(),
        diagramCaption: 'Values reside in memory while variables maintain references pointing directly to them.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'An expression evaluates to a specific value.',
          'The engine allocates memory to store that value.',
          'A variable or data structure stores a reference pointing to that memory location.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"Values are objects in a warehouse, and variables are shipping tags attached to them."',
        body: `<p>Multiple tags can point to the same item, or items can exist temporarily without any tags attached.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Using <code class="code-inline">typeof</code> to check for arrays.</strong> <code class="code-inline">typeof []</code> returns <code class="code-inline">"object"</code>, not <code class="code-inline">"array"</code> — arrays are a specialized kind of object. Use <code class="code-inline">Array.isArray(value)</code> to check specifically for arrays.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> when you need to know whether copying a value is "safe" (independent) or "shared" (linked), ask first whether it's a primitive or an object — that single question predicts the behavior every time.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What are the two broad categories of values in JavaScript?</strong></p>
              <p class="interview-a">Primitives (string, number, boolean, null, undefined, symbol, bigint) and objects (which includes arrays and functions).</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why does the distinction between primitives and objects matter in practice?</strong></p>
              <p class="interview-a">It determines whether a value is copied (primitives, by value) or shared by reference (objects) when assigned or passed to a function.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Values are the raw data entities in JavaScript, categorized into primitives and objects, referenced by variables.',
    related: ['variables', 'primitive-values', 'data-types-overview'],
  },

  'primitive-values': {
    title: 'Primitive Values',
    intro: 'Primitive values are basic, immutable data types with no methods or properties of their own.',
    sections: [
      {
        heading: 'What are Primitive Values?',
        body: `
          <p>JavaScript has seven primitive types: <code class="code-inline">string</code>, <code class="code-inline">number</code>, <code class="code-inline">bigint</code>, <code class="code-inline">boolean</code>, <code class="code-inline">undefined</code>, <code class="code-inline">symbol</code>, and <code class="code-inline">null</code>.</p>
          <p>All primitives are <em class="term">immutable</em> — once created, their actual value cannot be altered. When you perform operations on primitives, JavaScript returns a brand new value rather than modifying the original.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Demonstrating primitive immutability and string methods.</p>`,
        code: {
          label: 'primitives.js',
          code: `let str = "hello";\nstr.toUpperCase(); // Returns "HELLO", but str is unchanged!\nconsole.log(str); // "hello"\n\nstr = str.toUpperCase(); // Reassignment updates the variable pointer\nconsole.log(str); // "HELLO"`,
        },
        after: `<p>Calling <code class="code-inline">toUpperCase()</code> does not mutate the original string in memory; it produces a new string value.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Primitives are stored directly on the call stack or inline within execution context environments, making value lookups extremely fast.</p>`,
        diagram: primitiveValueDiagram(),
        diagramCaption: 'Primitive values are stored directly by value, ensuring complete immutability.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'A primitive value is created and stored in memory.',
          'A variable points directly to that primitive value.',
          'When modified or transformed, a new primitive value is generated in memory.',
          'The variable pointer is updated to reference the new value.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A carved stone tablet where letters cannot be erased, only replaced by carving a brand new tablet."',
        body: `<p>You cannot change what is already written; you can only create a new version and point to that instead.</p>`,
      },
      {
        heading: 'Common Mistakes',
        body: `
          <div class="callout callout-warning">
            <p><strong>Confusing "primitive" with "stored on the stack."</strong> "Stack vs. heap" is a useful teaching simplification, but the ECMAScript specification never mandates where a value physically lives in memory — that's an engine implementation detail. What the spec <em>does</em> guarantee is that primitives are compared and copied by value, not by reference. That behavioral guarantee is what actually matters for writing correct code.</p>
          </div>
          <div class="callout callout-tip">
            <p><strong>Best practice:</strong> treat <code class="code-inline">typeof null === "object"</code> as a well-known historical bug in the language (kept for backward compatibility), not a design choice to imitate — use <code class="code-inline">value === null</code> to test for null specifically.</p>
          </div>
        `,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Are strings mutable in JavaScript?</strong></p>
              <p class="interview-a">No — string primitives are immutable. Methods like .toUpperCase() return a new string rather than modifying the original.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: How many primitive types does JavaScript have?</strong></p>
              <p class="interview-a">Seven: string, number, boolean, null, undefined, symbol, and bigint.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Primitive values are immutable, light data types passed by value rather than reference across your program.',
    related: ['values', 'data-types-overview', 'strings', 'numbers'],
  },

  // ---------------------------------------------------------------
  // CHAPTER III: Data Types
  // ---------------------------------------------------------------

  'data-types-overview': {
    title: 'Data Types Overview',
    intro: 'JavaScript categorizes values into distinct data types, split between lightweight primitives and complex objects.',
    sections: [
      {
        heading: 'What are Data Types?',
        body: `
          <p>Every value in JavaScript belongs to a specific <em class="term">data type</em>. These types inform the engine how much memory to allocate and what operations can safely be performed on the data.</p>
          <p>JavaScript is <em class="term">dynamically typed</em>, meaning variables are not bound to any single data type. A variable can hold a number at one moment and a string the next.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Using the typeof operator to inspect the data type of various values.</p>`,
        code: {
          label: 'types.js',
          code: `console.log(typeof 42);          // "number"\nconsole.log(typeof "hello");     // "string"\nconsole.log(typeof true);        // "boolean"\nconsole.log(typeof {});          // "object"`,
        },
        after: `<p>The <code class="code-inline">typeof</code> operator inspects the underlying value currently referenced by an expression.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>JavaScript classifies types into two primary categories: seven primitive types (which hold single, immutable values) and the Object type (which holds collections of key-value pairs or structured data).</p>`,
        diagram: `
          <svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect x="20" y="30" width="600" height="40" rx="4" fill="#F7FAFC" stroke="#315F86" stroke-width="1.3"/>
            <text x="320" y="55" text-anchor="middle" font-size="13" fill="#20262D" font-weight="bold" font-family="'JetBrains Mono',monospace">JavaScript Data Types (7 Primitives + 1 Object)</text>
            <rect x="20" y="90" width="290" height="70" rx="3" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="165" y="115" text-anchor="middle" font-size="12" fill="#20262D" font-weight="bold" font-family="'JetBrains Mono',monospace">Primitives (Immutable)</text>
            <text x="165" y="138" text-anchor="middle" font-size="10.5" fill="#6B6D69">string, number, bigint, boolean, undefined, null, symbol</text>
            <rect x="330" y="90" width="290" height="70" rx="3" fill="none" stroke="#8FA6B8" stroke-width="1.3"/>
            <text x="475" y="115" text-anchor="middle" font-size="12" fill="#20262D" font-weight="bold" font-family="'JetBrains Mono',monospace">Objects (Mutable)</text>
            <text x="475" y="138" text-anchor="middle" font-size="10.5" fill="#6B6D69">Objects, Arrays, Functions, Dates, Maps</text>
          </svg>
        `,
        diagramCaption: 'JavaScript divides data into immutable primitive types and mutable reference object types.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'A value is created in code.',
          'The engine assigns internal type metadata to the value representation.',
          'Operators and methods verify type compatibility during execution.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"Data types are customs checkpoints at the border, ensuring cargo matches permitted categories."',
        body: `<p>They prevent illegal operations, like multiplying text strings as if they were raw numbers.</p>`,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Is typeof null === 'object' a bug?</strong></p>
              <p class="interview-a">Yes, a famous and permanent one — it's a bug from JavaScript's first implementation in 1995 that can't be fixed without breaking the web, so it remains part of the spec.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: How would you reliably check if a value is an array?</strong></p>
              <p class="interview-a">Array.isArray(value) — typeof returns 'object' for arrays too, so it can't distinguish them.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Data types classify JavaScript values into primitives and objects, dictating how memory is allocated and manipulated.',
    related: ['primitive-values', 'strings', 'numbers', 'boolean'],
  },

  'strings': {
    title: 'Strings',
    intro: 'The string data type represents textual data, stored as sequences of UTF-16 code units.',
    sections: [
      {
        heading: 'What are Strings?',
        body: `
          <p>A <em class="term">string</em> is used to represent text in JavaScript. Strings can be enclosed in single quotes (<code class="code-inline">'</code>), double quotes (<code class="code-inline">"</code>), or backticks (<code class="code-inline">\`</code>) for template literals.</p>
          <p>Strings are immutable primitives. Once a string is created, its individual characters cannot be modified in place.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Creating strings and using template literals for interpolation.</p>`,
        code: {
          label: 'strings.js',
          code: `const firstName = "JavaScript";\nconst greeting = \`Hello, \${firstName}!\`;\nconsole.log(greeting); // "Hello, JavaScript!"\nconsole.log(greeting.length); // 18`,
        },
        after: `<p>Template literals allow embedding expressions directly inside backticks using <code class="code-inline">\${}</code> syntax.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Strings are indexed collections of 16-bit code units. You can access characters by numeric indices, though methods like <code class="code-inline">slice()</code> or <code class="code-inline">concat()</code> always return brand new string primitives.</p>`,
        diagram: primitiveValueDiagram(),
        diagramCaption: 'Strings are immutable indexed sequences of character code units.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'String literals are parsed into immutable UTF-16 character sequences.',
          'Methods or property lookups access character elements or return derived strings.',
          'Reassignment or transformation yields a new string value in memory.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A printed strip of paper with words stamped on it."',
        body: `<p>To change a word, you don't erase the ink; you print a brand-new strip of paper.</p>`,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: How do you check if a string contains a substring?</strong></p>
              <p class="interview-a">String.prototype.includes() — cleaner than the older indexOf(...) !== -1 pattern.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why are template literals generally preferred over string concatenation?</strong></p>
              <p class="interview-a">They embed expressions directly with \${...}, support multi-line strings natively, and avoid the readability cost of chained + operators.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Strings are immutable primitive sequences of text characters supporting powerful built-in manipulation methods and template interpolation.',
    related: ['data-types-overview', 'primitive-values', 'numbers'],
  },

  'numbers': {
    title: 'Numbers',
    intro: 'JavaScript uses the Number type for all numeric values, employing 64-bit double-precision floating-point format.',
    sections: [
      {
        heading: 'What are Numbers?',
        body: `
          <p>Unlike many programming languages that separate integers from decimals, JavaScript has only one <em class="term">Number</em> type. Numbers are represented as 64-bit floating-point values (IEEE 754 standard).</p>
          <p>This format can safely represent integers between <code class="code-inline">-(2^53 - 1)</code> and <code class="code-inline">2^53 - 1</code>. It also includes special numeric symbols like <code class="code-inline">Infinity</code>, <code class="code-inline">-Infinity</code>, and <code class="code-inline">NaN</code> (Not-a-Number).</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Performing arithmetic and encountering IEEE 754 floating-point precision quirks.</p>`,
        code: {
          label: 'numbers.js',
          code: `let x = 0.1 + 0.2;\nconsole.log(x); // 0.30000000000000004\nconsole.log(x === 0.3); // false`,
        },
        after: `<p>Due to binary floating-point representation limits, decimal arithmetic can occasionally yield minor rounding inaccuracies.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Numbers are stored directly as primitive values. The global <code class="code-inline">Math</code> object and Number constructor provide utilities for rounding, parsing, and bounds checking.</p>`,
        diagram: primitiveValueDiagram(),
        diagramCaption: 'Numbers store floating-point numeric data directly as fast primitive values.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Numeric literals are parsed and stored as 64-bit IEEE 754 binary floating points.',
          'Arithmetic operators compute mathematical results.',
          'Special values like <code class="code-inline">NaN</code> are returned when mathematical operations result in undefined numerical states.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A digital calculator display operating with fixed precision slots."',
        body: `<p>It handles huge ranges of integers and decimals smoothly, with rare rounding quirks at microscopic decimal levels.</p>`,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why does 0.1 + 0.2 !== 0.3 in JavaScript?</strong></p>
              <p class="interview-a">Numbers are IEEE 754 doubles — a binary format that can't represent most decimal fractions exactly, producing tiny rounding errors.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What is Number.MAX_SAFE_INTEGER and why does it matter?</strong></p>
              <p class="interview-a">2^53 - 1 — the largest integer that can be represented without precision loss. Beyond it, integer math can silently become inaccurate, which is what BigInt exists to solve.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'JavaScript numbers are 64-bit floating-point values handling both integers and decimals, equipped with special values like NaN and Infinity.',
    related: ['data-types-overview', 'bigint', 'primitive-values'],
  },

  'bigint': {
    title: 'BigInt',
    intro: 'BigInt is a built-in numeric primitive used for safely representing integers of arbitrary length beyond the standard number limit.',
    sections: [
      {
        heading: 'What is BigInt?',
        body: `
          <p><em class="term">BigInt</em> is a primitive type designed to represent integers larger than <code class="code-inline">2^53 - 1</code>, which is the maximum safe integer limit for standard Numbers.</p>
          <p>You create a BigInt by appending an <code class="code-inline">n</code> to the end of an integer literal or by calling the <code class="code-inline">BigInt()</code> function.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Working with extremely large integers without precision loss.</p>`,
        code: {
          label: 'bigint.js',
          code: `const maxSafe = Number.MAX_SAFE_INTEGER;\nconsole.log(maxSafe + 1 === maxSafe + 2); // true (precision loss!)\n\nconst huge = 9007199254740991n;\nconst evenHuger = huge + 2n;\nconsole.log(evenHuger); // 9007199254740993n`,
        },
        after: `<p>BigInts can grow indefinitely in length, making them ideal for cryptography, high-precision IDs, and timestamp calculations.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>BigInts cannot be mixed with standard Numbers in direct arithmetic operations; attempting to add a Number and a BigInt throws a TypeError. Explicit conversion is required.</p>`,
        diagram: primitiveValueDiagram(),
        diagramCaption: 'BigInt allocates variable-length memory to store arbitrarily large whole numbers safely.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'An integer literal with an <code class="code-inline">n</code> suffix is evaluated.',
          'The engine allocates arbitrary-precision integer storage.',
          'Operations between BigInts execute with exact precision without rounding.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"An expanding digital abacus that adds extra columns as numbers grow infinitely larger."',
        body: `<p>It never runs out of digit slots, unlike fixed-width numeric registers.</p>`,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Can you mix BigInt and Number in the same expression?</strong></p>
              <p class="interview-a">No — 1n + 1 throws a TypeError. You must explicitly convert one side (Number(bigintValue) or BigInt(numberValue)).</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: When would you actually need BigInt?</strong></p>
              <p class="interview-a">Cryptography, high-precision timestamps, or any integer math that could exceed 2^53 — rare in typical UI code, common in specialized numeric work.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'BigInt enables safe calculation of arbitrarily large integers, preventing the precision loss inherent in standard JavaScript numbers.',
    related: ['numbers', 'data-types-overview', 'primitive-values'],
  },

  'boolean': {
    title: 'Boolean',
    intro: 'The boolean data type represents logical truth entities with exactly two possible values: true and false.',
    sections: [
      {
        heading: 'What is a Boolean?',
        body: `
          <p>A <em class="term">boolean</em> represents a logical entity with two literal states: <code class="code-inline">true</code> and <code class="code-inline">false</code>.</p>
          <p>Booleans form the foundation of conditional logic, driving control flow statements like <code class="code-inline">if</code>, <code class="code-inline">while</code>, and ternary evaluations.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Using booleans to control conditional execution branching.</p>`,
        code: {
          label: 'boolean.js',
          code: `const isLoggedIn = true;\nif (isLoggedIn) {\n  console.log("Welcome back!");\n} else {\n  console.log("Please log in.");\n}`,
        },
        after: `<p>Relational comparison operators (like <code class="code-inline">&gt;</code>, <code class="code-inline">===</code>) evaluate expressions down to boolean values.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>In JavaScript, non-boolean values can be evaluated in boolean contexts. Values convert implicitly to true or false based on whether they are <em class="term">truthy</em> or <em class="term">falsy</em>.</p>`,
        diagram: primitiveValueDiagram(),
        diagramCaption: 'Boolean primitives store lightweight binary flags representing truth states.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'A logical comparison or expression is evaluated.',
          'The engine resolves the result to either <code class="code-inline">true</code> or <code class="code-inline">false</code>.',
          'Control flow branches according to the resolved boolean state.',
        ],
      },
      {
        heading: 'MentalModel',
        mentalModel: '"A light switch that is either toggled ON (true) or OFF (false)."',
        body: `<p>It determines whether power flows through a specific execution branch in your code.</p>`,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's the difference between Boolean(value) and new Boolean(value)?</strong></p>
              <p class="interview-a">Boolean(value) coerces to a primitive true/false; new Boolean(value) creates a Boolean object wrapper, which is truthy even when wrapping false — a common gotcha, best avoided.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Booleans provide the binary true/false logic required for conditionals and decision-making in programs.',
    related: ['data-types-overview', 'if', 'comparison-operators'],
  },

  'undefined': {
    title: 'Undefined',
    intro: 'Undefined is a primitive type indicating the absence of an assigned value or uninitialized state.',
    sections: [
      {
        heading: 'What is Undefined?',
        body: `
          <p>The <em class="term">Undefined</em> type has exactly one value: <code class="code-inline">undefined</code>. When a variable is declared without an assignment, or a function returns nothing, JavaScript automatically assigns <code class="code-inline">undefined</code>.</p>
          <p>It represents the state of a variable or property that has been declared but has not yet been pointed to a valid value.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Observing undefined in uninitialized variables and missing property lookups.</p>`,
        code: {
          label: 'undefined.js',
          code: `let user;\nconsole.log(user); // undefined\n\nconst obj = {};\nconsole.log(obj.age); // undefined`,
        },
        after: `<p>Accessing unassigned variables or non-existent object keys defaults gracefully to <code class="code-inline">undefined</code>.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>During variable creation and memory allocation phases, engines initialize variable slots with <code class="code-inline">undefined</code> until explicit assignment occurs.</p>`,
        diagram: variableBindingDiagram(),
        diagramCaption: 'Uninitialized identifiers point to the primitive undefined value by default.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'A variable is declared without an initial value.',
          'The engine binds the identifier to the primitive <code class="code-inline">undefined</code>.',
          'Accessing the variable evaluates to <code class="code-inline">undefined</code>.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"An empty parking space with a sign that says \'Reserved, but car has not arrived yet.\'"',
        body: `<p>The spot exists, but nothing occupies it at the moment.</p>`,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's the difference between a variable being undefined and not being declared at all?</strong></p>
              <p class="interview-a">An undeclared variable throws a ReferenceError when accessed; a declared-but-unassigned variable simply evaluates to undefined.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Can you reassign undefined itself?</strong></p>
              <p class="interview-a">In modern engines, undefined is a non-writable global property in most scopes, though it's still best practice never to assign to it directly — use it only as a value to check against.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Undefined is the default primitive value assigned to uninitialized variables and missing properties in JavaScript.',
    related: ['null', 'data-types-overview', 'variables'],
  },

  'null': {
    title: 'Null',
    intro: 'Null is a special primitive value representing the intentional absence of any object reference.',
    sections: [
      {
        heading: 'What is Null?',
        body: `
          <p>The <em class="term">Null</em> type has exactly one value: <code class="code-inline">null</code>. Unlike <code class="code-inline">undefined</code> (which signifies an accidental lack of value or uninitialized state), <code class="code-inline">null</code> is an intentional marker.</p>
          <p>Developers use <code class="code-inline">null</code> to explicitly signal that a variable or object property should currently point to nothing.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Assigning null to clear an active object reference.</p>`,
        code: {
          label: 'null.js',
          code: `let currentUser = { name: "Alice" };\n// User logs out, clearing reference\ncurrentUser = null;\nconsole.log(currentUser); // null`,
        },
        after: `<p>Setting <code class="code-inline">currentUser</code> to <code class="code-inline">null</code> indicates that the session has ended and no user object is currently loaded.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>A famous historical quirk in JavaScript causes <code class="code-inline">typeof null</code> to return <code class="code-inline">"object"</code>. Despite this legacy bug in type tagging, <code class="code-inline">null</code> is strictly a primitive value.</p>`,
        diagram: primitiveValueDiagram(),
        diagramCaption: 'Null acts as a deliberate sentinel value pointing to an intentional absence of objects.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'A developer assigns <code class="code-inline">null</code> to a variable to clear its reference.',
          'The previous object reference becomes eligible for garbage collection if no other pointers remain.',
          'The variable holds the explicit empty sentinel value.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"An empty cardboard box left on the shelf with a label reading \'Empty on Purpose.\'"',
        body: `<p>It's not missing its contents by accident; you purposefully cleared it out.</p>`,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's the practical difference between null and undefined?</strong></p>
              <p class="interview-a">undefined generally means 'not yet assigned' (the engine's default); null means 'intentionally empty,' set explicitly by the programmer.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why is typeof null 'object'?</strong></p>
              <p class="interview-a">A long-standing bug preserved for backward compatibility — it doesn't reflect null being an actual object internally.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Null is the intentional primitive value representing the deliberate absence of an object reference.',
    related: ['undefined', 'data-types-overview', 'garbage-collection'],
  },

  'symbol': {
    title: 'Symbol',
    intro: 'Symbol is a primitive type used to create entirely unique and collision-free identifiers for object properties.',
    sections: [
      {
        heading: 'What is a Symbol?',
        body: `
          <p>Introduced in ES6, a <em class="term">Symbol</em> is a primitive whose values are guaranteed to be unique. Even if two symbols share the exact same description string, they are completely distinct from one another.</p>
          <p>Symbols are primarily used to create hidden or collision-resistant object properties that won't interfere with standard string-keyed properties or enumeration loops.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Creating unique symbols and using them as private object keys.</p>`,
        code: {
          label: 'symbol.js',
          code: `const ID = Symbol("id");\nconst user = {\n  name: "Alice",\n  [ID]: 12345\n};\n\nconsole.log(user[ID]); // 12345\nconsole.log(Object.keys(user)); // ["name"] (Symbol key is hidden!)`,
        },
        after: `<p>Symbol keys are omitted from standard <code class="code-inline">for...in</code> loops and <code class="code-inline">Object.keys()</code>, providing lightweight property encapsulation.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Every call to <code class="code-inline">Symbol()</code> allocates a brand new, immutable primitive identifier in memory that cannot clash with any other key.</p>`,
        diagram: primitiveValueDiagram(),
        diagramCaption: 'Symbols generate unique primitive tokens that serve as hidden property keys.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Calling <code class="code-inline">Symbol("description")</code> generates a unique primitive token.',
          'The symbol is assigned as a property key on an object using computed property brackets <code class="code-inline">[key]</code>.',
          'Access requires referencing the exact same symbol variable reference.',
        ],
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A tamper-proof serial number stamped on a specific part inside a machine."',
        body: `<p>No other part in the entire factory shares that exact serial number, preventing mix-ups.</p>`,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Are Symbol keys enumerable in a for...in loop or Object.keys()?</strong></p>
              <p class="interview-a">No — they're intentionally excluded from both, which is what makes them useful for adding metadata to an object without colliding with or exposing regular properties.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Does Symbol('id') === Symbol('id')?</strong></p>
              <p class="interview-a">No — every call to Symbol() creates a unique value regardless of the description string passed in.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Symbols provide unique, collision-proof primitive identifiers ideal for creating hidden or special-purpose object properties.',
    related: ['data-types-overview', 'primitive-values', 'what-is-an-object'],
  },
  // ---------------------------------------------------------------
  // CHAPTER IV: Operators & Expressions
  // ---------------------------------------------------------------

  'arithmetic-operators': {
    title: 'Arithmetic Operators',
    intro: 'Arithmetic operators do the math — addition, subtraction, multiplication, division, remainder, and exponentiation — and JavaScript follows the same order-of-operations rules you learned in school.',
    sections: [
      {
        heading: 'What Are Arithmetic Operators?',
        body: `
          <p><code class="code-inline">+  -  *  /  %  **</code> perform calculations on numbers. They exist because almost every useful program needs to compute something — totals, positions, percentages, timers — and a language without built-in math would force every programmer to reinvent it.</p>
          <p>JavaScript evaluates them using standard mathematical <em class="term">precedence</em>: exponentiation first, then multiplication/division/remainder, then addition/subtraction, left to right when precedence ties. Parentheses override everything, exactly like on paper.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>The six arithmetic operators in action.</p>`,
        code: {
          label: 'arithmetic.js',
          code: `let sum = 10 + 5;        // 15\nlet difference = 10 - 5; // 5\nlet product = 4 * 3;     // 12\nlet quotient = 10 / 4;   // 2.5\nlet remainder = 10 % 3;  // 1  (10 divided by 3 leaves 1 left over)\nlet power = 2 ** 8;      // 256`,
        },
        after: `<p><code class="code-inline">%</code> is the operator most beginners haven't seen before — it's the leftover from division, not a percentage. It's the backbone of "every 3rd item," clock arithmetic, and checking even/odd (<code class="code-inline">n % 2 === 0</code>).</p>`,
      },
      {
        heading: 'How It Works Internally',
        body: `<p>Every number in JavaScript — whole or decimal — is stored the same way: as an <em class="term">IEEE 754 double-precision float</em>, 64 bits under the hood. There's no separate integer type. This is convenient (one type handles everything) but it has a famous consequence: some decimal math doesn't land on a perfectly round result, because decimals like 0.1 can't be represented exactly in binary, the same way 1/3 can't be written exactly in decimal.</p>`,
        diagram: operatorPrecedenceDiagram(),
        diagramCaption: 'Precedence order — higher rows are evaluated before lower ones.',
      },
      {
        heading: 'Production Example',
        body: `<p>Calculating an order total with tax — and handling the floating-point rounding correctly.</p>`,
        code: {
          label: 'checkout.js',
          code: `function calculateOrderTotal(itemPrice, quantity, taxRate) {\n  const subtotal = itemPrice * quantity;\n  const total = subtotal + subtotal * taxRate;\n  return Math.round(total * 100) / 100; // round to the nearest cent\n}\n\ncalculateOrderTotal(19.99, 3, 0.08); // 64.77`,
        },
        after: `<p>Notice the rounding step. <code class="code-inline">0.1 + 0.2</code> famously evaluates to <code class="code-inline">0.30000000000000004</code> — not a bug, just binary floating-point doing its best with a decimal it can't represent exactly. Any code that touches money should round at the boundary, never compare floats with <code class="code-inline">===</code>.</p>`,
        callout: { type: 'warning', text: 'Never compare floating-point results with === (e.g. 0.1 + 0.2 === 0.3 is false). Round first, or compare within a small tolerance.' },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A calculator that never just reads left to right — it always applies the order-of-operations rules a math teacher would insist on."',
        body: `<p>Parentheses are how you tell the calculator "do this part first," overriding the default order.</p>`,
      },
      {
        heading: 'Common Mistakes & Best Practices',
        body: `
          <ul class="list">
            <li><strong>Mistake:</strong> comparing floating-point totals with <code class="code-inline">===</code>. <strong>Fix:</strong> round to a fixed number of decimals, or work in integer cents.</li>
            <li><strong>Mistake:</strong> forgetting <code class="code-inline">%</code> isn't "percent" — it's remainder. <strong>Fix:</strong> read it as "what's left over."</li>
            <li><strong>Best practice:</strong> for currency, store amounts as integer cents rather than decimal dollars to sidestep floating-point drift entirely.</li>
          </ul>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why shouldn't you compare floating-point sums with ===?</strong></p>
              <p class="interview-a">Because of binary floating-point rounding, results like 0.1 + 0.2 aren't exactly 0.3 — round explicitly or compare within a tolerance instead.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What does the % operator actually compute?</strong></p>
              <p class="interview-a">The remainder left over after division, not a percentage — e.g. 10 % 3 is 1, the leftover after 3 goes into 10 three times.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Arithmetic operators follow strict precedence rules, and because JavaScript numbers are floating-point, code dealing with money or exact decimals should round explicitly rather than compare floats directly.',
    related: ['assignment-operators', 'numbers', 'comparison-operators'],
  },

  'assignment-operators': {
    title: 'Assignment Operators',
    intro: 'Assignment operators store values into variables. Compound operators (+=, -=, *=) fold an operation and an assignment into one step, and logical assignment operators (||=, &&=, ??=) assign only when a condition on the current value holds.',
    sections: [
      {
        heading: 'What Are Assignment Operators?',
        body: `
          <p><code class="code-inline">=</code> is the basic assignment operator: evaluate the right side, store it in the variable on the left. Compound operators like <code class="code-inline">+=</code> exist purely as shorthand — <code class="code-inline">score += 5</code> means exactly <code class="code-inline">score = score + 5</code>, just shorter and harder to typo.</p>
          <p>Logical assignment operators are newer (ES2021) and solve a specific, common pattern: "set this variable, but only if it doesn't already have a usable value."</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Compound and logical assignment side by side.</p>`,
        code: {
          label: 'assignment.js',
          code: `let score = 10;\nscore += 5; // score = score + 5 -> 15\n\nlet userConfig = { theme: null };\nuserConfig.theme ??= 'dark'; // only assigns because theme is null\nconsole.log(userConfig.theme); // 'dark'`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p>Compound operators read-modify-write: fetch the current value, apply the operator, write the result back — one expression, two memory operations. Logical assignment operators add a truth check before the write: <code class="code-inline">||=</code> assigns only if the current value is falsy, <code class="code-inline">&&=</code> only if it's truthy, and <code class="code-inline">??=</code> only if it's <code class="code-inline">null</code> or <code class="code-inline">undefined</code>. If the condition fails, the right-hand side is never even evaluated — this matters if it has side effects.</p>`,
        diagram: variableBindingDiagram(),
        diagramCaption: 'Assignment rebinds a variable to point at a new value.',
      },
      {
        heading: 'Production Example',
        body: `<p>Applying a default theme only when the user hasn't set one, and tracking a running cart total.</p>`,
        code: {
          label: 'user-settings.js',
          code: `function applyDefaultSettings(userSettings) {\n  userSettings.theme ??= 'light';       // only if null/undefined\n  userSettings.notifications ??= true;\n  return userSettings;\n}\n\nlet cartTotal = 0;\ncartTotal += 19.99; // add an item\ncartTotal += 8.5;   // add another`,
        },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A labeled storage box: = replaces what\'s inside; += opens the box, adds to what\'s there, and closes it again."',
      },
      {
        heading: 'Comparison',
        body: `
          <table class="table">
            <thead><tr><th>Operator</th><th>Assigns when...</th><th>Typical use</th></tr></thead>
            <tbody>
              <tr><td><code class="code-inline">||=</code></td><td>current value is falsy</td><td>fallback for any "empty" value (0, '', null...)</td></tr>
              <tr><td><code class="code-inline">&amp;&amp;=</code></td><td>current value is truthy</td><td>conditionally update only if something already exists</td></tr>
              <tr><td><code class="code-inline">??=</code></td><td>current value is null/undefined</td><td>safe defaults that shouldn't overwrite 0 or ''</td></tr>
            </tbody>
          </table>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's the difference between ||= and ??=?</strong></p>
              <p class="interview-a">||= assigns when the current value is falsy (0, '', false, etc. included); ??= assigns only when it's null or undefined, leaving other falsy values untouched.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Does a += b always evaluate a twice?</strong></p>
              <p class="interview-a">Conceptually it reads a once, computes the new value, and writes it back once — a single read-modify-write, not a re-evaluation of a as a separate expression each time.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Compound assignment is shorthand for read-modify-write; logical assignment operators add a truth check so the right-hand side only runs when it\'s actually needed.',
    related: ['arithmetic-operators', 'nullish-coalescing', 'let'],
  },

  'comparison-operators': {
    title: 'Comparison Operators',
    intro: 'Comparison operators (<, >, <=, >=) test the relative order of two values and always produce a boolean — true or false.',
    sections: [
      {
        heading: 'What Are Comparison Operators?',
        body: `
          <p>These operators exist to make decisions: is this cart total over the free-shipping threshold, is this user old enough, is this timestamp before that one? The result is always a boolean, which is exactly what an <code class="code-inline">if</code> statement or loop condition needs.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Comparing numbers and strings.</p>`,
        code: {
          label: 'comparison.js',
          code: `console.log(10 > 5);   // true\nconsole.log(10 <= 10); // true\nconsole.log('apple' < 'banana'); // true — alphabetical (lexicographic) order`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p>Numbers compare by value. Strings compare <em class="term">lexicographically</em> — character by character, by Unicode code point, the same idea as alphabetical order in a dictionary but strict about case (uppercase letters sort before lowercase). If the operands are different types, JavaScript coerces one side to a number before comparing — which is exactly where surprises creep in.</p>`,
      },
      {
        heading: 'Production Example',
        body: `<p>Gating free shipping and validating an age requirement.</p>`,
        code: {
          label: 'shipping.js',
          code: `function qualifiesForFreeShipping(cartTotal) {\n  return cartTotal >= 50;\n}\n\nfunction isEligibleForSignup(userAge) {\n  return userAge >= 13;\n}`,
        },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A number line judge: it only ever answers true or false about where two things sit relative to each other."',
      },
      {
        heading: 'Common Mistakes',
        body: `
          <ul class="list">
            <li><code class="code-inline">'10' &lt; '9'</code> is <code class="code-inline">true</code> — string comparison is character by character, not numeric, so <code class="code-inline">'1' &lt; '9'</code> wins before the rest is even read.</li>
            <li>Comparing dates as strings instead of converting to <code class="code-inline">Date</code> objects or timestamps first.</li>
          </ul>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why is '10' < '9' true?</strong></p>
              <p class="interview-a">String comparison is lexicographic (character by character) — '1' comes before '9', so the comparison resolves before the rest of the string is even considered.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Comparison operators always return a boolean; numbers compare by value, strings compare lexicographically, and mixed-type comparisons trigger coercion worth double-checking.',
    related: ['equality', 'type-coercion', 'if'],
  },

  'logical-operators': {
    title: 'Logical Operators',
    intro: 'Logical operators (&&, ||, !) combine or invert boolean conditions — and in JavaScript, && and || do something extra: they return one of their actual operands, not just true/false.',
    sections: [
      {
        heading: 'What Are Logical Operators?',
        body: `
          <p><code class="code-inline">&&</code> means "and," <code class="code-inline">||</code> means "or," <code class="code-inline">!</code> means "not." They exist to build compound conditions — "logged in AND has permission," "cached OR fetched fresh" — out of simpler ones.</p>
          <p>What makes JavaScript's version distinctive: <code class="code-inline">&&</code> and <code class="code-inline">||</code> are <em class="term">short-circuiting</em>. They stop evaluating as soon as the outcome is determined, and they return the actual operand value that decided the outcome, not a plain boolean.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Short-circuit evaluation returning a real value, not just true/false.</p>`,
        code: {
          label: 'logical.js',
          code: `const username = '' || 'Guest'; // 'Guest' — '' is falsy, so the right side is used\nconst isAdmin = true && 'Access granted'; // 'Access granted'\nconsole.log(!true); // false`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p>For <code class="code-inline">a && b</code>: if <code class="code-inline">a</code> is falsy, JavaScript never evaluates <code class="code-inline">b</code> at all — it just returns <code class="code-inline">a</code>. If <code class="code-inline">a</code> is truthy, it evaluates and returns <code class="code-inline">b</code>. <code class="code-inline">||</code> works the same way in reverse: return the left side if it's truthy, otherwise evaluate and return the right.</p>`,
        diagram: shortCircuitDiagram(),
        diagramCaption: 'Short-circuiting: the right operand is only evaluated when it needs to be.',
      },
      {
        heading: 'Production Example',
        body: `<p>Guarding a function call so it only runs when a callback actually exists — a very common real-world use of short-circuiting.</p>`,
        code: {
          label: 'notifications.js',
          code: `function notifyUser(onComplete) {\n  const taskFinished = true;\n  taskFinished && onComplete?.(); // only calls onComplete if it was provided\n}`,
        },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A bouncer checking a guest list in order — the moment one check fails (&&) or succeeds (||), it stops checking and gives its answer immediately."',
      },
      {
        heading: 'Best Practices',
        body: `
          <ul class="list">
            <li>Prefer <code class="code-inline">??</code> over <code class="code-inline">||</code> for defaults when <code class="code-inline">0</code>, <code class="code-inline">''</code>, or <code class="code-inline">false</code> are valid, meaningful values you don't want overwritten.</li>
            <li>Using <code class="code-inline">&&</code> for side effects (like the notification example) is idiomatic in small doses, but a real <code class="code-inline">if</code> is clearer once the logic grows past one line.</li>
          </ul>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What does true && 'hello' evaluate to, and why?</strong></p>
              <p class="interview-a">'hello' — && returns the second operand once the first is confirmed truthy, not a plain boolean.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why can short-circuiting matter beyond just readability?</strong></p>
              <p class="interview-a">The right-hand side is never evaluated if short-circuited — useful (and sometimes necessary) when that side has side effects or could throw, like accessing a property on something that might not exist.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: '&& and || short-circuit and return an actual operand, not just true/false — which makes them useful for defaults and conditional calls, but worth using deliberately.',
    related: ['nullish-coalescing', 'truthy-falsy', 'optional-chaining'],
  },

  'equality': {
    title: 'Equality',
    intro: 'The == (loose equality) operator compares two values for equality after converting them to a common type — which is exactly why it has a reputation for surprises.',
    sections: [
      {
        heading: 'What Is Loose Equality?',
        body: `
          <p><code class="code-inline">==</code> exists from JavaScript's earliest days, when automatic type conversion was seen as a convenience: compare a string typed into a form to a number without writing the conversion yourself. In practice, its coercion rules are complicated enough that most style guides now recommend avoiding it in favor of <code class="code-inline">===</code>.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Loose equality coercing types before comparing.</p>`,
        code: {
          label: 'equality.js',
          code: `console.log(5 == '5');   // true — string coerced to number\nconsole.log(0 == false); // true — boolean coerced to number\nconsole.log(null == undefined); // true — a special-cased pair\nconsole.log('' == 0);    // true — both coerce toward 0`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p>When the operand types differ, <code class="code-inline">==</code> follows a specific conversion algorithm from the ECMAScript spec: booleans convert to numbers, numbers and strings convert toward numbers, and <code class="code-inline">null</code>/<code class="code-inline">undefined</code> are equal only to each other and to nothing else. The rules are consistent, but they're not intuitive to memorize, which is the real complaint against <code class="code-inline">==</code>.</p>`,
        diagram: typeCoercionDiagram(),
        diagramCaption: 'Loose equality silently converts types before comparing them.',
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A translator who insists on converting everyone to the same language before comparing what they said — helpful in theory, but the translation rules aren\'t always what you\'d guess."',
      },
      {
        heading: 'Common Mistakes & Best Practice',
        body: `
          <ul class="list">
            <li><code class="code-inline">[] == false</code> is <code class="code-inline">true</code> — arrays coerce to strings, then to numbers, landing on 0.</li>
            <li><strong>Best practice:</strong> default to <code class="code-inline">===</code> everywhere. The one accepted exception some style guides allow is <code class="code-inline">value == null</code>, which cleanly checks for both <code class="code-inline">null</code> and <code class="code-inline">undefined</code> in one comparison.</li>
          </ul>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Is there any case where == is still considered acceptable style?</strong></p>
              <p class="interview-a">value == null is a common accepted exception — it checks for both null and undefined in a single comparison.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why is [] == false true?</strong></p>
              <p class="interview-a">Arrays coerce to a string ('' for an empty array), which then coerces to a number (0), which equals the coerced false (also 0) — two coercion steps compounding into a surprising result.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: '== compares after coercing operands to a common type, following spec rules that are consistent but easy to misjudge — which is why === is the default choice in modern code.',
    related: ['strict-equality', 'type-coercion', 'null'],
  },

  'strict-equality': {
    title: 'Strict Equality',
    intro: 'The === operator compares two values for equality without any type conversion — if the types differ, the result is immediately false, no exceptions.',
    sections: [
      {
        heading: 'What Is Strict Equality?',
        body: `
          <p><code class="code-inline">===</code> answers a simpler question than <code class="code-inline">==</code>: "are these the same type AND the same value?" No coercion, no spec-defined conversion table to memorize — which is exactly why it's the recommended default for comparisons in JavaScript.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Strict equality refusing to coerce types.</p>`,
        code: {
          label: 'strict-equality.js',
          code: `console.log(5 === '5');  // false — different types\nconsole.log(5 === 5);    // true\nconsole.log(null === undefined); // false — strict about type, unlike ==`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p>The engine first checks whether the two operands share the same type. If not, it returns <code class="code-inline">false</code> immediately — no conversion happens. If the types match, it compares the actual values directly (with one well-known quirk: <code class="code-inline">NaN === NaN</code> is <code class="code-inline">false</code>, because <code class="code-inline">NaN</code> is defined as never equal to anything, including itself).</p>`,
      },
      {
        heading: 'Production Example',
        body: `<p>Checking a specific status value — the kind of comparison that appears constantly in real applications.</p>`,
        code: {
          label: 'order-status.js',
          code: `function isOrderShipped(orderStatus) {\n  return orderStatus === 'shipped';\n}\n\n// Checking for NaN correctly, since NaN === NaN is false:\nfunction isValidQuantity(quantity) {\n  return !Number.isNaN(quantity) && quantity > 0;\n}`,
        },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A strict border agent: same passport type AND same details, or you\'re turned away — no attempt to guess what you \'probably\' meant."',
      },
      {
        heading: 'Comparison: == vs ===',
        body: `
          <table class="table">
            <thead><tr><th></th><th>==</th><th>===</th></tr></thead>
            <tbody>
              <tr><td>Type conversion</td><td>Yes</td><td>No</td></tr>
              <tr><td>5 vs '5'</td><td>true</td><td>false</td></tr>
              <tr><td>Recommended default</td><td>No</td><td>Yes</td></tr>
            </tbody>
          </table>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why is NaN === NaN false?</strong></p>
              <p class="interview-a">NaN is spec-defined to never equal anything, including itself — use Number.isNaN() to actually test for it.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Does === ever coerce types?</strong></p>
              <p class="interview-a">Never — if the operand types differ, it returns false immediately without any conversion.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: '=== compares type and value with no coercion, which makes results predictable — it\'s the default comparison operator in modern JavaScript.',
    related: ['equality', 'type-coercion', 'numbers'],
  },

  'type-coercion': {
    title: 'Type Coercion',
    intro: 'Type coercion is JavaScript automatically converting a value from one type to another — a string to a number, an object to a boolean — usually because an operator or context demands a specific type.',
    sections: [
      {
        heading: 'What Is Type Coercion?',
        body: `
          <p>JavaScript is a <em class="term">dynamically typed</em> language: a variable can hold any type, and operators will convert operands as needed to make an operation possible, rather than throwing an error. This exists so expressions like <code class="code-inline">"Score: " + 5</code> just work without a manual conversion step — a deliberate ease-of-use tradeoff.</p>
          <p>Coercion happens in two flavors: <em class="term">implicit</em> (the engine does it silently, e.g. inside <code class="code-inline">+</code> or an <code class="code-inline">if</code>) and <em class="term">explicit</em> (you request it, e.g. <code class="code-inline">Number(value)</code> or <code class="code-inline">String(value)</code>).</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Implicit vs. explicit coercion side by side.</p>`,
        code: {
          label: 'coercion.js',
          code: `// Implicit\nconsole.log('5' + 3);   // '53' — + prefers string concatenation\nconsole.log('5' - 3);   // 2   — - only makes sense numerically, so it coerces\n\n// Explicit\nconsole.log(Number('5')); // 5\nconsole.log(String(5));   // '5'\nconsole.log(Boolean(''));  // false`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p><code class="code-inline">+</code> is the odd one out: if either operand is a string, it concatenates. Every other arithmetic operator (<code class="code-inline">- * / %</code>) only makes sense for numbers, so they always coerce both sides toward numbers. Boolean contexts (like an <code class="code-inline">if</code> condition) coerce using the truthy/falsy rules instead.</p>`,
        diagram: typeCoercionDiagram(),
        diagramCaption: 'Values move between types through explicit conversion functions or implicit operator rules.',
      },
      {
        heading: 'Production Example',
        body: `<p>Reading a numeric value out of a URL query string or form input, where everything arrives as text.</p>`,
        code: {
          label: 'parse-input.js',
          code: `function parsePageNumber(queryParam) {\n  const page = Number(queryParam);\n  return Number.isNaN(page) || page < 1 ? 1 : page;\n}\n\nparsePageNumber('3');    // 3\nparsePageNumber('abc');  // 1 (falls back safely)`,
        },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A universal adapter plug: JavaScript tries to make whatever value you hand it fit the socket the operator expects, following a fixed set of adapter rules."',
      },
      {
        heading: 'Common Mistakes & Best Practices',
        body: `
          <ul class="list">
            <li><code class="code-inline">[] + []</code> is <code class="code-inline">''</code> and <code class="code-inline">[] + {}</code> is <code class="code-inline">'[object Object]'</code> — both coerce to strings before concatenating, which rarely matches intent.</li>
            <li><strong>Best practice:</strong> coerce explicitly (<code class="code-inline">Number()</code>, <code class="code-inline">String()</code>, <code class="code-inline">Boolean()</code>) at input boundaries instead of relying on an operator to do it implicitly mid-expression.</li>
          </ul>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why does '5' + 3 give '53' but '5' - 3 give 2?</strong></p>
              <p class="interview-a">+ prefers string concatenation when either operand is a string; every other arithmetic operator only makes sense numerically, so it coerces both sides toward numbers instead.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's the difference between implicit and explicit coercion?</strong></p>
              <p class="interview-a">Implicit coercion happens silently as a side effect of an operator (like +); explicit coercion is a deliberate call like Number(value) or String(value).</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Coercion converts values between types automatically for operators, and explicitly via Number()/String()/Boolean() — explicit conversion at input boundaries avoids most of the surprises.',
    related: ['equality', 'truthy-falsy', 'strings'],
  },

  'truthy-falsy': {
    title: 'Truthy and Falsy Values',
    intro: 'Every value in JavaScript is either "truthy" or "falsy" when used where a boolean is expected — and there are exactly eight falsy values, everything else is truthy.',
    sections: [
      {
        heading: 'What Are Truthy and Falsy Values?',
        body: `
          <p>Conditions in <code class="code-inline">if</code>, <code class="code-inline">while</code>, and logical operators don't require an actual boolean — they coerce whatever they're given into one. This exists so you can write <code class="code-inline">if (user)</code> instead of <code class="code-inline">if (user !== null &amp;&amp; user !== undefined)</code>.</p>
          <p>The falsy values are a short, memorizable list: <code class="code-inline">false, 0, -0, 0n, '', null, undefined, NaN</code>. Everything else — including <code class="code-inline">'0'</code> the string, empty arrays <code class="code-inline">[]</code>, and empty objects <code class="code-inline">{}</code> — is truthy.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>The full falsy list, and a couple of common surprises.</p>`,
        code: {
          label: 'truthy-falsy.js',
          code: `if (0) console.log('never runs');\nif ('0') console.log('this runs — non-empty string is truthy');\nif ([]) console.log('this runs — even an empty array is truthy');`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p>When a value appears where a boolean is required, the engine runs it through the abstract <code class="code-inline">ToBoolean</code> operation from the spec — a lookup, not a calculation. It checks whether the value matches one of the eight falsy cases; if not, the result is <code class="code-inline">true</code>.</p>`,
      },
      {
        heading: 'Production Example',
        body: `<p>Guarding against missing or empty data before rendering it.</p>`,
        code: {
          label: 'render-cart.js',
          code: `function renderCartSummary(items) {\n  if (!items || items.length === 0) {\n    return 'Your cart is empty.';\n  }\n  return \`\${items.length} item(s) in your cart.\`;\n}`,
        },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A short blocklist, not a checklist: JavaScript only treats eight specific values as \'off\' — everything else defaults to \'on.\'"',
      },
      {
        heading: 'Common Mistakes',
        body: `
          <ul class="list">
            <li>Assuming empty arrays/objects are falsy — they aren't; check <code class="code-inline">.length</code> or <code class="code-inline">Object.keys().length</code> explicitly.</li>
            <li>Using <code class="code-inline">if (count)</code> to check "has a value" when <code class="code-inline">0</code> is a valid, meaningful count — that condition silently treats 0 as missing.</li>
          </ul>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Name all eight falsy values.</strong></p>
              <p class="interview-a">false, 0, -0, 0n, '', null, undefined, and NaN — every other value, including [] and {}, is truthy.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why is if (count) risky when count could be 0?</strong></p>
              <p class="interview-a">It silently treats a real, meaningful 0 the same as missing data — use an explicit check like count !== undefined when 0 is valid.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'Only eight values are falsy (false, 0, -0, 0n, "", null, undefined, NaN); everything else, including [] and {}, is truthy — worth checking explicitly when 0 or "" are meaningful data.',
    related: ['type-coercion', 'logical-operators', 'if'],
  },

  'nullish-coalescing': {
    title: 'Nullish Coalescing',
    intro: 'The ?? operator returns its right-hand side only when the left side is null or undefined — unlike ||, it leaves 0, "", and false alone.',
    sections: [
      {
        heading: 'What Is Nullish Coalescing?',
        body: `
          <p>Introduced in ES2020, <code class="code-inline">??</code> exists to fix a specific, common bug: using <code class="code-inline">||</code> for default values also overrides legitimate falsy data like <code class="code-inline">0</code> quantity or an empty string. <code class="code-inline">??</code> checks for exactly two things — <code class="code-inline">null</code> and <code class="code-inline">undefined</code> — and nothing else.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>?? preserving 0 where || would have overwritten it.</p>`,
        code: {
          label: 'nullish.js',
          code: `let stock = 0;\nconsole.log(stock || 10); // 10 — WRONG, 0 was a real value\nconsole.log(stock ?? 10); // 0  — correct, 0 is not nullish`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p><code class="code-inline">a ?? b</code> checks only whether <code class="code-inline">a</code> is strictly <code class="code-inline">null</code> or <code class="code-inline">undefined</code>. If so, it evaluates and returns <code class="code-inline">b</code>; otherwise it returns <code class="code-inline">a</code> as-is, whatever falsy-but-meaningful value it might be. Like <code class="code-inline">&&</code> and <code class="code-inline">||</code>, it short-circuits — the right side is never evaluated unless needed.</p>`,
        diagram: shortCircuitDiagram(),
        diagramCaption: '?? follows the same short-circuit shape as && and ||, testing for null/undefined specifically.',
      },
      {
        heading: 'Production Example',
        body: `<p>Applying configuration defaults without clobbering intentional zero or empty-string values.</p>`,
        code: {
          label: 'config-defaults.js',
          code: `function createPagination(options) {\n  const pageSize = options.pageSize ?? 20;\n  const offset = options.offset ?? 0; // stays 0, not forced to a default\n  return { pageSize, offset };\n}`,
        },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A form that only asks \'is this field literally blank?\' — not \'is this field falsy in general.\'"',
      },
      {
        heading: 'Best Practice',
        body: `<p>Reach for <code class="code-inline">??</code> whenever a default is meant to fill in genuinely missing data, and reserve <code class="code-inline">||</code> for cases where every falsy value really should be treated the same.</p>`,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why would you choose ?? over || for a default value?</strong></p>
              <p class="interview-a">?? only falls back on null/undefined, so meaningful falsy values like 0, '', or false pass through untouched — || would incorrectly override them.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: '?? only treats null and undefined as "missing" — the safer choice for defaults whenever 0, "", or false could be legitimate values.',
    related: ['logical-operators', 'optional-chaining', 'truthy-falsy'],
  },

  'optional-chaining': {
    title: 'Optional Chaining',
    intro: 'The ?. operator safely accesses a nested property or calls a method, short-circuiting to undefined instead of throwing if anything along the way is null or undefined.',
    sections: [
      {
        heading: 'What Is Optional Chaining?',
        body: `
          <p>Before ES2020, reading a deeply nested property required chained manual checks: <code class="code-inline">user &amp;&amp; user.address &amp;&amp; user.address.city</code>. <code class="code-inline">?.</code> exists to replace that boilerplate with one readable expression, for the very common case of optional or not-yet-loaded data.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Safe access into a possibly-missing nested object.</p>`,
        code: {
          label: 'optional-chaining.js',
          code: `const user = { profile: null };\nconsole.log(user.profile?.email); // undefined, no error\nconsole.log(user.profile.email);  // TypeError: Cannot read properties of null`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p>At each <code class="code-inline">?.</code> link in the chain, the engine checks whether the value so far is <code class="code-inline">null</code> or <code class="code-inline">undefined</code>. If so, it stops immediately and the whole expression evaluates to <code class="code-inline">undefined</code> — no error thrown, and nothing further in the chain is evaluated. It also works for method calls (<code class="code-inline">obj.method?.()</code>) and array/bracket access (<code class="code-inline">obj?.[key]</code>).</p>`,
      },
      {
        heading: 'Production Example',
        body: `<p>Reading a possibly-missing nested field from an API response, and safely calling an optional callback.</p>`,
        code: {
          label: 'api-response.js',
          code: `function getShippingCity(apiResponse) {\n  return apiResponse?.order?.shippingAddress?.city ?? 'Unknown';\n}\n\nfunction runCallback(options) {\n  options.onSuccess?.(); // calls it only if it exists\n}`,
        },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A hiker checking each stepping stone before putting weight on it — the moment one is missing, they stop and report \'no path,\' instead of falling through."',
      },
      {
        heading: 'Common Mistakes',
        body: `
          <ul class="list">
            <li>Overusing <code class="code-inline">?.</code> everywhere can mask real bugs — if a property should always exist, a missing value is worth an error, not a silent <code class="code-inline">undefined</code>.</li>
            <li>Pairing it with <code class="code-inline">??</code> (as in the API example) is the idiomatic way to get a safe access <em>and</em> a sensible fallback in one line.</li>
          </ul>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What does user?.profile?.email evaluate to if user.profile is null?</strong></p>
              <p class="interview-a">undefined — the chain stops the moment it hits a null/undefined link, without throwing.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Can optional chaining be used with method calls?</strong></p>
              <p class="interview-a">Yes — obj.method?.() calls the method only if it exists, otherwise evaluates to undefined instead of throwing a TypeError.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: '?. stops and returns undefined the moment it hits null/undefined in a chain, replacing manual guard checks — pair it with ?? for a clean default.',
    related: ['nullish-coalescing', 'object-references', 'properties'],
  },

  'ternary-operator': {
    title: 'Ternary Operator',
    intro: 'The ternary operator (condition ? valueIfTrue : valueIfFalse) is a compact if/else that produces a value directly, making it useful anywhere an expression — not a statement — is needed.',
    sections: [
      {
        heading: 'What Is the Ternary Operator?',
        body: `
          <p>It's the only operator in JavaScript that takes three operands, hence "ternary." It exists because <code class="code-inline">if/else</code> is a <em class="term">statement</em> — it can't be embedded inside another expression, like a template literal or a function argument — while the ternary operator evaluates to a value that can be used inline.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>A one-line conditional value.</p>`,
        code: {
          label: 'ternary.js',
          code: `const age = 20;\nconst message = age >= 18 ? 'Adult' : 'Minor';\nconsole.log(message); // 'Adult'`,
        },
      },
      {
        heading: 'How It Works',
        body: `<p>The engine evaluates the condition before the <code class="code-inline">?</code>. If truthy, the expression between <code class="code-inline">?</code> and <code class="code-inline">:</code> is evaluated and becomes the result; otherwise the expression after <code class="code-inline">:</code> is evaluated instead. Only one branch ever runs — same short-circuit behavior as <code class="code-inline">if/else</code>, just expressed as a value.</p>`,
      },
      {
        heading: 'Production Example',
        body: `<p>Inline conditional rendering text and a conditional style class — two places a statement wouldn't fit.</p>`,
        code: {
          label: 'ui-helpers.js',
          code: `function getStockLabel(quantity) {\n  return quantity > 0 ? \`\${quantity} in stock\` : 'Out of stock';\n}\n\nconst buttonClass = isSubmitting ? 'button--disabled' : 'button--active';`,
        },
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A fork in the road collapsed into a single sign that just tells you which path\'s destination to use as the answer."',
      },
      {
        heading: 'Best Practices',
        body: `
          <ul class="list">
            <li>Great for a single, simple value decision. Once branches get nested or a branch runs multiple statements, switch back to <code class="code-inline">if/else</code> for readability.</li>
            <li>Avoid chaining/nesting ternaries (<code class="code-inline">a ? b : c ? d : e</code>) — it reads poorly at a glance; a small lookup object or <code class="code-inline">if/else</code> chain is usually clearer.</li>
          </ul>
        `,
      },
    
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Why can't if/else be used inside a template literal or function argument?</strong></p>
              <p class="interview-a">if/else is a statement, not an expression — it doesn't produce a value. The ternary operator does, which is why it fits in those spots.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What's the readability guideline for nested ternaries?</strong></p>
              <p class="interview-a">Avoid them — chained ternaries (a ? b : c ? d : e) are hard to scan; prefer if/else or a lookup structure once there's more than one decision.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'The ternary operator is if/else as an expression — ideal for a single inline value decision, best avoided for nested or multi-statement logic.',
    related: ['if', 'else', 'logical-operators'],
  },

  // ---------------------------------------------------------------
  // CHAPTER V: Control Flow
  // ---------------------------------------------------------------

  'if': {
    title: 'The if Statement',
    intro: 'The if statement is how JavaScript makes decisions — it runs a block of code only when a condition is true, and skips it otherwise.',
    sections: [
      {
        heading: 'What Is the if Statement?',
        body: `
          <p>An <code class="code-inline">if</code> statement is a <em class="term">control-flow statement</em> — a piece of syntax that changes the order in which code runs, instead of letting it execute strictly top to bottom. It takes a <em class="term">condition</em> — an expression in parentheses — and runs the block that follows only when that condition is <em class="term">truthy</em> (a value JavaScript treats as true when it needs a boolean).</p>
          <p>Almost every program needs this. Without it, code could only ever do the same fixed sequence of steps regardless of input — an <code class="code-inline">if</code> lets the program react to data instead of ignoring it.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>A block that only logs when a score clears a threshold.</p>`,
        code: {
          label: 'if.js',
          code: `const score = 85;\\n\\nif (score >= 60) {\\n  console.log(\"Passed exam!\");\\n}`,
        },
        after: `<p>If <code class="code-inline">score</code> had been 40, the condition <code class="code-inline">40 >= 60</code> would evaluate to <code class="code-inline">false</code>, and the block would simply be skipped — nothing would print, and no error would occur.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>The engine evaluates the expression inside the parentheses first, on its own, before looking at the block at all. That value — whatever it is — is then coerced to a boolean using the same rules as <a href="#truthy-falsy">truthy/falsy</a> conversion. Only a truthy result lets the block run.</p>`,
        diagram: `
          <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect x="20" y="70" width="150" height="56" rx="2" fill="#F7FAFC" stroke="#315F86" stroke-width="1.3"/>
            <text x="95" y="103" text-anchor="middle" font-size="12.5" fill="#20262D" font-family="'JetBrains Mono',monospace">Evaluate condition</text>
            <polygon points="260,60 360,98 260,136 160,98" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="260" y="102" text-anchor="middle" font-size="12" fill="#20262D" font-family="'JetBrains Mono',monospace">truthy?</text>
            <rect x="420" y="20" width="170" height="50" rx="2" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="505" y="50" text-anchor="middle" font-size="12.5" fill="#20262D" font-family="'JetBrains Mono',monospace">Run the block</text>
            <rect x="420" y="126" width="170" height="50" rx="2" fill="none" stroke="#8FA6B8" stroke-width="1.3"/>
            <text x="505" y="156" text-anchor="middle" font-size="12.5" fill="#20262D" font-family="'JetBrains Mono',monospace">Skip the block</text>
            <defs><marker id="ifarr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#315F86"/></marker></defs>
            <line x1="170" y1="98" x2="255" y2="98" stroke="#315F86" stroke-width="1.3" marker-end="url(#ifarr)"/>
            <line x1="345" y1="80" x2="418" y2="50" stroke="#315F86" stroke-width="1.3" marker-end="url(#ifarr)"/>
            <text x="365" y="60" font-size="10.5" fill="#6B6D69">yes</text>
            <line x1="345" y1="116" x2="418" y2="150" stroke="#8FA6B8" stroke-width="1.3" marker-end="url(#ifarr)"/>
            <text x="365" y="140" font-size="10.5" fill="#6B6D69">no</text>
          </svg>
        `,
        diagramCaption: 'The condition is always resolved to true or false before the engine decides whether to enter the block.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'The engine evaluates the expression inside the if parentheses.',
          'The result is converted to a boolean using truthy/falsy rules if it wasn\'t one already.',
          'If the result is true, the block runs top to bottom.',
          'If the result is false, the block is skipped entirely — execution resumes at the first statement after it.',
        ],
      },
      {
        heading: 'Common Mistakes & Edge Cases',
        body: `
          <p><strong>Assignment instead of comparison.</strong> Writing <code class="code-inline">if (x = 5)</code> assigns 5 to <code class="code-inline">x</code> and then checks whether 5 is truthy — it is, so the block always runs, silently overwriting <code class="code-inline">x</code>. Use <code class="code-inline">===</code> for comparisons.</p>
          <p><strong>Omitting braces.</strong> <code class="code-inline">if (x) doThing();</code> is legal — the block can be a single statement without braces — but adding a second line without braces means only the first line is conditional, a common source of bugs when code is edited later. Most style guides require braces for exactly this reason.</p>
          <p class="note"><strong>Note:</strong> An <code class="code-inline">if</code> is a statement, not an expression — it produces no value and cannot be used inside a template literal or as a function argument. The <a href="#ternary-operator">ternary operator</a> exists for that case.</p>
        `,
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A locked door that only opens for a truthy key."',
        body: `<p>The engine tries the condition like a key in a lock. If it fits (truthy), the door opens and the block runs. If it doesn't, the door stays shut and execution walks straight past it.</p>`,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Does an if block create a new scope?</strong></p>
              <p class="interview-a">Yes for let/const — they're block-scoped to the {} — but var declared inside still attaches to the nearest function or global scope, ignoring the block.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What counts as falsy in an if condition?</strong></p>
              <p class="interview-a">false, 0, -0, 0n, "", null, undefined, and NaN — everything else, including "0" and [], is truthy.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'if evaluates a condition once, coerces it to a boolean, and runs its block only when that result is true — everything else in conditional logic builds on this one behavior.',
    related: ['else', 'else-if', 'truthy-falsy'],
  },

  'else': {
    title: 'The else Statement',
    intro: 'else attaches a fallback block to an if statement, so exactly one of the two paths always runs — never both, never neither.',
    sections: [
      {
        heading: 'What Is the else Statement?',
        body: `
          <p><code class="code-inline">else</code> can only appear directly after an <code class="code-inline">if</code> block (or another <code class="code-inline">else if</code>). It defines what should happen when the preceding condition was <em class="term">falsy</em> — a value JavaScript treats as false. Together, <code class="code-inline">if</code>/<code class="code-inline">else</code> guarantee that one of the two branches executes, covering every possible outcome of the condition.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Two mutually exclusive outcomes based on the time of day.</p>`,
        code: {
          label: 'else.js',
          code: `const hour = 14;\\n\\nif (hour < 12) {\\n  console.log(\"Good morning\");\\n} else {\\n  console.log(\"Good afternoon\");\\n}`,
        },
        after: `<p><code class="code-inline">14 < 12</code> is false, so the engine never even looks inside the if block — it jumps straight to else and logs "Good afternoon".</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>The engine checks the if condition exactly once. A falsy result means the if block is skipped and the attached else block runs automatically — there's no separate condition to check for else itself, which is what makes the two branches mutually exclusive.</p>`,
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Evaluate the if condition.',
          'If truthy, run the if block and skip else entirely.',
          'If falsy, skip the if block and run the else block instead.',
          'Continue with whatever code follows the whole if/else structure.',
        ],
      },
      {
        heading: 'Common Mistakes & Edge Cases',
        body: `
          <p><strong>else is optional</strong> — an if with no else simply does nothing on a falsy condition, rather than being an error. Add else only when there's a genuine alternative action to take.</p>
          <p class="warning"><strong>Warning:</strong> An else can only attach to the if (or else if) immediately before it, syntactically. A stray else with no matching if is a SyntaxError.</p>
        `,
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A fork with exactly two roads — you always end up on one."',
        body: `<p>Unlike a plain if, which leaves a gap when the condition is false, if/else guarantees you land somewhere: one path is always taken, the other is always skipped.</p>`,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Can if/else be replaced by a ternary here?</strong></p>
              <p class="interview-a">For a single value, yes: const greeting = hour < 12 ? "Good morning" : "Good afternoon" — but if/else stays clearer once either branch needs more than one statement.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'else runs precisely when the preceding if condition was false, making the pair exhaustive: one branch always executes, the other never does.',
    related: ['if', 'else-if', 'ternary-operator'],
  },

  'else-if': {
    title: 'The else if Statement',
    intro: 'else if chains multiple conditions together so they\'re tested in order, stopping at the first one that matches.',
    sections: [
      {
        heading: 'What Is else if?',
        body: `
          <p><code class="code-inline">else if</code> is not a separate keyword — it's an <code class="code-inline">else</code> block whose body is itself a new <code class="code-inline">if</code> statement. Chaining several of them lets a program test conditions in sequence and pick the first branch that matches, which is how most multi-way decisions in JavaScript are written.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Grading a score against three ranges.</p>`,
        code: {
          label: 'else-if.js',
          code: `const grade = 75;\\n\\nif (grade >= 90) {\\n  console.log(\"A\");\\n} else if (grade >= 75) {\\n  console.log(\"B\");\\n} else {\\n  console.log(\"C\");\\n}`,
        },
        after: `<p><code class="code-inline">75 >= 90</code> is false, so the engine moves to the next check: <code class="code-inline">75 >= 75</code> is true, so it logs "B" and never evaluates the final else at all.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Conditions are tested strictly top to bottom. The moment one is truthy, its block runs and every remaining condition — even ones that would also be true — is skipped entirely. Order therefore matters: putting a broader condition before a narrower one can silently shadow it.</p>`,
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Evaluate the first if condition; run its block and stop here if truthy.',
          'Otherwise, evaluate the next else if condition in order.',
          'Repeat for each else if in the chain.',
          'If none matched, run the final else block (if one exists).',
        ],
      },
      {
        heading: 'Common Mistakes & Edge Cases',
        body: `
          <p><strong>Ordering bugs.</strong> if (grade >= 75) checked before if (grade >= 90) would classify a 95 as "B", because the first truthy match wins. Order ranges from most specific to least specific.</p>
          <p><strong>Long chains get hard to read.</strong> Beyond three or four branches on the same variable, a <a href="#switch">switch</a> statement or a lookup object is usually clearer.</p>
        `,
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A triage line — the first matching category wins, and no one is checked twice."',
        body: `<p>Think of patients sorted by the first rule they satisfy, most urgent first. Once sorted into a category, they don't get re-evaluated against the rest of the list.</p>`,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Does else if re-check earlier conditions?</strong></p>
              <p class="interview-a">No — once a branch matches, the whole chain exits immediately; later conditions aren't evaluated at all, even if they'd also be true.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'else if chains are evaluated top to bottom, and the first truthy condition wins — so branch order, from most to least specific, decides the outcome.',
    related: ['if', 'else', 'switch'],
  },

  'switch': {
    title: 'The switch Statement',
    intro: 'switch compares one value against several possible matches, running the code attached to whichever case fits — a cleaner shape than a long else if chain for that specific pattern.',
    sections: [
      {
        heading: 'What Is the switch Statement?',
        body: `
          <p><code class="code-inline">switch</code> evaluates a single expression once, then compares the result against each <code class="code-inline">case</code> value using <em class="term">strict equality</em> (<code class="code-inline">===</code> — no type coercion). The first matching case is where execution begins, and a <code class="code-inline">default</code> clause acts as the fallback when nothing matches, similar to a final <code class="code-inline">else</code>.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Routing behavior based on an HTTP status code.</p>`,
        code: {
          label: 'switch.js',
          code: `const status = 200;\\n\\nswitch (status) {\\n  case 200:\\n    console.log(\"OK\");\\n    break;\\n  case 404:\\n    console.log(\"Not Found\");\\n    break;\\n  default:\\n    console.log(\"Unknown Status\");\\n}`,
        },
        after: `<p>200 strictly equals the first case, so "OK" logs. The break immediately after stops execution from continuing into the 404 case below it.</p>`,
      },
      {
        heading: 'How It Works — Fall-Through',
        body: `
          <p>Once a case matches, execution doesn't stop at the end of that case's block automatically — it keeps running into the <em>next</em> case, and the next, until it hits a <code class="code-inline">break</code> or reaches the end of the switch. This is called <em class="term">fall-through</em>, and it's a deliberate ECMAScript design, not a bug: it lets multiple case labels share one block.</p>
        `,
        code: {
          label: 'fall-through.js',
          code: `switch (\"b\") {\\n  case \"a\":\\n  case \"b\":\\n    console.log(\"a or b\");\\n    break;\\n  case \"c\":\\n    console.log(\"c\");\\n}\\n// logs: \"a or b\"`,
        },
        after: `<p>Both "a" and "b" share the same block because there's no code — and no break — between the two case labels, so matching "b" falls straight through to the shared statement.</p>`,
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Evaluate the switch expression exactly once.',
          'Compare the result against each case value with ===, top to bottom.',
          'On a match, start executing statements from that case onward.',
          'Continue executing through subsequent cases until a break, return, or the end of the switch.',
          'If nothing matched, run the default block if one exists.',
        ],
      },
      {
        heading: 'Common Mistakes & Edge Cases',
        body: `
          <p class="warning"><strong>Warning:</strong> Forgetting break is the single most common switch bug — it causes every case after the matched one to run too, silently.</p>
          <p><strong>Strict comparison only.</strong> switch (\"1\") will not match case 1 — the string "1" and the number 1 are not === equal, unlike the loose comparisons a chain of if statements might accidentally allow.</p>
          <p><strong>default doesn't have to be last.</strong> It can appear anywhere in the switch and still only runs when no case matched, though placing it last is the near-universal convention for readability.</p>
        `,
      },
      {
        heading: 'Mental Model',
        mentalModel: '"A railway switchboard routing a train onto a track — and the train keeps rolling past the next signal unless something stops it."',
        body: `<p>The value picks which track to enter; break is the signal that stops the train there instead of letting it roll into whatever track comes next.</p>`,
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Is switch faster than an if/else chain?</strong></p>
              <p class="interview-a">Engines can sometimes optimize a switch into a jump table, but the honest reason to prefer it is readability for many discrete values on one variable, not guaranteed performance.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Does switch use == or ===?</strong></p>
              <p class="interview-a">Strict equality (===) — per the ECMAScript spec's Strict Equality Comparison algorithm, with no type coercion between the switch expression and case values.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'switch matches one value against several case labels with strict equality, and falls through to later cases unless a break stops it — a shape best suited to comparing a single variable against many discrete values.',
    related: ['else-if', 'break'],
  },

  'for': {
    title: 'The for Loop',
    intro: 'The for loop repeats a block a set number of times, packing the counter\'s setup, condition, and update into one line so the whole loop\'s behavior is visible at a glance.',
    sections: [
      {
        heading: 'What Is the for Loop?',
        body: `
          <p>A <code class="code-inline">for</code> loop has three parts inside its parentheses, separated by semicolons: an <em class="term">initialization</em> (runs once, before anything else), a <em class="term">condition</em> (checked before every iteration), and an <em class="term">update</em> (runs after every iteration). It's the standard choice whenever the number of repetitions — or a counter driving them — is known in advance.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Counting from 0 to 2.</p>`,
        code: {
          label: 'for.js',
          code: `for (let i = 0; i < 3; i++) {\\n  console.log(\"Iteration:\", i);\\n}\\n// 0, 1, 2`,
        },
        after: `<p>i is created once, checked before each pass, and incremented after each pass — the loop stops the moment i reaches 3, since 3 < 3 is false.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Each of the three clauses runs at a specific, fixed moment: initialization exactly once at the very start, the condition before every single iteration including the first, and the update after every iteration's body finishes but before the condition is checked again.</p>`,
        diagram: `
          <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect x="20" y="70" width="120" height="50" rx="2" fill="#F7FAFC" stroke="#315F86" stroke-width="1.3"/>
            <text x="80" y="99" text-anchor="middle" font-size="11.5" fill="#20262D" font-family="'JetBrains Mono',monospace">let i = 0</text>
            <polygon points="230,55 320,95 230,135 140,95" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="230" y="99" text-anchor="middle" font-size="11" fill="#20262D" font-family="'JetBrains Mono',monospace">i &lt; 3?</text>
            <rect x="400" y="20" width="130" height="46" rx="2" fill="none" stroke="#315F86" stroke-width="1.3"/>
            <text x="465" y="47" text-anchor="middle" font-size="11.5" fill="#20262D" font-family="'JetBrains Mono',monospace">Run body</text>
            <rect x="400" y="120" width="130" height="46" rx="2" fill="#F7FAFC" stroke="#315F86" stroke-width="1.3"/>
            <text x="465" y="147" text-anchor="middle" font-size="11.5" fill="#20262D" font-family="'JetBrains Mono',monospace">i++</text>
            <rect x="560" y="150" width="60" height="30" rx="2" fill="none" stroke="#8FA6B8" stroke-width="1.3"/>
            <text x="590" y="170" text-anchor="middle" font-size="10.5" fill="#20262D" font-family="'JetBrains Mono',monospace">exit</text>
            <defs><marker id="forarr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#315F86"/></marker></defs>
            <line x1="140" y1="95" x2="225" y2="95" stroke="#315F86" stroke-width="1.3" marker-end="url(#forarr)"/>
            <line x1="310" y1="80" x2="398" y2="45" stroke="#315F86" stroke-width="1.3" marker-end="url(#forarr)"/>
            <text x="330" y="55" font-size="10" fill="#6B6D69">yes</text>
            <line x1="465" y1="66" x2="465" y2="118" stroke="#315F86" stroke-width="1.3" marker-end="url(#forarr)"/>
            <path d="M400,143 C280,143 280,95 228,95" fill="none" stroke="#315F86" stroke-width="1.3" marker-end="url(#forarr)"/>
            <line x1="315" y1="112" x2="558" y2="163" stroke="#8FA6B8" stroke-width="1.3" marker-end="url(#forarr)"/>
            <text x="330" y="130" font-size="10" fill="#6B6D69">no</text>
          </svg>
        `,
        diagramCaption: 'Initialization runs once; condition and update repeat every cycle until the condition fails.',
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Run the initialization expression once (e.g. let i = 0).',
          'Check the condition. If false, exit the loop immediately without running the body.',
          'If true, run the loop body.',
          'Run the update expression (e.g. i++).',
          'Return to step 2 and repeat.',
        ],
      },
      {
        heading: 'Practical Example',
        body: `<p>Looping over an array by index.</p>`,
        code: {
          label: 'array-for.js',
          code: `const fruits = [\"apple\", \"banana\", \"cherry\"];\\n\\nfor (let i = 0; i < fruits.length; i++) {\\n  console.log(fruits[i]);\\n}`,
        },
      },
      {
        heading: 'Common Mistakes & Edge Cases',
        body: `
          <p class="warning"><strong>Warning:</strong> Using var instead of let for the counter used to be standard, but it means every closure created inside the loop shares one variable — a classic source of bugs. let creates a fresh binding per iteration, which is why it's the modern default.</p>
          <p><strong>Off-by-one errors.</strong> i <= fruits.length would read one index past the array's end, returning undefined; the standard, correct bound is i < fruits.length.</p>
          <p>For simply iterating values (not indexes), a <a href="#foreach">for...of</a> loop or array method is usually more readable than a classic for.</p>
        `,
      },
      {
        heading: 'Mental Model',
        mentalModel: '"Running laps: set the counter, check if laps remain, run one, then count it and check again."',
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: What happens if the initialization uses var vs let?</strong></p>
              <p class="interview-a">With var, one variable is shared across all iterations; with let, a brand-new binding is created for each iteration — this matters most when closures capture the loop variable, e.g. inside setTimeout.</p>
            </div>
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Can any of the three clauses be omitted?</strong></p>
              <p class="interview-a">Yes — for (;;) is a valid infinite loop with all three clauses empty, as long as something inside the body eventually breaks out of it.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'A for loop bundles setup, condition, and update into one line, running the condition check before every iteration — reach for it whenever a counter or a known number of repetitions drives the loop.',
    related: ['while', 'do-while', 'break', 'continue'],
  },

  'while': {
    title: 'The while Loop',
    intro: 'A while loop keeps running as long as its condition stays true, which makes it the right shape when you don\'t know in advance how many times you\'ll need to repeat.',
    sections: [
      {
        heading: 'What Is the while Loop?',
        body: `
          <p><code class="code-inline">while</code> checks a single condition before every iteration, including the very first. There's no built-in initialization or update clause the way <code class="code-inline">for</code> has — those have to be written separately, before the loop and inside its body.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Counting up while below a limit.</p>`,
        code: {
          label: 'while.js',
          code: `let count = 0;\\n\\nwhile (count < 3) {\\n  console.log(count);\\n  count++;\\n}`,
        },
        after: `<p>The condition is re-checked after every pass; once count reaches 3, count < 3 is false and the loop ends without a fourth iteration.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Because the condition is checked <em>before</em> the body runs, a while loop can execute zero times — if the condition is already false the first time it's checked, the body never runs at all. This is the key difference from <a href="#do-while">do...while</a>.</p>`,
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Evaluate the condition.',
          'If false, exit — the loop is done.',
          'If true, run the loop body.',
          'Go back to step 1 and re-check the condition.',
        ],
      },
      {
        heading: 'Common Mistakes & Edge Cases',
        body: `
          <p class="warning"><strong>Warning:</strong> Forgetting to update the variable that the condition depends on creates an infinite loop — while (energy > 0) with nothing decrementing energy inside the body never terminates and will freeze a single-threaded environment like the browser tab.</p>
          <p>while is a good fit for conditions driven by external state — waiting for a value to change, reading from a stream, or polling — where the number of iterations genuinely isn't known ahead of time.</p>
        `,
      },
      {
        heading: 'Mental Model',
        mentalModel: '"Playing a level while lives remain — you check before every attempt, and zero lives means you never play at all."',
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: Can a while loop run zero times?</strong></p>
              <p class="interview-a">Yes — if the condition is falsy on the very first check, the body is skipped entirely, unlike do...while which always runs at least once.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'while re-checks its condition before every pass, including the first — meaning it may run zero times — and is the natural choice when the number of iterations depends on runtime state rather than a counter.',
    related: ['for', 'do-while'],
  },

  'do-while': {
    title: 'The do...while Loop',
    intro: 'do...while is like while, but it checks the condition after the body runs — so the body is always guaranteed to execute at least once.',
    sections: [
      {
        heading: 'What Is do...while?',
        body: `
          <p><code class="code-inline">do...while</code> flips the order of <code class="code-inline">while</code>: the block runs first, and the condition is evaluated afterward, at the bottom. That ordering means the loop always runs one full iteration before it can possibly decide to stop — useful whenever "do the thing, then decide if you need to repeat" better matches the real-world logic than "check first, maybe do the thing".</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>A block that runs once even though its condition is immediately false.</p>`,
        code: {
          label: 'do-while.js',
          code: `let count = 0;\\n\\ndo {\\n  console.log(\"Runs at least once:\", count);\\n  count++;\\n} while (count < 0);`,
        },
        after: `<p>count < 0 is false from the start, so a plain while loop with the same condition would never run. Because this is do...while, the block still executes exactly once before the (failing) check happens.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>Execution enters the block unconditionally on the first pass — there's no gate at the top. Only after the block finishes does the engine evaluate the while condition; a truthy result sends execution back to the top of the block, a falsy one ends the loop.</p>`,
      },
      {
        heading: 'Step-by-Step',
        steps: [
          'Run the code block once, unconditionally.',
          'Evaluate the condition in the while(...) clause.',
          'If true, jump back to the top of the block and repeat.',
          'If false, exit the loop.',
        ],
      },
      {
        heading: 'Common Mistakes & Edge Cases',
        body: `
          <p><strong>Rarely used, easily forgotten.</strong> do...while is uncommon enough in everyday code that its trailing semicolon after while(...) — required, unlike a regular while loop — is a frequent typo source.</p>
          <p>A realistic use case is input validation or retry logic: prompt once, then keep re-prompting only if the result is invalid — the first attempt should always happen regardless of any prior state.</p>
        `,
      },
      {
        heading: 'Mental Model',
        mentalModel: '"Tasting the soup first, then deciding whether it needs more salt — you always taste it at least once."',
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: When would do...while behave differently from an equivalent while loop?</strong></p>
              <p class="interview-a">Only when the condition is false on the very first check — that's the one case where do...while still runs the body once and while doesn't run it at all. With a condition that's true initially, they behave identically.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'do...while guarantees exactly one run of the block before the condition is ever checked, which makes it the right tool specifically when "always run once, then maybe repeat" is the actual requirement.',
    related: ['while', 'for'],
  },

  'break': {
    title: 'The break Statement',
    intro: 'break exits a loop or switch immediately, without waiting for its normal condition to fail — useful the moment you already have what you were looking for.',
    sections: [
      {
        heading: 'What Is the break Statement?',
        body: `
          <p><code class="code-inline">break</code> is a jump statement: when the engine reaches it, it stops running the current loop or switch entirely — including skipping any remaining iterations — and resumes execution at the first statement after that loop or switch. It only affects the <em>closest enclosing</em> loop or switch, unless a label is used to target an outer one.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Stopping a loop as soon as a value is found.</p>`,
        code: {
          label: 'break.js',
          code: `for (let i = 0; i < 10; i++) {\\n  if (i === 3) break;\\n  console.log(i);\\n}\\n// logs 0, 1, 2`,
        },
        after: `<p>The loop was set up to run ten times, but break exits on the fourth iteration (i === 3) — 4 through 9 never happen.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>break doesn't just skip the rest of the current iteration — that's what continue does. It ends the entire loop structure, discarding any remaining planned iterations, and control jumps straight to the code that follows the loop's closing brace.</p>`,
      },
      {
        heading: 'Practical Example — Searching an Array',
        body: `<p>A common real-world pattern: stop scanning the moment a match is found.</p>`,
        code: {
          label: 'search.js',
          code: `const numbers = [10, 20, 50, 30];\\nlet targetIndex = -1;\\n\\nfor (let i = 0; i < numbers.length; i++) {\\n  if (numbers[i] === 50) {\\n    targetIndex = i;\\n    break;\\n  }\\n}\\nconsole.log(targetIndex); // 2`,
        },
        after: `<p>Without break, the loop would keep scanning numbers[3] and beyond even after finding the target — harmless here, but wasteful on a large array. Array methods like findIndex do the equivalent internally.</p>`,
      },
      {
        heading: 'Common Mistakes & Edge Cases',
        body: `
          <p><strong>break inside nested loops</strong> only exits the innermost one by default. To exit an outer loop from inside a nested one, JavaScript supports labeled statements: <code class="code-inline">outer: for (...) { for (...) { break outer; } }</code>.</p>
          <p>break is also what stops <a href="#switch">switch</a> fall-through — its most common use outside of loops.</p>
        `,
      },
      {
        heading: 'Mental Model',
        mentalModel: '"An emergency exit — you leave the whole building immediately, not just the current room."',
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: How do you break out of a nested loop from the inner one?</strong></p>
              <p class="interview-a">Label the outer loop (e.g. outer: for...) and use break outer; inside the inner loop — a plain break there would only exit the inner loop.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'break immediately terminates the closest enclosing loop or switch — reach for it the moment further iterations would be wasted work, and use a label if you need to exit an outer loop from inside a nested one.',
    related: ['continue', 'for', 'while'],
  },

  'continue': {
    title: 'The continue Statement',
    intro: 'continue skips just the rest of the current iteration and moves straight to the next one — the loop keeps going, unlike break which ends it.',
    sections: [
      {
        heading: 'What Is the continue Statement?',
        body: `
          <p><code class="code-inline">continue</code> stops the current pass through a loop's body early — any code after it in that iteration doesn't run — but, unlike <a href="#break">break</a>, the loop itself keeps going: control moves to the update step (in a for loop) or the condition check (in a while loop), and the next iteration begins normally.</p>
        `,
      },
      {
        heading: 'Simple Example',
        body: `<p>Skipping one specific value while still logging the rest.</p>`,
        code: {
          label: 'continue.js',
          code: `for (let i = 0; i < 4; i++) {\\n  if (i === 2) continue;\\n  console.log(i);\\n}\\n// logs 0, 1, 3`,
        },
        after: `<p>When i is 2, continue skips the console.log for that iteration only — the loop still runs its increment and condition check afterward, and i === 3 executes normally.</p>`,
      },
      {
        heading: 'How It Works',
        body: `<p>continue jumps to the end of the current iteration's body — not out of the loop entirely. In a for loop, that means the update expression (like i++) still runs before the condition is re-checked; skipping the body doesn't skip the loop's own bookkeeping.</p>`,
      },
      {
        heading: 'Practical Example — Filtering While Iterating',
        body: `<p>Logging only even numbers by skipping the odd ones.</p>`,
        code: {
          label: 'filter-loop.js',
          code: `for (let i = 1; i <= 5; i++) {\\n  if (i % 2 !== 0) continue;\\n  console.log(i);\\n}\\n// logs 2, 4`,
        },
      },
      {
        heading: 'Common Mistakes & Edge Cases',
        body: `
          <p><strong>Confusing continue with break</strong> is the most common mix-up — continue keeps the loop alive and moves to the next pass; break kills the loop outright. Reach for continue when certain iterations should simply be ignored, and for break when there's nothing left worth doing.</p>
          <p>Like break, continue can target an outer loop with a label: <code class="code-inline">continue outer;</code> skips to the next iteration of the labeled loop, not the innermost one.</p>
        `,
      },
      {
        heading: 'Mental Model',
        mentalModel: '"Skipping a song on a playlist — you jump to the next track instead of stopping the music."',
      },
      {
        heading: 'Interview Questions',
        body: `
          <div class="interview-block">
            <div class="interview-qa">
              <p class="interview-q"><strong>Q: In a for loop, does continue skip the increment step too?</strong></p>
              <p class="interview-a">No — continue only skips the remaining body statements; the update expression (e.g. i++) still runs afterward, which is why the loop doesn't stall on the same index forever.</p>
            </div>
          </div>
        `,
      },
    ],
    takeaway: 'continue skips only the remainder of the current iteration and lets the loop carry on — use it to bypass specific cases without abandoning the loop the way break would.',
    related: ['break', 'for', 'while'],
  },

  // --- CHAPTER VI: FUNCTIONS ---
  "what-is-a-function": {
    title: "What is a Function?",
    chapter: "Chapter VI",
    concept: "A function is a reusable block of code designed to perform a particular task when invoked.",
    simpleExample: `
function greet() {
  console.log("Hello, World!");
}
greet();
    `,
    howItWorks: "Functions encapsulate logic so you can write code once and execute it multiple times with different inputs.",
    stepByStep: [
      "1. Define the routine using the function keyword.",
      "2. Group statements inside curly braces.",
      "3. Execute the function using parentheses."
    ],
    mentalModel: "Think of a vending machine: you insert inputs, internal machinery runs, and an item is returned.",
    practicalCode: `
function printWelcome() {
  console.log("Welcome to the application!");
}
printWelcome();
    `,
    keyTakeaway: "Functions promote code reusability and modular design.",
    relatedTopics: ["function-declaration", "function-expression"]
  },

  "function-declaration": {
    title: "Function Declaration",
    chapter: "Chapter VI",
    concept: "A function declaration defines a named function and is fully hoisted during compilation.",
    simpleExample: `
sayHi();
function sayHi() {
  console.log("Hi!");
}
    `,
    howItWorks: "Declarations are moved to the top of their scope, allowing invocation before the definition line.",
    stepByStep: [
      "1. Write the function keyword.",
      "2. Provide a function name.",
      "3. Define parameters and block body."
    ],
    mentalModel: "Think of an official announcement registered before the event begins.",
    practicalCode: `
function add(a, b) {
  return a + b;
}
    `,
    keyTakeaway: "Function declarations are hoisted, making them available everywhere in scope.",
    relatedTopics: ["function-expression", "calling-functions"]
  },

  "function-expression": {
    title: "Function Expression",
    chapter: "Chapter VI",
    concept: "A function expression defines a function inside an expression context, typically assigned to a variable.",
    simpleExample: `
const multiply = function(a, b) {
  return a * b;
};
    `,
    howItWorks: "Unlike declarations, function expressions are not hoisted and follow standard variable assignment rules.",
    stepByStep: [
      "1. Declare a variable.",
      "2. Assign an anonymous or named function.",
      "3. Call via the variable name."
    ],
    mentalModel: "Think of storing an unlabeled file recipe inside a specific folder slot.",
    practicalCode: `
const subtract = function(a, b) {
  return a - b;
};
console.log(subtract(10, 5));
    `,
    keyTakeaway: "Expressions are not hoisted, enforcing strict top-to-bottom initialization order.",
    relatedTopics: ["function-declaration", "anonymous-functions"]
  },

  "calling-functions": {
    title: "Calling Functions",
    chapter: "Chapter VI",
    concept: "Invoking or calling a function executes the code statements contained within its block.",
    simpleExample: `
function run() {
  console.log("Running...");
}
run(); // Calling the function
    `,
    howItWorks: "Appending parentheses () to a function reference triggers the execution engine.",
    stepByStep: [
      "1. Reference the function name or variable.",
      "2. Append invocation parentheses.",
      "3. Supply expected arguments."
    ],
    mentalModel: "Think of pressing the play button on a media player.",
    practicalCode: `
function alertUser() {
  console.log("Alert triggered!");
}
alertUser();
    `,
    keyTakeaway: "Functions do nothing until explicitly invoked or called.",
    relatedTopics: ["parameters", "arguments"]
  },

  "parameters": {
    title: "Parameters",
    chapter: "Chapter VI",
    concept: "Parameters are placeholder variables defined in a function signature to accept incoming input data.",
    simpleExample: `
function greet(name) {
  console.log(\`Hello \${name}\`);
}
    `,
    howItWorks: "Parameters act as local variables inside the function body initialized by passed argument values.",
    stepByStep: [
      "1. Declare a function with parentheses.",
      "2. List parameter identifiers inside.",
      "3. Reference parameters in code logic."
    ],
    mentalModel: "Think of blank input fields on a form waiting to be filled out.",
    practicalCode: `
function calculateTax(amount, rate) {
  return amount * rate;
}
    `,
    keyTakeaway: "Parameters allow functions to accept dynamic inputs.",
    relatedTopics: ["arguments", "default-parameters"]
  },

  "arguments": {
    title: "Arguments",
    chapter: "Chapter VI",
    concept: "Arguments are the actual real values passed into a function when it is invoked.",
    simpleExample: `
function square(num) {
  return num * num;
}
square(4); // 4 is the argument
    `,
    howItWorks: "Arguments map directly onto the function's defined parameters in sequential order.",
    stepByStep: [
      "1. Invoke a target function.",
      "2. Pass values or variables inside the parentheses.",
      "3. Receive values via function parameters."
    ],
    mentalModel: "Think of handing specific ingredients to a chef at a cooking station.",
    practicalCode: `
function showFullName(first, last) {
  console.log(first + " " + last);
}
showFullName("Jane", "Doe");
    `,
    keyTakeaway: "Arguments supply the concrete data required for function execution.",
    relatedTopics: ["parameters", "rest-parameters"]
  },

  "return-values": {
    title: "Return Values",
    chapter: "Chapter VI",
    concept: "The return statement specifies the output value that a function outputs back to its caller.",
    simpleExample: `
function add(a, b) {
  return a + b;
}
let result = add(2, 3); // 5
    `,
    howItWorks: "When execution hits a return statement, the function stops immediately and yields the specified value.",
    stepByStep: [
      "1. Compute data inside the function body.",
      "2. Use the return keyword followed by the output expression.",
      "3. Capture the result in a variable upon invocation."
    ],
    mentalModel: "Think of a cash machine dispensing requested money bills before closing the slot.",
    practicalCode: `
function getCube(x) {
  return x * x * x;
}
let val = getCube(3); // 27
    `,
    keyTakeaway: "Functions output values back to callers via the return keyword.",
    relatedTopics: ["parameters", "pure-functions"]
  },

  "default-parameters": {
    title: "Default Parameters",
    chapter: "Chapter VI",
    concept: "Default parameters allow standard initialization values to be assigned if no argument or undefined is passed.",
    simpleExample: `
function greet(name = "Guest") {
  console.log(\`Hello, \${name}\`);
}
greet(); // "Hello, Guest"
    `,
    howItWorks: "If an argument is omitted during invocation, the engine falls back to the preset default value expression.",
    stepByStep: [
      "1. Define a parameter in the function signature.",
      "2. Assign a default fallback value using the equals sign (=).",
      "3. Invoke without arguments to trigger the fallback."
    ],
    mentalModel: "Think of a default setting checkbox pre-selected on an options menu screen.",
    practicalCode: `
function calculateTotal(price, tax = 0.05) {
  return price + price * tax;
}
    `,
    keyTakeaway: "Default parameters prevent unexpected undefined errors when arguments are omitted.",
    relatedTopics: ["parameters", "rest-parameters"]
  },

  "rest-parameters": {
    title: "Rest Parameters",
    chapter: "Chapter VI",
    concept: "The rest parameter syntax (...) allows a function to accept an indefinite number of arguments as an array.",
    simpleExample: `
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3)); // 6
    `,
    howItWorks: "Rest syntax bundles excess arguments into a true array for flexible collection processing.",
    stepByStep: [
      "1. Prefix the final parameter name with three dots (...).",
      "2. Pass multiple arguments during invocation.",
      "3. Handle the bundled arguments as an array."
    ],
    mentalModel: "Think of an expandable container that packs all remaining loose items together.",
    practicalCode: `
function listItems(leader, ...rest) {
  console.log("Leader:", leader);
  console.log("Others:", rest);
}
    `,
    keyTakeaway: "Rest parameters handle variadic function signatures cleanly without arguments object hacks.",
    relatedTopics: ["parameters", "spread-syntax"]
  },

  "arrow-functions": {
    title: "Arrow Functions",
    chapter: "Chapter VI",
    concept: "Arrow functions provide a concise syntax for writing functions with lexical this bindings.",
    simpleExample: `
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20
    `,
    howItWorks: "Arrow functions omit the function keyword and implicitly return single-line expression values.",
    stepByStep: [
      "1. Specify parameters in parentheses.",
      "2. Add the arrow token (=>).",
      "3. Provide expression logic or block code."
    ],
    mentalModel: "Think of a streamlined mathematical arrow equation shorthand.",
    practicalCode: `
const square = x => x * x;
console.log(square(6)); // 36
    `,
    keyTakeaway: "Arrow functions offer compact syntax and lexical context preservation.",
    relatedTopics: ["anonymous-functions", "callback-functions"]
  },

  "anonymous-functions": {
    title: "Anonymous Functions",
    chapter: "Chapter VI",
    concept: "An anonymous function is a function definition without any specified identifier name.",
    simpleExample: `
setTimeout(function() {
  console.log("Executed later");
}, 1000);
    `,
    howItWorks: "Used primarily as values or inline callbacks where permanent naming is unnecessary.",
    stepByStep: [
      "1. Omit the name identifier after the function keyword.",
      "2. Assign to a variable or pass directly as a callback argument.",
      "3. Invoke via reference or context trigger."
    ],
    mentalModel: "Think of a nameless utility tool built specifically for a single quick job task.",
    practicalCode: `
let numbers = [1, 2, 3].map(function(n) {
  return n * 2;
});
    `,
    keyTakeaway: "Anonymous functions simplify short-lived inline callback implementations.",
    relatedTopics: ["function-expression", "callback-functions"]
  },

  "callback-functions": {
    title: "Callback Functions",
    chapter: "Chapter VI",
    concept: "A callback function is passed into another function as an argument to be executed later.",
    simpleExample: `
function processUser(callback) {
  callback("Alice");
}
processUser(name => console.log(name));
    `,
    howItWorks: "Higher-order code delegates control back to the provided callback function upon completing an operation.",
    stepByStep: [
      "1. Write a function designed to receive another function parameter.",
      "2. Pass a callback function reference during invocation.",
      "3. Execute the callback inside the host function body."
    ],
    mentalModel: "Think of leaving your phone number so a store clerk can call you when your order arrives.",
    practicalCode: `
setTimeout(() => {
  console.log("Timer callback triggered");
}, 500);
    `,
    keyTakeaway: "Callbacks enable asynchronous execution flows and event-driven architectures.",
    relatedTopics: ["higher-order-functions", "anonymous-functions"]
  },

  "higher-order-functions": {
    title: "Higher-Order Functions",
    chapter: "Chapter VI",
    concept: "A higher-order function is a function that takes other functions as arguments, returns functions, or both.",
    simpleExample: `
function multiplier(factor) {
  return x => x * factor;
}
const double = multiplier(2);
console.log(double(5)); // 10
    `,
    howItWorks: "Treating functions as first-class citizens allows powerful functional programming abstractions.",
    stepByStep: [
      "1. Create a function that accepts a function argument or returns a function.",
      "2. Invoke or return the inner function behavior dynamically.",
      "3. Build composable functional layers."
    ],
    mentalModel: "Think of a factory machine tool attachment that can be fitted with different modular operational heads.",
    practicalCode: `
const numbers = [1, 2, 3];
const mapped = numbers.map(n => n * 10);
    `,
    keyTakeaway: "Higher-order functions form the foundation of functional programming in JavaScript.",
    relatedTopics: ["callback-functions", "pure-functions"]
  },

  "pure-functions": {
    title: "Pure Functions",
    chapter: "Chapter VI",
    concept: "A pure function always produces identical output given identical inputs and causes no side effects.",
    simpleExample: `
function add(a, b) {
  return a + b; // Pure: depends only on inputs, modifies nothing outside
}
    `,
    howItWorks: "Pure functions do not mutate external state, global variables, or input arguments.",
    stepByStep: [
      "1. Base outputs entirely on input parameters.",
      "2. Avoid modifying external variables or network state.",
      "3. Return new calculated values safely."
    ],
    mentalModel: "Think of a math calculator operation: 2 + 2 always returns 4 without altering anything else.",
    practicalCode: `
const increment = age => age + 1;
    `,
    keyTakeaway: "Pure functions guarantee predictable behavior and simplify debugging.",
    relatedTopics: ["return-values", "higher-order-functions"]
  },

  "recursion": {
    title: "Recursion",
    chapter: "Chapter VI",
    concept: "Recursion occurs when a function calls itself repeatedly until it reaches a termination base case condition.",
    simpleExample: `
function countdown(n) {
  if (n <= 0) return;
  console.log(n);
  countdown(n - 1);
}
countdown(3);
    `,
    howItWorks: "Every recursive step breaks down a large problem into a smaller sub-problem guarded by an exit condition.",
    stepByStep: [
      "1. Define a base case exit condition to prevent infinite loops.",
      "2. Define the recursive step where the function calls itself with modified input.",
      "3. Return combined cumulative results."
    ],
    mentalModel: "Think of opening nested Russian nesting dolls until reaching the smallest solid core doll.",
    practicalCode: `
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(4)); // 24
    `,
    keyTakeaway: "Recursion provides elegant solutions for hierarchical or self-similar data structures.",
    relatedTopics: ["function-declaration", "what-is-scope"]
  },

  // --- CHAPTER VII: OBJECTS ---
  "what-is-an-object": {
    title: "What is an Object?",
    chapter: "Chapter VII",
    concept: "An object is a composite data structure containing key-value pairs representing state and behavior.",
    simpleExample: `
const user = { name: "Alice", age: 25 };
    `,
    howItWorks: "Objects group related variables (properties) and functions (methods) into a single entity.",
    stepByStep: [
      "1. Initialize with curly braces {}.",
      "2. Define key-value pairs separated by commas.",
      "3. Access stored data via keys."
    ],
    mentalModel: "Think of a physical profile identity card storing labeled details.",
    practicalCode: `
const book = { title: "JavaScript Guide", pages: 350 };
console.log(book.title);
    `,
    keyTakeaway: "Objects model complex real-world entities cleanly in code.",
    relatedTopics: ["properties", "methods"]
  },

  "properties": {
    title: "Properties",
    chapter: "Chapter VII",
    concept: "Properties are key-value pairs stored inside an object representing its attributes or data state.",
    simpleExample: `
const car = { brand: "Toyota", year: 2023 };
console.log(car.brand);
    `,
    howItWorks: "Keys map to values of any valid data type using dot or bracket notation.",
    stepByStep: [
      "1. Target the host object.",
      "2. Specify the property key identifier.",
      "3. Retrieve or update its associated value."
    ],
    mentalModel: "Think of labeled storage slots inside a filing cabinet drawer.",
    practicalCode: `
const user = { role: "admin" };
user.active = true; // Adding property
    `,
    keyTakeaway: "Properties hold the state data inside objects.",
    relatedTopics: ["what-is-an-object", "object-destructuring"]
  },

  "methods": {
    title: "Methods",
    chapter: "Chapter VII",
    concept: "Methods are functions stored as object properties that define behaviors associated with the object.",
    simpleExample: `
const user = {
  name: "Bob",
  sayHello() {
    console.log(\`Hi, I am \${this.name}\`);
  }
};
user.sayHello();
    `,
    howItWorks: "Inside a method, the this keyword provides reference access to the owner object context.",
    stepByStep: [
      "1. Define a function property inside an object literal.",
      "2. Use the this keyword to access peer object properties.",
      "3. Invoke via dot notation method call."
    ],
    mentalModel: "Think of a smart device equipped with built-in control action buttons.",
    practicalCode: `
const counter = {
  count: 0,
  increment() { this.count++; }
};
counter.increment();
    `,
    keyTakeaway: "Methods bundle behavior directly with object state data.",
    relatedTopics: ["what-is-an-object", "properties"]
  },

  "object-references": {
    title: "Object References",
    chapter: "Chapter VII",
    concept: "Objects are reference types, meaning variables store memory addresses rather than the actual data value.",
    simpleExample: `
const obj1 = { value: 10 };
const obj2 = obj1;
obj2.value = 20;
console.log(obj1.value); // 20 (Shared reference)
    `,
    howItWorks: "Assigning or passing an object copies its reference link, not a clone of its internal properties.",
    stepByStep: [
      "1. Create an object assigned to a variable reference.",
      "2. Assign that variable to a second variable.",
      "3. Modify properties through either variable to see shared effects."
    ],
    mentalModel: "Think of two people holding keys pointing to the exact same physical storage locker.",
    practicalCode: `
const original = { x: 1 };
const copyRef = original;
console.log(original === copyRef); // true
    `,
    keyTakeaway: "Be mindful of shared mutations when copying object references.",
    relatedTopics: ["spread-syntax", "reference-vs-value"]
  },

  "object-destructuring": {
    title: "Object Destructuring",
    chapter: "Chapter VII",
    concept: "Object destructuring unpacks properties from objects directly into distinct local variables.",
    simpleExample: `
const user = { name: "Charlie", age: 30 };
const { name, age } = user;
console.log(name); // "Charlie"
    `,
    howItWorks: "Property names match local variable identifiers on the assignment left-hand side.",
    stepByStep: [
      "1. Target a source object.",
      "2. Wrap desired property keys inside curly braces on the left side.",
      "3. Use extracted variables directly."
    ],
    mentalModel: "Think of unpacking designated items straight out of a shipment box.",
    practicalCode: `
const settings = { theme: "dark", lang: "en" };
const { theme } = settings;
    `,
    keyTakeaway: "Destructuring provides a clean shorthand for extracting object properties.",
    relatedTopics: ["properties", "spread-syntax"]
  },

  "spread-syntax": {
    title: "Spread Syntax",
    chapter: "Chapter VII",
    concept: "Spread syntax (...) expands an object's properties into a new object collection context.",
    simpleExample: `
const base = { a: 1, b: 2 };
const extended = { ...base, c: 3 };
    `,
    howItWorks: "Spread copies enumerable properties shallowly into new target structures.",
    stepByStep: [
      "1. Target an existing source object.",
      "2. Prepend three dots (...) inside a new object literal.",
      "3. Add additional properties."
    ],
    mentalModel: "Think of spreading contents out onto a workbench to combine with new tools.",
    practicalCode: `
const defaults = { mode: "eco", speed: 50 };
const custom = { ...defaults, speed: 80 };
    `,
    keyTakeaway: "Spread syntax simplifies cloning and merging objects immutably.",
    relatedTopics: ["object-references", "object-destructuring"]
  },

  // --- CHAPTER VIII: ARRAYS ---
  "arrays-overview": {
    title: "Arrays",
    chapter: "Chapter VIII",
    concept: "An array is an ordered collection data structure used to store multiple items sequentially.",
    simpleExample: `
const fruits = ["apple", "banana", "cherry"];
    `,
    howItWorks: "Arrays allocate zero-indexed numerical slots automatically for each sequential element item.",
    stepByStep: [
      "1. Initialize using square brackets [].",
      "2. Insert items separated by commas.",
      "3. Access elements via index numbers."
    ],
    mentalModel: "Think of a numbered row of storage bins.",
    practicalCode: `
const scores = [90, 85, 92];
console.log(scores.length);
    `,
    keyTakeaway: "Arrays maintain ordered lists of data items efficiently.",
    relatedTopics: ["array-indexes", "array-methods"]
  },

  "array-indexes": {
    title: "Array Indexes",
    chapter: "Chapter VIII",
    concept: "Array indexes represent the numerical position of items in an array, starting at zero.",
    simpleExample: `
const colors = ["red", "green", "blue"];
console.log(colors[0]); // "red"
console.log(colors[2]); // "blue"
    `,
    howItWorks: "Items are addressed via bracket notation containing their exact zero-based integer index.",
    stepByStep: [
      "1. Target an array reference variable.",
      "2. Provide target integer index inside brackets [i].",
      "3. Retrieve or reassign the item."
    ],
    mentalModel: "Think of sequential apartment door numbers lining a hallway corridor.",
    practicalCode: `
const items = ["a", "b", "c"];
items[1] = "z"; // Reassign index 1
    `,
    keyTakeaway: "JavaScript arrays are zero-indexed, meaning the first item sits at index 0.",
    relatedTopics: ["arrays-overview", "array-methods"]
  },

  "array-methods": {
    title: "Array Methods",
    chapter: "Chapter VIII",
    concept: "Array methods are built-in functions providing utility operations to mutate or inspect array items.",
    simpleExample: `
const list = [1, 2];
list.push(3); // [1, 2, 3]
list.pop(); // [1, 2]
    `,
    howItWorks: "Methods modify array contents or return inspected data values.",
    stepByStep: [
      "1. Target an array instance.",
      "2. Call mutation or inspection methods (push, pop, shift, unshift).",
      "3. Observe modified array state."
    ],
    mentalModel: "Think of conveyor belts handling items at the ends of a queue line.",
    practicalCode: `
const queue = ["A", "B"];
queue.push("C");
queue.shift(); // Removes "A"
    `,
    keyTakeaway: "Array methods provide built-in tools for managing list items.",
    relatedTopics: ["arrays-overview", "map"]
  },

  "map": {
    title: "map",
    chapter: "Chapter VIII",
    concept: "The map method transforms every item in an array by passing it through a callback function, returning a brand new array.",
    simpleExample: `
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // [2, 4, 6]
    `,
    howItWorks: "map iterates through each element, applies the transformation callback, and collects results into a new array.",
    stepByStep: [
      "1. Call .map() on an input array.",
      "2. Provide a transformation callback function.",
      "3. Receive the newly mapped array output."
    ],
    mentalModel: "Think of a factory processing line converting raw input materials into finished goods.",
    practicalCode: `
const names = ["alice", "bob"];
const caps = names.map(n => n.toUpperCase());
    `,
    keyTakeaway: "Use map when you need to transform each element of an array into a new value.",
    relatedTopics: ["filter", "reduce"]
  },

  "filter": {
    title: "filter",
    chapter: "Chapter VIII",
    concept: "The filter method creates a shallow copy of a portion of a given array containing only elements that pass a test condition.",
    simpleExample: `
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0); // [2, 4]
    `,
    howItWorks: "The callback returns a boolean; truthy values keep the item, falsy values discard it.",
    stepByStep: [
      "1. Call .filter() on an array.",
      "2. Supply a condition test callback function.",
      "3. Collect matching elements into a new filtered array."
    ],
    mentalModel: "Think of a security checkpoint gate allowing only items meeting specific criteria to pass.",
    practicalCode: `
const scores = [45, 80, 65, 90];
const passed = scores.filter(s => s >= 60);
    `,
    keyTakeaway: "Filter extracts subsets of data matching specific boolean conditions.",
    relatedTopics: ["map", "reduce"]
  },

  "reduce": {
    title: "reduce",
    chapter: "Chapter VIII",
    concept: "The reduce method executes a reducer callback function over each array element, accumulating them into a single summary value.",
    simpleExample: `
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, curr) => acc + curr, 0); // 10
    `,
    howItWorks: "An accumulator carries the running total across each iteration step.",
    stepByStep: [
      "1. Call .reduce() with a callback and initial accumulator value.",
      "2. Add or aggregate each current item into the accumulator.",
      "3. Return the final single accumulated result."
    ],
    mentalModel: "Think of counting loose coins into a piggy bank to find the total sum.",
    practicalCode: `
const values = [5, 10, 15];
const total = values.reduce((acc, val) => acc + val, 0);
    `,
    keyTakeaway: "Reduce aggregates complex arrays down into a single consolidated output value.",
    relatedTopics: ["map", "filter"]
  },

  "foreach": {
    title: "forEach",
    chapter: "Chapter VIII",
    concept: "The forEach method executes a provided callback function once for each array element.",
    simpleExample: `
["a", "b", "c"].forEach(item => console.log(item));
    `,
    howItWorks: "forEach iterates through items for side effects; it does not return a new array.",
    stepByStep: [
      "1. Call .forEach() on an array instance.",
      "2. Pass an execution callback function.",
      "3. Perform side-effect tasks per item."
    ],
    mentalModel: "Think of an inspector walking down a line of boxes checking each one individually.",
    practicalCode: `
const numbers = [10, 20];
numbers.forEach(n => console.log(n * 2));
    `,
    keyTakeaway: "Use forEach for performing side-effect operations rather than transforming data.",
    relatedTopics: ["map", "array-methods"]
  },

  "array-destructuring": {
    title: "Array Destructuring",
    chapter: "Chapter VIII",
    concept: "Array destructuring unpacks sequential array values directly into distinct local variables.",
    simpleExample: `
const rgb = [255, 128, 0];
const [red, green, blue] = rgb;
    `,
    howItWorks: "Variables match sequential index positions in the source array structure.",
    stepByStep: [
      "1. Target a source array.",
      "2. Wrap target variable names inside square brackets [].",
      "3. Extract positional values."
    ],
    mentalModel: "Think of sliding items sequentially out of slots into separate containers.",
    practicalCode: `
const coords = [10.5, 20.1];
const [lat, lng] = coords;
    `,
    keyTakeaway: "Array destructuring provides concise syntax for unpacking ordered list items.",
    relatedTopics: ["object-destructuring", "arrays-overview"]
  },

  "reference-vs-value": {
    title: "Reference vs Value",
    chapter: "Chapter VIII",
    concept: "Primitives are stored and copied by value, whereas complex arrays and objects are handled by reference.",
    simpleExample: `
let a = 10;
let b = a; // Copied by value
b = 20;
console.log(a); // 10 (Independent)
    `,
    howItWorks: "Primitive values duplicate directly, while reference values point to shared memory locations.",
    stepByStep: [
      "1. Understand primitive value duplication.",
      "2. Observe reference pointer sharing for arrays/objects.",
      "3. Use cloning techniques when isolation is required."
    ],
    mentalModel: "Think of photocopying a text document (value) versus sharing a live shared Google Doc link (reference).",
    practicalCode: `
const arrA = [1, 2];
const arrB = arrA;
arrB.push(3); // Affects arrA too
    `,
    keyTakeaway: "Always account for reference sharing when manipulating arrays and objects.",
    relatedTopics: ["object-references", "arrays-overview"]
  },

  // --- CHAPTER IX: SCOPE ---
  "what-is-scope": {
    title: "What is Scope?",
    chapter: "Chapter IX",
    concept: "Scope is the set of rules that determines where a variable can be seen and used in your code. Every variable belongs to some scope, and that scope decides who can read it and who can't.",
    simpleExample: `
let globalVar = "visible everywhere";

function test() {
  let localVar = "visible only inside test";
  console.log(globalVar); // OK — outer variables are visible inward
}

console.log(localVar); // ReferenceError — inner variables are NOT visible outward
    `,
    howItWorks: "JavaScript decides what's visible where based on where code is physically written — not based on which function happens to call which. This is called lexical (or static) scoping, and it's true regardless of how or when a function is actually invoked. Scope exists at several nested levels: global scope (the outermost layer), function scope (created by every function call), and block scope (created by let/const inside any {} pair). Together they form a hierarchy: inner scopes can see outward into the scopes that contain them, but outer scopes can never see inward into a scope they don't contain.",
    stepByStep: [
      "1. JavaScript reads your source code and notices where each function and block begins and ends.",
      "2. Every variable declaration is attached to the scope it was declared in — global, function, or block.",
      "3. When code tries to use a variable, the engine looks in the current scope first, then walks outward through each containing scope until it finds a match (or runs out of scopes and throws)."
    ],
    mentalModel: "Think of scope like a set of rooms inside rooms inside a building. Someone standing in an inner room can shout through the open doorways and be heard in every room that contains theirs — but someone in an outer room can't see into a room they're not standing in.",
    practicalCode: `
if (true) {
  let x = 10;
  console.log(x); // 10 — accessible here, inside the block
}
console.log(typeof x); // "undefined" — x doesn't exist out here at all
    `,
    diagram: scopeRelationshipDiagram(),
    keyTakeaway: "Scope is decided by where code is written, not by which function calls which — an inner scope can always see out, but an outer scope can never see in.",
    relatedTopics: ["global-scope", "function-scope", "lexical-scope"]
  },

  "global-scope": {
    title: "Global Scope",
    chapter: "Chapter IX",
    concept: "Global scope is the outermost scope of a program — anything declared here, outside every function and block, is visible from anywhere else in the code.",
    simpleExample: `
const appName = "MyApp";

function logApp() {
  console.log(appName); // accessible — logApp() can see the global scope
}
logApp(); // "MyApp"
    `,
    howItWorks: "In a browser, top-level var declarations and function declarations actually become properties of the global object (window). Top-level let, const, and class do not — they live in a separate global lexical environment that's still visible everywhere, but doesn't pollute window. Every function you write, no matter how deeply nested, can see global-scope variables, because every scope's chain eventually reaches the global scope at its root.",
    stepByStep: [
      "1. A variable, function, or class is declared outside of any function or block.",
      "2. It becomes part of the global scope, the outermost link in every scope chain.",
      "3. Any code anywhere in the program can read (and, if not const, reassign) it."
    ],
    mentalModel: "Think of a notice board in the lobby of a building — everyone who works anywhere in the building walks past it and can read what's pinned there.",
    practicalCode: `
const API_URL = "https://api.example.com";

function fetchURL() {
  return API_URL; // reads the global constant
}

// Common mistake: relying on too many globals makes code hard to
// reason about, since ANY function anywhere could be reading or
// changing them. Prefer passing values as parameters where you can.
    `,
    keyTakeaway: "Global scope is convenient because everything can reach it, which is exactly why overusing it makes large programs fragile — minimize what you put there.",
    relatedTopics: ["what-is-scope", "function-scope"]
  },

  "function-scope": {
    title: "Function Scope",
    chapter: "Chapter IX",
    concept: "Every function call creates its own scope. Variables declared inside a function with var, let, or const are only visible inside that function — not to the code that called it, and not to sibling functions.",
    simpleExample: `
function setup() {
  let secret = "hidden";
  console.log(secret); // "hidden" — visible inside setup()
}
setup();
console.log(secret); // ReferenceError — not visible out here
    `,
    howItWorks: "Function scope is created fresh every time the function runs, and it disappears once the function finishes (unless something — like a closure — keeps a reference to it alive). Parameters are also function-scoped: they behave like variables declared at the very top of the function body. Note that var is only function-scoped, not block-scoped — a var declared inside an if or for block inside a function is still visible everywhere in that whole function, which is one of the reasons let and const were introduced.",
    stepByStep: [
      "1. A function is called, and a brand-new function scope is created for that call.",
      "2. Parameters and any var/let/const declared in the function body belong to this scope.",
      "3. When the function returns, that scope is discarded (unless a closure keeps it alive)."
    ],
    mentalModel: "Think of each function call as renting a private office for the duration of the call — what's inside stays inside, and the office is cleared out the moment the call ends.",
    practicalCode: `
function calculate() {
  let tempResult = 42;
  return tempResult * 2;
}
console.log(calculate()); // 84

// A common surprise: var ignores block boundaries within a function.
function loop() {
  for (var i = 0; i < 3; i++) {}
  console.log(i); // 3 — var "i" leaked out of the for-block,
                  // but it's still trapped inside loop()'s function scope
}
loop();
    `,
    keyTakeaway: "Function scope is created per call and destroyed when the call ends — and remember that var ignores block boundaries, spilling out to the whole enclosing function.",
    relatedTopics: ["what-is-scope", "block-scope", "var"]
  },

  "block-scope": {
    title: "Block Scope",
    chapter: "Chapter IX",
    concept: "Block scope restricts a let or const variable's visibility to the nearest enclosing pair of curly braces {} — an if statement, a loop body, or even a standalone { } block.",
    simpleExample: `
if (true) {
  let blockVal = "I am block scoped";
  console.log(blockVal); // "I am block scoped"
}
console.log(typeof blockVal); // "undefined" — it doesn't exist out here
    `,
    howItWorks: "Block scope was introduced with let and const in ES6, specifically to fix the leaky behavior of var (which only respects function boundaries, not block boundaries). Every time control flow enters a new block — a loop iteration, an if branch — a new block scope is conceptually created for any let/const declared there. This is exactly why a for (let i ...) loop gives each iteration its own independent i, while for (var i ...) shares a single i across every iteration.",
    stepByStep: [
      "1. Execution enters a block delimited by { }.",
      "2. Any let or const declared directly inside that block belongs only to it.",
      "3. When execution leaves the block, those bindings are gone — code outside can't see them."
    ],
    mentalModel: "Think of temporary partition walls set up inside a room for the length of a meeting — once the meeting (the block) ends, the partitions come down and whatever was written on them is gone.",
    practicalCode: `
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Logs 0, 1, 2 — because "let" gives each loop iteration its own "i"

for (var j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);
}
// Logs 3, 3, 3 — because "var" shares ONE "j" across every iteration,
// and by the time the callbacks run, the loop has already finished
    `,
    diagram: blockScopeDiagram(),
    keyTakeaway: "let and const are block-scoped, which is why let in a loop gives each iteration its own independent variable — var famously does not.",
    relatedTopics: ["function-scope", "lexical-scope", "let"]
  },

  "lexical-scope": {
    title: "Lexical Scope",
    chapter: "Chapter IX",
    concept: "Lexical scope means a function's access to outer variables is fixed by where the function is physically written in the source code — not by where or how it's later called.",
    simpleExample: `
function outer() {
  let outerVar = "outer";
  function inner() {
    console.log(outerVar); // lexically accessible — inner() is written inside outer()
  }
  inner();
}
outer(); // "outer"
    `,
    howItWorks: "\"Lexical\" refers to the lexing/parsing stage of reading source code — before anything even runs, the engine can already tell, purely from nesting and indentation, exactly which outer variables any given inner function will be allowed to reach. This is what makes JavaScript's scoping predictable: you can determine a variable's scope just by reading the code, without having to trace every possible call path at runtime. It's also the mechanism that closures are built on — a function permanently keeps access to the scope it was lexically written inside, wherever it's later called from.",
    stepByStep: [
      "1. Functions are nested according to how the source code is physically written.",
      "2. Each nested function's outer scope is fixed at the point it's defined, based on that nesting.",
      "3. No matter where or when the function is later called, it always looks outward through the same lexical chain."
    ],
    mentalModel: "Think of a set of Russian nesting dolls: each inner doll can \"see\" the shells around it because it was assembled inside them — moving the whole set to a different shelf later doesn't change which dolls surround which.",
    practicalCode: `
const message = "Hello";

function showMessage() {
  console.log(message); // fixed by where showMessage is written, not by who calls it
}

function runElsewhere(fn) {
  const message = "Different message"; // this local "message" is irrelevant
  fn();
}

runElsewhere(showMessage); // still logs "Hello" — lexical scope, not call-time scope
    `,
    keyTakeaway: "A function's outer scope is locked in by where it's written in the code, never by where it's called from — this is what makes JavaScript's variable resolution predictable, and it's the foundation closures rely on.",
    relatedTopics: ["scope-chain", "lexical-environment", "closures"]
  },

  "scope-chain": {
    title: "Scope Chain",
    chapter: "Chapter IX",
    concept: "The scope chain is the ordered path — from the current scope outward, one containing scope at a time, all the way to global — that JavaScript follows to resolve a variable name.",
    simpleExample: `
let globalVar = "global";

function level1() {
  let midVar = "mid";
  function level2() {
    console.log(globalVar); // not found locally, so the engine walks the chain
  }
  level2();
}
level1();
    `,
    howItWorks: "Every scope keeps a reference to the scope that contains it, forming a chain that ultimately ends at the global scope. When code references a variable, the engine checks the current scope's bindings first; if there's no match, it moves to the next scope out, and repeats, until it either finds the name or reaches the end of the chain (global scope) without success — at which point it throws a ReferenceError. Importantly, this lookup only ever travels outward, never inward or sideways: a function can't see variables declared inside a sibling function it doesn't contain.",
    stepByStep: [
      "1. Look for the variable in the current (innermost) scope.",
      "2. If not found, move outward to the next enclosing scope and check there.",
      "3. Repeat until the variable is found (lookup stops there) or the global scope is reached with no match (ReferenceError)."
    ],
    mentalModel: "Think of asking a question and passing it up a chain of command: you ask your immediate manager, and if they don't know, they ask theirs, and so on, until someone up the chain has the answer — or you run out of people to ask.",
    practicalCode: `
let base = 10;

function addBase(n) {
  return n + base; // "base" isn't local to addBase, so the chain is walked outward to global
}
console.log(addBase(5)); // 15

function outer() {
  let x = 1;
  function middle() {
    let y = 2;
    function inner() {
      console.log(x + y); // walks past middle's scope, then outer's scope, finds both
    }
    inner();
  }
  middle();
}
outer(); // 3
    `,
    diagram: scopeChainDiagram(),
    keyTakeaway: "Variable lookup always travels outward through the scope chain, one enclosing scope at a time, and it stops the instant a match is found — never continuing further than necessary.",
    relatedTopics: ["lexical-scope", "lexical-environment"]
  },

  "lexical-environment": {
    title: "Lexical Environment",
    chapter: "Chapter IX",
    concept: "A lexical environment is the internal record the JavaScript engine actually uses to implement scope — a map of variable names to their current values, plus a link to the outer environment that contains it.",
    simpleExample: `
function createEnv() {
  let x = 10;
  return () => x; // the returned function keeps a live link to createEnv's environment
}
const getX = createEnv();
console.log(getX()); // 10
    `,
    howItWorks: "Every scope you've read about so far — global, function, block — is a mental-model description of something the engine implements as a lexical environment. Each one has two parts: an environment record (the actual name → value bindings) and a reference to the outer lexical environment. The scope chain from the previous article is really just this chain of environment-record references, followed one link at a time. When a function is created, it stores a reference to the lexical environment active at that moment — that's the mechanism closures use to keep variables alive even after the function that created them has returned.",
    stepByStep: [
      "1. Whenever a scope is entered (a function call, a block), the engine creates a new lexical environment.",
      "2. Its environment record is populated with that scope's declared variables and parameters.",
      "3. It stores a reference to the outer lexical environment — the same reference every function created in this scope will use to resolve outer variables, even later, even after this scope has otherwise finished running."
    ],
    mentalModel: "Think of a lexical environment as an index card: one side lists the local variables and their values, and the other side has an arrow pointing to the next card out — following that trail of arrows from any card eventually reaches the global card.",
    practicalCode: `
function outer() {
  let counter = 0;
  function increment() {
    counter++; // reads and writes through the link to outer's lexical environment
    return counter;
  }
  return increment;
}

const inc = outer();
console.log(inc()); // 1
console.log(inc()); // 2 — outer()'s lexical environment is still alive,
                     // kept around by inc()'s reference to it
    `,
    keyTakeaway: "\"Scope\" is the concept; \"lexical environment\" is the engine's actual mechanism for it — an environment record plus an outer-environment link — and that link is precisely what keeps a closure's captured variables alive.",
    relatedTopics: ["closures", "scope-chain", "hoisting"]
  },

  "hoisting": {
    title: "Hoisting",
    chapter: "Chapter IX",
    concept: "Hoisting describes how JavaScript sets up var and function declarations before running any code in a scope — as if they were physically moved to the top of that scope, even though the source code lists them later.",
    simpleExample: `
console.log(greet()); // "Hi!" — works, even though greet is defined below
console.log(x);       // undefined — not an error, just not assigned yet
var x = 5;

function greet() {
  return "Hi!";
}
    `,
    howItWorks: "Before running any code, the engine processes a scope in a creation phase: it scans for var and function declarations and sets up bindings for them immediately. Function declarations are hoisted completely — their entire body is ready to call from the very first line. var declarations are hoisted only as a name, automatically initialized to undefined, with the actual assignment (= 5) left in place to run later, during the execution phase, when its line is actually reached. let, const, and class are also detected during the creation phase (the engine knows they exist), but they are deliberately left uninitialized rather than set to undefined — accessing them before their declaration line throws, which is the Temporal Dead Zone.",
    stepByStep: [
      "1. Creation phase: the engine scans the scope, sets up var names as undefined, and fully defines any function declarations.",
      "2. Execution phase begins: code now runs top to bottom, in the order it's written.",
      "3. When execution reaches a var's own assignment line, the real value finally replaces the undefined placeholder."
    ],
    mentalModel: "Think of hoisting like a stage crew that sets every prop in its marked spot before the curtain rises — the props (variable names) are physically in place from the very first scene, even though an actor doesn't hand them their actual contents (the value) until their scripted moment arrives.",
    practicalCode: `
// Function declarations: fully hoisted, safe to call early
sayHi(); // "hi"
function sayHi() { console.log("hi"); }

// var: hoisted as a name, but NOT its value
console.log(count); // undefined, not a ReferenceError
var count = 10;

// Common mistake: function EXPRESSIONS are not hoisted the same way —
// only the "var" name is hoisted, not the function it's assigned to.
console.log(typeof sayBye); // "undefined"
sayBye(); // TypeError: sayBye is not a function
var sayBye = function () { console.log("bye"); };
    `,
    diagram: hoistingDiagram(),
    keyTakeaway: "Hoisting only lifts the declaration, never the assignment — var gets an early undefined placeholder, function declarations get their whole body upfront, and let/const/class are tracked but locked behind the Temporal Dead Zone.",
    relatedTopics: ["var", "temporal-dead-zone", "function-declaration"]
  },

  "temporal-dead-zone": {
    title: "Temporal Dead Zone",
    chapter: "Chapter IX",
    concept: "The Temporal Dead Zone (TDZ) is the span of code — from the start of a scope to the line where a let, const, or class is actually declared — during which that binding exists but cannot be touched.",
    simpleExample: `
console.log(count); // ReferenceError: Cannot access 'count' before initialization
let count = 5;
    `,
    howItWorks: "Unlike var, which is hoisted and immediately set to undefined, let and const are hoisted only in the sense that the engine knows the binding will exist somewhere in this scope — but it deliberately leaves it uninitialized until its declaration line actually runs. Any attempt to read or write it before that point throws a ReferenceError, even typeof, which normally never throws for an undeclared name. The TDZ isn't about timing in the real-world sense — it's tied entirely to source-code position within the current scope, from the top of the block down to the declaration.",
    stepByStep: [
      "1. A new scope begins; the engine already knows a let/const/class binding exists somewhere in it.",
      "2. Until execution reaches that binding's own declaration line, the name is in its Temporal Dead Zone — any access throws.",
      "3. Once the declaration line runs, the binding is initialized, and it behaves like a normal variable for the rest of the scope."
    ],
    mentalModel: "Think of a seat with a reservation card on it before the guest has arrived: the seat is accounted for, but sitting in it — even just checking if anyone's there — isn't allowed until the reservation officially starts.",
    practicalCode: `
{
  // TDZ for "value" starts here — the block just began
  // console.log(value); // would throw ReferenceError
  let value = "ready";
  console.log(value); // "ready" — TDZ ended the instant the declaration ran
}

// A common misconception: TDZ is not "let is slower to declare" —
// it's a deliberate safety rail. It catches bugs like this early:
function getDiscount(price) {
  if (price > 100) {
    return price * discountRate; // ReferenceError, not "undefined * price"
  }
  let discountRate = 0.9;
}
// Without a TDZ, this would silently compute NaN instead of failing loudly.
    `,
    diagram: temporalDeadZoneDiagram(),
    keyTakeaway: "The TDZ isn't a quirk to work around — it's what makes using a let/const before its declaration a loud, immediate error instead of a silent undefined bug.",
    relatedTopics: ["hoisting", "let", "const"]
  },

  // --- CHAPTER X: CLOSURES ---

  "closures": {
    title: "Closures",
    chapter: "Chapter X",
    concept: "A closure is a function that retains access to its lexical outer scope even after that outer function has finished executing.",
    simpleExample: `
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
    `,
    howItWorks: "When an inner function captures outer variables, those variables persist in memory via closure references.",
    stepByStep: [
      "1. Define a variable inside an outer function.",
      "2. Return an inner function referencing that variable.",
      "3. Invoke the inner function later to access retained state."
    ],
    mentalModel: "Think of a backpack carrying private items stored securely inside it wherever it travels.",
    practicalCode: `
function makeGreeting(msg) {
  return name => \`\${msg}, \${name}!\`;
}
const sayHi = makeGreeting("Hello");
console.log(sayHi("Alice")); // "Hello, Alice!"
    `,
    keyTakeaway: "Closures enable data privacy and persistent state encapsulation.",
    relatedTopics: ["how-closures-remember-variables", "practical-uses-of-closures"]
  },

  "how-closures-remember-variables": {
    title: "How Closures Remember Variables",
    chapter: "Chapter X",
    concept: "Closures preserve variable references because inner functions maintain active links to their outer lexical environment records.",
    simpleExample: `
function outer() {
  let val = "persisted data";
  return function inner() {
    return val;
  };
}
const getVal = outer();
console.log(getVal()); // "persisted data"
    `,
    howItWorks: "Even after outer execution context pops off the call stack, the environment record stays alive in heap memory if referenced by a closure.",
    stepByStep: [
      "1. Outer function creates variables in lexical scope.",
      "2. Inner function references those variables.",
      "3. Engine retains environment data in memory."
    ],
    mentalModel: "Think of a root anchor system keeping nutrients connected even after the main plant stem is gone.",
    practicalCode: `
function secretHolder(secret) {
  return {
    getSecret: () => secret
  };
}
    `,
    keyTakeaway: "Closures keep outer scope variables alive in memory as long as inner function references persist.",
    relatedTopics: ["closures", "practical-uses-of-closures"]
  },

  "practical-uses-of-closures": {
    title: "Practical Uses of Closures",
    chapter: "Chapter X",
    concept: "Closures are commonly used for data privacy, state encapsulation, and creating function factories.",
    simpleExample: `
function createWallet(initialBalance) {
  let balance = initialBalance;
  return {
    deposit(amount) { balance += amount; return balance; },
    getBalance() { return balance; }
  };
}
const myWallet = createWallet(100);
myWallet.deposit(50);
console.log(myWallet.getBalance()); // 150
    `,
    howItWorks: "Variables are hidden from direct outside tampering, exposed only via controlled closure methods.",
    stepByStep: [
      "1. Encapsulate private state variables inside a function.",
      "2. Expose privileged inner method closures.",
      "3. Manage state modifications securely."
    ],
    mentalModel: "Think of a bank vault where cash is private and accessible only through official teller deposit/withdrawal window methods.",
    practicalCode: `
function counterFactory() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count
  };
}
    `,
    keyTakeaway: "Closures provide robust encapsulation and state privacy patterns in JavaScript.",
    relatedTopics: ["closures", "how-closures-remember-variables"]
  },
  // --- CHAPTER XI: THE JAVASCRIPT RUNTIME ---
  "what-happens-when-js-runs": {
    title: "What Happens When JavaScript Runs?",
    chapter: "Chapter XI",
    concept: "When a JavaScript file runs, the engine parses the code, generates an Abstract Syntax Tree (AST), compiles it into bytecode, and executes it within an execution environment.",
    simpleExample: `
console.log("Start");
let x = 5 + 5;
console.log(x);
    `,
    howItWorks: "The environment allocates memory via the heap and orchestrates execution tracking via the call stack, coordinating asynchronous hooks through the runtime system.",
    stepByStep: [
      "1. Source code is loaded and parsed into an AST.",
      "2. Ignition interpreter compiles AST into bytecode and executes it.",
      "3. TurboFan optimizing compiler JIT-optimizes hot code paths during runtime."
    ],
    mentalModel: "Think of a factory assembly line where raw design blueprints are parsed, translated into machine tasks, and processed piece by piece.",
    practicalCode: `
// Engine reads top-to-bottom, builds execution contexts, and evaluates expressions.
const a = 10;
const b = 20;
console.log(a + b);
    `,
    diagram: `
+-------------------------------------------------------------+
|                     JAVASCRIPT RUNTIME                      |
|                                                             |
|  +------------------+     +------------------------------+  |
|  |   Source Code    | --> | Parser -> AST -> Interpreter |  |
|  +------------------+     +------------------------------+  |
|                                          |                  |
|                                          v                  |
|  +------------------+     +------------------------------+  |
|  |    Call Stack    | <-> |       Memory Heap            |  |
|  +------------------+     +------------------------------+  |
|           |                                                 |
|           v                                                 |
|  +------------------+                                       |
|  | Web APIs / Node  |                                       |
|  +------------------+                                       |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "JavaScript execution involves parsing, bytecode compilation, memory allocation, and sequential stack processing.",
    sourceReference: "MDN Web Docs (JavaScript execution model) & JavaScript.info",
    relatedTopics: ["javascript-runtime", "javascript-engine"]
  },

  "javascript-runtime": {
    title: "JavaScript Runtime",
    chapter: "Chapter XI",
    concept: "The JavaScript runtime is the overall environment (browser or Node.js) providing the engine, Web APIs, callback queues, and the event loop.",
    simpleExample: `
setTimeout(() => {
  console.log("Async callback executed via runtime environment");
}, 1000);
    `,
    howItWorks: "While the engine executes raw JS code, the runtime supplies external features like DOM APIs, network fetch requests, and timer services.",
    stepByStep: [
      "1. JavaScript Engine executes core call stack instructions.",
      "2. Browser/Node Runtime manages asynchronous Web API hooks.",
      "3. Event loop coordinates tasks back to the engine."
    ],
    mentalModel: "Think of an engine inside a complete car vehicle system equipped with wheels, steering, and dashboard electronics.",
    practicalCode: `
// 'window' or 'setTimeout' are provided by the runtime environment, not core ECMAScript spec.
console.log(typeof window !== "undefined" ? "Browser Runtime" : "Node Runtime");
    `,
    diagram: `
+-------------------------------------------------------------+
|                      BROWSER RUNTIME                        |
|                                                             |
|  +-------------------------------------------------------+  |
|  |                     JS ENGINE                         |  |
|  |   +-------------------+     +----------------------+  |  |
|  |   |    Call Stack     |     |      Memory Heap     |  |  |
|  |   +-------------------+     +----------------------+  |  |
|  +-------------------------------------------------------+  |
|         ^                                         |         |
|         | (Push tasks)                            | (Deleg) |
|  +--------------+   +---------------+   +------------+      |
|  |  Event Loop  |   | Callback Q.   |   |  Web APIs  |      |
|  +--------------+   +---------------+   +------------+      |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The runtime combines the core JavaScript engine with platform-specific APIs and concurrency loops.",
    sourceReference: "MDN Web Docs: Concurrency model and the event loop",
    relatedTopics: ["what-happens-when-js-runs", "javascript-engine"]
  },

  "javascript-engine": {
    title: "JavaScript Engine",
    chapter: "Chapter XI",
    concept: "A JavaScript engine (like Google's V8, SpiderMonkey, or JavaScriptCore) is a program that translates source code into machine code.",
    simpleExample: `
// V8 compiles this JavaScript into native machine code dynamically via JIT compilation.
function compute() {
  return 42 * 2;
}
    `,
    howItWorks: "The engine contains a call stack for execution control and a memory heap for data allocation, powered by JIT (Just-In-Time) compilation tiers.",
    stepByStep: [
      "1. Parser analyzes code text to build an Abstract Syntax Tree.",
      "2. Interpreter (Ignition in V8) generates bytecode quickly.",
      "3. Optimizing compiler (TurboFan in V8) profiles code and compiles hot functions into optimized machine code."
    ],
    mentalModel: "Think of a high-speed translation computer chip converting foreign language scripts into native commands on the fly.",
    practicalCode: `
// High-frequency invocation triggers JIT optimization inside the engine.
function loopTest() {
  let sum = 0;
  for(let i = 0; i < 1000; i++) sum += i;
  return sum;
}
loopTest();
    `,
    diagram: `
+-------------------------------------------------------------+
|                      JS ENGINE (e.g., V8)                   |
|                                                             |
|  Source Code --> Parser --> AST --> Interpreter (Bytecode)  |
|                                           |                 |
|                                           v                 |
|                                   Optimizing Compiler       |
|                                   (Machine Code)            |
|                                                             |
|  +-----------------------+     +-------------------------+  |
|  |      Call Stack       |     |       Memory Heap       |  |
|  +-----------------------+     +-------------------------+  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Engines use interpreters and JIT compilers to execute JavaScript code efficiently at runtime.",
    sourceReference: "ECMAScript Specification & MDN Web Docs",
    relatedTopics: ["what-happens-when-js-runs", "javascript-runtime"]
  },

  // --- CHAPTER XII: EXECUTION CONTEXT ---
  "execution-context": {
    title: "Execution Context",
    chapter: "Chapter XII",
    concept: "An execution context is an abstract environment wrapper that tracks the evaluation and execution of JavaScript code.",
    simpleExample: `
let globalVar = "Global";
function run() {
  let localVar = "Local";
  console.log(globalVar, localVar);
}
run();
    `,
    howItWorks: "Every execution context contains three core properties: Lexical Environment, Variable Environment, and the 'this' binding value.",
    stepByStep: [
      "1. Code evaluation triggers context creation.",
      "2. Variable and function bindings are registered during creation phase.",
      "3. Code statements are evaluated during execution phase."
    ],
    mentalModel: "Think of an isolated sandbox room containing all tools, documents, and rules required for a specific task.",
    practicalCode: `
const obj = {
  id: 101,
  showContext() { console.log(this.id); }
};
obj.showContext();
    `,
    diagram: `
+-------------------------------------------------------------+
|                     EXECUTION CONTEXT                       |
|                                                             |
|  +-------------------------------------------------------+  |
|  | 1. Lexical Environment (Environment Record + Outer)   |  |
|  +-------------------------------------------------------+  |
|  | 2. Variable Environment (var declarations storage)    |  |
|  +-------------------------------------------------------+  |
|  | 3. This Binding (References invocation context object)|  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Execution contexts manage variable accessibility, scope chains, and 'this' keyword references.",
    sourceReference: "ECMAScript Specification (Section 9.4) & MDN Web Docs",
    relatedTopics: ["global-execution-context", "function-execution-context"]
  },

  "global-execution-context": {
    title: "Global Execution Context",
    chapter: "Chapter XII",
    concept: "The Global Execution Context (GEC) is the base execution environment created automatically when a JavaScript script first starts running.",
    simpleExample: `
const globalApp = "MyApp";
function display() {
  console.log(globalApp);
}
display();
    `,
    howItWorks: "The GEC creates the global object (window in browsers, global in Node.js), sets up the 'this' binding pointing to it, and runs the root script.",
    stepByStep: [
      "1. Script loads into memory.",
      "2. Global Execution Context is pushed to the bottom of the call stack.",
      "3. Global variables and function declarations are hoisted."
    ],
    mentalModel: "Think of the foundational ground floor foundation of a multi-story building structure.",
    practicalCode: `
console.log(this === window); // true (in browser global context)
    `,
    diagram: `
+-------------------------------------------------------------+
|                GLOBAL EXECUTION CONTEXT (GEC)               |
|                                                             |
|  +-------------------------------------------------------+  |
|  | Global Object (window / global)                       |  |
|  +-------------------------------------------------------+  |
|  | 'this' Binding = Global Object                        |  |
|  +-------------------------------------------------------+  |
|  | Variable Record (Hoisted global variables & functions)|  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The Global Execution Context serves as the base environment for all top-level script execution.",
    sourceReference: "JavaScript.info & MDN Web Docs",
    relatedTopics: ["execution-context", "function-execution-context"]
  },

  "function-execution-context": {
    title: "Function Execution Context",
    chapter: "Chapter XII",
    concept: "A Function Execution Context (FEC) is created dynamically every time a function is invoked, establishing a local environment for its variables.",
    simpleExample: `
function calculate(x) {
  let factor = 2;
  return x * factor;
}
calculate(10);
    `,
    howItWorks: "Each function call instantiates a new unique FEC containing its arguments, local variables, parameters, and parent lexical reference link.",
    stepByStep: [
      "1. Function is invoked via parentheses.",
      "2. New Function Execution Context is created and pushed onto the call stack.",
      "3. Local parameters and variables are initialized during creation phase."
    ],
    mentalModel: "Think of opening an isolated private meeting room whenever a specific task group convenes.",
    practicalCode: `
function multiply(a, b) {
  const result = a * b; // Managed inside local FEC
  return result;
}
multiply(3, 4);
    `,
    diagram: `
+-------------------------------------------------------------+
|               FUNCTION EXECUTION CONTEXT (FEC)              |
|                                                             |
|  +-------------------------------------------------------+  |
|  | Arguments Object & Parameters                         |  |
|  +-------------------------------------------------------+  |
|  | Local Variable Environment (let, const, var)          |  |
|  +-------------------------------------------------------+  |
|  | Outer Lexical Environment Reference (Scope Chain Link)|  |
|  +-------------------------------------------------------+  |
|  | 'this' Binding                                        |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Every function call gets its own distinct execution context to manage local state.",
    sourceReference: "MDN Web Docs (Execution model)",
    relatedTopics: ["execution-context", "creation-phase"]
  },

  "creation-phase": {
    title: "Creation Phase",
    chapter: "Chapter XII",
    concept: "The creation phase is the setup stage of an execution context before code execution begins, during which hoisting and memory allocation occur.",
    simpleExample: `
console.log(name); // undefined (due to creation phase hoisting)
var name = "Alice";
    `,
    howItWorks: "The engine scans the code for variable and function declarations, allocating memory space (setting var to undefined, and storing function declarations fully).",
    stepByStep: [
      "1. Engine initializes the scope chain and 'this' binding.",
      "2. Function declarations are stored completely in memory.",
      "3. Variables declared with var are initialized to undefined (let/const remain uninitialized in temporal dead zone)."
    ],
    mentalModel: "Think of setting up desks, labeling name tags, and preparing attendance sheets before a meeting starts.",
    practicalCode: `
foo(); // Runs successfully because function declaration is stored in creation phase
function foo() {
  console.log("Hoisted successfully");
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                      CREATION PHASE                         |
|                                                             |
|  1. Setup Scope Chain & 'this' Binding                      |
|  2. Allocate memory for Function Declarations (Fully Stored)|
|  3. Allocate memory for 'var' variables (Initialized: undefined)|
|  4. Allocate memory for 'let'/'const' (Uninitialized / TDZ) |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Hoisting is a direct result of the memory allocation steps performed during the execution context creation phase.",
    sourceReference: "JavaScript.info & MDN Web Docs",
    relatedTopics: ["execution-context", "execution-phase"]
  },

  "execution-phase": {
    title: "Execution Phase",
    chapter: "Chapter XII",
    concept: "The execution phase is the stage where the JavaScript engine steps through code line-by-line, assigning values and running statements.",
    simpleExample: `
let x = 10;
let y = 20;
let sum = x + y; // Values assigned and computed here
    `,
    howItWorks: "Variables are assigned their concrete values, expressions are evaluated, and function calls are triggered sequentially.",
    stepByStep: [
      "1. Creation phase completes setting up memory bindings.",
      "2. Engine executes code line-by-line from top to bottom.",
      "3. Variables receive assigned values and operations execute."
    ],
    mentalModel: "Think of executing checklist tasks sequentially during an active live operation.",
    practicalCode: `
let score = 0;
score = 100; // Value assigned during execution phase
console.log(score);
    `,
    diagram: `
+-------------------------------------------------------------+
|                      EXECUTION PHASE                        |
|                                                             |
|  1. Step through code line-by-line                          |
|  2. Assign actual values to variables                       |
|  3. Evaluate expressions and run function statements        |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Code values are assigned and processed sequentially during the execution phase.",
    sourceReference: "MDN Web Docs (Execution model)",
    relatedTopics: ["creation-phase", "execution-context"]
  },

  // --- CHAPTER XIII: CALL STACK ---
  "call-stack": {
    title: "Call Stack",
    chapter: "Chapter XIII",
    concept: "The call stack is a LIFO (Last-In, First-Out) data structure that tracks where the program is in its execution flow.",
    simpleExample: `
function first() {
  second();
}
function second() {
  console.log("Inside second");
}
first();
    `,
    howItWorks: "When a function is called, its execution context is pushed onto the stack. When it returns, it is popped off.",
    stepByStep: [
      "1. Script execution starts, pushing Global Execution Context onto the stack.",
      "2. Function calls push new execution contexts on top.",
      "3. As functions complete, contexts are popped off sequentially."
    ],
    mentalModel: "Think of a physical stack of cafeteria trays: you add trays on top and remove them from the top.",
    practicalCode: `
function a() { b(); }
function b() { c(); }
function c() { console.log("Stack trace tracking"); }
a();
    `,
    diagram: `
+-------------------------------------------------------------+
|                         CALL STACK (LIFO)                   |
|                                                             |
|  |  c() Execution Context  | (Top - Executing now)          |
|  +-------------------------+                                |
|  |  b() Execution Context  |                                |
|  +-------------------------+                                |
|  |  a() Execution Context  |                                |
|  +-------------------------+                                |
|  | Global Execution Context| (Bottom)                       |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "JavaScript is single-threaded with a single call stack, processing one execution context at a time.",
    sourceReference: "MDN Web Docs (Concurrency model and the event loop)",
    relatedTopics: ["stack-overflow", "execution-context"]
  },

  "stack-overflow": {
    title: "Stack Overflow",
    chapter: "Chapter XIII",
    concept: "A stack overflow occurs when the call stack exceeds its maximum memory allocation limit, usually caused by infinite recursion.",
    simpleExample: `
function recurse() {
  recurse(); // Infinite recursive call without base case
}
recurse(); // RangeError: Maximum call stack size exceeded
    `,
    howItWorks: "Every nested function call adds a frame to the stack. Without an exit condition, stack frames accumulate until memory exhaustion.",
    stepByStep: [
      "1. Function calls itself continuously without a base case.",
      "2. Stack memory fills up past browser/runtime limits.",
      "3. Engine throws a RangeError exception."
    ],
    mentalModel: "Think of piling boxes onto a small table until the entire tower collapses under weight limits.",
    practicalCode: `
// Safe recursion with base case prevents stack overflow:
function countdown(n) {
  if (n <= 0) return;
  countdown(n - 1);
}
countdown(5);
    `,
    diagram: `
+-------------------------------------------------------------+
|                       STACK OVERFLOW                        |
|                                                             |
|  [ recurse() ]  ^                                           |
|  [ recurse() ]  | Infinite Stack Frames Accumulation        |
|  [ recurse() ]  | (Exceeds Maximum Memory Limit)            |
|  [ recurse() ]  |                                           |
|  ... RangeError: Maximum call stack size exceeded           |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Always ensure recursive functions have clear base case exit conditions to prevent stack overflows.",
    sourceReference: "MDN Web Docs & JavaScript.info",
    relatedTopics: ["call-stack", "recursion"]
  },

  // --- CHAPTER XIV: HEAP & MEMORY ---
  "heap": {
    title: "Heap",
    chapter: "Chapter XIV",
    concept: "The memory heap is an unstructured, large region of computer memory used for dynamic allocation of objects, arrays, and functions.",
    simpleExample: `
const user = { name: "Alice", scores: [95, 88] };
    `,
    howItWorks: "Unlike the structured stack, heap memory stores reference types whose sizes can change dynamically during runtime.",
    stepByStep: [
      "1. Complex data structures (objects/arrays) are instantiated.",
      "2. Engine allocates dynamic space in the memory heap.",
      "3. Variables on the stack store memory references pointing to heap addresses."
    ],
    mentalModel: "Think of an open warehouse storage yard where large boxes of items can be placed in any available open space.",
    practicalCode: `
const dataStore = { items: [1, 2, 3], metadata: { active: true } };
    `,
    diagram: `
+-------------------------------------------------------------+
|                      STACK vs HEAP                          |
|                                                             |
|  Call Stack (Primitives / References)    Memory Heap        |
|  +-------------------+                   +---------------+  |
|  | userRef --------> | ----------------> | { name: "Bob"}|  |
|  +-------------------+                   +---------------+  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The memory heap manages dynamic storage allocation for reference types like objects and arrays.",
    sourceReference: "MDN Web Docs (Memory Management)",
    relatedTopics: ["memory", "garbage-collection"]
  },

  "memory": {
    title: "Memory",
    chapter: "Chapter XIV",
    concept: "JavaScript memory management revolves around allocating space when variables are created and releasing it when no longer needed.",
    simpleExample: `
let username = "JavaScript"; // Memory allocated
// ... code execution ...
username = null; // Memory eligible for reclamation
    `,
    howItWorks: "JavaScript engines handle memory lifecycles automatically through allocation, usage, and garbage collection.",
    stepByStep: [
      "1. Allocate memory required for variables, objects, and functions.",
      "2. Use allocated memory during program execution.",
      "3. Release unneeded memory via garbage collection."
    ],
    mentalModel: "Think of renting a storage locker, using it for inventory, and cleaning it out when items are discarded.",
    practicalCode: `
function createData() {
  let heavyArray = new Array(1000000).fill(0);
  return heavyArray.length;
}
createData(); // Array memory becomes eligible for cleanup after scope exit.
    `,
    diagram: `
+-------------------------------------------------------------+
|                     MEMORY LIFECYCLE                        |
|                                                             |
|  1. Allocate ---> 2. Use Memory ---> 3. Release (GC)        |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "JavaScript automates memory management, though developers must avoid memory leaks from unreferenced retained pointers.",
    sourceReference: "MDN Web Docs: Memory Management",
    relatedTopics: ["heap", "garbage-collection"]
  },

  "garbage-collection": {
    title: "Garbage Collection",
    chapter: "Chapter XIV",
    concept: "Garbage collection is the automated process by which the JavaScript engine cleans up memory by finding and removing unreachable objects.",
    simpleExample: `
let obj = { name: "Temp" };
obj = null; // Original object is now unreachable and collected
    `,
    howItWorks: "Using algorithms like 'Mark-and-Sweep', the engine periodically checks root references to determine if objects can still be reached.",
    stepByStep: [
      "1. Roots (global objects and active stack frames) are identified.",
      "2. 'Mark-and-Sweep' traverses all reachable child references from roots.",
      "3. Unmarked unreachable memory blocks are swept and reclaimed."
    ],
    mentalModel: "Think of a sanitation crew walking through a building throwing away items that have no owners attached.",
    practicalCode: `
function process() {
  let temporaryObj = { data: 123 };
  return temporaryObj.data;
}
process(); // temporaryObj is garbage collected after function execution completes.
    `,
    diagram: `
+-------------------------------------------------------------+
|                  MARK-AND-SWEEP GARBAGE COLLECTION          |
|                                                             |
|  Roots (Window / Stack) --> Reachable Object (Kept)         |
|                                                             |
|  Unreachable Object x ----> (Swept & Memory Reclaimed)      |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Automated garbage collection prevents memory leaks by reclaiming unreferenced heap allocations.",
    sourceReference: "MDN Web Docs (Memory Management)",
    relatedTopics: ["heap", "memory"]
  },

  // --- CHAPTER XV: THE EVENT LOOP ---
  "event-loop": {
    title: "Event Loop",
    chapter: "Chapter XV",
    concept: "The Event Loop is a continuous monitoring mechanism that coordinates execution between the call stack, task queues, and microtask queues.",
    simpleExample: `
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
    `,
    howItWorks: "The event loop checks if the call stack is empty. If it is, it takes pending tasks from the queues and pushes them onto the stack for execution.",
    stepByStep: [
      "1. Execute all synchronous code on the call stack.",
      "2. Process all microtasks in the microtask queue entirely.",
      "3. Process a single task from the macrotask queue and repeat."
    ],
    mentalModel: "Think of an attentive restaurant manager continuously checking if kitchen chefs are free to take new orders.",
    practicalCode: `
setTimeout(() => console.log("Macro task"), 0);
Promise.resolve().then(() => console.log("Micro task"));
console.log("Sync code");
// Output order: Sync code -> Micro task -> Macro task
    `,
    diagram: `
+-------------------------------------------------------------+
|                        THE EVENT LOOP                       |
|                                                             |
|  +------------------+           +------------------------+  |
|  |    Call Stack    | <-------- |     Microtask Queue    |  |
|  +------------------+           +------------------------+  |
|           ^                                                 |
|           | (When Stack is Empty)                           |
|  +------------------+           +------------------------+  |
|  |    Event Loop    | <-------- |     Macrotask Queue    |  |
|  +------------------+           +------------------------+  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The Event Loop enables JavaScript's non-blocking asynchronous concurrency model.",
    sourceReference: "JavaScript.info & MDN Web Docs",
    relatedTopics: ["how-the-event-loop-works", "microtask-queue"]
  },

  "how-the-event-loop-works": {
    title: "How the Event Loop Works",
    chapter: "Chapter XV",
    concept: "The event loop runs an endless loop checking the call stack and queues, prioritizing microtasks over macrotasks.",
    simpleExample: `
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
    `,
    howItWorks: "It empties the call stack first, clears the entire microtask queue, executes one macrotask, updates rendering if needed, and repeats.",
    stepByStep: [
      "1. Stack runs main script sync code.",
      "2. Stack becomes empty -> Event loop drains all microtasks.",
      "3. Event loop picks one macrotask and pushes it to the stack."
    ],
    mentalModel: "Think of a priority checkout lane where VIP priority queue members are always served before general queue customers.",
    practicalCode: `
queueMicrotask(() => console.log("Microtask 1"));
setTimeout(() => console.log("Macrotask 1"), 0);
    `,
    diagram: `
+-------------------------------------------------------------+
|                     EVENT LOOP EXECUTION FLOW               |
|                                                             |
|  1. Execute Call Stack (Sync Code)                          |
|  2. Drain ALL Microtasks (Promises / queueMicrotask)        |
|  3. Render UI / Paint (if frame boundary reached)           |
|  4. Execute ONE Macrotask (setTimeout / setInterval)        |
|  5. Repeat loop                                             |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The event loop strictly prioritizes microtasks over macrotasks after every stack clearance.",
    sourceReference: "JavaScript.info (Event loop: microtasks and macrotasks)",
    relatedTopics: ["event-loop", "microtask-queue"]
  },

  // --- CHAPTER XVI: ASYNCHRONOUS JAVASCRIPT ---
  "synchronous-javascript": {
    title: "Synchronous JavaScript",
    chapter: "Chapter XVI",
    concept: "Synchronous JavaScript executes code line-by-line in a strict sequential order where each operation must complete before the next begins.",
    simpleExample: `
console.log("Task 1");
console.log("Task 2");
console.log("Task 3");
    `,
    howItWorks: "Operations run directly on the single call stack. If a task takes too long, subsequent code execution is blocked.",
    stepByStep: [
      "1. Statement 1 executes on call stack and finishes.",
      "2. Statement 2 executes on call stack and finishes.",
      "3. Statement 3 executes on call stack and finishes."
    ],
    mentalModel: "Think of a single-lane highway tunnel where cars must pass through one single file in order.",
    practicalCode: `
const result = 5 + 5; // Evaluated synchronously immediately
console.log(result);
    `,
    diagram: `
+-------------------------------------------------------------+
|                     SYNCHRONOUS EXECUTION                   |
|                                                             |
|  [ Line 1 ] -> [ Line 2 ] -> [ Line 3 ] (Strict Sequence)   |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Synchronous code is blocking and executes in predictable top-to-bottom order.",
    sourceReference: "MDN Web Docs",
    relatedTopics: ["asynchronous-javascript", "blocking-vs-non-blocking"]
  },

  "asynchronous-javascript": {
    title: "Asynchronous JavaScript",
    chapter: "Chapter XVI",
    concept: "Asynchronous JavaScript allows tasks (like network requests or timers) to execute in the background without blocking the main execution thread.",
    simpleExample: `
console.log("Start");
setTimeout(() => {
  console.log("Async operation complete");
}, 1000);
console.log("End");
    `,
    howItWorks: "Long-running or deferred tasks are delegated to Web APIs, freeing the call stack to continue executing synchronous code.",
    stepByStep: [
      "1. Async operation is initiated and handed off to Web APIs.",
      "2. Main call stack continues executing subsequent synchronous lines.",
      "3. Once complete, callback is pushed to queue for event loop processing."
    ],
    mentalModel: "Think of placing a restaurant food order at the counter and getting a buzzer, allowing you to sit down and chat while your food is prepared.",
    practicalCode: `
fetch("https://api.example.com/data")
  .then(res => res.json())
  .then(data => console.log(data));
    `,
    diagram: `
+-------------------------------------------------------------+
|                  ASYNCHRONOUS CONCURRENCY                   |
|                                                             |
|  Call Stack ---> Delegates Timer/Fetch ---> Web APIs        |
|                                                   |         |
|  Call Stack <--- Event Loop <--- Callback Queue <---+         |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Asynchronous programming prevents UI freezing and blocking during slow I/O or network tasks.",
    sourceReference: "MDN Web Docs: Concurrency model",
    relatedTopics: ["synchronous-javascript", "web-apis"]
  },

  "blocking-vs-non-blocking": {
    title: "Blocking vs Non-Blocking",
    chapter: "Chapter XVI",
    concept: "Blocking execution halts further code processing until a task completes, whereas non-blocking code delegates operations and continues immediately.",
    simpleExample: `
// Blocking example (Heavy sync loop):
// while(true) { /* freezes UI */ }

// Non-blocking example:
setTimeout(() => console.log("Non-blocking"), 1000);
    `,
    howItWorks: "Blocking code traps the single call stack, freezing the entire application runtime. Non-blocking asynchronous patterns keep the event loop responsive.",
    stepByStep: [
      "1. Identify heavy or I/O-bound operations.",
      "2. Apply non-blocking asynchronous APIs (Promises, async/await, timers).",
      "3. Maintain responsive call stack execution flow."
    ],
    mentalModel: "Think of a bank cashier blocking the queue by handling a complex loan application vs. sending customers to a side consultant desk.",
    practicalCode: `
// Non-blocking timer delegation
setTimeout(() => console.log("Executed asynchronously"), 0);
console.log("Executed first");
    `,
    diagram: `
+-------------------------------------------------------------+
|                BLOCKING vs NON-BLOCKING                     |
|                                                             |
|  Blocking:     [ Heavy Task ] ----------------> (Frozen)    |
|  Non-Blocking: [ Delegate ] --> [ Call Stack Free ]        |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Writing non-blocking code is essential for maintaining smooth, responsive web applications.",
    sourceReference: "Node.js Documentation & MDN Web Docs",
    relatedTopics: ["asynchronous-javascript", "event-loop"]
  },

  "web-apis": {
    title: "Web APIs",
    chapter: "Chapter XVI",
    concept: "Web APIs are built-in browser features (like setTimeout, fetch, DOM events) that handle asynchronous tasks outside the core JavaScript engine.",
    simpleExample: `
window.setTimeout(() => {
  console.log("Timer finished in Web API environment");
}, 2000);
    `,
    howItWorks: "When you call an async Web API, the browser runs the background operation independently from the main JavaScript execution thread.",
    stepByStep: [
      "1. JavaScript calls a Web API method (e.g., fetch or timer).",
      "2. Browser Web API handles the background operation.",
      "3. Upon completion, the callback is pushed into the task queue."
    ],
    mentalModel: "Think of department store customer service counters handling specialized tasks while the main cashier deals with checkout.",
    practicalCode: `
navigator.geolocation.getCurrentPosition(position => {
  console.log(position.coords.latitude);
});
    `,
    diagram: `
+-------------------------------------------------------------+
|                         WEB APIS                            |
|                                                             |
|  JS Engine (Call Stack) ---> Calls ---> [ setTimeout API ]  |
|                                              |              |
|  JS Engine <--- Event Loop <--- Queue <------+ (Timer Done) |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Web APIs provide the underlying machinery for browser-based asynchronous operations.",
    sourceReference: "MDN Web Docs (Web API reference)",
    relatedTopics: ["asynchronous-javascript", "callback-queue"]
  },

  "callbacks": {
    title: "Callbacks",
    chapter: "Chapter XVI",
    concept: "A callback function is passed as an argument to an asynchronous operation, to be executed once the operation finishes.",
    simpleExample: `
function fetchData(callback) {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}
fetchData(msg => console.log(msg));
    `,
    howItWorks: "The callback reference is stored by the runtime and pushed into a task queue when the async operation completes.",
    stepByStep: [
      "1. Pass callback function into async function call.",
      "2. Async API executes operation in background.",
      "3. Callback is invoked when data or timer is ready."
    ],
    mentalModel: "Think of giving your phone number to a store clerk so they can call you when your item arrives.",
    practicalCode: `
setTimeout(function() {
  console.log("Callback executed after timer");
}, 500);
    `,
    diagram: `
+-------------------------------------------------------------+
|                      CALLBACK FLOW                          |
|                                                             |
|  Async Call + Callback ---> Web API ---> Queue ---> Stack   |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Callbacks form the foundational pattern for handling asynchronous events in JavaScript.",
    sourceReference: "JavaScript.info & MDN Web Docs",
    relatedTopics: ["callback-queue", "asynchronous-javascript"]
  },

  "callback-queue": {
    title: "Callback Queue",
    chapter: "Chapter XVI",
    concept: "The callback queue (or macrotask queue) holds asynchronous task callbacks waiting to be pushed onto the call stack.",
    simpleExample: `
setTimeout(() => console.log("Task in queue"), 0);
    `,
    howItWorks: "When a Web API finishes its task, it places its callback into the callback queue. The event loop moves it to the stack when empty.",
    stepByStep: [
      "1. Web API completes background task.",
      "2. Callback is enqueued inside the callback queue.",
      "3. Event loop dequeues it into the call stack when stack is clear."
    ],
    mentalModel: "Think of customers waiting in an orderly single-file line outside a service teller window.",
    practicalCode: `
setTimeout(() => console.log("Macrotask queue item"), 0);
    `,
    diagram: `
+-------------------------------------------------------------+
|                      CALLBACK QUEUE                         |
|                                                             |
|  [ Callback 1 ] -> [ Callback 2 ] -> [ Callback 3 ]         |
|         |                                                   |
|         v (Moved by Event Loop when Call Stack is empty)    |
|    Call Stack                                               |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The callback queue stores macrotasks waiting for execution by the JavaScript engine.",
    sourceReference: "JavaScript.info & MDN Web Docs",
    relatedTopics: ["microtask-queue", "macrotask-queue"]
  },

  "microtask-queue": {
    title: "Microtask Queue",
    chapter: "Chapter XVI",
    concept: "The microtask queue holds high-priority asynchronous tasks like Promise `.then()` callbacks and `queueMicrotask`.",
    simpleExample: `
Promise.resolve().then(() => console.log("Microtask 1"));
    `,
    howItWorks: "After every call stack clearance, the event loop drains the *entire* microtask queue before moving on to macrotasks or rendering.",
    stepByStep: [
      "1. Promise resolves or `queueMicrotask` is called.",
      "2. Callback is placed in the microtask queue.",
      "3. Event loop executes all microtasks fully before any macrotask."
    ],
    mentalModel: "Think of express emergency medical triage patients who jump ahead of regular waiting room patients.",
    practicalCode: `
queueMicrotask(() => console.log("Express microtask"));
    `,
    diagram: `
+-------------------------------------------------------------+
|                      MICROTASK QUEUE                        |
|                                                             |
|  [ Promise .then() ] -> [ queueMicrotask ] (Drained 100%)    |
|         |                                                   |
|         v (Executed BEFORE any Macrotask or Render)         |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Microtasks have higher priority than macrotasks and run immediately after the call stack empties.",
    sourceReference: "JavaScript.info (Event loop: microtasks and macrotasks)",
    relatedTopics: ["macrotask-queue", "promises"]
  },

  "macrotask-queue": {
    title: "Macrotask Queue",
    chapter: "Chapter XVI",
    concept: "The macrotask queue (or task queue) holds standard asynchronous tasks like `setTimeout`, `setInterval`, and I/O events.",
    simpleExample: `
setInterval(() => console.log("Macrotask tick"), 1000);
    `,
    howItWorks: "The event loop processes one macrotask from this queue per cycle, after all microtasks have been completely cleared.",
    stepByStep: [
      "1. Timers or I/O events finish and enqueue tasks.",
      "2. Microtask queue is checked and cleared.",
      "3. Event loop executes exactly ONE macrotask."
    ],
    mentalModel: "Think of regular scheduled train departures leaving the station one by one per interval cycle.",
    practicalCode: `
setTimeout(() => console.log("Macrotask execution"), 0);
    `,
    diagram: `
+-------------------------------------------------------------+
|                      MACROTASK QUEUE                        |
|                                                             |
|  [ setTimeout ] -> [ setInterval ] -> [ I/O Task ]          |
|         |                                                   |
|         v (Processed ONE task per event loop cycle)         |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Macrotasks represent standard asynchronous event tasks processed one per event loop cycle.",
    sourceReference: "JavaScript.info & HTML Living Standard",
    relatedTopics: ["microtask-queue", "event-loop"]
  },

  // --- CHAPTER XVII: PROMISES ---
  "promises": {
    title: "Promises",
    chapter: "Chapter XVII",
    concept: "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.",
    simpleExample: `
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
});
promise.then(result => console.log(result));
    `,
    howItWorks: "Promises replace messy nested callback pyramids with clean, chainable asynchronous interfaces.",
    stepByStep: [
      "1. Instantiate a Promise with an executor function (resolve, reject).",
      "2. Perform async work inside executor.",
      "3. Call resolve(value) on success or reject(error) on failure."
    ],
    mentalModel: "Think of ordering a custom item receipt ticket: you hold a promise stub until the item is ready for pickup.",
    practicalCode: `
const checkStock = new Promise((resolve, reject) => {
  let inStock = true;
  inStock ? resolve("Item available") : reject("Out of stock");
});
    `,
    diagram: `
+-------------------------------------------------------------+
|                         PROMISE OBJECT                      |
|                                                             |
|  [ Pending ] ---> (resolve) ---> [ Fulfilled (.then) ]      |
|              ---> (reject)  ---> [ Rejected (.catch) ]      |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Promises provide robust syntax and state tracking for asynchronous operations.",
    sourceReference: "MDN Web Docs (Using Promises)",
    relatedTopics: ["promise-states", "promise-chaining"]
  },

  "promise-states": {
    title: "Promise States",
    chapter: "Chapter XVII",
    concept: "A Promise always exists in one of three mutually exclusive states: Pending, Fulfilled, or Rejected.",
    simpleExample: `
const p = Promise.resolve("Done");
// State: Fulfilled, Value: "Done"
    `,
    howItWorks: "Once settled (either fulfilled or rejected), a promise's state cannot change, and its immutable result value is locked in.",
    stepByStep: [
      "1. Initial state is **Pending** while async work runs.",
      "2. State transitions to **Fulfilled** upon successful resolution.",
      "3. State transitions to **Rejected** if an error occurs."
    ],
    mentalModel: "Think of a shipped package tracking status: Pending transit, Delivered (Fulfilled), or Returned (Rejected).",
    practicalCode: `
const samplePromise = new Promise((res, rej) => setTimeout(res, 100, "Ready"));
    `,
    diagram: `
+-------------------------------------------------------------+
|                         PROMISE STATES                      |
|                                                             |
|  [ PENDING ] ---> Success ---> [ FULFILLED (Settled) ]      |
|             ---> Failure ---> [ REJECTED (Settled) ]        |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Promises are immutable once settled into either a fulfilled or rejected state.",
    sourceReference: "MDN Web Docs (Promise)",
    relatedTopics: ["promises", "async", "await"]
  },

  "promise-chaining": {
    title: "Promise Chaining",
    chapter: "Chapter XVII",
    concept: "Promise chaining allows sequential asynchronous operations to be linked together using `.then()` method returns.",
    simpleExample: `
Promise.resolve(10)
  .then(val => val * 2)
  .then(result => console.log(result)); // 20
    `,
    howItWorks: "Every `.then()` handler returns a brand new settled promise, enabling clean sequential pipeline flows.",
    stepByStep: [
      "1. Call initial asynchronous promise.",
      "2. Attach `.then()` handler transforming data.",
      "3. Chain subsequent `.then()` or `.catch()` handlers seamlessly."
    ],
    mentalModel: "Think of an assembly line conveyor belt where each station processes data and passes it down to the next.",
    practicalCode: `
fetch("https://api.example.com/user")
  .then(res => res.json())
  .then(user => console.log(user.name))
  .catch(err => console.error(err));
    `,
    diagram: `
+-------------------------------------------------------------+
|                      PROMISE CHAINING                       |
|                                                             |
|  [ Promise ] ---> .then() ---> .then() ---> .catch()        |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Promise chaining eliminates callback hell, providing clean readable asynchronous workflows.",
    sourceReference: "MDN Web Docs (Promise chaining)",
    relatedTopics: ["promises", "async", "await"]
  },

  // --- CHAPTER XVIII: ASYNC / AWAIT ---
  "async": {
    title: "async",
    chapter: "Chapter XVIII",
    concept: "The `async` keyword transforms a standard JavaScript function into a function that implicitly returns a Promise.",
    simpleExample: `
async function getData() {
  return "Hello Async";
}
getData().then(msg => console.log(msg));
    `,
    howItWorks: "An async function ensures that any return value is automatically wrapped inside a resolved promise.",
    stepByStep: [
      "1. Prefix function declaration with the `async` keyword.",
      "2. Return standard values or throw errors.",
      "3. Consuming code receives results via `.then()` or `await`."
    ],
    mentalModel: "Think of upgrading an ordinary service desk window into an automated express delivery counter.",
    practicalCode: `
async function getUserID() {
  return 42; // Automatically wraps in Promise.resolve(42)
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                      ASYNC FUNCTION                         |
|                                                             |
|  async function() ---> Automatically wraps return in Promise  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The `async` keyword simplifies writing asynchronous code by ensuring functions return promises.",
    sourceReference: "MDN Web Docs (Async function)",
    relatedTopics: ["await", "promises"]
  },

  "await": {
    title: "await",
    chapter: "Chapter XVIII",
    concept: "The `await` keyword pauses the execution of an async function until a Promise settles, unwrapping its resolved value.",
    simpleExample: `
async function run() {
  let result = await Promise.resolve("Resolved Data");
  console.log(result);
}
run();
    `,
    howItWorks: "Inside an async function, `await` suspends execution of that function block without blocking the main thread execution stack.",
    stepByStep: [
      "1. Place `await` before a promise expression.",
      "2. Suspend async function execution context temporarily.",
      "3. Resume execution and return resolved value once promise settles."
    ],
    mentalModel: "Think of pausing a movie playback until your food delivery arrives at your door.",
    practicalCode: `
async function fetchUser() {
  let response = await fetch("https://api.example.com/data");
  let data = await response.json();
  console.log(data);
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                       ASYNC / AWAIT                         |
|                                                             |
|  async function run() {                                     |
|    let data = await fetch(url); // Pauses here cleanly      |
|    console.log(data);           // Resumes when settled     |
|  }                                                          |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The `await` keyword allows asynchronous code to be written with clean, synchronous-looking syntax.",
    sourceReference: "MDN Web Docs (Await)",
    relatedTopics: ["async", "promises"]
  },
// --- CHAPTER XIX: PROTOTYPES ---
  "prototype": {
    title: "Prototype",
    chapter: "Chapter XIX",
    concept: "A prototype is an underlying object linkage from which other objects inherit properties and methods.",
    simpleExample: `
const obj = {};
console.log(obj.__proto__); // Object.prototype
    `,
    howItWorks: "Every JavaScript object has an internal link (`[[Prototype]]`) pointing to another object, forming the foundation of prototype-based inheritance.",
    stepByStep: [
      "1. Create an object or constructor function.",
      "2. Access its internal prototype link via `__proto__` or `Object.getPrototypeOf()`.",
      "3. Share properties and methods dynamically across linked structures."
    ],
    mentalModel: "Think of an original master template design sheet that blueprint copies reference for shared features.",
    practicalCode: `
const animal = { eats: true };
const rabbit = Object.create(animal);
console.log(rabbit.eats); // true (inherited via prototype)
    `,
    diagram: `
+-------------------------------------------------------------+
|                      PROTOTYPE LINK                         |
|                                                             |
|  [ Rabbit Object ] ---> [[Prototype]] ---> [ Animal Object ]  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Prototypes enable efficient property and method sharing across objects without duplicating memory.",
    sourceReference: "MDN Web Docs (Inheritance and the prototype chain) & JavaScript.info",
    relatedTopics: ["prototype-chain", "inheritance"]
  },

  "prototype-chain": {
    title: "Prototype Chain",
    chapter: "Chapter XIX",
    concept: "The prototype chain is the lookup mechanism where JavaScript searches up through linked object prototypes to resolve property and method calls.",
    simpleExample: `
let arr = [1, 2, 3];
console.log(arr.hasOwnProperty('length')); // Found up the prototype chain
    `,
    howItWorks: "If a property is missing on an object, the engine checks its `__proto__`, then its prototype's prototype, continuing until reaching `null` at the top of the chain.",
    stepByStep: [
      "1. Request property evaluation on a target object.",
      "2. Check local object properties first.",
      "3. Traverse upward through the prototype chain until found or `null` is reached."
    ],
    mentalModel: "Think of checking successive family ancestry lineage levels to find a shared trait or asset.",
    practicalCode: `
const child = { name: "Child" };
const parent = { lastName: "Doe" };
Object.setPrototypeOf(child, parent);
console.log(child.lastName); // "Doe" (traversed via prototype chain)
    `,
    diagram: `
+-------------------------------------------------------------+
|                        PROTOTYPE CHAIN                      |
|                                                             |
|  [ Child Object ] --> [ Parent Object ] --> [ Object.proto ] --> null
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The prototype chain allows objects to inherit features hierarchically from parent prototypes.",
    sourceReference: "JavaScript.info (Prototypal inheritance) & MDN Web Docs",
    relatedTopics: ["prototype", "inheritance"]
  },

  "inheritance": {
    title: "Inheritance",
    chapter: "Chapter XIX",
    concept: "Inheritance is the mechanism allowing one object or class to access and reuse properties and methods defined in another.",
    simpleExample: `
const animal = {
  speak() { console.log("Making sound"); }
};
const dog = Object.create(animal);
dog.speak(); // "Making sound"
    `,
    howItWorks: "JavaScript implements inheritance prototypally by linking object instances directly to parent prototype templates.",
    stepByStep: [
      "1. Define a base parent object or constructor template.",
      "2. Link a child object or constructor prototype to the base template.",
      "3. Inherit shared behaviors cleanly."
    ],
    mentalModel: "Think of an industrial vehicle blueprint inheriting standard chassis engineering specs from a parent truck template.",
    practicalCode: `
function Animal(name) { this.name = name; }
Animal.prototype.walk = function() { console.log(this.name + " walks"); };

function Dog(name) { Animal.call(this, name); }
Dog.prototype = Object.create(Animal.prototype);
    `,
    diagram: `
+-------------------------------------------------------------+
|                     PROTOTYPAL INHERITANCE                  |
|                                                             |
|  [ Dog Instance ] ---> [ Dog.prototype ] ---> [ Animal.proto ]
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Prototypal inheritance enables code reusability across object hierarchies in JavaScript.",
    sourceReference: "MDN Web Docs & ECMAScript Specification",
    relatedTopics: ["prototype", "constructor-functions"]
  },

  "constructor-functions": {
    title: "Constructor Functions",
    chapter: "Chapter XIX",
    concept: "A constructor function is a regular function used with the `new` keyword to create and initialize object instances.",
    simpleExample: `
function User(name) {
  this.name = name;
}
const user1 = new User("Alice");
    `,
    howItWorks: "When invoked with `new`, the engine creates a new blank object, binds `this` to it, links its prototype, and returns the object automatically.",
    stepByStep: [
      "1. Define a function with capitalized naming conventions.",
      "2. Invoke the function using the `new` operator.",
      "3. Assign properties to `this` inside the constructor body."
    ],
    mentalModel: "Think of a factory production mold stamping out consistent product units.",
    practicalCode: `
function Car(brand) {
  this.brand = brand;
}
const myCar = new Car("Toyota");
    `,
    diagram: `
+-------------------------------------------------------------+
|                     CONSTRUCTOR FUNCTION                    |
|                                                             |
|  new Car("Toyota") ---> 1. Creates Blank Object             |
|                    ---> 2. Binds 'this'                     |
|                    ---> 3. Links Prototype & Returns Object |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Constructor functions serve as object blueprints before ES6 class syntax was introduced.",
    sourceReference: "JavaScript.info (Constructor, operator 'new')",
    relatedTopics: ["prototype", "classes"]
  },

  // --- CHAPTER XX: CLASSES ---
  "classes": {
    title: "Classes",
    chapter: "Chapter XX",
    concept: "Classes are syntactic sugar over JavaScript's existing prototypal inheritance model, providing a cleaner template syntax for creating objects.",
    simpleExample: `
class Person {
  constructor(name) {
    this.name = name;
  }
}
const p = Person("Bob");
    `,
    howItWorks: "Classes bundle constructor initialization and method definitions together inside a structured declarative block.",
    stepByStep: [
      "1. Declare a class using the `class` keyword.",
      "2. Define a `constructor` method for initializing state properties.",
      "3. Instantiate instances using the `new` keyword."
    ],
    mentalModel: "Think of an architectural blueprint drawing detailing structure specifications for building construction.",
    practicalCode: `
class Animal {
  constructor(type) { this.type = type; }
}
const cat = new Animal("Feline");
    `,
    diagram: `
+-------------------------------------------------------------+
|                         CLASS SYNTAX                        |
|                                                             |
|  class Person {                                             |
|    constructor(name) { this.name = name; }                  |
|  }                                                          |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Classes offer clean, readable object-oriented syntax built on top of prototypal inheritance.",
    sourceReference: "MDN Web Docs (Classes) & JavaScript.info",
    relatedTopics: ["class-methods", "extends"]
  },

  "class-methods": {
    title: "Class Methods",
    chapter: "Chapter XX",
    concept: "Class methods are functions defined inside a class body that are automatically added to the instance's prototype.",
    simpleExample: `
class Calculator {
  add(a, b) {
    return a + b;
  }
}
const calc = new Calculator();
calc.add(2, 3); // 5
    `,
    howItWorks: "Methods defined in a class are shared across all instances via the prototype, saving memory.",
    stepByStep: [
      "1. Write method identifiers inside a class body without the `function` keyword.",
      "2. Access instance state via the `this` keyword.",
      "3. Invoke methods on class instance objects."
    ],
    mentalModel: "Think of built-in control action buttons installed on every device model off an assembly line.",
    practicalCode: `
class User {
  constructor(name) { this.name = name; }
  greet() { console.log(\`Hi \${this.name}\`); }
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                        CLASS METHODS                        |
|                                                             |
|  [ Class Instance ] ---> [[Prototype]] ---> [ Class Prototype Methods ]
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Class methods provide shared behaviors stored efficiently on the prototype object.",
    sourceReference: "MDN Web Docs (Class methods)",
    relatedTopics: ["classes", "extends"]
  },

  "extends": {
    title: "extends",
    chapter: "Chapter XX",
    concept: "The `extends` keyword is used in class declarations to create a child class that inherits from a parent class.",
    simpleExample: `
class Animal {
  eat() { console.log("Eating"); }
}
class Dog extends Animal {
  bark() { console.log("Woof"); }
}
    `,
    howItWorks: "Under the hood, `extends` sets up the prototype chain link between the child constructor and parent constructor.",
    stepByStep: [
      "1. Declare a child class using `class Child extends Parent`.",
      "2. Call `super()` inside the child constructor.",
      "3. Inherit all parent class methods and properties."
    ],
    mentalModel: "Think of building a specialized sports car model that extends standard base car manufacturing specs.",
    practicalCode: `
class Shape {
  constructor(color) { this.color = color; }
}
class Circle extends Shape {
  radius = 5;
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                       CLASS EXTENDS                         |
|                                                             |
|  [ Child Class ] ---> [[Prototype]] ---> [ Parent Class ]   |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "The `extends` keyword provides clean syntax for class-based inheritance hierarchies.",
    sourceReference: "MDN Web Docs (Extends)",
    relatedTopics: ["classes", "super"]
  },

  "super": {
    title: "super",
    chapter: "Chapter XX",
    concept: "The `super` keyword is used to call constructor methods or access parent class properties and functions.",
    simpleExample: `
class Parent {
  constructor(name) { this.name = name; }
}
class Child extends Parent {
  constructor(name, age) {
    super(name); // Calls parent constructor
    this.age = age;
  }
}
    `,
    howItWorks: "`super()` must be called in a child constructor before using the `this` keyword to ensure parent initialization completes.",
    stepByStep: [
      "1. Extend a parent class.",
      "2. Invoke `super(args)` inside the child constructor.",
      "3. Access parent methods using `super.methodName()`."
    ],
    mentalModel: "Think of passing required base materials up to a master supervisor constructor template.",
    practicalCode: `
class Vehicle {
  start() { console.log("Vehicle started"); }
}
class Car extends Vehicle {
  start() {
    super.start();
    console.log("Car engine running");
  }
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                          SUPER KEYWORD                      |
|                                                             |
|  Child Constructor ---> super() ---> Parent Constructor     |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "`super` is essential for initializing parent states and invoking parent methods in subclassing.",
    sourceReference: "MDN Web Docs (super)",
    relatedTopics: ["extends", "classes"]
  },

  "private-fields": {
    title: "Private Fields",
    chapter: "Chapter XX",
    concept: "Private fields use a hash `#` prefix to enforce strict encapsulation, making properties inaccessible outside the class body.",
    simpleExample: `
class BankAccount {
  #balance = 100;
  getBalance() { return this.#balance; }
}
const acc = new BankAccount();
// console.log(acc.#balance); // SyntaxError
    `,
    howItWorks: "Private class features are enforced at the engine syntax level, preventing external inspection or modification.",
    stepByStep: [
      "1. Prefix class property or method identifiers with `#`.",
      "2. Access or mutate private fields strictly within the class body.",
      "3. Block external code access attempts."
    ],
    mentalModel: "Think of a locked secure safety deposit box compartment hidden inside a vault.",
    practicalCode: `
class SecretHolder {
  #secret = "Hidden Value";
  reveal() { return this.#secret; }
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                       PRIVATE FIELDS                        |
|                                                             |
|  [ Class Body ] ---> Contains #privateField (Inaccessible)   |
|  [ External ]   ---> Blocked by Syntax Engine               |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Private fields (`#`) provide native data encapsulation and privacy for JavaScript classes.",
    sourceReference: "MDN Web Docs (Private class features)",
    relatedTopics: ["classes", "class-methods"]
  },

  // --- CHAPTER XXI: THE `THIS` KEYWORD ---
  "this": {
    title: "What is `this`?",
    chapter: "Chapter XXI",
    concept: "The `this` keyword is a special identifier reference that points to the object executing the current function context.",
    simpleExample: `
const obj = {
  name: "Alice",
  show() { console.log(this.name); }
};
obj.show(); // "Alice"
    `,
    howItWorks: "`this` is not statically bound; its value is determined dynamically based on *how* a function is invoked.",
    stepByStep: [
      "1. Identify the invocation context of a function.",
      "2. Resolve `this` binding based on execution caller rules.",
      "3. Access object state properties."
    ],
    mentalModel: "Think of a pronoun like 'I' or 'me' whose meaning changes depending on who is speaking.",
    practicalCode: `
function printThis() {
  console.log(this);
}
printThis(); // Global object or undefined in strict mode
    `,
    diagram: `
+-------------------------------------------------------------+
|                        THIS BINDING                         |
|                                                             |
|  Invocation Context ---> Determines 'this' Value Dynamically |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "`this` refers to the execution context owner object, determined entirely by how a function is called.",
    sourceReference: "MDN Web Docs (this) & JavaScript.info",
    relatedTopics: ["this-global-context", "this-object-method"]
  },

  "this-global-context": {
    title: "Global Context",
    chapter: "Chapter XXI",
    concept: "In the global execution context, `this` refers to the global object (`window` in browsers, `global` in Node.js).",
    simpleExample: `
console.log(this === window); // true (in browser environment)
    `,
    howItWorks: "When code runs outside any function or object scope, `this` points directly to the root global runtime container.",
    stepByStep: [
      "1. Execute top-level script code.",
      "2. Evaluate `this` in global scope.",
      "3. Access global object properties."
    ],
    mentalModel: "Think of the main root administrator control terminal of a system facility.",
    practicalCode: `
var globalVar = "Test";
console.log(this.globalVar); // "Test" (attached to global object when using var)
    `,
    diagram: `
+-------------------------------------------------------------+
|                        GLOBAL CONTEXT                       |
|                                                             |
|  Global Scope ---> 'this' points to Window / Global Object  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "In global scopes, `this` points directly to the root runtime environment object.",
    sourceReference: "MDN Web Docs (this)",
    relatedTopics: ["this", "this-object-method"]
  },

  "this-object-method": {
    title: "Object Method",
    chapter: "Chapter XXI",
    concept: "When a function is called as a method of an object, `this` points to that parent owner object.",
    simpleExample: `
const user = {
  name: "Bob",
  getName() { return this.name; }
};
console.log(user.getName()); // "Bob"
    `,
    howItWorks: "The object preceding the dot notation during method invocation becomes the binding value for `this`.",
    stepByStep: [
      "1. Define a function property inside an object.",
      "2. Invoke the method using dot notation (`object.method()`).",
      "3. Reference object state via `this`."
    ],
    mentalModel: "Think of an employee pointing to their own department records workspace desk.",
    practicalCode: `
const car = {
  model: "Tesla",
  showModel() { console.log(this.model); }
};
car.showModel();
    `,
    diagram: `
+-------------------------------------------------------------+
|                        OBJECT METHOD                        |
|                                                             |
|  object.method() ---> 'this' points to 'object'             |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Method invocation binds `this` to the object containing the method call.",
    sourceReference: "JavaScript.info (Object methods, 'this')",
    relatedTopics: ["this", "this-constructor"]
  },

  "this-constructor": {
    title: "Constructor",
    chapter: "Chapter XXI",
    concept: "When a function is invoked with the `new` keyword, `this` binds to the newly created blank object instance.",
    simpleExample: `
function Person(name) {
  this.name = name; // 'this' points to new instance
}
const p = new Person("Charlie");
    `,
    howItWorks: "Constructor invocation creates a fresh object and automatically assigns it as the `this` binding context during execution.",
    stepByStep: [
      "1. Invoke a constructor function using `new`.",
      "2. Engine assigns a new object instance to `this`.",
      "3. Properties are attached to the new instance."
    ],
    mentalModel: "Think of stamping a new custom label badge onto a freshly minted product unit.",
    practicalCode: `
function Point(x, y) {
  this.x = x;
  this.y = y;
}
const pt = new Point(10, 20);
    `,
    diagram: `
+-------------------------------------------------------------+
|                     CONSTRUCTOR THIS BINDING                |
|                                                             |
|  new Constructor() ---> 'this' points to New Instance Object |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Constructor calls bind `this` to the newly instantiated object.",
    sourceReference: "MDN Web Docs (this)",
    relatedTopics: ["constructor-functions", "this"]
  },

  "explicit-binding": {
    title: "Explicit Binding",
    chapter: "Chapter XXI",
    concept: "Explicit binding allows developers to manually assign a specific `this` context using `call`, `apply`, or `bind`.",
    simpleExample: `
function greet() {
  console.log(this.name);
}
const user = { name: "Alice" };
greet.call(user); // "Alice"
    `,
    howItWorks: "Methods like `call` and `apply` invoke functions immediately with a forced `this` target, while `bind` returns a permanently locked wrapper function.",
    stepByStep: [
      "1. Target a function with an ambiguous `this` context.",
      "2. Use `.call()`, `.apply()`, or `.bind()` to supply an explicit object.",
      "3. Execute function with guaranteed context binding."
    ],
    mentalModel: "Think of handing a specific ID badge directly to a worker before they step onto the floor.",
    practicalCode: `
function show() { console.log(this.id); }
show.call({ id: 99 });
    `,
    diagram: `
+-------------------------------------------------------------+
|                      EXPLICIT BINDING                       |
|                                                             |
|  func.call(targetObject) ---> 'this' forced to targetObject |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Explicit binding lets you manually control and override what `this` points to.",
    sourceReference: "MDN Web Docs (Function.prototype.call)",
    relatedTopics: ["call", "apply", "bind"]
  },

  "call": {
    title: "call",
    chapter: "Chapter XXI",
    concept: "The `call` method invokes a function with a specified `this` value and arguments passed individually as a comma-separated list.",
    simpleExample: `
function introduce(lang, city) {
  console.log(\`I am \${this.name}, speak \${lang} in \${city}\`);
}
introduce.call({ name: "Bob" }, "JS", "NYC");
    `,
    howItWorks: "It immediately executes the target function while explicitly setting the `this` context and passing positional arguments one by one.",
    stepByStep: [
      "1. Target a function reference.",
      "2. Call `.call(contextObj, arg1, arg2, ...)`.",
      "3. Function executes instantly with explicit bindings."
    ],
    mentalModel: "Think of stepping up to a specific microphone podium to speak immediately with assigned credentials.",
    practicalCode: `
function sum(a, b) { return a + b + this.bonus; }
sum.call({ bonus: 10 }, 5, 5); // 20
    `,
    diagram: `
+-------------------------------------------------------------+
|                         CALL METHOD                         |
|                                                             |
|  fn.call(context, arg1, arg2) ---> Executes Instantly        |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Use `call` when you need to invoke a function immediately with explicit `this` and individual arguments.",
    sourceReference: "MDN Web Docs (Function.prototype.call)",
    relatedTopics: ["explicit-binding", "apply", "bind"]
  },

  "apply": {
    title: "apply",
    chapter: "Chapter XXI",
    concept: "The `apply` method invokes a function with a specified `this` value and arguments passed as an array collection.",
    simpleExample: `
function sum(a, b) {
  return a + b + this.extra;
}
sum.apply({ extra: 5 }, [10, 20]); // 35
    `,
    howItWorks: "Identical to `call`, except arguments are bundled into an array rather than listed individually.",
    stepByStep: [
      "1. Target a function reference.",
      "2. Call `.apply(contextObj, [arrayArgs])`.",
      "3. Function executes instantly with explicit bindings and array arguments."
    ],
    mentalModel: "Think of packing loose items into a box cargo container before handing it over to a station.",
    practicalCode: `
const numbers = [5, 10, 15];
const max = Math.max.apply(null, numbers); // 15
    `,
    diagram: `
+-------------------------------------------------------------+
|                         APPLY METHOD                        |
|                                                             |
|  fn.apply(context, [argsArray]) ---> Executes Instantly     |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Use `apply` when arguments are already structured or collected inside an array.",
    sourceReference: "MDN Web Docs (Function.prototype.apply)",
    relatedTopics: ["explicit-binding", "call", "bind"]
  },

  "bind": {
    title: "bind",
    chapter: "Chapter XXI",
    concept: "The `bind` method returns a brand new function with `this` permanently locked to a specified target object.",
    simpleExample: `
const module = {
  x: 42,
  getX: function() { return this.x; }
};
const unboundGetX = module.getX;
const boundGetX = unboundGetX.bind(module);
console.log(boundGetX()); // 42
    `,
    howItWorks: "Unlike `call` or `apply`, `bind` does not execute the function immediately; it creates a reusable bound copy for later invocation.",
    stepByStep: [
      "1. Target a function reference.",
      "2. Call `.bind(contextObj)` to lock the `this` context.",
      "3. Invoke the returned bound function later."
    ],
    mentalModel: "Think of permanently locking a tool fixture into a dedicated custom workbench slot.",
    practicalCode: `
const user = { name: "Charlie" };
function logName() { console.log(this.name); }
const boundLog = logName.bind(user);
boundLog(); // "Charlie"
    `,
    diagram: `
+-------------------------------------------------------------+
|                          BIND METHOD                        |
|                                                             |
|  fn.bind(context) ---> Returns PERMANENTLY Bound Function Copy|
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Use `bind` when you need a reusable function copy with a permanently locked `this` context.",
    sourceReference: "MDN Web Docs (Function.prototype.bind)",
    relatedTopics: ["explicit-binding", "call", "apply"]
  },

  "arrow-functions-and-this": {
    title: "Arrow Functions and `this`",
    chapter: "Chapter XXI",
    concept: "Arrow functions do not have their own `this` binding; instead, they inherit `this` lexically from their enclosing scope.",
    simpleExample: `
const obj = {
  name: "Alice",
  delayedGreet: function() {
    setTimeout(() => {
      console.log(\`Hi \${this.name}\`); // Inherits 'this' from delayedGreet
    }, 1000);
  }
};
obj.delayedGreet();
    `,
    howItWorks: "Because arrow functions lack an execution context `this`, they look outward lexically to resolve references, solving traditional callback `this` loss issues.",
    stepByStep: [
      "1. Write an arrow function inside a parent method or scope.",
      "2. Access `this` inside the arrow function body.",
      "3. Observe lexical resolution pointing to the enclosing parent scope's `this`."
    ],
    mentalModel: "Think of a mirror reflecting the exact environment lighting of the room it sits inside.",
    practicalCode: `
const group = {
  title: "Devs",
  list: ["A", "B"],
  showList() {
    this.list.forEach(item => console.log(this.title + ": " + item));
  }
};
group.showList();
    `,
    diagram: `
+-------------------------------------------------------------+
|                   ARROW FUNCTIONS AND THIS                  |
|                                                             |
|  [ Arrow Function ] ---> Lexically Inherits 'this' from     |
|                         Enclosing Parent Scope              |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Arrow functions lexically inherit `this`, preventing unexpected context loss in nested callbacks.",
    sourceReference: "MDN Web Docs (Arrow functions)",
    relatedTopics: ["arrow-functions", "this"]
  },

  // --- CHAPTER XXII: MODULES ---
  "modules": {
    title: "Modules",
    chapter: "Chapter XXII",
    concept: "Modules are self-contained blocks of code that let you split large applications into separate, reusable files.",
    simpleExample: `
// math.js
export const add = (a, b) => a + b;
    `,
    howItWorks: "Each module maintains its own private scope; variables and functions are kept private unless explicitly exported.",
    stepByStep: [
      "1. Separate code logic into individual modular files.",
      "2. Export required functions or variables.",
      "3. Import them into other script files."
    ],
    mentalModel: "Think of organizing tools into separate specialized toolboxes rather than tossing everything into a single pile.",
    practicalCode: `
// utils.js
export function format(str) { return str.trim(); }
    `,
    diagram: `
+-------------------------------------------------------------+
|                       MODULE SYSTEM                         |
|                                                             |
|  [ Module A (Private Scope) ] --(Export/Import)---> [ Module B ]
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Modules promote clean separation of concerns, encapsulation, and maintainable code architecture.",
    sourceReference: "MDN Web Docs (JavaScript modules) & Node.js Documentation",
    relatedTopics: ["import", "export", "es-modules"]
  },

  "import": {
    title: "import",
    chapter: "Chapter XXII",
    concept: "The `import` statement brings exported functions, objects, or variables from another module into the current file scope.",
    simpleExample: `
import { add, subtract } from './math.js';
console.log(add(5, 3));
    `,
    howItWorks: "Import statements are statically analyzed and hoisted during compilation, loading dependencies before execution.",
    stepByStep: [
      "1. Specify desired exported identifiers inside curly braces `{}`.",
      "2. Provide the relative file path source string.",
      "3. Use imported members immediately."
    ],
    mentalModel: "Think of ordering required specialized parts delivered straight to your workbench station.",
    practicalCode: `
import defaultUser, { getUserData } from './api.js';
    `,
    diagram: `
+-------------------------------------------------------------+
|                       IMPORT STATEMENT                      |
|                                                             |
|  Current File <--- import { item } --- [ External Module ]  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Use `import` to bring code dependencies safely into your active module file.",
    sourceReference: "MDN Web Docs (import)",
    relatedTopics: ["export", "es-modules"]
  },

  "export": {
    title: "export",
    chapter: "Chapter XXII",
    concept: "The `export` statement makes functions, objects, or primitive values available to other modules for importing.",
    simpleExample: `
export const API_KEY = "12345";
export function calculate() { return 100; }
    `,
    howItWorks: "Values can be exported either as named exports or as a single default export per module file.",
    stepByStep: [
      "1. Prefix declarations with the `export` keyword.",
      "2. Alternatively, use `export default` for primary module values.",
      "3. Make code public to other importer modules."
    ],
    mentalModel: "Think of placing finished tools on a public display shelf for other workers to borrow.",
    practicalCode: `
export default class UserProfile {
  constructor(name) { this.name = name; }
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                       EXPORT STATEMENT                      |
|                                                             |
|  [ Module File ] --- export const/default ---> Available to Importers
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Use `export` to expose module functionality safely to other parts of your application.",
    sourceReference: "MDN Web Docs (export)",
    relatedTopics: ["import", "es-modules"]
  },

  "es-modules": {
    title: "ES Modules",
    chapter: "Chapter XXII",
    concept: "ES Modules (ESM) is the official standard ECMAScript module system built directly into JavaScript using `import` and `export`.",
    simpleExample: `
<script type="module" src="app.js"></script>
    `,
    howItWorks: "ESM files operate in strict mode automatically, support asynchronous loading, and use lexical top-level scopes.",
    stepByStep: [
      "1. Enable ESM via `<script type='module'>` or Node.js `Node.js 'type': 'module'` configuration.",
      "2. Use standard `import` and `export` syntax.",
      "3. Execute modules asynchronously."
    ],
    mentalModel: "Think of standardized international shipping container ports compatible across global logistics networks.",
    practicalCode: `
import { loadData } from './data.js';
loadData();
    `,
    diagram: `
+-------------------------------------------------------------+
|                        ES MODULES (ESM)                     |
|                                                             |
|  Parsed Statically ---> Strict Mode ---> Async Loading      |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "ES Modules are the modern standard for modular JavaScript development across browsers and Node.js.",
    sourceReference: "MDN Web Docs (JavaScript modules)",
    relatedTopics: ["commonjs", "import", "export"]
  },

  "commonjs": {
    title: "CommonJS",
    chapter: "Chapter XXII",
    concept: "CommonJS is the traditional module system used in Node.js, relying on `require()` and `module.exports`.",
    simpleExample: `
// math.js
module.exports = {
  add: (a, b) => a + b
};

// app.js
const math = require('./math.js');
    `,
    howItWorks: "CommonJS modules are loaded synchronously at runtime, making them well-suited for server-side Node.js environments.",
    stepByStep: [
      "1. Assign exports to `module.exports` or `exports.property`.",
      "2. Load dependencies synchronously using `require('./file.js')`.",
      "3. Execute module code on demand."
    ],
    mentalModel: "Think of a traditional server-room supply cabinet unlocked synchronously on request.",
    practicalCode: `
const fs = require('fs');
fs.readFileSync('file.txt');
    `,
    diagram: `
+-------------------------------------------------------------+
|                         COMMONJS                            |
|                                                             |
|  module.exports ---> Synchronous Loading ---> require()     |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "CommonJS is the classic synchronous module standard historically utilized across Node.js applications.",
    sourceReference: "Node.js Documentation (Modules: CommonJS modules)",
    relatedTopics: ["es-modules", "import", "export"]
  },

  // --- CHAPTER XXIII: ERROR HANDLING ---
  "strict-mode": {
    title: "Strict Mode",
    chapter: "Chapter XXIII",
    concept: "Strict mode (`'use strict'`) opts a script or function into a stricter parsing and error-handling variant of JavaScript.",
    simpleExample: `
"use strict";
x = 10; // ReferenceError: x is not defined
    `,
    howItWorks: "Strict mode catches silent developer mistakes, throws errors for unsafe actions (like global accidental variable assignments), and disables insecure features.",
    stepByStep: [
      "1. Add `'use strict';` at the top of a script or function body.",
      "2. Engine enforces strict validation rules.",
      "3. Throws exceptions for unsafe coding practices."
    ],
    mentalModel: "Think of a safety inspector enforcing strict compliance rules on a factory workshop floor.",
    practicalCode: `
"use strict";
function secure() {
  let eval = 17; // SyntaxError in strict mode
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                         STRICT MODE                         |
|                                                             |
|  "use strict" ---> Enforces Parser Checks & Throws Errors   |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Always use strict mode to write cleaner, safer, and more robust JavaScript code.",
    sourceReference: "MDN Web Docs (Strict mode) & JavaScript.info",
    relatedTopics: ["error-handling", "try"]
  },

  "error-handling": {
    title: "Error Handling",
    chapter: "Chapter XXIII",
    concept: "Error handling is the systematic process of anticipating, intercepting, and managing runtime exceptions gracefully without crashing applications.",
    simpleExample: `
try {
  JSON.parse("invalid json");
} catch (error) {
  console.log("Handled parsing error safely");
}
    `,
    howItWorks: "Using `try...catch` blocks, runtime errors are captured and routed into fallback recovery paths.",
    stepByStep: [
      "1. Wrap risky code inside a `try` block.",
      "2. Catch thrown exceptions inside a `catch` block.",
      "3. Execute cleanup tasks inside a `finally` block."
    ],
    mentalModel: "Think of an airplane emergency landing backup system designed to stabilize flight during turbulence.",
    practicalCode: `
try {
  throw new Error("Custom system failure");
} catch (err) {
  console.error(err.message);
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                      ERROR HANDLING FLOW                    |
|                                                             |
|  [ Try Block (Risky Code) ] ---> (Error) ---> [ Catch Block ]
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Proper error handling prevents application crashes and improves user experience.",
    sourceReference: "MDN Web Docs (Error handling) & JavaScript.info",
    relatedTopics: ["try", "catch", "finally", "custom-errors"]
  },

  "try": {
    title: "try",
    chapter: "Chapter XXIII",
    concept: "The `try` statement defines a code block to be run and monitored for runtime exceptions during execution.",
    simpleExample: `
try {
  let data = JSON.parse('{"valid": true}');
  console.log(data.valid);
} catch (e) {
  // Handles errors if any occur
}
    `,
    howItWorks: "If an error occurs anywhere inside the `try` block, execution jumps immediately to the associated `catch` block.",
    stepByStep: [
      "1. Open a `try` block wrapping operational code.",
      "2. Execute statements normally.",
      "3. Intercept any thrown exceptions immediately."
    ],
    mentalModel: "Think of walking across a tightrope net with a safety harness monitoring your path.",
    practicalCode: `
try {
  document.getElementById("missing").click();
} catch (err) {
  console.log("Element not found");
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                         TRY BLOCK                           |
|                                                             |
|  try { /* Risky Operations */ } ---> Intercepts Exceptions  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Use `try` blocks to wrap code prone to potential runtime errors.",
    sourceReference: "MDN Web Docs (try...catch)",
    relatedTopics: ["error-handling", "catch", "finally"]
  },

  "catch": {
    title: "catch",
    chapter: "Chapter XXIII",
    concept: "The `catch` statement defines a code block to handle errors thrown by the preceding `try` block.",
    simpleExample: `
try {
  nonExistentFunction();
} catch (error) {
  console.log("Caught error:", error.message);
}
    `,
    howItWorks: "The `catch` clause receives an error object containing details like message, name, and stack trace for debugging.",
    stepByStep: [
      "1. Intercept an exception thrown from a `try` block.",
      "2. Receive error object parameters inside catch.",
      "3. Run fallback recovery logic or logging."
    ],
    mentalModel: "Think of a safety net catching a gymnast and providing a cushion floor.",
    practicalCode: `
try {
  throw new TypeError("Invalid type assignment");
} catch (err) {
  console.warn(err.name, err.message);
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                         CATCH BLOCK                         |
|                                                             |
|  catch(error) ---> Receives Error Object & Handles Recovery |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Use `catch` blocks to gracefully process and recover from runtime errors.",
    sourceReference: "MDN Web Docs (try...catch)",
    relatedTopics: ["try", "finally", "custom-errors"]
  },

  "finally": {
    title: "finally",
    chapter: "Chapter XXIII",
    concept: "The `finally` statement defines a cleanup code block that executes regardless of whether an error was thrown or caught.",
    simpleExample: `
let db = openConnection();
try {
  db.query();
} catch (err) {
  console.log("Query failed");
} finally {
  db.close(); // Always cleans up
}
    `,
    howItWorks: "The `finally` block guarantees execution after `try` and `catch` blocks complete, making it ideal for resource cleanup.",
    stepByStep: [
      "1. Execute `try` and optional `catch` logic.",
      "2. Trigger `finally` block unconditionally.",
      "3. Release network connections, file streams, or loaders."
    ],
    mentalModel: "Think of turning off workshop lights and locking doors at the end of every working day regardless of events.",
    practicalCode: `
try {
  console.log("Running task");
} finally {
  console.log("Cleanup executed unconditionally");
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                        FINALLY BLOCK                        |
|                                                             |
|  try ---> catch ---> [ FINALLY (Always Runs Cleanup) ]      |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Use `finally` blocks to guarantee essential cleanup tasks execute under all circumstances.",
    sourceReference: "MDN Web Docs (try...catch)",
    relatedTopics: ["try", "catch", "error-handling"]
  },

  "custom-errors": {
    title: "Custom Errors",
    chapter: "Chapter XXIII",
    concept: "Custom errors are user-defined error classes extending the built-in JavaScript `Error` object for specialized error reporting.",
    simpleExample: `
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
throw new ValidationError("Invalid email input");
    `,
    howItWorks: "By extending `Error`, custom error types can carry specialized properties and maintain clear error classification hierarchies.",
    stepByStep: [
      "1. Create a class extending `Error`.",
      "2. Call `super(message)` in the constructor.",
      "3. Throw and catch specific custom error types."
    ],
    mentalModel: "Think of custom colored warning alert tags created specifically for specialized hazard items.",
    practicalCode: `
class AuthenticationError extends Error {
  constructor(msg) {
    super(msg);
    this.status = 401;
  }
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                        CUSTOM ERRORS                        |
|                                                             |
|  class CustomError extends Error ---> super() ---> Thrown   |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Custom errors allow fine-grained exception classification and specialized debugging.",
    sourceReference: "MDN Web Docs (Error)",
    relatedTopics: ["error-handling", "try", "catch"]
  },

  // --- CHAPTER XXIV: ADVANCED CONCEPTS ---
  "iterators": {
    title: "Iterators",
    chapter: "Chapter XXIV",
    concept: "An iterator is an object that implements a `next()` method producing sequential items one by one, returning `{ value, done }`.",
    simpleExample: `
function makeIterator(array) {
  let index = 0;
  return {
    next() {
      return index < array.length 
        ? { value: array[index++], done: false }
        : { done: true };
    }
  };
}
const it = makeIterator(['a', 'b']);
console.log(it.next()); // { value: 'a', done: false }
    `,
    howItWorks: "Iterators provide standard sequential traversal protocols across data structures like arrays, maps, and sets.",
    stepByStep: [
      "1. Request an iterator object via `[Symbol.iterator]()`.",
      "2. Call `.next()` repeatedly.",
      "3. Inspect `{ value, done }` state return objects."
    ],
    mentalModel: "Think of a cassette tape player stepping through tracks sequentially one movement at a time.",
    practicalCode: `
const collection = [10, 20];
const iterator = collection[Symbol.iterator]();
console.log(iterator.next()); // { value: 10, done: false }
    `,
    diagram: `
+-------------------------------------------------------------+
|                          ITERATOR                           |
|                                                             |
|  Iterator.next() ---> Returns { value: item, done: false }  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Iterators enable standardized sequential traversal across custom data structures.",
    sourceReference: "MDN Web Docs (Iterators and generators) & JavaScript.info",
    relatedTopics: ["generators", "symbols"]
  },

  "generators": {
    title: "Generators",
    chapter: "Chapter XXIV",
    concept: "Generator functions use `function*` and `yield` to pause and resume execution, producing sequences of values lazily.",
    simpleExample: `
function* countSequence() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = countSequence();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
    `,
    howItWorks: "Calling a generator returns a generator iterator object. Each `yield` expression suspends execution and returns a value.",
    stepByStep: [
      "1. Declare a generator function using an asterisk (`function*`).",
      "2. Use the `yield` keyword to pause and emit values.",
      "3. Iterate using `.next()` or `for...of` loops."
    ],
    mentalModel: "Think of an automated vending machine slot dispensing items one at a time only when requested.",
    practicalCode: `
function* idMaker() {
  let id = 0;
  while(true) yield id++;
}
const gen = idMaker();
console.log(gen.next().value); // 0
    `,
    diagram: `
+-------------------------------------------------------------+
|                          GENERATORS                         |
|                                                             |
|  function*() ---> yield (Pauses & Emits) ---> Resumes       |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Generators provide elegant lazy evaluation and pause-resume execution control.",
    sourceReference: "MDN Web Docs (function*) & JavaScript.info",
    relatedTopics: ["iterators", "symbols"]
  },

  "symbols": {
    title: "Symbols",
    chapter: "Chapter XXIV",
    concept: "A Symbol is a primitive data type that produces unique, immutable identifier values guaranteed not to collide with string keys.",
    simpleExample: `
const id = Symbol("id");
const user = { [id]: 123 };
console.log(user[id]); // 123
    `,
    howItWorks: "Every Symbol() call creates a completely unique value, making them ideal for creating hidden or private object property keys.",
    stepByStep: [
      "1. Instantiate a symbol using `Symbol('description')`.",
      "2. Use symbol identifiers as unique object keys.",
      "3. Prevent property name collision bugs."
    ],
    mentalModel: "Think of an encrypted cryptographic serial number tag assigned exclusively to a single secure item.",
    practicalCode: `
const UNIQUE_KEY = Symbol("key");
const obj = { [UNIQUE_KEY]: "secret value" };
    `,
    diagram: `
+-------------------------------------------------------------+
|                           SYMBOLS                           |
|                                                             |
|  Symbol("id") ---> Generates Unique, Collision-Free Key     |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Symbols guarantee unique object property keys, preventing accidental naming collisions.",
    sourceReference: "MDN Web Docs (Symbol) & JavaScript.info",
    relatedTopics: ["iterators", "weakmap"]
  },

  "weakmap": {
    title: "WeakMap",
    chapter: "Chapter XXIV",
    concept: "A `WeakMap` is a collection of key-value pairs where keys must be objects and are held *weakly*, allowing automated garbage collection.",
    simpleExample: `
const wm = new WeakMap();
let obj = {};
wm.set(obj, "metadata value");
// If 'obj' reference is removed, it is garbage collected automatically from WeakMap
    `,
    howItWorks: "Unlike standard Maps, WeakMap keys do not prevent garbage collection if the key object has no other active references.",
    stepByStep: [
      "1. Initialize a `WeakMap` instance.",
      "2. Set object references as keys (`wm.set(obj, val)`).",
      "3. Allow keys to be garbage collected when unreferenced."
    ],
    mentalModel: "Think of temporary sticky notes attached to items that vanish automatically when the item is discarded.",
    practicalCode: `
const cache = new WeakMap();
function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  let result = "computed";
  cache.set(obj, result);
  return result;
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                           WEAKMAP                           |
|                                                             |
|  Object Key (Weak Reference) ---> Garbage Collected Safely  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "WeakMaps prevent memory leaks by holding object keys weakly for garbage collection.",
    sourceReference: "MDN Web Docs (WeakMap) & JavaScript.info",
    relatedTopics: ["weakset", "symbols"]
  },

  "weakset": {
    title: "WeakSet",
    chapter: "Chapter XXIV",
    concept: "A `WeakSet` is a collection containing only unique object references held weakly, making them eligible for garbage collection.",
    simpleExample: `
const ws = new WeakSet();
let obj = { active: true };
ws.add(obj);
console.log(ws.has(obj)); // true
    `,
    howItWorks: "WeakSets are not iterable and do not prevent their stored object items from being garbage collected.",
    stepByStep: [
      "1. Initialize a `WeakSet` instance.",
      "2. Add object references using `.add(obj)`.",
      "3. Check existence with `.has(obj)`."
    ],
    mentalModel: "Think of a temporary visitor guest check-in list that clears out once visitors leave.",
    practicalCode: `
const visitedNodes = new WeakSet();
function markVisited(node) {
  visitedNodes.add(node);
}
    `,
    diagram: `
+-------------------------------------------------------------+
|                           WEAKSET                           |
|                                                             |
|  Object Item (Weak Reference) ---> Garbage Collected Safely |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "WeakSets store object collections weakly without preventing garbage collection.",
    sourceReference: "MDN Web Docs (WeakSet)",
    relatedTopics: ["weakmap", "iterators"]
  },

  "event-delegation": {
    title: "Event Delegation",
    chapter: "Chapter XXIV",
    concept: "Event delegation is a pattern where a single event listener is attached to a parent container to manage events triggered on its child elements.",
    simpleExample: `
document.getElementById("parent-list").addEventListener("click", function(event) {
  if (event.target && event.target.matches("li.item")) {
    console.log("List item clicked:", event.target.textContent);
  }
});
    `,
    howItWorks: "Relying on event bubbling, events propagate up from target child elements to parent handlers, reducing memory usage.",
    stepByStep: [
      "1. Attach an event listener to a common parent element.",
      "2. Inspect event bubbling origin via `event.target`.",
      "3. Handle events dynamically for current and future child elements."
    ],
    mentalModel: "Think of a security guard at a main building entrance monitoring visitors entering any room inside.",
    practicalCode: `
document.querySelector(".menu").addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    console.log("Button clicked:", e.target.dataset.action);
  }
});
    `,
    diagram: `
+-------------------------------------------------------------+
|                      EVENT DELEGATION                       |
|                                                             |
|  [ Child Element Click ] ---> Bubbles Up ---> [ Parent Listener ]
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Event delegation optimizes performance and handles dynamically added elements efficiently.",
    sourceReference: "MDN Web Docs (Event delegation) & JavaScript.info",
    relatedTopics: ["debouncing", "throttling"]
  },

  "debouncing": {
    title: "Debouncing",
    chapter: "Chapter XXIV",
    concept: "Debouncing ensures a function is only executed after a specified pause period has elapsed since its last invocation.",
    simpleExample: `
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
window.addEventListener('resize', debounce(() => console.log("Resized!"), 300));
    `,
    howItWorks: "Every new trigger resets the internal timer delay, delaying execution until typing or scrolling activity stops.",
    stepByStep: [
      "1. Wrap target function inside a debouncing wrapper.",
      "2. Clear existing active timers on every new event trigger.",
      "3. Set a new timeout delay to execute the function once activity settles."
    ],
    mentalModel: "Think of an elevator door timer that resets its close countdown every time someone new steps inside.",
    practicalCode: `
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", debounce(e => {
  console.log("Fetching query:", e.target.value);
}, 500));
    `,
    diagram: `
+-------------------------------------------------------------+
|                         DEBOUNCING                          |
|                                                             |
|  Event Triggers ---> [ Resets Timer ] ---> Executes After Pause
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Debouncing prevents excessive function executions during rapid-fire events like typing or resizing.",
    sourceReference: "MDN Web Docs & JavaScript.info",
    relatedTopics: ["throttling", "event-delegation"]
  },

  "throttling": {
    title: "Throttling",
    chapter: "Chapter XXIV",
    concept: "Throttling limits the execution of a function to at most once every specified time interval.",
    simpleExample: `
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
window.addEventListener('scroll', throttle(() => console.log("Scrolled!"), 200));
    `,
    howItWorks: "Regardless of how many times an event triggers during the interval window, the function executes strictly at regular timed intervals.",
    stepByStep: [
      "1. Wrap target function in a throttling wrapper.",
      "2. Check if a throttle lock flag is active.",
      "3. Execute function and set timer lock for the specified limit."
    ],
    mentalModel: "Think of a machine gun firing at a steady, fixed rate limit per second regardless of trigger pulls.",
    practicalCode: `
window.addEventListener("scroll", throttle(() => {
  console.log("Scroll position checked");
}, 100));
    `,
    diagram: `
+-------------------------------------------------------------+
|                          THROTTLING                         |
|                                                             |
|  Rapid Events ---> Executes at Regular Fixed Time Intervals  |
+-------------------------------------------------------------+
    `,
    keyTakeaway: "Throttling ensures steady, controlled execution rates during high-frequency events like scrolling.",
    sourceReference: "MDN Web Docs & JavaScript.info",
    relatedTopics: ["debouncing", "event-delegation"]
  }

};