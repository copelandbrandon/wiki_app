-- Users table seeds here
INSERT INTO users (name, email, password)
VALUES ('AliceCarrero', 'aCarrero@gmail.com', 'password'),
('KiraGimble', 'kGimble@rocketmail.com', 'password'),
('CharlesMiller', 'charlesG@hotmail.com', 'password'),
('NedCullen', 'nedwardCullen@shaw.ca', 'password'),
('TommyNails', 'Tdizzle@gmail.com', 'password'),
('VladTepesh', 'theImpaler@gmail.com', 'password'),
('SamGamgee', 'sworn2carryurburdens@live.com', 'password'),
('FrodoBaggins', 'ringbearer42@shiremail.com', 'password'),
('JeanineFry', 'jeanqueen@hotmail.com', 'password'),
('CarlieGrey', 'carlieSimone@gmail.com', 'password'),
('SimonCaldwell', 'scaldwell83@gmail.com', 'password'),
('JeremyHenderson', 'jh85793@gmail.com', 'password'),
('GladysOberland', 'goberland7@gmail.com', 'password'),
('GregKneelie', 'gregK92@gmail.com', 'password'),
('DanielDevito', 'danielSan@gmail.com', 'password');

--Types table seeds here
INSERT INTO types (name)
VALUES ('Video'),
('Article'),
('Quiz'),
('Blog'),
('Documentation'),
('Resource Hub'),
('Podcast');


