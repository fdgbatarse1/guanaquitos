import { type Enum_Scholarship_Type } from '@/gql/graphql';

const getType = (type: Enum_Scholarship_Type) =>
  ({
    Completa: 'Completa',
    Parcial: 'Parcial',
  })[type];

export default getType;
