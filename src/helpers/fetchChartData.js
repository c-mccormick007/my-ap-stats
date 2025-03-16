import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GIT_API,
});

const OWNER = "c-mccormick007";
const REPO = "ap_stats";

function statHelper(data) {
    let totalKeystrokes = 0;
    const cleaned = [];
  
    for (const entry of data) {
      const name = entry.name;
      const value = entry.value;
  
      if (name === "keystrokes" || name === "keystrokes_saved") {
        totalKeystrokes += value;
      } else if (name === "time_saved" || name === "seconds_saved") {
        continue;
      } else {
        cleaned.push({ name, value });
      }
    }
  
    if (totalKeystrokes > 0) {
      cleaned.push({ name: "Keystrokes", value: totalKeystrokes });
    }
  
    return cleaned;
  }

export async function fetchAndParseChartData() {
  const response = await octokit.request("GET /repos/{owner}/{repo}/contents", {
    owner: OWNER,
    repo: REPO,
    headers: {
      "X-Github-Api-Version": "2022-11-28",
    },
  });

  if (!Array.isArray(response.data)) {
    throw new Error("Expected an array but got something else.");
  }

  const jsonFiles = response.data.filter((file) => file.name.endsWith(".json"));

  if (jsonFiles.length === 0) {
    throw new Error("No JSON files found in the repo.");
  }

  const jsonDataPromises = jsonFiles.map(async (file) => {
    const { data: fileContent } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: OWNER,
        repo: REPO,
        path: file.path,
      }
    );

    const decodedContent = atob(fileContent.content);
    const jsonData = JSON.parse(decodedContent);
    return jsonData;
  });

  const allJsonData = await Promise.all(jsonDataPromises);

const combinedStats = allJsonData.flatMap((obj) => Object.entries(obj))
    .reduce((acc, [key, value]) => {
    const existing = acc.find((item) => item.name === key);
    
    acc.push({ name: key, value });
    
    return acc;
    }, []);

    const cleanedStats = statHelper(combinedStats);

  return cleanedStats;
}
