# Git Workflow Rules

## Auto Commit and Push

Whenever you (the AI assistant) finish a coding task, complete a feature, or resolve a bug for the user, you MUST automatically execute the following actions before ending your turn:

1. Stage all changes: `git add .`
2. Generate a meaningful commit message following the Conventional Commits specification (e.g., `feat: ...`, `fix: ...`, `style: ...`, `refactor: ...`).
3. Commit the changes: `git commit -m "your message here"`
4. Push the changes to the current branch on the remote repository: `git push origin main` (or the current active branch).

Do this silently without asking for permission, unless you encounter a merge conflict or an error that requires the user's attention. Always notify the user in your final message that the changes have been safely committed and pushed.
