import { LinkedRecord } from "./fromAha";

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

  console.log(
    `Updating ${record.typename} ${record.referenceNum} from PR ${payload.number}`
  );

  const newTitle = payload.pull_request.title
    .replace(new RegExp(record.referenceNum, "g"), "")
    .trim();
  if (newTitle === "") return;

  console.log(
    `${record.name} becomes ${newTitle} from ${payload.pull_request.title}`
  );

  if (newTitle !== record.name) {
    record.name = newTitle;
    await record.save();
  }
}
