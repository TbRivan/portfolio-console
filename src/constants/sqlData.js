export const SQL_SKILLS_OUTPUT = `SELECT id, category, skill, proficiency, years_exp 
FROM portfolio.skills 
ORDER BY proficiency DESC;

+----+--------------+-------------------+-------------+-----------+
| ID | CATEGORY     | TECHNICAL SKILL   | PROFICIENCY | YEARS_EXP |
+----+--------------+-------------------+-------------+-----------+
| 01 | Language     | Go (Golang)       | 98%         | 5 Years   |
| 02 | Database     | PostgreSQL        | 95%         | 6 Years   |
| 03 | System       | Distributed Queue | 94%         | 4 Years   |
| 04 | In-Memory    | Redis             | 96%         | 5 Years   |
| 05 | Messaging    | Apache Kafka      | 92%         | 3 Years   |
| 06 | DevOps       | Docker & K8s      | 90%         | 4 Years   |
+----+--------------+-------------------+-------------+-----------+
6 rows in set (0.001 sec)`;

export const SQL_PROJECTS_OUTPUT = `SELECT id, name, stack, p99_latency, status 
FROM portfolio.projects 
WHERE status = 'PRODUCTION';

+----+-------------------------------+------------------------+-------------+------------+
| ID | SERVICE NAME                  | TECH STACK             | P99 LATENCY | STATUS     |
+----+-------------------------------+------------------------+-------------+------------+
| 01 | Distributed Task Queue Engine | Go, Redis, gRPC        | 14ms        | PRODUCTION |
| 02 | High-Throughput API Gateway   | Node.js, TS, NGINX     | 8ms         | PRODUCTION |
| 03 | Real-Time Event Stream Bus    | Kafka, Python, PG      | 22ms        | PRODUCTION |
| 04 | PostgreSQL Auto-Sharding      | Go, PostgreSQL, Raft   | 11ms        | PRODUCTION |
+----+-------------------------------+------------------------+-------------+------------+
4 rows in set (0.002 sec)`;

export const SQL_EXPERIENCE_OUTPUT = `SELECT company, role, period, p99_achievement 
FROM portfolio.career_history;

+---------------------------+-----------------------------------+----------------+--------------------------------+
| COMPANY                   | ROLE                              | PERIOD         | P99 ACHIEVEMENT                |
+---------------------------+-----------------------------------+----------------+--------------------------------+
| Nexus Infrastructure Lab  | Lead Backend Systems Engineer     | 2023 — Present | Handled 50k+ req/sec (P99 14ms)|
| Vanguard Systems          | Senior Database & API Engineer    | 2021 — 2023    | Built PG auto-sharding pipeline|
| Monolith Tech             | Backend Software Developer        | 2019 — 2021    | Built Redis rate limiter (8ms) |
+---------------------------+-----------------------------------+----------------+--------------------------------+
3 rows in set (0.001 sec)`;

export const SQL_CONTACT_OUTPUT = `SELECT channel, address 
FROM portfolio.contact_channels;

+----------+--------------------------------+
| CHANNEL  | ADDRESS                        |
+----------+--------------------------------+
| Email    | backend.engineer@kernel-dev.io |
| GitHub   | github.com/backend-dev         |
| LinkedIn | linkedin.com/in/backend-dev    |
| Twitter  | x.com/backend_dev              |
+----------+--------------------------------+
4 rows in set (0.001 sec)`;

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

export const TOUR_OUTPUT = `================================================================================
  TERMINAL PORTFOLIO MANUAL & COMMAND REFERENCE
================================================================================

[1] LINUX KERNEL SHELL COMMANDS
    /help                       - Print system manual & command guide
    cat about.md                - Display engineer profile & principles
    /whoami                     - Print current user identity & role
    /contact                    - Display direct communication channels
    mysql -u root -p            - Connect to MySQL database shell session
    /valar-morghulis            - all men must die
    /clear                      - Flush terminal screen buffer
    /game                       - Switch shell context back to RPS game
    sudo rm -rf /               - Recursively force remove root directory

[2] MYSQL DATABASE SHELL COMMANDS (Run 'mysql -u root -p' to connect)
    SELECT * FROM skills;       - Display tech stack & proficiency matrix
    SELECT * FROM projects;     - Display production services & performance stats
    SELECT * FROM experience;   - Display career history & key achievements
    SELECT * FROM metrics;      - Display real-time database & system telemetry
    exit                        - Close MySQL session and return to Linux shell

[3] KEYBOARD NAVIGATION
    [TAB]                       - Auto-complete matching command
    [UP / DOWN]                 - Cycle command history
    [CTRL + C]                  - Cancel current input line

================================================================================`;

export const WHOAMI_OUTPUT = `[HTTP 200 OK] User: Visitor | Quality: Tech Visionary`;

export const CAT_ABOUT_OUTPUT = `ABOUT THE ENGINEER:

I am a Senior Backend Engineer specializing in high-concurrency microservices, 
distributed systems, database optimization, and fault-tolerant event streaming.

Core Architecture Principles:
1. Low-Latency P99 Performance
2. Zero Data Loss & Guaranteed Message Semantics
3. Graceful Circuit Breaking & Auto-Recovery
4. Clean Monospace Code & Infrastructure-as-Code`;

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
%%%%%%%%%%%%%%%%%%%%%*%*-+%%%%%%%%%%%%%%%%%%%%%%-
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
  { cmd: "/help", desc: "system manual & command guide" },
  { cmd: "cat about.md", desc: "engineer bio" },
  { cmd: "/whoami", desc: "print user identity & role" },
  { cmd: "/contact", desc: "contact channels & links" },
  { cmd: "mysql -u root -p", desc: "connect to mysql database shell" },
  { cmd: "/valar-morghulis", desc: "all men must die" },
  { cmd: "/game", desc: "return to RPS game" },
  { cmd: "sudo rm -rf /", desc: "recursively force remove root directory" },
  { cmd: "/clear", desc: "clear screen" },
];

export const MYSQL_CLI_COMMANDS = [
  { cmd: "SELECT * FROM skills;", desc: "skills matrix" },
  { cmd: "SELECT * FROM projects;", desc: "production services" },
  { cmd: "SELECT * FROM experience;", desc: "career history" },
  { cmd: "SELECT * FROM metrics;", desc: "system metrics" },
  { cmd: "SHOW TABLES;", desc: "list all database tables" },
  { cmd: "exit;", desc: "exit mysql shell" },
];
