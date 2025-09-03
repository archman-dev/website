import Markdown from 'markdown-to-jsx';

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  if (!content) {
    return null;
  }

  return <Markdown>{content}</Markdown>;
}
