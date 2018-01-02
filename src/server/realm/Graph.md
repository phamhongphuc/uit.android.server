User
---
id          PK  string
name            string
birthdate       date?
gender          bool?
email           string
description     string?
projects        Project[]   FK - Project.id
lastupdate      date

Task
---
id          PK  int         
name            string
description     string?
assigned        User        FK - User.id
subscribers     User[]      FK - User.id
status          int
project         Project     FK - Project.id
createdate      date
deadline        date
lastupdate      date

Project
---
id          PK  string 
name            string
tasks           Task[]      FK - Task.id
creator         User        FK - User.id
member          User[]      FK - User.id
description     string?
tags            string[]
channels        Channel[]   FK - Channel.id
createdate      date
deadline        date
lastupdate      date

Message
---
id         PK    int
time             date
sender           User       FK - User.id
idchannel        Channel    FK - Channel.id
content          string

Channel
---
id         PK    string
name             string
assigned         User       FK - User.id
members          User[]     
createdate       date
lastupdate       date

