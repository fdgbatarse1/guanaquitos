import type { Schema, Attribute } from '@strapi/strapi';

export interface TextText extends Schema.Component {
  collectionName: 'components_text_texts';
  info: {
    displayName: 'text';
    icon: 'quote';
    description: '';
  };
  attributes: {
    text: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'text.text': TextText;
    }
  }
}