--Posts table seeds here contains 40 posts currently
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://www.hackerrank.com/dashboard', 'HackerRank', 'Hacker rank is a great resource hub for developers looking to find a job!', 1, 6, 'Coding basics'),
('https://developer.mozilla.org/en-US/', 'MDN', 'A page that web developers should probably bookmark.', 2, 5, 'Coding basics'),
('https://nodejs.org/en/docs/', 'Node Documentation', 'Documentation for node js.', 3, 5, 'Node'),
('https://www.postgresql.org/docs/', 'Postgres Docs', 'Postgres is a wonderfully intuitive SQL dialect.', 4, 5, 'Postgresql'),
('http://expressjs.com/en/api.html', 'express API', 'This is where all the cool devs go to write servers!', 1, 5, 'Express'),
('https://www.hackerrank.com/dashboard', 'Hacker Dash', 'This is a great place to practice for technical interviews!', 2, 6, 'JS fundamentals'),
('https://www.hackerrank.com/dashboard', 'The Dash', 'I recommend all web devs user hacker rank at least once a month.', 3, 6, 'Javascript'),
('https://www.khanacademy.org/', 'Khan Academy', 'Ever wanted to learn something new? try Khan Academy!', 4, 6, 'Overall Learning'),
('https://www.khanacademy.org/humanities/art-history', 'Art History with Khan Academy', 'I absolutely love the Khan Academy course for art-history, and I think you will too!', 7, 6, 'Art History'),
('https://www.khanacademy.org/science/ap-college-environmental-science', 'Env Science with Khan Academy', 'Khan Academy found a way to make environmental science fun again! Check it out here.', 9, 6, 'Science'),
('https://us02web.zoom.us/rec/share/DO7wuPT-DZmkHbzrU5wDU7yRrGLRESydrdha3j3EDZjh-Famuako9saeIjXhK2ib.HRJuHoZf68aIcRER?startTime=1622239044000', 'express router breakout', 'A great lecture explaining express routers.',5, 1, 'Express'),
('https://www.youtube.com/watch?v=SowaJlX1uKA&list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET&index=34', 'JavaScript Tutorial For Beginners', 'A great intro tutorial for those looking to bone up on their javascripting skills.', 6, 1, 'JavaScript'),
('https://www.youtube.com/watch?v=ZcQyJ-gxke0&list=PL4cUxeGkcC9jx2TTZk3IGWKSbtugYdrlu', 'Asynchronous JavaScript Tutorial', 'It''s dangerous to code asynchronous functions alone, take this.', 5, 1, 'Asynchronous'),
('https://www.youtube.com/watch?v=2pZmKW9-I_k', 'TypeScript Tutorial', 'I found this introduction to typescript really useful!', 14, 1, 'TypeScript'),
('https://www.youtube.com/watch?v=Rgx8dpiPwpA', 'a day in the life of an engineer working from home', 'A hilarious video about what it''s like to be a software engineer!', 12, 1, 'DailyLife'),
('https://www.youtube.com/watch?v=zu6I2FXakLI', 'Javascript Promises Tutorial', 'A great video explaining promises with examples.', 13, 1, 'Promises'),
('https://github.com/airbnb/javascript', 'Airbnb JavaScript Style Guide', 'A fantastic style guide for writing clean code.', 15, 5, 'JavaScript'),
('https://getbootstrap.com/docs/4.1/getting-started/introduction/', 'Introduction to bootstrap', 'Documentation for css bootstrap.', 15, 5, 'bootstrap'),
('https://www.youtube.com/watch?v=b4b8ktEV4Bg', 'Hashing algorithms', 'an easy to follow video by computerphile explaining hashing.', 1, 1, 'Web security'),
('https://podcasts.google.com/feed/aHR0cHM6Ly93d3cub21ueWNvbnRlbnQuY29tL2QvcGxheWxpc3QvOWI3ZGFjZGYtYTkyNS00Zjk1LTg0ZGMtYWM0NjAwMzQ1MWZmLzVjZDc0MTNjLWIzNDEtNDkzZi1iZjQ2LWFjYjUwMDM2NDE0MS82YjI1NDBkNC1lMGIyLTQyZjctYTYxYS1hY2I1MDAzNjQxNWEvcG9kY2FzdC5yc3M?sa=X&ved=2ahUKEwjH5vD-__fwAhUYmJ4KHdfaAEEQjs4CKAZ6BAgBEH0', 'The Mindset Mentor', 'A series of podcasts for anyone looking for motivation or inspiration on the day to day.', 9, 7, 'Motivational'),
('https://web-design-weekly.com/viewport-units-vw-vh-vmin-vmax/', 'Web Design', 'An interesting article on viewport units realted to css styling.', 4, 2, 'Viewport Units'),
('https://elearningindustry.com/', 'Elearning Industry', 'Elearning Industry is a great place to go for a variety of educational blogs.', 3, 4, 'general learning'),
('https://www.theedublogger.com/prompts-student-writing/', 'Blog Publishing Tips', 'If you''re stuck trying to think of a writing prompt take a look at this!', 13, 4, 'Writing prompts'),
('https://www.britannica.com/quiz/parts-of-a-cell', 'Parts of a cell', 'a quiz to test your knowledge on the parts of a cell.', 7, 3, 'Biology'),
('https://www.nature.com/articles/d41586-021-01441-w', 'Livestock Vaccination', 'An article going into detail of a new livestock vaccination.', 8, 2, 'Farming'),
('https://www.youtube.com/watch?v=Y0HfmYBlF8g&t=12s', 'Making Aerogel', 'A great video from NileRed showing the process of creating aerogel!', 6, 1, 'Chemistry'),
('https://www.tomakemuchoftime.com/blog/scotland-accommodations?gclid=CjwKCAjwtdeFBhBAEiwAKOIy5zTft_Ay_GN3dUVp7D8azaPFqBL_0CBYCxkcxvW9s_Xnwx7yypXEoxoCl4QQAvD_BwE', 'Scotlands Accomodations', 'A great blog to read for anyone looking to visit Scotland.', 7, 4, 'Travel'),
('https://codingislove.com/generate-link-preview-webapp/', 'Generating link previews', 'An article explaining the benefit of generating link previews.', 5, 2, 'Coding HTML'),
('https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkczIuZmVlZGJ1cm5lci5jb20vdGVkdGFsa3NfYXVkaW8?sa=X&ved=2ahUKEwjH5vD-__fwAhUYmJ4KHdfaAEEQjs4CKAV6BAgBEGk', 'Ted Talks Daily', 'A great daily podcast by Ted Talks that I recommend!', 11, 7, 'General Learning'),
('https://www.quantamagazine.org/black-hot-superionic-ice-may-be-natures-most-common-form-of-water-20190508/', 'Super-Ionic Ice', 'An extremely interesting article that explains what super-ionic ice is', 7, 2, 'Science'),
('https://www.proprofs.com/quiz-school/story.php?title=open-vs-closed-questions', 'Open Ended vs Closed Ended Questions', 'Test your soft skills knowledge by seeing if you know the difference between these two types of questions.', 12, 3, 'Soft Skills'),
('https://study.com/academy/practice/quiz-worksheet-critical-thinking-in-the-media-research-academics.html', 'Critical Thinking in Media Quiz', 'A great way to test your critical thinking when it comes to reading academic research', 14, 3, 'Critical thinking'),
('https://science.nasa.gov/science-news/biological-physical/nasa-selects-proposals-to-conduct-fluid-physics-flow-boiling-experiments-on-the-international-space-station', 'Fluid Physics Flow Boiling Experiments on the International Space Station', 'NASA Physical Sciences Research Program has selected two flight proposals to conduct experiments on the International Space Station.', 5, 2, 'Space'),
('https://www.thegeekstuff.com/2012/04/curl-examples/', '15 Practical Curl Examples', 'An article going over 15 practical ways to use the linux Curl command', 11, 2, 'Command Line'),
('https://code.tutsplus.com/tutorials/top-15-best-practices-for-writing-super-readable-code--net-8118', '18 Best Practices to Writing Super Readable Code.', 'This article was very useful when I was first starting to code!', 3, 2, 'Coding Basics'),
('https://podcasts.google.com/feed/aHR0cDovL251dHJpdGlvbmZhY3RzLm9yZy9hdWRpby9mZWVkL3BvZGNhc3Qv?sa=X&ved=2ahUKEwjH5vD-__fwAhUYmJ4KHdfaAEEQjs4CKAl6BQgBELwB', 'Nutrition Facts with Dr. Greger', 'A great podcast to learn about daily nutrition.', 12, 7, 'Nutrition'),
('https://teachbeyond.org/news/2020/12/mind-your-mindset-cultivating-a-growth-mindset-in-our-students/?gclid=Cj0KCQjw2NyFBhDoARIsAMtHtZ5HkffjOfHGJgS2uYcJwiZ2WVqAYhz1Uo4AnCXo_Q9KSCQ7vuYcza4aAj3nEALw_wcB', 'Cultivating a Growth Mindset in Students', 'A great blog for educators to find inspiration.', 3, 4, 'Mindset'),
('https://www.cnet.com/how-to/best-password-manager/', 'Best Password Manager to Use.', 'An article comparing different password managers.', 13, 2, 'CyberSecurity'),
('https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5tZWdhcGhvbmUuZm0vaGFwcGluZXNzbGFi?sa=X&ved=2ahUKEwjH5vD-__fwAhUYmJ4KHdfaAEEQjs4CKAV6BAgBEGw', 'The Happiness Lab with Dr. Laurie Santos', 'A series of podcasts detailing ways to live a happier life', 7, 7, 'Mental Health'),
('https://www.technewsworld.com/perl/section/tech-blog/', 'TechNewsWorld', 'A great blog to keep up to date on current tech trends.', 4, 4, 'Technology');

