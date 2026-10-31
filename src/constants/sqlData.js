export const SQL_SKILLS_OUTPUT = `SELECT id, category, skill 
FROM portfolio.skills;

+----+--------------+---------------------------------+
| ID | CATEGORY     | TECHNICAL SKILL                 |
+----+--------------+---------------------------------+
| 01 | Language     | TypeScript, JavaScript & Golang |
| 02 | Framework    | React & Next.js                 |
| 03 | Backend      | Node.js & NestJS                |
| 04 | Database     | MySQL & MongoDB                 |
| 05 | In-Memory    | Redis                           |
| 06 | DevOps       | Docker & Kubernetes             |
| 07 | Soft Skills  | Problem Solving & Agile         |
+----+--------------+---------------------------------+
7 rows in set (0.001 sec)`;

export const SQL_PROJECTS_OUTPUT = `SELECT id, name, stack, p99_latency, status 
FROM portfolio.projects 
WHERE status = 'PRODUCTION';

+----+-------------------------------+------------------------+-------------+------------+
| ID | SERVICE NAME                  | TECH STACK             | P99 LATENCY | STATUS     |
+----+-------------------------------+------------------------+-------------+------------+
| 01 | Scalable Enterprise Web App   | React, Node.js, MySQL  | 18ms        | PRODUCTION |
| 02 | High-Perf RESTful API Gateway | NestJS, TypeScript, PG | 12ms        | PRODUCTION |
| 03 | WebGIS Intelligence Platform  | JavaScript, HTML, CSS  | 25ms        | PRODUCTION |
| 04 | SCADA & HMI Automation Engine | PLC Logic, HMI, SCADA  | 5ms         | PRODUCTION |
| 05 | In-Memory Cache & Query Opt   | Redis, Node.js, Mongo  | 4ms         | PRODUCTION |
+----+-------------------------------+------------------------+-------------+------------+
5 rows in set (0.002 sec)`;

export const SQL_EXPERIENCE_OUTPUT = `SELECT company, role, period, location, p99_achievement 
FROM portfolio.career_history;

+-----------------------------------+---------------------------+----------------+------------------+------------------------------------+
| COMPANY                           | ROLE                      | PERIOD         | LOCATION         | P99 ACHIEVEMENT                    |
+-----------------------------------+---------------------------+----------------+------------------+------------------------------------+
| PT. Inovasi Solusi Internasional  | Software Developer        | 2023 — Present | Jakarta, ID      | Scaled React/Node, -30% DB latency |
| PT. Abbauf Mulia Konsultan Tech   | Frontend Developer Intern | 2022           | Depok, ID        | Built WebGIS Intelligence Frontend |
| PT. Nijimaru Kemasindo Sentosa    | HMI Engineer              | 2018 — 2021    | Jakarta, ID      | Factory automation, SCADA & PLC    |
+-----------------------------------+---------------------------+----------------+------------------+------------------------------------+
3 rows in set (0.001 sec)`;

export const SQL_EDUCATION_OUTPUT = `SELECT institution, degree_major, period, gpa, location 
FROM portfolio.education;

+---------------------------+-----------------------------------+----------------+------+------------------+
| INSTITUTION               | DEGREE / MAJOR                    | PERIOD         | GPA  | LOCATION         |
+---------------------------+-----------------------------------+----------------+------+------------------+
| Universitas Pakuan        | Bachelor of Computer Science      | 2019 — 2024    | 3.59 | Bogor, Indonesia |
| SMK Amaliah 1 Ciawi       | Computer & Network Engineering    | 2015 — 2018    | N/A  | Bogor, Indonesia |
+---------------------------+-----------------------------------+----------------+------+------------------+
2 rows in set (0.001 sec)`;

export const SQL_CONTACT_OUTPUT = `SELECT channel, address 
FROM portfolio.contact_channels;

+----------+------------------------------------+
| CHANNEL  | ADDRESS                            |
+----------+------------------------------------+
| Email    | tbrivan22@gmail.com                |
| Phone    | +62 81210903492                    |
| Location | Bogor, Indonesia                   |
| GitHub   | github.com/tbrivan                 |
| LinkedIn | linkedin.com/in/tubagus-rivan      |
| Resume   | /CV_Tubagus_Rivan.pdf (type '/cv') |
+----------+------------------------------------+
6 rows in set (0.001 sec)`;

