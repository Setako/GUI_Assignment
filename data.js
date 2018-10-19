const MOCK_DATA = {
    loggedInAs: null,
    users: [
        {
            name: "Tester",
            username: "student1",
            password: "student1",
            requiredSetPassword: true,
            email: "student1@gmail.com",
            type: USER_TYPE.STUDENT
        }, {
            username: "teching_staff1",
            password: "teching_staff1",
            requiredSetPassword: true,
            email: "teching_staff1@gmail.com",
            type: USER_TYPE.TEACHING_STAFF
        }, {
            username: "non_teaching_staff1",
            password: "non_teaching_staff1",
            requiredSetPassword: false,
            email: "non_teaching_staff1@gmail.com",
            type: USER_TYPE.NON_TEACHING_STAFF
        }
    ],
    books: [
        {
            title: 'Beyond jQuery',
            author: ['Nicholus, Ray.'],
            subject: ['Computer Science', 'Computers', 'Web Development'],
            description: 'This book gives you the confidence to abandon your jQuery crutches and walk freely with the power of the web API and JavaScript. Learn about the most important concepts surrounding web development as we demystify jQuery. Beyond jQuery doesn\'t just throw code at you - everything is explained in detail from the perspective of a jQuery developer. jQuery is often injected into web applications and libraries with no logical reason for pulling it in as a dependency. Many web developers don’t really know when they need to use jQuery, and when they don’t - it\'s just a standard step when setting up a new library or web application. But relying solely on jQuery as your window to the web leaves large gaps in your knowledge. This in turn results in frustration when the abstraction that jQuery provides “leaks” and exposes you to the native aspects of the browser.  Beyond jQuery educates developers, reveals the magic behind jQuery, helps you solve common problems without it, and gives you more confidence to embrace the power of the web API and standardized JavaScript.',
            publisher: 'Berkeley, CA : Apress : Imprint: Apress',
            isbn: ['1-4842-2235-0', '1-4842-2234-2'],
            copy: 2,
            borrowed: 1,
            language: 'English',
            releaseDate: 2016,
            imageLink: 'https://vtc.summon.serialssolutions.com/2.0.0/image/custom?url=http%3A%2F%2Ftechbus.safaribooksonline.com%2Fimages%2F9781484222355%2F9781484222355_xs.jpg'
        }, {
            title: 'Practical jQuery',
            author: ['Chaudhary, Mukund', 'Kumar, Ankur'],
            subject: ['Computer Science'],
            description: 'Practical jQuery is your step-by-step guide to using jQuery in the real world, taking you from downloading jQuery all the way to extending it by writing your own plug-ins and testing the DOM using QUnit. jQuery is one of today’s most popular JavaScript web application development frameworks and libraries. While getting started with the tool is easy, sometimes it\'s not as simple to completely realize the power and automation that it can bring to your development work—and that\'s especially the case when you\'re in the middle of a project, up against a deadline. Using this book, you will learn how to use jQuery’s powerful DOM manipulation tools to dynamically update content on your site. You will be able to extend jQuery’s capabilities by writing your own plugins on top of the framework, animate elements, build your own jQuery elements, employ best practices, and avoid common errors. Practical jQuery teaches you how, with jQuery, you can unit test and refactor your code. You’ll see how expressive yet concise jQuery’s code is and how much quicker and efficient it is to develop with jQuery. Get a fundamental perspective on how jQuery works, how to understand, select, and build your own plug-ins, and how to make sure your projects run at the peak of their potential performance using Practical jQuery today.',
            publisher: 'Berkeley, CA : Apress : Imprint: Apress',
            isbn: ['1-4842-0787-4', '1-4842-0788-2'],
            copy: 3,
            borrowed: 1,
            language: 'English',
            releaseDate: 2015,
            imageLink: 'https://vtc.summon.serialssolutions.com/2.0.0/image/custom?url=http%3A%2F%2Ftechbus.safaribooksonline.com%2Fimages%2F9781484207871%2F9781484207871_xs.jpg'
        }, {
            title: 'Programming Clojure',
            author: ['Miller, Alex.', 'Bedra, Aaron', 'Halloway, Stuart Dabbs'],
            subject: ['Java virtual machine', 'Clojure', 'Functional programming', 'Computer Science'],
            description: 'Drowning in unnecessary complexity, unmanaged state, and tangles of spaghetti code? Clojure cuts through complexity by providing a set of composable tools-immutable data, functions, macros, and the interactive REPL. Written by members of the Clojure core team, this book is the definitive guide to Clojure. This edition includes information on all the newest features of Clojure, such as transducers and specs. Find out about the sequence abstraction, which combines immutable collections with functional programming to create truly reusable data transformation code. Discover Clojure\'s unique approach to state and identity, techniques for polymorphism using multimethods and protocols, and how to use Clojure\'s metaprogramming capabilities. Use Clojure\'s spec library to validate data, destructure data, explain invalid data, and generate large numbers of tests to verify code. With this book, you\'ll learn how to think in Clojure, and how to take advantage of its combined strengths to build powerful programs quickly.--Back cover. ',
            publisher: 'Raleigh, North Carolina : The Pragmatic Bookshelf',
            isbn: ['9781680502466', '1680502468'],
            copy: 1,
            borrowed: 0,
            language: 'English',
            releaseDate: 2018,
            imageLink: 'https://syndetics.com/index.aspx?isbn=9781680502466/sc.gif&client=summontrial&freeimage=true'
        }, {
            title: 'HTML5 games: novice to ninja',
            author: ['Castledine, Earle'],
            subject: ['Canvas', 'Game programming', 'Computer game', 'HTML'],
            description: 'This book will teach you how to create awesome video games. Games from scratch. Games that run cross-platform, in web browsers, and on phones. Games filled with dynamic sound and music. Games overflowing with impressive visual effects. Fun games. More importantly, this book will teach you how to think about making games. You\'ll learn to analyze and dissect games--to understand what it is that makes great games great. By the end of the journey you\'ll have all the knowledge and tools needed to produce engaging, polished products that people will love to play. Learn the basics: game loops and input; Draw graphics on the screen using Canvas; Add amazing sound effects and music using the Web Audio API; Develop several fun games: a platformer, a shoot’em up, a dungeon crawler, and a physics-based game; Create your own JavaScript game library; Jazz up your game up with "juice": screen shakes, particle effects, and more.--Back cover.',
            publisher: 'SitePoint Pty. Ltd',
            isbn: ['0994182619', '9780994182616'],
            copy: 1,
            borrowed: 0,
            language: 'English',
            releaseDate: 2018,
            imageLink: 'https://syndetics.com/index.aspx?isbn=9780994182616/sc.gif&client=summontrial&freeimage=true'
        }, {
            title: 'Reactive programming with RxJS 5: untangle your asynchronous JavaScript code',
            author: ['Mansilla, Sergi', 'MacDonald, Brian'],
            subject: ['JavaScript', 'Programming'],
            description: 'Reactive programming is revolutionary. It makes asynchronous programming clean, intuitive, and robust. Use RxJS 5 to master the Observable: a powerful data type that substitutes callbacks and promises. Think about your programs as streams of data that change and adapt to produce what you want. The code in this new edition is completely updated for RxJS 5 and ES6. Find out about Observables, a unifying data type that simplifies concurrent code and eases the pain of callbacks. Learn how Schedulers change the concept of time itself, making asynchronous testing sane again. You\'ll also use Cycle.js-a modern, reactive, web framework-to make a new breed of web applications. Learn to think in a reactive way, using RxJS 5 to build complex programs and create amazing reactive user interfaces.--Back cover.',
            publisher: 'The Pragmatic Bookshelf',
            isbn: ['9781680502473', '1680502476'],
            copy: 2,
            borrowed: 1,
            language: 'English',
            releaseDate: 2018,
            imageLink: 'https://syndetics.com/index.aspx?isbn=9781680502473/sc.gif&client=summontrial&freeimage=true'
        }, {
            title: 'Sams teach yourself PHP, MySQL & JavaScript all in one',
            author: ['Meloni, Julie C'],
            subject: ['Applications, Web', 'MySQL', 'Javascript', 'PHP', 'Web application'],
            description: 'In just a short time, you can learn how to use PHP, MySQL, and JavaScript together to create dynamic, interactive websites and applications using three leading web development technologies. No previous programming experience is required. Using a straightforward, step-by-step approach, each lesson in this book builds on the previous ones, enabling you to learn the essentials of full-stack web application development - from HTML, CSS, and JavaScript on the front end, to PHP scripting and MySQL databases on the server. Regardless of whether you run Linux, Windows, or MacOS, the book includes complete instructions to install all the software you need to set up a stable environment for learning, testing, and production. Step-by-step instructions carefully walk you through the most common web application development tasks. Practical , hands-on examples show you how to apply what you learn. Quizzes and exercises help you test your knowledge andstretch your skills. Learn how to: Build web pages with HTML5 and CSS Use JavaScript to build dynamic, interactive web pages Get PHP, MySQL, and JavaScript to work together to create modern, standards-compliant web applications Enhance interactivity with AJAX Leverage JavaScript libraries such as jQuery Work with cookies and user sessions Get user input with web-based forms Use basic SQL commands Interact with the MySQL database using PHP Write maintainable code and get started with version control Decide when frameworks such as Bootstrap, Foundation, React, Angular, and Laravel can be useful Create a web-based discussion forum or calendar Add a storefront and shopping cart to your site Contents at a Glance PART I Web Application Basics 1 Understanding How the Web Works 2 Structuring HTML and Using Cascading Style Sheets 3 Understanding the CSS Box Model and Positioning 4 Introducing JavaScript 5 Introducing PHP',
            publisher: 'Pearson',
            isbn: ['9780672337703', '0672337703'],
            copy: 4,
            borrowed: 0,
            language: 'English',
            releaseDate: 2018,
            imageLink: 'https://syndetics.com/index.aspx?isbn=9780672337703/sc.gif&client=summontrial&freeimage=true'
        }, {
            title: 'Rapid modernization of Java applications: practical business and technical solutions for upgrading your enterprise portfolio',
            author: ['Venkat, G'],
            subject: ['Java', 'Programming', 'Computer-based information systems'],
            description: 'Learn cutting-edge techniques and processes to systematically and strategically modernize legacy Java applications with predictability, consistency, and confidence. This Oracle Press guide offers an innovative blueprint that empowers corporate management teams to better understand necessary technical requirements and enables Java architects and developers to better align with agile business needs. Rapid Modernization of Java Applications: Practical Business and Technical Solutions for Upgrading Your Enterprise Portfolio contains modernization approaches that offer end-to-end Java application portfolio visibility so that application modernization projects can stay on-schedule and within budget. Explore the in-depth components of a Java modernization solution -- Create, manage, and evolve custom application portfolios -- Craft compelling business cases and learn how to estimate costs and identify risks -- Use architectural decomposition techniques to eliminate technical and functional redundancies -- Migrate, enhance, maintain, and modernize legacy applications to service-oriented architectures -- Formulate and execute a comprehensive modernization roadmap -- Visualize the application portfolio along multi-dimensions -- Build automation tools that are geared toward Java architects and developers -- Transform traditional Java applications into REST services and microservices -- Establish metrics and KPIs to implement a resilient governance framework -- Undertake large-scale modernizations to accelerate business transformations -- Provided by publisher.',
            publisher: 'McGraw-Hill Education',
            isbn: ['0071842039', '9780071842037'],
            copy: 1,
            borrowed: 1,
            language: 'English',
            releaseDate: 2018,
            imageLink: 'https://syndetics.com/index.aspx?isbn=9780071842037/sc.gif&client=summontrial&freeimage=true'
        }, {
            title: 'Angular in action',
            author: ['Wilken, Jeremy'],
            subject: ['TypeScript', 'Applications', 'Angular', 'Web'],
            description: 'Angular makes it easy to deliver amazing web apps. This powerful JavaScript platform provides the tooling to man- age your project, libraries to help handle most common tasks, and a rich ecosystem full of third-party capabilities to add as needed. Built with developer productivity in mind, Angular boosts your efficiency with a modern component architecture, well-constructed APIs, and a rich community. Angular in Action teaches you everything you need to build production-ready Angular applications. You\'ll start coding immediately, as you move from the basics to advanced techniques like testing, dependency injection, and performance tuning. Along the way, you\'ll take advantage of TypeScript and ES2015 features to write clear, well-architected code. Thoroughly practical and packed with tricks and tips, this hands-on tutorial is perfect for web devs ready to build web applications that can handle whatever you throw at them. What\'s Inside: Spinning up your first Angular application; A complete tour of Angular\'s features; Comprehensive example projects; Testing and debugging; Managing large applications. Written for web developers comfortable with JavaScript, HTML, and CSS."--Back cover.',
            publisher: 'Manning Publications Co',
            isbn: ['1617293318', '9781617293313'],
            copy: 3,
            borrowed: 2,
            language: 'English',
            releaseDate: 2018,
            imageLink: 'https://syndetics.com/index.aspx?isbn=9781617293313/sc.gif&client=summontrial&freeimage=true'
        }, {
            title: 'Node.js 8 the right way: practical, server-side JavaScript that scales',
            author: ['Wilson, Jim R', 'Carter, Jacquelyn'],
            subject: ['Node.js', 'Javascript', 'Web'],
            description: 'Node.js 8 the Right Way. Gets you up to speed on server-side programming with Node.js 8, as you develop real programs that are small, fast, low-profile, and useful. Take JavaScript beyond the browser, explore dynamic language features, and embrace evented programming. This updated and expanded second edition showcases the latest ECMAScript features, current best practices, and modern development techniques. Write asynchronous, non-blocking code using Node.js\'s style and patterns. Cluster and load balance services with Node.js core features and third-party tools. Work with many protocols, create RESTful web services, TCP socket clients and servers, and more. Test your code\'s functionality with Mocha, and manage its life cycle with npm. Harness the power of the event loop and non-blocking I/O to create highly parallel microservices and applications. Join the smart and diverse community that\'s rapidly advancing the state of the art in JavaScript development."--Back cover.',
            publisher: 'The Pragmatic Bookshelf',
            isbn: ['168050195X', '9781680501957'],
            copy: 5,
            borrowed: 0,
            language: 'English',
            releaseDate: 2018,
            imageLink: 'https://syndetics.com/index.aspx?isbn=9781680501957/sc.gif&client=summontrial&freeimage=true'
        }, {
            title: 'Beginning Java™ EE 6 Platform with GlassFish™ 3: From Novice to Professional',
            author: ['Goncalves, Antonio'],
            subject: [],
            description: 'Sun\'s enterprise Java™ platform, Java EE (Enterprise Edition), is getting a facelift! Beginning Java EE 6 Platform with GlassFish 3 is one of the first tutorial books on the forthcoming Java EE 6 Platform. Step-by-step and easy to follow, this book describes many of the Java EE 6 specifications and reference implementations and shows them in action using practical examples. This book uses the new version of GlassFish™ 3 to deploy and administer the code examples. Written by an expert member of the Java EE 6 specification request and review board in the Java Community Process (JCP), this book contains the best information possible, from an expert\'s perspective in enterprise Java technologies and platform. What you\'ll learn Get started with the new Java EE 6 Platform from Sun. Explore and use the new EJB 3.1 and JPA 2.0 APIs from entities to session beans to message-driven beans, and more. Discover the new web-tier development APIs including JSPs, JSTL, and Expression Language, and especially the new JSF 2.0 and Facelets. Uncover the new web services, RESTful services, and more available in Java EE 6. Create dynamic user interfaces for your enterprise and transactional Java applications. And more... Who is this book for? This book is suitable for advanced Java programmers as well as Java EE 6 beginners. Architects will also find information about how to layer their Java EE applications.',
            publisher: '',
            isbn: ["9781282292734", "9786612292736", "9781430219552", "1282292730", "6612292733", "1430219556", "1430219548", "9781430219545"],
            copy: 5,
            borrowed: 2,
            language: 'English',
            releaseDate: 2018,
            imageLink: 'https://vtc.summon.serialssolutions.com/2.0.0/image/custom?url=http%3A%2F%2Ftechbus.safaribooksonline.com%2Fimages%2F9781430219545%2F9781430219545_xs.gif'
        },],
    magazines: [
        {
            title: 'Java Weekly No. 1',
            author: ['Super Power'],
            subject: ['Magazine', 'Java'],
            description: 'It is the amazing magazine!',
            publisher: 'Super Power',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            releaseDate: 2018,
            imageLink: ''
        },
    ]
};

const DataStorage = (function () {
    let DATA = JSON.parse(localStorage.getItem("data"));

    function resetData() {
        console.log({message: "old data backup", data: localStorage.getItem("data")});
        localStorage.setItem("mock_data", JSON.stringify(MOCK_DATA));
        localStorage.setItem("data", JSON.stringify(MOCK_DATA));
        DATA = JSON.parse(localStorage.getItem("data"));
    }

    function checkData() {
        if (localStorage.getItem("mock_data") !== JSON.stringify(MOCK_DATA)) {
            if (confirm("Your mock data is not up to date, clear and redeploy now?")) {
                console.log("Mock data not up to date, replacing data...");
                resetData();
            }
        }
    }

    function saveData() {
        localStorage.setItem("data", JSON.stringify(DATA));
    }

    return {
        resetData: resetData,
        checkData: checkData,
        saveData: saveData,
        data: DATA
    }

})();
DataStorage.checkData();