--Favourites table seeds here
INSERT INTO favourites (post_id, viewer_id)
VALUES (1, 10),
(1, 7),
(3, 9),
(2, 6),
(5, 1),

(6, 5),
(15, 4),
(8, 1),
(9, 8),
(13, 2),
(5, 5),
(4, 1);

--Favourites table seeds here
INSERT INTO favourites (post_id, viewer_id) VALUES (1, 10);
INSERT INTO favourites (post_id, viewer_id) VALUES (1, 7);
INSERT INTO favourites (post_id, viewer_id) VALUES (3, 9);
INSERT INTO favourites (post_id, viewer_id) VALUES (2, 6);
INSERT INTO favourites (post_id, viewer_id) VALUES (5, 1);

INSERT INTO favourites (post_id, viewer_id) VALUES (6, 5);
INSERT INTO favourites (post_id, viewer_id) VALUES (8, 1);
INSERT INTO favourites (post_id, viewer_id) VALUES (9, 8);
INSERT INTO favourites (post_id, viewer_id) VALUES (5, 5);
INSERT INTO favourites (post_id, viewer_id) VALUES (4, 1);

--Comments table seeds here
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (1, 7, 5, 'Woah I love this!'),
(1, 9, 3, 'Meh...'),
(1, 8, 3, 'This is okay, but I disagree'),
(8, 1, 1, 'I did not find this helpful!'),
(9, 1, 5, 'Thanks for sharing!'),
(3, 5, 4, 'There were some spelling mistakes...'),
(9, 4, 5, 'Saving for later.'),
(4, 7, 2, 'I found a better resource here (url)'),
(6, 6, 1, 'I cant even read this!'),
(5, 3, 3, 'Nice');