export const SQL_METRICS_OUTPUT = `SELECT metric_name, value, unit, status 
FROM portfolio.system_metrics;

+-------------------+-------+-------+---------+
| METRIC_NAME       | VALUE | UNIT  | STATUS  |
+-------------------+-------+-------+---------+
| CPU_LOAD_AVG      | 0.18  | Cores | OPTIMAL |
| MEMORY_USED       | 13    | %     | OPTIMAL |
| REDIS_MEMORY      | 210   | MB    | OPTIMAL |
| PG_ACTIVE_POOLS   | 32    | Conns | OPTIMAL |
| P99_LATENCY       | 11    | ms    | OPTIMAL |
+-------------------+-------+-------+---------+
5 rows in set (0.001 sec)`;

export const MYSQL_WELCOME_HEADER = `Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 42
Server version: 8.0.36 MySQL Community Server - GPL

Copyright (c) 2000, 2026, Oracle and/or its affiliates.

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.`;

export const TOUR_OUTPUT = `============================================================
  TERMINAL PORTFOLIO MANUAL & COMMAND REFERENCE
============================================================

[1] LINUX KERNEL SHELL COMMANDS
  /cv                 - View or download CV (PDF)
  /help               - Print manual & command guide
  cat about.md        - Engineer profile & background
  /whoami             - User identity & role
  /contact            - Direct communication channels
  mysql -u root -p    - Connect to MySQL database shell
  /game               - Launch interactive RPS game
  /valar-morghulis    - All men must die
  sudo rm -rf /       - Force remove root directory
  /clear              - Flush terminal screen buffer

[2] MYSQL SHELL COMMANDS (connect: 'mysql -u root -p')
  SELECT * FROM skills;     - Technical skills list
  SELECT * FROM projects;   - Production services & stats
  SELECT * FROM experience; - Career history & achievements
  SELECT * FROM education;  - Academic qualifications
  SELECT * FROM metrics;    - System telemetry
  SHOW TABLES;              - List all tables
  exit;                     - Return to Linux shell

[3] KEYBOARD SHORTCUTS
  [TAB]               - Auto-complete matching command
  [UP / DOWN]         - Cycle command history
  [CTRL + C]          - Cancel current input line
============================================================`;

export const WHOAMI_OUTPUT = `[HTTP 200 OK] User: Visitor | Identity: Tubagus Rivan Maulana Sidiq | Role: Software Developer`;

export const CAT_ABOUT_OUTPUT = `ABOUT TUBAGUS RIVAN MAULANA SIDIQ:

Software Developer with 3+ years of experience designing and maintaining scalable
software solutions. Proficient in multiple programming languages and frameworks, with
expertise in problem-solving, algorithm design, and software architecture.

Passionate about writing clean, efficient code and collaborating with cross-functional
teams to deliver high-quality products. Continuously learning and adapting to new
technologies in the ever-evolving tech landscape.

Core Competencies:
1. Fullstack & Backend: React, Next.js, Node.js, NestJS, Golang
2. Database Optimization: MySQL, MongoDB, Redis (reduced response times by 30%)
3. Architecture & APIs: RESTful services, third-party integrations, unit & integration testing
4. Containerization & DevOps: Docker, Kubernetes, CI/CD, Agile/Scrum
5. Systems & Automation: WebGIS intelligence interfaces, HMI & SCADA systems, PLC logic`;

export const CV_DOWNLOAD_OUTPUT = `[+] Fetching CV document: CV_Tubagus_Rivan.pdf ...
[✓] Initiating browser download for Tubagus Rivan's CV (PDF).
[i] Direct file link: /CV_Tubagus_Rivan.pdf`;

