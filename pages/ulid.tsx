import type { NextPage } from "next";
import { useState } from "react";
import { ulid } from "ulid";

import NumbersIcon from "@mui/icons-material/Numbers";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { CodeTextField } from "../components/CodeTextField";
import { WithHead } from "../components/WithHead";
import type { PageAttribute } from "../lib/usePageAttributes";

export const pageAttribute: PageAttribute = {
  title: "ULID",
  description: "Generates ULID strings.",
  path: "/ulid",
  icon: <NumbersIcon />,
};

const count = 20;
const generate = () => new Array(count).fill("").map(() => ulid());

type State = {
  ulids: string[];
};

const Page: NextPage = () => {
  const [state, setState] = useState<State>({
    ulids: generate(),
  });

  return (
    <WithHead {...pageAttribute}>
      <Button
        startIcon={<RefreshIcon />}
        onClick={() => setState({ ulids: generate() })}
      >
        Refresh
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {state.ulids.slice(0, count / 2).map((ulid, i) => (
            <CodeTextField disabled value={ulid} key={i} />
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          {state.ulids.slice(count / 2).map((ulid, i) => (
            <CodeTextField disabled value={ulid} key={i + count / 2} />
          ))}
        </Grid>
      </Grid>
    </WithHead>
  );
};

export default Page;
