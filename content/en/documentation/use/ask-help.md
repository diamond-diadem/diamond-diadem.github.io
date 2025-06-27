---
title: How do you ask for help or give feedback?
weight: 6
---

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

Before reading this guide, you must have created an account on the [Gricad gitlab](https://gricad-gitlab.univ-grenoble-alpes.fr/) platform. This will allow you to create and reply to issues.

This tutorial explains the various steps you need to take to report a bug, request new functionality in existing containers/packages, request new code/workflows or give feedback on documentation.

{{< /callout >}}

## Preambule

<div class="row-use-gitlab">
  <div class="left-use-gitlab">
    <img alt="use gitlab" class="use-gitlab">
  </div>
  <div class="right-use-gitlab" align="justify">

If you encounter a problem when using the platform's tools, or if you have a specific request, you can contact the platform's engineers via this [link](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond).

We have chosen this means of communication because user feedback and the resulting exchanges are stored over time and can therefore be consulted at any time.

In practice, you can access the "Issues" and "Merge Requests" tabs from any repository in the project. We will only discuss the first tab here.

  </div>
</div>

<div align="justify">

## View existing issues

Before submitting an issue, we recommend that you have a look at the _open_ and _resolved_ issues. Your problem or query may have already been solved or reported by another user.

Simply go to the 'All' tab and use the search bar to enter keywords relating to your query.

<img alt="issue tab" class="issue-tab" style="width:100%">

## Create an issue

If you can't find what you're looking for in the open and closed issues, you can create one. The first step is to select the project to which your query relates. Clicking on "Create an issue" will take you to a page similar to the one below.

<img alt="create issue" class="create-issue mb-3" style="width:100%">

We ask that you:

- **do not** assign any person to the ticket,
- **do not** select any due date,
- **do not** select any milestones.

On the other hand, we ask you to select a **template** and a **label** according to the type of request you have.

### Report a bug

To report a bug or ask for help using the platform's tools, select the `bug_report` template in the "Description" section.

Next, we ask you to provide as much detail as possible about your problem:

- What code/workflow is affected?
- What is the expected behaviour?
- What is the actual behaviour (feel free to provide logs or screenshots)?
- What steps do you need to take to reproduce the problem?
- What environment are you working in (OS, Apptainer version, container used, Guix commit, etc.)?

### Request new functionality in existing containers/workflows

You can request a new feature in an existing container/workflow. You will need to select the `feature_request` template in the "Description" section.

Next, we ask you to describe your request in as much detail as possible:

- What code/workflow does it affect?
- What functionality do you want?
- What will you be able to do with this functionality?

### Request a new code/workflow

You can also make a containerisation or packaging request for code/workflow. You will need to select the `code_container_request` template in the "Description" section.

Next, we ask you to describe your request in as much detail as possible:

- What code/workflow do you want?
- What are the dependencies?
- What functionality do you want?
- Is the code/workflow free of use?

### Provide feedback on documentation

Finally, you can provide feedback on the DIAMOND project documentation. This feedback may be positive or negative. You should use the `doc_feedback` template in the "Description" section.

Then we ask you to be as specific as possible, giving examples and specifying the section of the documentation your feedback relates to.

</div>
