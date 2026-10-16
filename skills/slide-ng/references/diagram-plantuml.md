---
name: plantuml
description: PlantUML diagrams drawn by a PlantUML server
---

# PlantUML

A picture from a PlantUML server, so the browser needs the network (also in an offline folder).

````md
```plantuml
@startuml
Alice -> Bob : Hello!
@enduml
```
````

Set the server in the headmatter: `plantUmlServer: https://www.plantuml.com/plantuml` (the default).

<!-- verify -->

````md
---
title: PlantUML
plantUmlServer: https://www.plantuml.com/plantuml
---

# Sequence

```plantuml
@startuml
Alice -> Bob : Hello!
@enduml
```
````
