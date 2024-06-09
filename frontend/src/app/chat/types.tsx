export interface SourceDocumentProps {
  pageContent: string;
  metadata: {
    source: string;
  };
}

export type SourceDocumentsProps = SourceDocumentProps[] | null;

export interface MessageProps {
  text: string;
  type: 'user' | 'system' | 'bot';
  sourceDocuments: SourceDocumentsProps;
}

export type MessagesProps = MessageProps[];

export interface MessageItemProps {
  message: MessageProps;
}

export interface StreamingProps {
  messages: MessagesProps;
  maxMsgs?: number;
}
