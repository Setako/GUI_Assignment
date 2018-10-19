const MOCK_DATA = {
    loggedInAs: null,
    users: [
        {
            name: "Jack",
            username: "student1",
            password: "student1",
            requiredSetPassword: true,
            email: "student1@gmail.com",
            type: USER_TYPE.STUDENT
        }, {
            name: "Tom",
            username: "teching_staff1",
            password: "teching_staff1",
            requiredSetPassword: true,
            email: "teching_staff1@gmail.com",
            type: USER_TYPE.TEACHING_STAFF
        }, {
            name: "Staff A",
            username: "non_teaching_staff1",
            password: "non_teaching_staff1",
            requiredSetPassword: false,
            email: "non_teaching_staff1@gmail.com",
            type: USER_TYPE.NON_TEACHING_STAFF
        }, {
            name: "A Alumni",
            username: "alumni1",
            password: "alumni1",
            requiredSetPassword: false,
            email: "alumni1@gmail.com",
            type: USER_TYPE.ALUMNI
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
            publicationDate: 2016,
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
            publicationDate: 2015,
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
            publicationDate: 2018,
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
            publicationDate: 2018,
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
            publicationDate: 2018,
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
            publicationDate: 2018,
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
            publicationDate: 2018,
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
            publicationDate: 2018,
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
            publicationDate: 2018,
            imageLink: 'https://syndetics.com/index.aspx?isbn=9781680501957/sc.gif&client=summontrial&freeimage=true'
        },
        {
            title: 'Beginning Java™ EE 6 Platform with GlassFish™ 3: From Novice to Professional',
            author: ['Goncalves, Antonio'],
            subject: [],
            description: 'Sun\'s enterprise Java™ platform, Java EE (Enterprise Edition), is getting a facelift! Beginning Java EE 6 Platform with GlassFish 3 is one of the first tutorial books on the forthcoming Java EE 6 Platform. Step-by-step and easy to follow, this book describes many of the Java EE 6 specifications and reference implementations and shows them in action using practical examples. This book uses the new version of GlassFish™ 3 to deploy and administer the code examples. Written by an expert member of the Java EE 6 specification request and review board in the Java Community Process (JCP), this book contains the best information possible, from an expert\'s perspective in enterprise Java technologies and platform. What you\'ll learn Get started with the new Java EE 6 Platform from Sun. Explore and use the new EJB 3.1 and JPA 2.0 APIs from entities to session beans to message-driven beans, and more. Discover the new web-tier development APIs including JSPs, JSTL, and Expression Language, and especially the new JSF 2.0 and Facelets. Uncover the new web services, RESTful services, and more available in Java EE 6. Create dynamic user interfaces for your enterprise and transactional Java applications. And more... Who is this book for? This book is suitable for advanced Java programmers as well as Java EE 6 beginners. Architects will also find information about how to layer their Java EE applications.',
            publisher: '',
            isbn: ["9781282292734", "9786612292736", "9781430219552", "1282292730", "6612292733", "1430219556", "1430219548", "9781430219545"],
            copy: 5,
            borrowed: 2,
            language: 'English',
            publicationDate: 2018,
            imageLink: 'https://vtc.summon.serialssolutions.com/2.0.0/image/custom?url=http%3A%2F%2Ftechbus.safaribooksonline.com%2Fimages%2F9781430219545%2F9781430219545_xs.gif'
        },
        {
            title: 'Head First Java, 2nd Edition',
            author: ['Kathy Sierra', 'Bert Bates '],
            subject: [],
            description: 'Learning a complex new language is no easy task especially when it s an object-oriented computer programming language like Java. You might think the problem is your brain. It seems to have a mind of its own, a mind that doesn\'t always want to take in the dry, technical stuff you\'re forced to study.',
            publisher: 'O\'Reilly Media; 2nd edition',
            isbn: ["9780596009205"],
            copy: 6,
            borrowed: 2,
            language: 'English',
            publicationDate: 2005,
            imageLink: './res/img/materials/book_01.jpg'
        },
        {
            title: 'The Food Lab: Better Home Cooking Through Science',
            author: ['J. Kenji López-Alt'],
            subject: ['Cooking', 'Science'],
            description: 'Ever wondered how to pan-fry a steak with a charred crust and an interior that\'s perfectly medium-rare from edge to edge when you cut into it? How to make homemade mac \'n\' cheese that is as satisfyingly gooey and velvety-smooth as the blue box stuff, but far tastier? How to roast a succulent, moist turkey (forget about brining!)―and use a foolproof method that works every time?',
            publisher: 'W. W. Norton & Company; 1st edition',
            isbn: ["9780393081084"],
            copy: 6,
            borrowed: 2,
            language: 'English',
            publicationDate: 2015,
            imageLink: './res/img/materials/book_02.jpg'
        },
    ],
    magazines: [
        {
            title: 'Time Magazine (October 15, 2018) Her Lasting Impact Christine Blasey Ford Cover',
            author: ['Time Magazine'],
            subject: ['Magazine'],
            description: 'Time is an American weekly news magazine and news website published in New York City.',
            publisher: 'Time Magazine',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/mag_01.jpg'
        },
        {
            title: 'Time Magazine (April 2, 2018) Enough. Parkland Florida Marjory Stoneman Douglas High School Students',
            author: ['Time Magazine'],
            subject: ['Magazine'],
            description: 'Time is an American weekly news magazine and news website published in New York City.',
            publisher: 'Time Magazine',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/mag_02.jpg'
        },
        {
            title: 'Time Magazine (February 19, 2018) Black Panther Chadwick Boseman Cover',
            author: ['Time Magazine'],
            subject: ['Magazine'],
            description: 'Time is an American weekly news magazine and news website published in New York City.',
            publisher: 'Time Magazine',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/mag_03.jpg'
        },
        {
            title: 'Time Magazine (July 2, 2018) Welcome to America. ',
            author: ['Time Magazine'],
            subject: ['Magazine'],
            description: 'Time is an American weekly news magazine and news website published in New York City.',
            publisher: 'Time Magazine',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/mag_04.jpg'
        },
        {
            title: 'Time Magazine (July 30, 2018) The Summit Crisis Cover',
            author: ['Time Magazine'],
            subject: ['Magazine'],
            description: 'Time is an American weekly news magazine and news website published in New York City.',
            publisher: 'Time Magazine',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/mag_05.jpg'
        },
        {
            title: 'National Geographic Field Guide to the Birds of North America, 7th Edition',
            author: ['Jon L. Dunn', 'Jonathan Alderfer'],
            subject: ['Magazine'],
            description: '“The new edition is comprehensive and authoritative, written clearly enough for a beginning birder to understand and yet highly detailed enough for those who are more experienced. Dunn’s expertise in bird taxonomy and Alderfer’s artistic skills are a boon to this latest update of the venerable Nat Geo, a most worthwhile addition to any birder’s library.” ABA blog',
            publisher: 'National Geographic',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2017,
            imageLink: './res/img/materials/mag_06.jpg'
        },
        {
            title: 'National Geographic Backyard Guide to the Birds of North America (National Geographic Backyard Guides)',
            author: ['Paul Hess', 'Jonathan Alderfer'],
            subject: ['Magazine'],
            description: 'Essential for the millions of Americans who watch and feed birds in their backyards—whether experienced birders or new birding enthusiasts—from the experts at National Geographic and co-author of the popular and perennial best seller Field Guide to the Birds of North America.',
            publisher: 'National Geographic',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2011,
            imageLink: './res/img/materials/mag_07.jpg'
        },
        {
            title: 'TIME Mindfulness: The New Science of Health and Happiness',
            author: ['Time Magazine'],
            subject: ['Magazine'],
            description: 'Just because you’re busy and distracted doesn’t mean that you have to miss out on life. If we all get even a little better at being mindful, we benefit in crucial ways. Now, the editors of TIME bring you a new special edition – Mindfulness: The New Science of Health and Happiness that teaches you how to be mindful (and exactly what that means).',
            publisher: 'Time Magazine',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2016,
            imageLink: './res/img/materials/mag_08.jpg'
        },
        {
            title: 'TIME The Science of Exercise: Younger. Smarter. Stronger.',
            author: ['Time Magazine'],
            subject: ['Magazine'],
            description: 'Few fields have changed as rapidly as the science of exercise. New research suggests that exercise can increase your life expectancy and stave off cognitive decline more than anything else you do. The best part? You may not need to do as much of it as experts once thought. In this TIME special edition, readers will learn:\n' +
                'exactly why exercise is the best anti-ager-and how it changes nearly every part of the body\n' +
                'effective ways to squeeze tiny amounts of exercise into your day\n' +
                'strategies for lasting weight loss through exercise in conjunction with the right diet\n' +
                'the best exercises for every goal, whether it\'s stress reduction, better skin, a stronger stomach or a healthier heart',
            publisher: 'Time Magazine',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2017,
            imageLink: './res/img/materials/mag_09.jpg'
        },
        {
            title: 'TIME The Science of Happiness: New Discoveries for a More Joyful Life',
            author: ['Time Magazine'],
            subject: ['Magazine'],
            description: '“Don’t worry, be happy.” Sounds simple enough, yet many encounter setbacks in their pursuit of happiness. What if we could definitively say: “If you do this, you will achieve a happier and healthier life?” What if we could unlock the key to happiness? Enter Science.',
            publisher: 'Time Magazine',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2016,
            imageLink: './res/img/materials/mag_10.jpg'
        },
    ],
    software: [
        {
            title: 'IntelliJ IDEA',
            author: ['Jetbrains'],
            subject: ['Software', 'IDE', 'Java'],
            description: 'The most intelligent Java IDE. IntelliJ IDEA analyzes your code, looking for connections between symbols across all project files and languages. Using this information it provides indepth coding assistance, quick navigation, clever error analysis, and, of course, refactorings. ',
            publisher: 'Jetbrains',
            isbn: [],
            copy: 4,
            borrowed: 2,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/sw_01.png'
        }, {
            title: 'PyCharm',
            author: ['Jetbrains'],
            subject: ['Software', 'IDE', 'Python'],
            description: 'Python IDE for professional developers. PyCharm provides smart code completion, code inspections, on-the-fly error highlighting and quick-fixes, along with automated code refactorings and rich navigation capabilities.',
            publisher: 'Jetbrains',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/sw_02.png'
        }, {
            title: 'Adobe Photoshop CC',
            author: ['Adobe'],
            subject: ['Software', 'Photo', 'Adobe'],
            description: 'If you can think it, you can make it with Photoshop CC, the world’s best imaging and graphic design software. Create and enhance photographs, illustrations, and 3D artwork. Design websites and mobile apps. Edit videos, simulate real-life paintings, and more. It’s everything you need to make any idea real.',
            publisher: 'Adobe',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/sw_03.jpg'
        }, {
            title: 'Adobe Premiere Pro CC',
            author: ['Adobe'],
            subject: ['Software', 'Video', 'Adobe'],
            description: 'Video editing that’s always a cut above.Premiere Pro CC is the leading video editing software for film, TV, and the web. Creative tools, integration with other Adobe apps and services, and the power of Adobe Sensei help you craft footage into polished films and videos in one seamless workflow. And Premiere Rush, our new app, is included with your subscription so you can capture footage and start editing on all your devices, anywhere.',
            publisher: 'Adobe',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/sw_04.jpg'
        }, {
            title: 'Firefox Nightly ',
            author: ['Firefox'],
            subject: ['Software', 'Browser'],
            description: 'Get a sneak peek at our next generation web browser, and help us make it the best browser it can be: try Firefox Nightly.Nightly is an unstable testing and development platform. By default, Nightly sends data to Mozilla — and sometimes our partners — to help us handle problems and try ideas.',
            publisher: 'Firefox',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/sw_05.png'
        }, {
            title: 'Firefox Developer Edition',
            author: ['Firefox'],
            subject: ['Software', 'Browser'],
            description: 'Build, test, scale and more with the only browser built just for developers.Developer Edition is an unstable testing and development platform. By default, Developer Edition sends data to Mozilla — and sometimes our partners — to help us handle problems and try ideas.',
            publisher: 'Firefox',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/sw_06.png'
        }, {
            title: 'Internet Explorer 8',
            author: ['Microsoft'],
            subject: ['', ''],
            description: '',
            publisher: 'Microsoft',
            isbn: [],
            copy: 4,
            borrowed: 1,
            language: 'English',
            publicationDate: 2011,
            imageLink: './res/img/materials/sw_07.png'
        }, {
            title: 'Apache OpenOffice',
            author: ['Apache'],
            subject: ['Software', 'Office', 'Apache'],
            description: 'Apache OpenOffice is the leading open-source office software suite for word processing, spreadsheets, presentations, graphics, databases and more. It is available in many languages and works on all common computers. It stores all your data in an international open standard format and can also read and write files from other common office software packages. It can be downloaded and used completely free of charge for any purpose.',
            publisher: 'Apache',
            isbn: [],
            copy: 4,
            borrowed: 1,
            language: 'English',
            publicationDate: 2012,
            imageLink: './res/img/materials/sw_08.jpg'
        }, {
            title: 'Node.js 8.12.0 LTS',
            author: ['Node.js Foundation'],
            subject: ['Software', 'Programming'],
            description: 'Node.js® is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
            publisher: 'Node.js Foundation',
            isbn: [],
            copy: 4,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/sw_09.png'
        }, {
            title: 'Gnone',
            author: ['The GNOME Project'],
            subject: ['Software', 'GUI'],
            description: 'An easy and elegant way to use your computer, GNOME 3 is designed to put you in control and get things done.',
            publisher: ' The GNOME Project',
            isbn: [],
            copy: 2,
            borrowed: 1,
            language: 'English',
            publicationDate: 2018,
            imageLink: './res/img/materials/sw_10.png'
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
