Workshop 1: Development Persona – Requirement to Code
Goal: Leverage AI agents to enhance an brown field application while maintaining design standards.

Phase 1: Knowledge Ingestion & Requirement Enrichment
•	Knowledge Repository: Aggregate existing Technical Design Documents (TDD), High-Level Designs (HLD), and current requirements into a repository. 
•	AI Enrichment: Use Microsoft 365 Copilot to analyse the documentation, identify missing requirements, and enrich the enhancement scope. 
•	Issue Creation: Export the enriched functional specifications directly from M365 to a GitHub Issue. 

Phase 2: Technical Planning & Scaffolding
•	Technical Spec: Use Spec Kit to analyse the GitHub Issue and generate a technical execution plan. 
•	Design Guardrails: Configure agents.md or instructions.md with existing application design guidelines to ensure the agent follows established architectural patterns. 

Phase 3: Agentic Implementation
•	Code Generation: Use GitHub Copilot (Agent Mode) to convert the technical plan into code enhancements within the existing repository. 
•	PR Review: Leverage GitHub Copilot to summarize changes and verify alignment with the original functional spec. 

Workshop 2: Testing Persona – Requirement to Test
Goal: Enable testers to generate and execute automated test suites without direct source code manipulation. 

Phase 1: Test Scenario Generation
•	Story Analysis: Use a Foundry Agent or M365 Agent to read the requirement documents and generate comprehensive test scenarios and plans. 
•	Asset Management: Push the generated testing stories into Azure Boards or as GitHub Issues. 

Phase 2: Automation Scripting
•	Script Generation: Use a GitHub Copilot Custom Agent to generate Playwright or Selenium scripts in Python/C# based on the scenarios. 
•	BDD/TDD Alignment: Ensure scripts are generated using the project's preferred framework (e.g., Cucumber/SpecFlow). 

Phase 3: Execution & CI/CD Integration
•	Pipeline Trigger: Push scripts to the GitHub repository to trigger an Azure DevOps/GitHub Actions pipeline. 
•	Cloud Testing: Execute the scripts in the Azure Playwright Workspace to validate the brownfield application enhancement.
