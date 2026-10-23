# BEES Health agent instructions

Before changing this project, read `docs/WORK_STATUS.md`. It is the durable handoff and the source of truth for where work stopped.

After any meaningful implementation, test, deployment, credential/configuration change, or newly discovered blocker:

1. Update `docs/WORK_STATUS.md` with the current state, verification performed, blockers, and the exact next action.
2. Keep credentials out of source control. Never place access keys, passwords, tokens, patient data, or secrets in this repository or chat transcripts.
3. Update `.env.example` when a new environment variable is introduced, using placeholders only.
4. Preserve the safety gates: dual consent before capture, clinician confirmation before sharing, and patient approval before reminders.

The project is currently a synthetic-data prototype. Do not describe an integration as live until an end-to-end test has exercised the real service and the result is recorded in `docs/WORK_STATUS.md`.
