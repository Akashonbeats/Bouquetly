---
name: Security
description: Review the actual security and privacy threat surface of Bouquetly.
user-invocable: false
---

# Security

Review URL-decoded user data, HTML metadata injection, generated preview URLs, external font requests, request handling, and link tampering. The product stores no personal information server-side, but defensive engineering still matters at the API boundary. Report high-confidence findings and mitigations; never claim certification or invent a data-storage model.