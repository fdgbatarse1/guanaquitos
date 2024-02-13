import type { Schema, Attribute } from '@strapi/strapi';

export interface MapMap extends Schema.Component {
  collectionName: 'components_map_maps';
  info: {
    displayName: 'Map';
    icon: 'pinMap';
    description: '';
  };
  attributes: {
    map: Attribute.JSON &
      Attribute.CustomField<'plugin::google-maps.location-picker'>;
    address: Attribute.Text;
  };
}

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
      'map.map': MapMap;
      'text.text': TextText;
    }
  }
}