export const GOT_VALAR_MORGHULIS_VARIANTS = [
  `     Valar Dohaeris. ("All men must serve.")

             :-==:     :- -   -==:
          :+#%%%%-     -: -: :#%%%%#+
        =*%%%%%%%%:    -=:=  =%%%%%%%%*=
      :=#%%%%%%%%%#    +=:* :#%%%%%%%%%%#+:
    -*%%%%%%%%%%%%*   :=#+*  +%%%%%%%%%%%%#=
   =#%%%%%%%%%%%%%#  -=*%%%  -%%%%%%%%%%%%%%+:
 :*%%%%%%%%%%%%%%%- =%%*.-%* :#%%%%%%%%%%%%%%%#-
=%%%%%%%%%%%%%%%%%%%:%%+.=#*:%%%%%%%%%%%%%%%%%%%+
%%%%%%%%%%%%%%%%%%%%*%*-+%%%%%%%%%%%%%%%%%%%%%%-
 -#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%-
   -#%%%%%%=  :+%%%%%%%%%%%%*:  -%%%%%%=
   :*%%%#%%*   -*%*-.:=%%%%+:..-#%#+%%%*
    =%:.-*%%    :+    :*%%#:   -+  #%%-:*
            =%#         #%%:       *%+
             :#*        :=%#      =%#
               *=        -#%     -*-
                         :#%-
                          +%%
                     :+:  :#%+
                    ++.-= :=%+
                    -%#..+#%#:
                       +#%#+`,

  `                  Valar Dohaeris. ("All men must serve.")

                                       ..
                                      .@:
                                      *@%.
                       ..-@+.        :*@##.        .-%-.
               ..-#%@@@@@@@@@@=.     .-@#..    .:#@@@@@%%%+:..
          ..*%@@@@@@@@@@@@@@@@@@%=..:#@@@@=..#@@@@@@@@@@@@@@@@@@%#:.
       .-%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#..
     .*%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*..
          -@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+.
          .@@@@@@@@@@@@@@@@@@@@@%**%@@@@@@@%*%@@@@@@@@@@@@@@@@@@@@@%.
         .==.  .#@@@@@@@@@@@@%.     .%@@@@.     :%@@@@@@@@@@@@%:. .++.
                 *@=.    :%@@.       .@@@@.       *@%:.   .-@#.
                 +.       .*:        .%@@%.       =#.       :-.
                 :                    .@%.        :.
                                      :@=
                                      *@-
                                      *@-
                                      =@-
                                      .@=
                                       :@.
                                       .**.
                                        .*:
                                         .%:`,
];

export const getRandomValarMorghulisOutput = () => {
  const idx = Math.floor(Math.random() * GOT_VALAR_MORGHULIS_VARIANTS.length);
  return GOT_VALAR_MORGHULIS_VARIANTS[idx];
};

export const GOT_VALAR_MORGHULIS_OUTPUT = GOT_VALAR_MORGHULIS_VARIANTS[0];

export const SQL_PROFESSIONAL_SECURITY_LOGS = {
  drop: `ERROR 1142 (42000): DROP command denied to user 'visitor'@'localhost'.`,
  delete: `ERROR 1142 (42000): DELETE command denied to user 'visitor'@'localhost'.`,
  update: `ERROR 1142 (42000): UPDATE command denied to user 'visitor'@'localhost'.`,
  insert: `ERROR 1142 (42000): INSERT command denied to user 'visitor'@'localhost'.`,
  grant: `ERROR 1142 (42000): GRANT command denied to user 'visitor'@'localhost'.`,
  alter: `ERROR 1142 (42000): ALTER command denied to user 'visitor'@'localhost'.`,
};

export const LINUX_CLI_COMMANDS = [
  { cmd: "/cv", desc: "view or download CV (PDF)" },
  { cmd: "/help", desc: "system manual & command guide" },
  { cmd: "cat about.md", desc: "engineer bio & competencies" },
  { cmd: "/whoami", desc: "print user identity & role" },
  { cmd: "/contact", desc: "contact channels & links" },
  { cmd: "mysql -u root -p", desc: "connect to mysql database shell" },
  { cmd: "/valar-morghulis", desc: "all men must die" },
  { cmd: "/game", desc: "play RPS game arena" },
  { cmd: "sudo rm -rf /", desc: "recursively force remove root directory" },
  { cmd: "/clear", desc: "clear screen" },
];

export const MYSQL_CLI_COMMANDS = [
  { cmd: "SELECT * FROM skills;", desc: "technical skills list" },
  { cmd: "SELECT * FROM projects;", desc: "production services" },
  { cmd: "SELECT * FROM experience;", desc: "career history" },
  { cmd: "SELECT * FROM education;", desc: "academic qualifications" },
  { cmd: "SELECT * FROM metrics;", desc: "system metrics" },
  { cmd: "SHOW TABLES;", desc: "list all database tables" },
  { cmd: "exit;", desc: "exit mysql shell" },
];
