BEGIN;

UPDATE "Project" SET
  "titleEn" = 'Hato Daily — Heartopia Community',
  "summaryEn" = 'A daily dashboard for Heartopia: resources, weather, photos and fun GIFs, reactions, and community interactions without signing in.',
  "outcomeEn" = 'A more supportive and engaged community.'
WHERE id = 'cmv8rjzta0000l607a336ltfq';

UPDATE "Project" SET
  "titleEn" = 'Terra Nova — Webcup 2026',
  "summaryEn" = 'Transport, healthcare, safety, education… one platform bringing together the services of the first city in a new world.',
  "outcomeEn" = 'Centralized services and information for Terra Nova residents.'
WHERE id = 'cmv8rrkht0000lc089nrrge5t';

UPDATE "Project" SET
  "titleEn" = 'Training models, made clear',
  "summaryEn" = 'A React and Material UI interface guiding users through uploads, annotation, validation, training, and results — built with a data science team.',
  "outcomeEn" = 'Turning a technical pipeline into a guided experience.'
WHERE id = 'cmv8dtt5o0000w2jcbh25cgyb';

UPDATE "Project" SET
  "titleEn" = 'A web portfolio built to last',
  "summaryEn" = 'Migration and monitoring for more than twenty websites. Rebuilt a Nuxt.js / headless WordPress site as monolithic WordPress to simplify maintenance and improve performance.',
  "outcomeEn" = '20+ websites monitored.'
WHERE id = 'cmv8dtt600001w2jc0u33jgx8';

UPDATE "Project" SET
  "titleEn" = '5,000 documents, data you can use',
  "summaryEn" = 'Automated extraction from unstructured PDFs, data cleaning, relational storage, and an internal API to make the workflow more reliable.',
  "outcomeEn" = 'More than 5,000 PDFs processed.'
WHERE id = 'cmv8dtt600002w2jcqk9j5ur2';

UPDATE "Project" SET
  "titleEn" = 'Faster products, especially on mobile',
  "summaryEn" = 'A mobile-first redesign, application caching, and filtering features. Also designed a complete booking module for a four-star hotel in Antananarivo.',
  "outcomeEn" = 'Performance score: 15 → 90 · load time −50%.'
WHERE id = 'cmv8dtt600003w2jc7fkx2dfz';

UPDATE "Project" SET
  "titleEn" = 'Payroll, from interface to cloud',
  "summaryEn" = 'A full-stack payroll management application with a React interface, a FastAPI API, and deployment on an Azure virtual machine.',
  "outcomeEn" = 'Application deployed on Azure.'
WHERE id = 'cmv8dtt600004w2jc4qh3rbzf';

UPDATE "PortfolioEntry" SET "titleEn"='Web Developer & Freshworks', "subtitleEn"='Full-stack · CRM · AI', "descriptionEn"='Web applications and AI projects, production maintenance, CRM automation, and infrastructure reliability. Worked with web, data, and marketing teams, and mentored interns.', "tagsEn"='React · Python · FastAPI · Azure · Docker · Freshworks', "metricEn"='20+ websites and environments maintained'
WHERE id='cmv86ot340000w2b44v07la19';
UPDATE "PortfolioEntry" SET "titleEn"='Full-Stack Web Developer', "subtitleEn"='Mobile-first · performance', "descriptionEn"='Business modules, hotel booking, mobile-first redesigns, and caching strategies to improve performance and navigation.', "tagsEn"='PHP · SQL · JavaScript · WordPress', "metricEn"='Performance score 15 → 90 · load time −50%'
WHERE id='cmv86ot440001w2b4csgqpyqe';
UPDATE "PortfolioEntry" SET "titleEn"='Web & Data Developer', "subtitleEn"='APIs · data automation', "descriptionEn"='Extracted and structured unstructured PDF documents, built an internal REST API, and stored data in a relational database.', "tagsEn"='Python · Node.js · MySQL · REST API', "metricEn"='More than 5,000 PDFs processed'
WHERE id='cmv86ot4b0002w2b499h34imz';

