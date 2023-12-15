export interface Reaction {
  label: string;
  node: React.ReactElement;
  key: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  elementId: string;
}

export interface NewCommentElement {
  id: string;
  x: string;
  y: string;
  isOpen: boolean;
}
