import { graphql } from "@octokit/graphql";
import { print } from "graphql";
import {
  GetPr,
  GetPrQuery,
  GetPrQueryVariables,
  UpdateTitle,
  UpdateTitleMutation,
  UpdateTitleMutationVariables,
} from "../generated/graphql";
import { URL } from "core-js";

["Feature", "Requirement", "Epic"].forEach((type) =>
  aha.on({ event: `aha.update.${type}` }, updateLinkedPrs)
);

export type LinkedRecord = Aha.Requirement | Aha.Feature | Aha.Epic;

interface UpdatedEventProps {
  record: LinkedRecord;
  changedFields: string[];
}

export interface PrLink {
  id: number;
  name: string;
  url: string;
  state: string;
}

const repoFromUrl = (url: string) =>
  new URL(url).pathname.split("/").slice(1, 3);
const prNumberFromUrl = (url: string) =>
  Number(new URL(url).pathname.split("/")[4]);

async function updateLinkedPrs(
  { record, changedFields }: UpdatedEventProps,
  { settings }: { settings: Settings }
) {
  if (!settings.updateFromAha) return;

  if (!changedFields.includes("name")) {
    return;
  }

  await record.loadAttributes("referenceNum", "name");

  if (String(record.name).trim() === "") {
    console.log(
      `Record ${record.typename} ${record.referenceNum} has no title?!`
    );
    return;
  }

  const prs = await record.getExtensionField<PrLink[]>(
    "aha-develop.github",
    "pullRequests"
  );
  console.log(prs);
  const token = settings.token;

  if (prs) {
    await Promise.all(
      prs.map((pr) => updateLinkedPr({ record, pr, token }))
    ).catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
  }
}

async function updateLinkedPr({
  record,
  pr,
  token,
}: {
  record: LinkedRecord;
  pr: PrLink;
  token: string;
}) {
  console.log("looking for pr...");
  const api = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });

  console.log(api);
  console.log(pr.url);
  const pullRequest = await getPr(api, pr.url);
  if (!pullRequest) return;

  const { id, title } = pullRequest;
  // Remove repeated reference numbers to prevent recursive calls
  const newTitle = `${record.referenceNum} ${record.name
    .replace(new RegExp(record.referenceNum, "g"), "")
    .trim()}`;

  if (title === newTitle) return;

  console.log(`Updating ${pr.url} title to ${newTitle}`);
  await updatePrTitle(api, id, newTitle);
}

async function getPr(api: typeof graphql, url: string) {
  const [owner, name] = repoFromUrl(url);
  const number = prNumberFromUrl(url);
  const getPrVars: GetPrQueryVariables = { owner, name, number };

  console.log(getPrVars);
  const response = await api<GetPrQuery>(print(GetPr), getPrVars);
  console.log(response);
  return response.repository?.pullRequest;
}

async function updatePrTitle(api: typeof graphql, id: string, title: string) {
  const updateTitleVars: UpdateTitleMutationVariables = {
    pullRequestId: id,
    title,
  };
  await api<UpdateTitleMutation>(print(UpdateTitle), updateTitleVars);
}
