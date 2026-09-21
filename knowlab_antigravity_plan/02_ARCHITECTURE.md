# KnowLab — Architecture

## 1. High-level

```text
UI
 ↓
Application Services
 ↓
Domain Contracts
 ↓
Domain Modules
 ↓
Core Engines
 ↓
Repositories / Data / External Sources
```

## 2. Domain-first

```text
domains/
  real-estate/
  pc-building/
  cars/
  motorcycles/
  home/
  feng-shui/
```

Mỗi domain có thể có:

```text
knowledge/
data/
filters/
comparators/
calculators/
validators/
simulations/
scenarios/
components/
```

## 3. Core engines

```text
engines/
  knowledge/
  learning/
  comparison/
  calculator/
  simulation/
  scenario/
  search/
  provenance/
```

Core engines không chứa business rules đặc thù của một domain nếu rule đó không dùng chung.

## 4. Domain contract

Mỗi domain nên expose:

```text
DomainDefinition
TopicDefinition
DataSchema
FilterSchema
ComparisonSchema
ToolDefinitions
ScenarioSchema
SourcePolicy
```

## 5. Core entities

### Domain
- id
- name
- slug
- description
- capabilities

### Topic
- id
- domainId
- title
- level
- concepts

### Concept
- id
- domainId
- title
- level
- explanation
- technicalDetails
- prerequisites
- relatedConcepts
- sources

### Item / Entity
Domain-specific structured object.

### Tool
- id
- domainId
- inputs
- validation
- calculation
- explanation

### Scenario
- id
- domainId
- toolId
- inputs
- assumptions
- outputs
- engineVersion
- dataVersion
- timestamps

## 6. PC-specific architecture

PC Builder phải có các service riêng:

```text
PcCatalogService
PcFilterService
PcCompatibilityService
PcClearanceService
PcPowerService
PcBenchmarkService
PcBuildScenarioService
PcShareService
```

Compatibility rules không nằm trong UI.

## 7. Engine contracts

```text
validate(input)
calculate(input)
compare(items, criteria)
simulate(input)
explain(input, result)
```

## 8. Extensibility

Thêm domain mới không được yêu cầu sửa logic của domain khác.

Core UI nên render theo capability/configuration nhưng domain-specific UI được phép tồn tại khi cần.

## 9. State

Tách:

- UI state;
- domain/tool state;
- scenario state;
- user state.

## 10. Error handling

Structured error:

```text
code
field
params
severity
```

UI map code → Vietnamese message.

## 11. Accessibility

- semantic HTML;
- keyboard;
- focus;
- labels;
- screen reader;
- contrast;
- tables/cards usable trên mobile.
