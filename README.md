# Loss Control Plus Hiring Project

<!-- vscode-markdown-toc -->
* 1. [Full-Stack Web Developer](#Full-StackWebDeveloper)
	* 1.1. [READ THIS BEFORE YOU BEGIN](#READTHISBEFOREYOUBEGIN)
	* 1.2. [Instructions](#Instructions)
	* 1.3. [Project Requirements](#ProjectRequirements)
		* 1.3.1. [Scenario](#Scenario)
		* 1.3.2. [Business Facts](#BusinessFacts)
		* 1.3.3. [Success Conditions](#SuccessConditions)
	* 1.4. [Guidelines](#Guidelines)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='Full-StackWebDeveloper'></a>Full-Stack Web Developer

###  1.1. <a name='READTHISBEFOREYOUBEGIN'></a>READ THIS BEFORE YOU BEGIN

This hiring project is intended to gauge a developer's ability to both work with the technologies we are using, as well as their soft-skills.

Technical prowess is a good thing but, by itself, is not enough to earn a spot on our team.

Do not squash or

###  1.2. <a name='Instructions'></a>Instructions

1. Fork this repo.
2. Review the guidelines
3. Follow the Project Requirements.
4. Reach out with any questions.
5. Submit a pull request when your project is finished.

###  1.3. <a name='ProjectRequirements'></a>Project Requirements

####  1.3.1. <a name='Scenario'></a>Scenario

Welcome to Widgets Inc. We have an exciting new product in the insurance sector and we are hoping to expand our offering to cover more of our customer needs.

We've decided to create a simple SPA web-app that allows our customers (the insurance company) to track and manage their policy information. They should be able to add, edit, and delete policies, payments, and invoices.

####  1.3.2. <a name='BusinessFacts'></a>Business Facts

- A policy should always have an invoice with a payment or payments that offset the amount owed.
- If an invoice is more that 14 days overdue, the policy should cancel.
- The latest state record reflects the current status of the policy.
- Policies can be reinstated within 30 days of cancellation by making a payment in full.
- Annual Premium can be paid monthly. All invoices should be generated ahead of due date.

####  1.3.3. <a name='SuccessConditions'></a>Success Conditions

1. Create an [Express](https://expressjs.com/) web backend with an [Angular](https://angular.io/) frontend.
2. Use the data.json file in the project root to generate a JSON schema and API structure.
3. Create a utility function that generates random application data. Using this function should allow for the application to appear to have been in production use for some time.
4. Create a docker-compose or host the finished project so that we can easily run it for evaluation.

###  1.4. <a name='Guidelines'></a>Guidelines

1. Commit early, commit often. We would love to see more commits showing the process you took to get to the finished product. Do not squash or rebase your commits.
2. Please use eslint. Airbnb is a great style to use for this project but you may choose another if you wish.
3. We'd prefer Typescript to JavaScript but it's not absolutely required.
4. Writing tests would be a massive point in your favor.
5. Create several visual reports that dissect the available data and presents them in interesting and useful ways. Examples include things like: total payments, cancelled policies, active policies, etc.
6. Spend as much, or as little, time on this as you wish. That said, we'd prefer a project be delivered within 72 hours of acceptance.
7. We encourage you to reach out to us with any questions you may have. Doing so will not be seen as detrimental to your delivered project.
