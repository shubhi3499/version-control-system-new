const fs = require("fs").promises;
const path = require("path");

// ✅ Use dynamic import for uuid (since it's ESM-only)
async function getUUID() {
    const { v4: uuidv4 } = await import("uuid");
    return uuidv4();
}

async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stagedPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");

    try {
        const commitID = await getUUID();
        const commitDir = path.join(commitPath, commitID);

        await fs.mkdir(commitDir, { recursive: true });

        const files = await fs.readdir(stagedPath);
        for (const file of files) {
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDir, file)
            );
        }

        await fs.writeFile(
            path.join(commitDir, "commit.json"),
            JSON.stringify({
                message,
                date: new Date().toISOString(),
            })
        );

        console.log(`Commit ${commitID} created with message: ${message}`);
    } catch (err) {
        console.error("Error committing files:", err);
    }
}

module.exports = { commitRepo };
