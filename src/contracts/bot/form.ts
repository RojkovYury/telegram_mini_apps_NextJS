export interface Bot {
  id?: string,
  fields: Record<string, string>,
}

export interface CurrentTexts {
  code: string;
  value: string;
}

export interface BotForm {
  addVariableTitle: string,
  categories: {
    label: string;
    description: string;
    blocks: BlockBotForm[];
  }[]
}

export interface BlockBotForm {
  title: string;
  editTitle: string;
  fields: {
    type: string;
    code: string;
    label: string;
    comment?: string;
    multiline: boolean;
    showBalloon: boolean;
    defaultValue?: string;
    variables?: {
      label: string;
      value: string;
    }[]
  }[]
}
