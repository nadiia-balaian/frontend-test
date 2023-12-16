export interface Reaction {
  label: string;
  node: React.ReactElement;
  key: string;
}

export interface Comment {
  id: string;
  content: string;
  elementId: string;
  replies: Comment[];
}

export interface CommentElement {
  id: string;
  x: string;
  y: string;
  isOpen: boolean;
  comment: Comment;
  reaction?: string;
}
