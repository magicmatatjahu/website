import React from "react";
import readingTimeLib from "reading-time";

import Link from "@components/shared/Link";
import H from "@components/shared/H";

import {
  FormattedMessage,
  getTranslation,
  injectIntl,
  IntlInterface,
} from "@common/i18n";

import { PostMetaDataAuthor, PostFieldsInfo } from "@typings/blog";

import { PostHeaderWrapper, PostMetadata } from "./styled";

interface PostHeaderProps extends IntlInterface {
  title: string;
  author: PostMetaDataAuthor;
  postInfo: PostFieldsInfo;
  path: string;
  readingTime: ReturnType<typeof readingTimeLib>;
}

const gt = getTranslation("blog");

const PostHeader: React.FunctionComponent<PostHeaderProps> = ({
  title,
  author: { name },
  postInfo: { year, month, day },
  path,
  formatMessage,
  readingTime,
}) => {
  const date = `${formatMessage({
    id: `months.${month}.name`,
  })} ${day}, ${year}`;

  const metadata = (
    <FormattedMessage
      id={gt("postMetadata")}
      values={{
        author: name,
        date,
        minutes: Math.ceil(readingTime.minutes),
      }}
    />
  );

  return (
    <PostHeaderWrapper>
      <Link.Internal to={path}>
        <H as="h2">{title}</H>
      </Link.Internal>
      <PostMetadata>{metadata}</PostMetadata>
    </PostHeaderWrapper>
  );
};

export default injectIntl("utils")(PostHeader);
