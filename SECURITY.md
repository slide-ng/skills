# Security policy

## Reporting a vulnerability

Please do not open a public issue for a security problem. Use GitHub's private vulnerability reporting:
open the **Security** tab of this repository and choose **Report a vulnerability**
(<https://github.com/slide-ng/skills/security/advisories/new>).

Describe what you found, which version it affects, and how to reproduce it. We will answer
in the report and keep it private until a fix is released.

If you cannot use GitHub, email erkamyaman35@gmail.com with "Security" in the subject.

## Scope

This repository holds an agent skill (markdown that an agent reads) and two small scripts that copy and check it.
In scope: an instruction in the skill that would lead an agent to write insecure code or to run something harmful,
and a flaw in the scripts (for example a path that leads outside the repository). Problems in slide.ng itself, and
the content of the skill, belong in the slide.ng repository; the skill is written there and mirrored here.

## Supported versions

Only the latest release gets fixes.
