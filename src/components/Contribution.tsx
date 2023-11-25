import * as React from "react";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import EditIcon from "./EditIcon";

export default function Contribution({ mdFilePath }) {
  const contributionHref = mdFilePath
    ? `https://github.com/github/docs/blob/main${mdFilePath}.md`
    : "https://github.com/github/docs";

  return (
    <div className="f5 contribution">
      <h3 className="f4 mb-3">Help us make our documents great</h3>
      <p className="max-w-xs color-fg-muted mb-3">
        Help us make our documents great
      </p>

      <NextLink href={`${contributionHref}`} legacyBehavior>
        <Link href={`${contributionHref}`}>
          <EditIcon /> Edit this page
        </Link>
      </NextLink>

      <p className="color-fg-muted f6 mt-2">
        <a
          className="text-underline"
          href="/contributing"
          target="_blank"
          rel="noopener"
        >
          Learn how to contribute
        </a>
      </p>
    </div>
  );
}
