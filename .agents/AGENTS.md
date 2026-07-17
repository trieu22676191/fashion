# Git Workflow Rules

## Ask for Permission before Commit and Push

Whenever you (the AI assistant) finish a coding task, complete a feature, or resolve a bug for the user, you MUST follow this workflow:

1. **Ask for permission**: Tell the user what you have accomplished and ask if they are satisfied with the changes.
2. **Wait for approval**: Do NOT run any git commands until the user explicitly agrees or approves the changes.
3. **Commit and Push**: Once the user approves, execute the following commands:
   - Stage all changes: `git add .`
   - Generate a meaningful commit message following the Conventional Commits specification.
   - Commit the changes: `git commit -m "your message here"`
   - Push the changes to the remote repository: `git push origin main` (or current branch).

Always notify the user when the commit and push process is complete.