UPDATE "PortfolioEntry" SET "titleEn"='GDG Antananarivo', "subtitleEn"='DevFest Ambassador · talks · labs', "descriptionEn"='Cloud workshops, talks on responsible AI, and support for young developers preparing for Google Cloud certification. DevFest Ambassador in 2024 and 2025.', "tagsEn"='Google Cloud · DevFest · mentoring'
WHERE id='cmv86ot4g0003w2b4m8b9to0d';
UPDATE "PortfolioEntry" SET "titleEn"='Women Techmakers Antananarivo', "subtitleEn"='Speaker · mentoring', "descriptionEn"='Hands-on labs on AI tools, automation, and Google technologies, encouraging greater representation of women in tech.', "tagsEn"='AI · automation · Women in Tech'
WHERE id='cmv86ot4l0004w2b4jhvl0u8v';
UPDATE "PortfolioEntry" SET "titleEn"='AlgoMada', "subtitleEn"='Mentoring · algorithms · game jams', "descriptionEn"='Problem-solving practice, coding sessions, and events celebrating Malagasy digital talent, including MAT and AlgoGames.', "tagsEn"='Algorithms · programming · games'
WHERE id='cmv86ot4p0005w2b4flg1a7l6';
UPDATE "PortfolioEntry" SET "titleEn"='Es’Tia Mozika', "subtitleEn"='Student club lead', "descriptionEn"='Coordinated the student board, teams, rehearsals, and cultural events — bringing music and collective organization together.', "tagsEn"='Music · coordination · events'
WHERE id='cmv86ot4s0006w2b41wkqa7j4';
UPDATE "PortfolioEntry" SET "titleEn"='Creative Minds', "subtitleEn"='Volunteer · local creativity', "descriptionEn"='Supported event organization and helped showcase young creative and innovative talent in Madagascar.', "tagsEn"='Creativity · local engagement'
WHERE id='cmv86ot4y0007w2b4bwcezx56';
UPDATE "PortfolioEntry" SET "titleEn"='iTeam-$ Community', "subtitleEn"='Active member · event organizer', "descriptionEn"='Contributed to open-source projects and co-organized two editions of the Why Not Linux event.', "tagsEn"='Open source · Linux'
WHERE id='cmv86ot520008w2b4fay37wg5';

UPDATE "PortfolioEntry" SET "titleEn"='Google Cloud Associate Cloud Engineer', "subtitleEn"='Professional certification', "descriptionEn"='Certification earned on December 19, 2024, after preparing with support from the cloud community.', "tagsEn"='GCP · cloud · infrastructure'
WHERE id='cmv86ot560009w2b4bjjm0btk';
UPDATE "PortfolioEntry" SET "titleEn"='1st Place — Clean Code Hackathon', "descriptionEn"='Won as a team at the DevFest hackathon after designing, modeling, building, and presenting a solution to a jury.', "tagsEn"='Code · algorithms · teamwork'
WHERE id='cmv86ot5b000aw2b4rvo5bllg';
UPDATE "PortfolioEntry" SET "titleEn"='1st Place — Frontend Awards', "descriptionEn"='Built an accessible frontend experience with voice commands and strong visual contrast to help people with low vision find objects.', "tagsEn"='Frontend · accessibility · design'
WHERE id='cmv86ot5h000bw2b49q5ty42s';
UPDATE "PortfolioEntry" SET "titleEn"='1st Place — Zaha-Geek Hackathon', "descriptionEn"='Won as a team at the Zaha-Geek hackathon after designing, modeling, building, and presenting a solution to a jury.', "tagsEn"='Angular · Python · FastAPI'
WHERE id='cmv8i2q130000l608108zm7xo';
UPDATE "PortfolioEntry" SET "titleEn"='People’s Choice Award — Women’s Hackathon', "descriptionEn"='Co-created a platform to spotlight women’s achievements in tech and encourage mentoring across generations.', "tagsEn"='Mentoring · women in tech'
WHERE id='cmv86ot5k000cw2b4f5hmmsfa';
UPDATE "PortfolioEntry" SET "titleEn"='3rd Place — Orange Digital Center Champions', "descriptionEn"='A national team programming competition with selected students.', "tagsEn"='Competitive programming · collaboration'
WHERE id='cmv86ot5o000dw2b4pm86297o';
UPDATE "PortfolioEntry" SET "titleEn"='2nd Place — Inter-University Hackathon', "descriptionEn"='Rapidly built a solution with a university team, focusing mainly on design and frontend development.', "tagsEn"='Design thinking · frontend'
WHERE id='cmv86ot5s000ew2b4o5tqd6qe';
UPDATE "PortfolioEntry" SET "titleEn"='3rd Place — Novembre Numérique', "descriptionEn"='Arti’Zone, a platform connecting artisans with people interested in their work, designed to increase visibility and support online sales.', "tagsEn"='Entrepreneurship · local impact'
WHERE id='cmv86ot5w000fw2b4eo4zenwu';

UPDATE "PortfolioEntry" SET "titleEn"='Bachelor’s Degree in Computer Science — Systems Integration & Development', "subtitleEn"='First-class honors', "descriptionEn"='Studied software engineering, full-stack development, databases, server administration, algorithms, and cloud computing. Capstone project and defense focused on a hotel platform.', "tagsEn"='Software engineering · systems integration · development'
WHERE id='cmv86ot60000gw2b4sf8gteof';
UPDATE "PortfolioEntry" SET "titleEn"='Entrepreneurship & Mobile App Development', "descriptionEn"='Intensive training in design thinking, mobile development, and entrepreneurship to address local socioeconomic challenges.', "tagsEn"='Design thinking · mobile · entrepreneurship'
WHERE id='cmv86ot65000hw2b49yfz4pnx';

