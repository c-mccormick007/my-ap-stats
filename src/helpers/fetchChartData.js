import { Octokit } from "octokit";
import { calculateTimeSaved } from "./timeCalchelper";

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
    cleaned.push({ name: "keystrokes", value: totalKeystrokes });
  }

  return cleaned;
}

const timePerUnit = {
  keystrokes: 60 / 170,
  invoices_posted: 60,
  error_pages_added: 120,
  hotkeys_pressed: 2,
  text_files_generated: 25,
  directories_created: 10,
  files_moved: 5,
  checks_sorted: 30,
  ach_sorted: 30,
  amex_sorted: 30,
  wire_sorted: 30,
  emails_flagged: 10,
  emails_destroyed: 60,
  emails_forwarded: 30,
  attachments_extracted: 25,
  times_opened: 0,
  crystal_reports_avoided: 60,
  vendor_numbers_appended: 35,
  pos_received: 45,
  json_dbs_poarsed: 100,
  html_files_converted: 45,
  pos_found: 45,
  added_to_release_queue: 10,
  invoices_renamed: 35,
};

export async function fetchAndParseChartData() {
  const commitsResponse = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: OWNER,
    repo: REPO,
    headers: {
      "X-Github-Api-Version": "2022-11-28",
    },
    per_page: 20,
  });

  const commits = commitsResponse.data;
  const statsTimeline = [];

  for (const commit of commits) {
    const sha = commit.sha;
    const date = commit.commit.author.date;

    const contentsResponse = await octokit.request("GET /repos/{owner}/{repo}/contents", {
      owner: OWNER,
      repo: REPO,
      ref: sha,
    });

    const jsonFiles = contentsResponse.data.filter((file) => file.name.endsWith(".json"));

    const fileData = await Promise.all(
      jsonFiles.map(async (file) => {
        const { data: fileContent } = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          {
            owner: OWNER,
            repo: REPO,
            path: file.path,
            ref: sha,
          }
        );
        return JSON.parse(atob(fileContent.content));
      })
    );

    const combined = fileData.flatMap((obj) => Object.entries(obj)).reduce((acc, [key, value]) => {
      acc.push({ name: key, value });
      return acc;
    }, []);

    const cleaned = statHelper(combined);
    const timeStats = calculateTimeSaved(cleaned, timePerUnit);

    statsTimeline.push({ date, stats: timeStats });
  }

  console.log(statsTimeline);
  return statsTimeline;
}
