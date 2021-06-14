import { LinkedRecord } from "../types";

aha.on({ event: "aha-develop.github.pr.edited" }, updateAhaFromPr);

interface Webhook {
  action: "edited";
  number: number;
  pull_request: {
    title: string;
  };
}

interface Props {
  record: LinkedRecord;
  payload: Webhook;
}

async function updateAhaFromPr(
  { record, payload }: Props,
  { settings }: { settings: Settings }
) {
  if (!settings.updateFromGithub) return;
  if (!record) return;

  await record.loadAttributes("referenceNum", "name");

  const newTitle = payload.pull_request.title
    .replace(new RegExp(record.referenceNum, "g"), "")
    .trim();
  if (newTitle === "") return;

  console.log(
    `Updating ${record.typename} ${record.referenceNum} from PR ${payload.number}`
  );

  if (newTitle !== record.name) {
    record.name = newTitle;
    await record.save();
  }
}