UPDATE "PortfolioEntry" SET "titleEn"='Python', "descriptionEn"='Backend development, automation, and data processing.', "tagsEn"='Scripts · pipelines · data'
WHERE id='cmv86p5bg000iw2ecb2ydvk5j';
UPDATE "PortfolioEntry" SET "titleEn"='React & Interfaces', "descriptionEn"='Business web interfaces and user journeys shaped around real-world needs.', "tagsEn"='React · Material UI · Next.js'
WHERE id='cmv86p5bl000jw2ec7ndj0hkp';
UPDATE "PortfolioEntry" SET "titleEn"='APIs & Databases', "descriptionEn"='API design, relational modeling, and data integrity.', "tagsEn"='FastAPI · Django REST · MySQL · PostgreSQL'
WHERE id='cmv86p5bq000kw2eck5nxnz12';
UPDATE "PortfolioEntry" SET "titleEn"='Cloud & Production', "descriptionEn"='Application deployment, maintenance, and reliability.', "tagsEn"='Google Cloud · Azure · Docker · Linux · Nginx'
WHERE id='cmv86p5bu000lw2ecc0fz2nq7';
UPDATE "PortfolioEntry" SET "titleEn"='CMS & Integration', "descriptionEn"='Custom integrations and website and CRM maintenance.', "tagsEn"='WordPress · PHP · Freshworks CRM'
WHERE id='cmv86p5c1000mw2ec0xbja8zl';

UPDATE "PortfolioEntry" SET "titleEn"='Young Explorers Workshop', "subtitleEn"='An introduction to tech for ages 7–17', "descriptionEn"='An interactive workshop introducing young people to technology careers and possibilities.', "tagsEn"='Youth · discovery'
WHERE id='cmv86p5c7000nw2ecgznyckfu';
UPDATE "PortfolioEntry" SET "titleEn"='Technology Careers for SESAME Scholars', "subtitleEn"='Career guidance talk', "descriptionEn"='An introduction to career paths and opportunities in the digital sector.', "tagsEn"='Career guidance · knowledge sharing'
WHERE id='cmv86p5cc000ow2ecy8zionfu';
UPDATE "PortfolioEntry" SET "titleEn"='Hands-On Cloud Build', "subtitleEn"='Practical Google Cloud certification workshop', "descriptionEn"='A hands-on session helping the community prepare for the Google Cloud Associate Cloud Engineer certification.', "tagsEn"='Cloud · mentoring'
WHERE id='cmv86p5cg000pw2eciazemapw';
UPDATE "PortfolioEntry" SET "titleEn"='AI Agents & Intelligent Automation with n8n', "subtitleEn"='Technical workshop', "descriptionEn"='Exploring intelligent automation and AI agents with n8n.', "tagsEn"='n8n · AI · automation'
WHERE id='cmv86p5cl000qw2ecrpkob74r';
UPDATE "PortfolioEntry" SET "titleEn"='Creating Responsible AI Products', "subtitleEn"='Technical talk', "descriptionEn"='A discussion on building AI products with careful attention to their use, impact, and responsibilities.', "tagsEn"='Responsible AI · product'
WHERE id='cmv86p5cq000rw2ec0usha3r1';
UPDATE "PortfolioEntry" SET "titleEn"='Balancing Generative AI Power with User Responsibility', "subtitleEn"='Keynote', "descriptionEn"='A reflection on generative AI capabilities and the responsibility of the people who use them.', "tagsEn"='Generative AI · responsibility'
WHERE id='cmv86p5cu000sw2ecvx653eo5';

UPDATE "PortfolioEntry" SET "titleEn"='Drawing', "descriptionEn"='Observing, sketching, and shaping forms and ideas.'
WHERE id='cmv86p5cy000tw2ecrpij6h89';
UPDATE "PortfolioEntry" SET "titleEn"='Music', "descriptionEn"='Singing, listening, playing, and bringing collaborative projects to life.'
WHERE id='cmv86p5d3000uw2ecvu62m3ug';
UPDATE "PortfolioEntry" SET "titleEn"='Writing', "descriptionEn"='Taking time to find the right words and tell a story.'
WHERE id='cmv86p5d8000vw2ecrumpby6n';
UPDATE "PortfolioEntry" SET "titleEn"='Video Games', "descriptionEn"='Exploring worlds, mechanics, and interactive stories.'
WHERE id='cmv86p5dc000ww2ecg2z4oyal';

COMMIT;
