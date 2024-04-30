import type { Schema, Attribute } from '@strapi/strapi';

export interface AnnouncementAnnouncement extends Schema.Component {
  collectionName: 'components_announcement_announcements';
  info: {
    displayName: 'announcement';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    url: Attribute.Text & Attribute.Required;
  };
}

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
    text: Attribute.Text;
  };
}

export interface VideoVideo extends Schema.Component {
  collectionName: 'components_video_videos';
  info: {
    displayName: 'video';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text & Attribute.Required;
    url: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'announcement.announcement': AnnouncementAnnouncement;
      'map.map': MapMap;
      'text.text': TextText;
      'video.video': VideoVideo;
    }
  }
}
